"use client";

import {
  CalendarDays, Plus, Trash2, Loader2, Save,
  IndianRupee, Clock, CheckCircle2, ChevronDown, ChevronUp,
  Layers, Settings2
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { mentorServiceApi, mentorAvailabilityApi } from "../../../lib/api";
import { toast } from "sonner";

const DAYS_ORDER = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const DAY_LABELS = { MONDAY:"Monday", TUESDAY:"Tuesday", WEDNESDAY:"Wednesday", THURSDAY:"Thursday", FRIDAY:"Friday", SATURDAY:"Saturday", SUNDAY:"Sunday" };
const DAY_SHORT = { MONDAY:"Mon", TUESDAY:"Tue", WEDNESDAY:"Wed", THURSDAY:"Thu", FRIDAY:"Fri", SATURDAY:"Sat", SUNDAY:"Sun" };

const SERVICE_PALETTES = [
  { light:"#EEF0FF", mid:"#5061E4", text:"text-[#5061E4]", bg:"bg-[#EEF0FF]", border:"border-[#5061E4]", pill:"bg-[#5061E4] text-white", num:"bg-[#5061E4]" },
  { light:"#FFF7ED", mid:"#F59E0B", text:"text-[#F59E0B]", bg:"bg-[#FFF7ED]", border:"border-[#F59E0B]", pill:"bg-[#F59E0B] text-white", num:"bg-[#F59E0B]" },
  { light:"#F0FDF4", mid:"#22C55E", text:"text-[#22C55E]", bg:"bg-[#F0FDF4]", border:"border-[#22C55E]", pill:"bg-[#22C55E] text-white", num:"bg-[#22C55E]" },
  { light:"#FFF1F2", mid:"#F43F5E", text:"text-[#F43F5E]", bg:"bg-[#FFF1F2]", border:"border-[#F43F5E]", pill:"bg-[#F43F5E] text-white", num:"bg-[#F43F5E]" },
  { light:"#F0F9FF", mid:"#0EA5E9", text:"text-[#0EA5E9]", bg:"bg-[#F0F9FF]", border:"border-[#0EA5E9]", pill:"bg-[#0EA5E9] text-white", num:"bg-[#0EA5E9]" },
  { light:"#FDF4FF", mid:"#A855F7", text:"text-[#A855F7]", bg:"bg-[#FDF4FF]", border:"border-[#A855F7]", pill:"bg-[#A855F7] text-white", num:"bg-[#A855F7]" },
];

/**
 * Build local availability state from the API response.
 *
 * New structure:
 * {
 *   [dayOfWeek]: {
 *     dayId: string | null,   // server ID for this day record
 *     slots: [{
 *       id: string | null,    // server ID (null if newly added)
 *       startTime: string,    // "HH:mm"
 *       endTime: string,      // "HH:mm"
 *       maxBookings: number,
 *       serviceIds: string[], // MentorService IDs assigned to this slot
 *     }]
 *   }
 * }
 */
function buildAvailabilityState(apiAvailability) {
  const state = {};
  DAYS_ORDER.forEach((day) => { state[day] = { dayId: null, slots: [] }; });

  (apiAvailability || []).forEach((dayEntry) => {
    state[dayEntry.dayOfWeek] = {
      dayId: dayEntry.id,
      slots: (dayEntry.slots || []).map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        maxBookings: slot.maxBookings || 1,
        serviceIds: (slot.services || []).map((ss) => ss.mentorServiceId),
      })),
    };
  });

  return state;
}

function countSlots(avail) {
  let total = 0;
  Object.values(avail).forEach((day) => { total += day.slots.length; });
  return total;
}

function activeDaysCount(avail) {
  return Object.values(avail).filter((day) => day.slots.length > 0).length;
}

/**
 * ServiceChips: Renders toggleable service pills for a slot.
 */
