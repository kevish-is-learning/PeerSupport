"use client";

import {
  CalendarDays, Plus, Trash2, Loader2, Save,
  Lock, IndianRupee, Clock, CheckCircle2, ChevronDown, ChevronUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mentorProfileApi } from "../../../lib/api";
import { toast } from "sonner";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT = { Monday:"Mon", Tuesday:"Tue", Wednesday:"Wed", Thursday:"Thu", Friday:"Fri", Saturday:"Sat", Sunday:"Sun" };

const SERVICE_PALETTES = [
  { light:"#EEF0FF", mid:"#5061E4", text:"text-[#5061E4]", bg:"bg-[#EEF0FF]", border:"border-[#5061E4]", pill:"bg-[#5061E4] text-white", num:"bg-[#5061E4]" },
  { light:"#FFF7ED", mid:"#F59E0B", text:"text-[#F59E0B]", bg:"bg-[#FFF7ED]", border:"border-[#F59E0B]", pill:"bg-[#F59E0B] text-white", num:"bg-[#F59E0B]" },
  { light:"#F0FDF4", mid:"#22C55E", text:"text-[#22C55E]", bg:"bg-[#F0FDF4]", border:"border-[#22C55E]", pill:"bg-[#22C55E] text-white", num:"bg-[#22C55E]" },
  { light:"#FFF1F2", mid:"#F43F5E", text:"text-[#F43F5E]", bg:"bg-[#FFF1F2]", border:"border-[#F43F5E]", pill:"bg-[#F43F5E] text-white", num:"bg-[#F43F5E]" },
  { light:"#F0F9FF", mid:"#0EA5E9", text:"text-[#0EA5E9]", bg:"bg-[#F0F9FF]", border:"border-[#0EA5E9]", pill:"bg-[#0EA5E9] text-white", num:"bg-[#0EA5E9]" },
  { light:"#FDF4FF", mid:"#A855F7", text:"text-[#A855F7]", bg:"bg-[#FDF4FF]", border:"border-[#A855F7]", pill:"bg-[#A855F7] text-white", num:"bg-[#A855F7]" },
];

function buildEmpty(services) {
  const r = {};
  services.forEach(s => { r[s] = {}; DAYS.forEach(d => { r[s][d] = []; }); });
  return r;
}

function mergeAvailability(empty, existing) {
  const m = JSON.parse(JSON.stringify(empty));
  Object.entries(existing || {}).forEach(([svc, days]) => {
    if (m[svc]) Object.entries(days).forEach(([day, slots]) => { if (m[svc][day] !== undefined) m[svc][day] = slots; });
  });
  return m;
}

function countSlots(avail) {
  let total = 0;
  Object.values(avail).forEach(days => Object.values(days).forEach(slots => { total += slots.length; }));
  return total;
}

function activeDaysCount(avail) {
  const days = new Set();
  Object.values(avail).forEach(svcDays => Object.entries(svcDays).forEach(([d, s]) => { if (s.length > 0) days.add(d); }));
  return days.size;
}

