"use client";

import { useEffect, useState } from "react";
import { useMentorStore } from "@/stores/mentorStore";
import { useAuthStore } from "@/stores/authStore";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  Clock,
  Plus,
  Trash2,
  Loader2,
  DollarSign,
  Save,
  CalendarDays,
} from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  setHours,
  setMinutes,
  isBefore,
} from "date-fns";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function MentorAvailabilityPage() {
  const { slots, fetchSlots, createSlots, deleteSlot, isLoading } = useMentorStore();
  const { mentorProfile, fetchMe } = useAuthStore();

  // Pricing state
  const [pricePerSession, setPricePerSession] = useState<string>("");
  const [pricingLoading, setPricingLoading] = useState(false);

  // Slot creation state
  const [selectedDay, setSelectedDay] = useState<number>(1); // Monday by default
  const [startHour, setStartHour] = useState<number>(9);
  const [startMin, setStartMin] = useState<number>(0);
  const [endHour, setEndHour] = useState<number>(10);
  const [endMin, setEndMin] = useState<number>(0);
  const [addingSlot, setAddingSlot] = useState(false);

  useEffect(() => {
    fetchSlots();
    fetchMe();
  }, [fetchSlots, fetchMe]);

  useEffect(() => {
    if (mentorProfile?.pricePerSession != null) {
      setPricePerSession(String(mentorProfile.pricePerSession));
    }
  }, [mentorProfile]);

  // Group slots by day of week
  const slotsByDay: Record<number, typeof slots> = {};
  for (const slot of slots) {
    const dayOfWeek = new Date(slot.startTime).getDay();
    if (!slotsByDay[dayOfWeek]) slotsByDay[dayOfWeek] = [];
    slotsByDay[dayOfWeek].push(slot);
  }

  // Sort each day's slots by time
  Object.values(slotsByDay).forEach((daySlots) =>
    daySlots.sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
  );

  const handleAddSlot = async () => {
    // Build a date for the next occurrence of selectedDay
    const today = new Date();
    const weekStart = startOfWeek(today);
    let target = addDays(weekStart, selectedDay);
    if (isBefore(target, today)) {
      target = addDays(target, 7);
    }
    const start = setMinutes(setHours(target, startHour), startMin);
    const end = setMinutes(setHours(target, endHour), endMin);

    if (end <= start) {
      toast.error("End time must be after start time");
      return;
    }

    setAddingSlot(true);
    try {
      await createSlots([
        {
          startTime: start.toISOString(),
          endTime: end.toISOString(),
        },
      ]);
      toast.success("Slot added");
      await fetchSlots();
    } catch {
      // handled by interceptor
    } finally {
      setAddingSlot(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      await deleteSlot(slotId);
      toast.success("Slot removed");
    } catch {
      // handled by interceptor
    }
  };

  const handleSavePricing = async () => {
    const price = parseFloat(pricePerSession);
    if (isNaN(price) || price < 0) {
      toast.error("Enter a valid price");
      return;
    }
    setPricingLoading(true);
    try {
      await api.post("/users/profile/mentor", { pricePerSession: price });
      toast.success("Pricing updated");
      fetchMe();
    } catch {
      // handled by interceptor
    } finally {
      setPricingLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Availability & Pricing</h1>
        <p className="text-muted-foreground mt-1">
          Manage your available time slots and session pricing
        </p>
      </div>

      {/* Pricing Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Session Pricing</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 max-w-xs">
            <label className="text-sm text-muted-foreground block mb-1">
              Price per session (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <input
                type="number"
                min={0}
                value={pricePerSession}
                onChange={(e) => setPricePerSession(e.target.value)}
                placeholder="0 for free"
                className="w-full pl-7 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Set to 0 for free sessions</p>
          </div>
          <button
            onClick={handleSavePricing}
            disabled={pricingLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center gap-2"
          >
            {pricingLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Pricing
          </button>
        </div>
      </div>

      {/* Add Slot Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plus size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Add Time Slot</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Day Selector */}
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {DAYS.map((day, i) => (
                <option key={day} value={i}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Start Time</label>
            <div className="flex gap-1">
              <select
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                className="flex-1 px-2 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                value={startMin}
                onChange={(e) => setStartMin(Number(e.target.value))}
                className="flex-1 px-2 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[0, 15, 30, 45].map((m) => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* End Time */}
          <div>
            <label className="text-sm text-muted-foreground block mb-1">End Time</label>
            <div className="flex gap-1">
              <select
                value={endHour}
                onChange={(e) => setEndHour(Number(e.target.value))}
                className="flex-1 px-2 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <select
                value={endMin}
                onChange={(e) => setEndMin(Number(e.target.value))}
                className="flex-1 px-2 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[0, 15, 30, 45].map((m) => (
                  <option key={m} value={m}>
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Button */}
          <div>
            <button
              onClick={handleAddSlot}
              disabled={addingSlot}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {addingSlot ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Plus size={14} />
              )}
              Add Slot
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Slots Overview */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <CalendarDays size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Your Slots</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : slots.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No slots created yet. Add your first time slot above.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {DAYS.map((dayName, dayIndex) => {
              const daySlots = slotsByDay[dayIndex];
              if (!daySlots || daySlots.length === 0) return null;

              return (
                <div key={dayName} className="p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-primary" />
                    {dayName}
                    <span className="text-xs text-muted-foreground font-normal">
                      ({daySlots.length} slot{daySlots.length !== 1 ? "s" : ""})
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border ${
                          slot.status === "AVAILABLE"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : slot.status === "BOOKED"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            : "bg-secondary border-border text-muted-foreground"
                        }`}
                      >
                        <span>
                          {format(new Date(slot.startTime), "h:mm a")} -{" "}
                          {format(new Date(slot.endTime), "h:mm a")}
                        </span>
                        <span className="text-xs opacity-70">{slot.status}</span>
                        {slot.status === "AVAILABLE" && (
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="text-red-400 hover:text-red-300 transition ml-1"
                            title="Delete slot"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