function ServiceChips({ services, selectedIds, onToggle }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {services.map((svc, idx) => {
        const pal = SERVICE_PALETTES[idx % SERVICE_PALETTES.length];
        const isSelected = selectedIds.includes(svc.id);
        return (
          <button
            key={svc.id}
            type="button"
            onClick={() => onToggle(svc.id)}
            className={`
              px-2.5 py-1 rounded-lg text-[10px] font-bold border-2 transition-all
              ${isSelected
                ? `${pal.pill} border-black shadow-[2px_2px_0_0_#000]`
                : 'bg-white border-gray-200 text-gray-400 hover:border-gray-400'
              }
            `}
          >
            {svc.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AvailabilityPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [availability, setAvailability] = useState({});
  const [originalAvailability, setOriginalAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesRes, availRes] = await Promise.all([
          mentorServiceApi.getMine(),
          mentorAvailabilityApi.getMine(),
        ]);

        const svcList = servicesRes.data?.services || [];
        setServices(svcList);

        if (svcList.length === 0) {
          router.push("/mentor/profile");
          return;
        }

        const availState = buildAvailabilityState(availRes.data?.availability);
        setAvailability(availState);
        setOriginalAvailability(JSON.parse(JSON.stringify(availState)));

        const exp = {};
        DAYS_ORDER.forEach((d) => { exp[d] = true; });
        setExpandedDays(exp);
      } catch {
        toast.error("Could not load data.");
        router.push("/mentor/profile");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleExpand = (day) => setExpandedDays((p) => ({ ...p, [day]: !p[day] }));

  const addSlot = useCallback((day) => {
    setAvailability((prev) => {
      const c = JSON.parse(JSON.stringify(prev));
      // Default: assign all priced services to the new slot
      const defaultServiceIds = services
        .filter((s) => s.pricePerSession > 0)
        .map((s) => s.id);

      c[day].slots.push({
        id: null,
        startTime: "09:00",
        endTime: "10:00",
        maxBookings: 1,
        serviceIds: defaultServiceIds,
      });
      return c;
    });
  }, [services]);

  const removeSlot = (day, idx) => setAvailability((prev) => {
    const c = JSON.parse(JSON.stringify(prev));
    c[day].slots = c[day].slots.filter((_, i) => i !== idx);
    return c;
  });

  const updateSlot = (day, idx, field, val) => setAvailability((prev) => {
    const c = JSON.parse(JSON.stringify(prev));
    c[day].slots[idx] = { ...c[day].slots[idx], [field]: val };
    return c;
  });

  const toggleService = (day, idx, serviceId) => setAvailability((prev) => {
    const c = JSON.parse(JSON.stringify(prev));
    const slot = c[day].slots[idx];
    if (slot.serviceIds.includes(serviceId)) {
      slot.serviceIds = slot.serviceIds.filter((id) => id !== serviceId);
    } else {
      slot.serviceIds.push(serviceId);
    }
    return c;
  });

  const handleSave = async () => {
    // 1. Frontend validation
    for (const day of DAYS_ORDER) {
      const slots = availability[day]?.slots || [];

      const parsedSlots = [];
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i];
        if (!s.startTime || !s.endTime) {
          toast.error(`${DAY_LABELS[day]} has an incomplete time slot.`);
          return;
        }

        // Validate services
        if (!s.serviceIds || s.serviceIds.length === 0) {
          toast.error(`Slot ${s.startTime}–${s.endTime} on ${DAY_LABELS[day]} must have at least one service assigned.`);
          return;
        }

        const [startH, startM] = s.startTime.split(':').map(Number);
        const [endH, endM] = s.endTime.split(':').map(Number);
        const startMins = startH * 60 + startM;
        const endMins = endH * 60 + endM;

        if (endMins - startMins < 15) {
          toast.error(`Slot on ${DAY_LABELS[day]} (${s.startTime}–${s.endTime}) must be at least 15 minutes.`);
          return;
        }
        parsedSlots.push({ startMins, endMins, label: `${s.startTime}–${s.endTime}` });
      }

      // Check for overlaps
      parsedSlots.sort((a, b) => a.startMins - b.startMins);
      for (let i = 0; i < parsedSlots.length - 1; i++) {
        const curr = parsedSlots[i];
        const next = parsedSlots[i + 1];
        if (curr.endMins > next.startMins) {
          toast.error(
            `Overlapping slots on ${DAY_LABELS[day]}: ${curr.label} and ${next.label} conflict.`
          );
          return;
        }
      }
    }

    setSaving(true);
    setSaved(false);
    try {
      // 2. Convert to new API format
      const payload = DAYS_ORDER
        .filter((day) => (availability[day]?.slots || []).length > 0)
        .map((day) => ({
          dayOfWeek: day,
          slots: availability[day].slots.map((s) => ({
            startTime: s.startTime,
            endTime: s.endTime,
            maxBookings: s.maxBookings || 1,
            serviceIds: s.serviceIds,
          })),
        }));

      await mentorAvailabilityApi.upsert(payload);
      setOriginalAvailability(JSON.parse(JSON.stringify(availability)));
      setSaved(true);
      toast.success("Availability saved!");
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      toast.error(e.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-full w-full items-center justify-center bg-[#FFF7F5]">
      <Loader2 className="animate-spin text-[#5061E4]" size={36} />
    </div>
  );

  const pricedServices = services.filter((s) => s.pricePerSession > 0);
  const unpricedServices = services.filter((s) => !s.pricePerSession || s.pricePerSession <= 0);
  const totalSlots = countSlots(availability);
  const totalDays = activeDaysCount(availability);
  const isDirty = JSON.stringify(availability) !== JSON.stringify(originalAvailability);

  return (
    <div className="w-full h-full overflow-y-auto bg-[#FFF7F5] text-black">

      {/* Top header bar */}
      <div className="sticky top-0 z-10 bg-[#FFF7F5]/95 backdrop-blur border-b-2 border-black px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#5061E4] border-[3px] border-black flex items-center justify-center shrink-0">
            <CalendarDays size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold leading-tight text-[#111]">Weekly Availability</h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Set your time slots and assign services to each slot</p>
          </div>
        </div>
        {isDirty && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
            style={{ boxShadow: "3px 3px 0 0 #000" }}
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        )}
      </div>

      <div className="px-6 lg:px-10 py-6 max-w-3xl">

        {/* Stats row */}
        {services.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Services Active", value: pricedServices.length, color: "#5061E4" },
              { label: "Days Available", value: totalDays, color: "#22C55E" },
              { label: "Slots / Week", value: totalSlots, color: "#F59E0B" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-2xl border-[3px] border-black bg-white p-4 text-center"
                style={{ boxShadow: `4px 4px 0 0 ${color}` }}>
                <p className="text-3xl font-extrabold" style={{ color }}>{value}</p>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Unpriced services banner */}
        {unpricedServices.length > 0 && (
          <div className="mb-6 rounded-2xl border-[3px] border-black bg-amber-50 p-4 flex items-start gap-3"
            style={{ boxShadow: "4px 4px 0 0 #F59E0B" }}>
            <IndianRupee size={18} className="text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-sm text-amber-800">
                {unpricedServices.length} service{unpricedServices.length > 1 ? "s" : ""} need pricing
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                <span className="font-semibold">{unpricedServices.map((s) => s.label).join(", ")}</span>
              </p>
            </div>
            <button onClick={() => router.push("/mentor/profile")}
              className="shrink-0 rounded-xl border-2 border-black bg-[#F59E0B] px-3 py-1.5 text-xs font-bold hover:opacity-90">
              Set Pricing
            </button>
          </div>
        )}

        {/* No services at all */}
        {services.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl border-[3px] border-black bg-white flex items-center justify-center mb-4"
              style={{ boxShadow: "4px 4px 0 0 #000" }}>
              <CalendarDays size={28} className="text-gray-300" />
            </div>
            <p className="font-extrabold text-gray-400 text-lg">No services added yet</p>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">Add services from your Profile page, then come back to set your availability.</p>
            <button onClick={() => router.push("/mentor/profile")}
              className="mt-6 rounded-xl border-[3px] border-black bg-[#5061E4] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
              style={{ boxShadow: "3px 3px 0 0 #000" }}>
              Go to Profile
            </button>
          </div>
        )}

        {/* Day-based availability cards */}
        <div className="space-y-5">
          {DAYS_ORDER.map((day, di) => {
            const pal = SERVICE_PALETTES[di % SERVICE_PALETTES.length];
            const slots = availability[day]?.slots || [];
            const isOpen = expandedDays[day];

            return (
              <div key={day} className="rounded-2xl border-[3px] border-black overflow-hidden bg-white"
                style={{ boxShadow: `5px 5px 0 0 ${pal.mid}` }}>

                {/* Day header — clickable to expand/collapse */}
                <button
                  onClick={() => toggleExpand(day)}
                  className={`w-full ${pal.bg} px-5 py-4 border-b-2 border-black flex items-center gap-3 text-left`}
                >
                  <span className={`w-8 h-8 rounded-full ${pal.num} text-white flex items-center justify-center text-xs font-extrabold shrink-0`}>{DAY_SHORT[day]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-gray-900 text-sm truncate">{DAY_LABELS[day]}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {slots.length > 0 ? `${slots.length} slot${slots.length !== 1 ? "s" : ""}` : "No slots set yet"}
                    </p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="shrink-0 text-gray-600" /> : <ChevronDown size={16} className="shrink-0 text-gray-600" />}
                </button>

                {/* Slot editor */}
                {isOpen && (
                  <div className="px-5 py-4 space-y-4">
                    {slots.length === 0 && (
                      <p className="text-xs text-gray-300 italic">No slots configured for this day</p>
                    )}
                    {slots.map((slot, idx) => (
                      <div key={idx} className="rounded-xl border-2 border-gray-100 bg-gray-50/50 p-3 space-y-2">
                        {/* Time range row */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white px-3 py-1.5 focus-within:border-[#5061E4] transition-colors">
                            <Clock size={11} className="text-gray-400 shrink-0" />
                            <input
                              type="time" value={slot.startTime}
                              onChange={(e) => updateSlot(day, idx, "startTime", e.target.value)}
                              className="text-xs font-semibold bg-transparent focus:outline-none w-20"
                            />
                          </div>
                          <span className="text-gray-300 text-xs font-bold">→</span>
                          <div className="flex items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white px-3 py-1.5 focus-within:border-[#5061E4] transition-colors">
                            <Clock size={11} className="text-gray-400 shrink-0" />
                            <input
                              type="time" value={slot.endTime}
                              onChange={(e) => updateSlot(day, idx, "endTime", e.target.value)}
                              className="text-xs font-semibold bg-transparent focus:outline-none w-20"
                            />
                          </div>

                          {/* Max bookings */}
                          <div className="flex items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white px-2 py-1.5 ml-auto">
                            <Layers size={11} className="text-gray-400 shrink-0" />
                            <input
                              type="number" min={1} max={50}
                              value={slot.maxBookings}
                              onChange={(e) => updateSlot(day, idx, "maxBookings", Math.max(1, parseInt(e.target.value) || 1))}
                              className="text-xs font-semibold bg-transparent focus:outline-none w-8 text-center"
                              title="Max bookings per slot"
                            />
                          </div>

                          <button onClick={() => removeSlot(day, idx)}
                            className="w-7 h-7 rounded-lg border-2 border-red-200 bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:border-red-400 transition-colors shrink-0">
                            <Trash2 size={11} />
                          </button>
                        </div>

                        {/* Service assignment chips */}
                        <div className="flex items-center gap-1.5 mt-1">
                          <Settings2 size={10} className="text-gray-400 shrink-0" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Services:</span>
                        </div>
                        <ServiceChips
                          services={pricedServices}
                          selectedIds={slot.serviceIds}
                          onToggle={(svcId) => toggleService(day, idx, svcId)}
                        />
                        {slot.serviceIds.length === 0 && (
                          <p className="text-[10px] text-red-400 font-semibold mt-1">
                            ⚠ At least one service must be assigned
                          </p>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addSlot(day)}
                      className={`flex items-center gap-1 rounded-lg border-2 border-black px-3 py-1.5 text-xs font-bold transition-all hover:opacity-80 ${pal.pill}`}
                    >
                      <Plus size={11} /> Add Slot
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