export default function AvailabilityPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState({});
  const [originalAvailability, setOriginalAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedServices, setExpandedServices] = useState({});

  useEffect(() => {
    mentorProfileApi.getMine().then(res => {
      const p = res.data?.profile;
      if (!p) { router.push("/mentor/profile"); return; }
      setProfile(p);
      const pricedServices = (p.servicesOffered || []).filter(s => (p.servicePricing || {})[s]);
      const empty = buildEmpty(pricedServices);
      const merged = mergeAvailability(empty, p.weeklyAvailability);
      setAvailability(merged);
      setOriginalAvailability(merged);
      // Expand all by default
      const exp = {};
      pricedServices.forEach(s => { exp[s] = true; });
      setExpandedServices(exp);
    }).catch(() => {
      toast.error("Could not load profile.");
      router.push("/mentor/profile");
    }).finally(() => setLoading(false));
  }, []);

  const toggleExpand = (svc) => setExpandedServices(p => ({ ...p, [svc]: !p[svc] }));

  const addSlot = (svc, day) => setAvailability(prev => {
    const c = JSON.parse(JSON.stringify(prev));
    c[svc][day] = [...(c[svc][day] || []), { start: "09:00", end: "10:00" }];
    return c;
  });

  const removeSlot = (svc, day, idx) => setAvailability(prev => {
    const c = JSON.parse(JSON.stringify(prev));
    c[svc][day] = c[svc][day].filter((_, i) => i !== idx);
    return c;
  });

  const updateSlot = (svc, day, idx, field, val) => setAvailability(prev => {
    const c = JSON.parse(JSON.stringify(prev));
    c[svc][day][idx] = { ...c[svc][day][idx], [field]: val };
    return c;
  });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await mentorProfileApi.update({
        contactNumber: profile.contactNumber,
        bio: profile.bio,
        servicesOffered: profile.servicesOffered || [],
        expertiseTags: profile.expertiseTags || [],
        servicePricing: profile.servicePricing || {},
        weeklyAvailability: availability,
      });
      setOriginalAvailability(availability);
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

  const services = profile?.servicesOffered || [];
  const pricing = profile?.servicePricing || {};
  const pricedServices = services.filter(s => pricing[s]);
  const unpricedServices = services.filter(s => !pricing[s]);
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
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Set the time slots you're available each week</p>
          </div>
        </div>
        {isDirty && (
          <button
            onClick={handleSave}
            disabled={saving || pricedServices.length === 0}
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
        {pricedServices.length > 0 && (
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

        {/* Unpriced banner */}
        {unpricedServices.length > 0 && (
          <div className="mb-6 rounded-2xl border-[3px] border-black bg-amber-50 p-4 flex items-start gap-3"
            style={{ boxShadow: "4px 4px 0 0 #F59E0B" }}>
            <IndianRupee size={18} className="text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-sm text-amber-800">
                {unpricedServices.length} service{unpricedServices.length > 1 ? "s" : ""} locked — set pricing first
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                <span className="font-semibold">{unpricedServices.join(", ")}</span>
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

        {/* Service cards */}
        <div className="space-y-5">
          {services.map((svc, si) => {
            const pal = SERVICE_PALETTES[si % SERVICE_PALETTES.length];
            const hasPricing = !!pricing[svc];
            const isOpen = expandedServices[svc];

            // Slot summary for this service
            const svcSlots = Object.values(availability[svc] || {}).reduce((a, s) => a + s.length, 0);
            const svcDays = Object.entries(availability[svc] || {}).filter(([, s]) => s.length > 0).length;

            if (!hasPricing) {
              return (
                <div key={svc} className="rounded-2xl border-[3px] border-gray-200 overflow-hidden opacity-60"
                  style={{ boxShadow: "3px 3px 0 0 #d1d5db" }}>
                  <div className="bg-gray-50 px-5 py-4 flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-extrabold shrink-0`}>{si + 1}</span>
                    <p className="font-bold text-gray-400 flex-1">{svc}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                      <Lock size={12} /> Pricing required
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={svc} className="rounded-2xl border-[3px] border-black overflow-hidden bg-white"
                style={{ boxShadow: `5px 5px 0 0 ${pal.mid}` }}>

                {/* Service header — clickable to expand/collapse */}
                <button
                  onClick={() => toggleExpand(svc)}
                  className={`w-full ${pal.bg} px-5 py-4 border-b-2 border-black flex items-center gap-3 text-left`}
                >
                  <span className={`w-8 h-8 rounded-full ${pal.num} text-white flex items-center justify-center text-xs font-extrabold shrink-0`}>{si + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-gray-900 text-sm truncate">{svc}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {svcDays > 0 ? `${svcDays} day${svcDays > 1 ? "s" : ""} • ${svcSlots} slot${svcSlots !== 1 ? "s" : ""}` : "No slots set yet"}
                    </p>
                  </div>
                  {/* Price badge */}
                  <span className={`shrink-0 text-xs font-bold ${pal.pill} rounded-full px-2.5 py-1 border border-black/10`}>
                    ₹{pricing[svc]}
                  </span>
                  {isOpen ? <ChevronUp size={16} className="shrink-0 text-gray-600" /> : <ChevronDown size={16} className="shrink-0 text-gray-600" />}
                </button>

                {/* Day rows */}
                {isOpen && (
                  <div>
                    {/* Day grid header */}
                    <div className="grid grid-cols-7 border-b border-gray-100 px-5 py-2">
                      {DAYS.map(d => {
                        const hasSlots = (availability[svc]?.[d] || []).length > 0;
                        return (
                          <div key={d} className="flex flex-col items-center gap-1">
                            <span className={`text-[10px] font-bold ${hasSlots ? pal.text : "text-gray-400"}`}>{DAY_SHORT[d]}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${hasSlots ? pal.num : "bg-gray-200"}`} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Day slot editor */}
                    <div className="divide-y divide-gray-50">
                      {DAYS.map((day) => {
                        const slots = availability[svc]?.[day] || [];
                        const hasSlots = slots.length > 0;
                        return (
                          <div key={day} className={`px-5 py-3 flex items-start gap-3 transition-colors ${hasSlots ? "" : "hover:bg-gray-50/60"}`}>
                            <div className="w-24 shrink-0 pt-2">
                              <span className={`text-xs font-bold ${hasSlots ? "text-gray-800" : "text-gray-400"}`}>{day}</span>
                            </div>
                            <div className="flex-1 space-y-2">
                              {slots.length === 0 && (
                                <p className="text-xs text-gray-300 italic pt-2">No slots</p>
                              )}
                              {slots.map((slot, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white px-3 py-1.5 focus-within:border-[#5061E4] transition-colors">
                                    <Clock size={11} className="text-gray-400 shrink-0" />
                                    <input
                                      type="time" value={slot.start}
                                      onChange={e => updateSlot(svc, day, idx, "start", e.target.value)}
                                      className="text-xs font-semibold bg-transparent focus:outline-none w-20"
                                    />
                                  </div>
                                  <span className="text-gray-300 text-xs font-bold">→</span>
                                  <div className="flex items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-white px-3 py-1.5 focus-within:border-[#5061E4] transition-colors">
                                    <Clock size={11} className="text-gray-400 shrink-0" />
                                    <input
                                      type="time" value={slot.end}
                                      onChange={e => updateSlot(svc, day, idx, "end", e.target.value)}
                                      className="text-xs font-semibold bg-transparent focus:outline-none w-20"
                                    />
                                  </div>
                                  <button onClick={() => removeSlot(svc, day, idx)}
                                    className="w-7 h-7 rounded-lg border-2 border-red-200 bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:border-red-400 transition-colors">
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => addSlot(svc, day)}
                              className={`shrink-0 flex items-center gap-1 rounded-lg border-2 border-black px-3 py-1.5 text-xs font-bold transition-all hover:opacity-80 ${pal.pill}`}
                            >
                              <Plus size={11} /> Add
                            </button>
                          </div>
                        );
                      })}
                    </div>
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
