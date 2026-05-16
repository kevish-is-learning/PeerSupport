"use client";

import { useState, useEffect, useCallback } from "react";
import { v2Api, publicMentorApi } from "../../../lib/api";
import useSocket from "../../../lib/useSocket";
import BookingWizard from "./BookingWizard";
import { toast } from "sonner";
import {
  Loader2,
  Clock,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function formatSlotTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatLocalDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function generateDates(startDate, count = 14) {
  const dates = [];
  const d = new Date(startDate);
  for (let i = 0; i < count; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

export default function MentorBookingPage({ mentorProfileId }) {
  const [mentor, setMentor] = useState(null);
  const [mentorServices, setMentorServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [dateRange] = useState(() => generateDates(new Date()));
  const [availableDates, setAvailableDates] = useState([]);

  // Socket.io for real-time slot updates
  const onSlotUpdate = useCallback(
    (payload) => {
      if (!selectedService || payload.serviceId !== selectedService.id) return;
      if (payload.action === "taken") {
        setSlots((prev) =>
          prev.filter(
            (s) =>
              !(
                s.startTime === payload.startTime &&
                s.endTime === payload.endTime
              ),
          ),
        );
      } else if (payload.action === "released") {
        setSlots((prev) => {
          const exists = prev.some(
            (s) =>
              s.startTime === payload.startTime &&
              s.endTime === payload.endTime,
          );
          if (exists) return prev;
          const updated = [
            ...prev,
            { startTime: payload.startTime, endTime: payload.endTime },
          ];
          updated.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
          return updated;
        });
      }
    },
    [selectedService],
  );

  useSocket(mentorProfileId, onSlotUpdate);

  useEffect(() => {
    loadServices();
  }, [mentorProfileId]);

  const loadServices = async () => {
    try {
      const res = await publicMentorApi.getMentorProfile(mentorProfileId);
      const data = res?.data?.mentor || res?.data;
      setMentor(data);
      const services = data?.services || [];
      setMentorServices(services);

      // Compute available dates per service from availability data
      if (data?.availability) {
        const dates = data.availability
          .filter((a) => a.specificDate)
          .map((a) => a.specificDate);
        setAvailableDates([...new Set(dates)]);
      }
    } catch (e) {
      toast.error("Failed to load mentor services");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (service, date) => {
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    try {
      const dateStr = formatLocalDate(date);
      const res = await v2Api.getSlots(mentorProfileId, {
        serviceId: service.serviceId || service.id,
        date: dateStr,
      });
      const result = res?.data;
      setSlots(result?.slots || []);
      if (result?.service) {
        // Merge without losing fields like label/title from original service
        setSelectedService((prev) => ({ ...prev, ...result.service }));
      }
      if ((result?.slots || []).length === 0) {
        toast.info(result?.message || "No slots available for this date");
      }
    } catch (e) {
      if (e.status === 404) {
        toast.info("This mentor doesn't offer this service");
        setSlots([]);
      } else {
        toast.error(e.message || "Failed to load slots");
      }
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleServiceToggle = (service) => {
    if (expandedService?.id === service.id) {
      setExpandedService(null);
      return;
    }
    setExpandedService(service);
    setSelectedService(service);
    setSelectedSlot(null);
    setSlots([]);
    setSelectedDate(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (selectedService) {
      fetchSlots(selectedService, date);
    }
  };

  const handleContinueToBook = () => {
    if (!selectedSlot || !selectedService) return;
    setWizardOpen(true);
  };

  // Filter dates that have availability for the selected service
  const getServiceAvailableDates = () => {
    if (!mentor?.availability || !selectedService) return [];
    return mentor.availability
      .filter(
        (a) =>
          a.specificDate &&
          a.services?.some((s) => s.mentorServiceId === selectedService.id),
      )
      .map((a) => a.specificDate);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-[#5061E4]" size={32} />
      </div>
    );
  }

  // Wizard view
  if (wizardOpen && selectedSlot && selectedService) {
    return (
      <BookingWizard
        mentor={mentor}
        service={selectedService}
        date={selectedDate}
        slot={selectedSlot}
        onBack={() => setWizardOpen(false)}
        onBookingComplete={() => {
          setWizardOpen(false);
          setSelectedSlot(null);
          if (selectedService && selectedDate) {
            fetchSlots(selectedService, selectedDate);
          }
        }}
      />
    );
  }

  const serviceAvailDates = getServiceAvailableDates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl border-2 border-black bg-white p-6"
        style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={22} className="text-gray-800" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            Book a Session
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          Select a service to view available dates and time slots
        </p>
      </div>

      {/* Service Accordion Cards */}
      <div className="space-y-4">
        {mentorServices.map((svc) => {
          const isExpanded = expandedService?.id === svc.id;
          return (
            <div
              key={svc.id}
              className="rounded-2xl border-[3px] border-black bg-white overflow-hidden"
              style={{
                boxShadow: isExpanded
                  ? "5px 5px 0 0 #5061E4"
                  : "4px 4px 0 0 #d1d5db",
              }}
            >
              {/* Service Header */}
              <button
                onClick={() => handleServiceToggle(svc)}
                className="flex w-full items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h4 className="text-base font-bold text-gray-900">
                    {svc.label || svc.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-sm font-bold text-[#22C55E]">
                      ₹{svc.price}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={12} /> {svc.durationMinutes || 60} min
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t-2 border-gray-200 px-5 py-5 space-y-5">
                  {/* Date Selection */}
                  <div>
                    <h5 className="text-sm font-extrabold text-gray-900 mb-3">
                      Select a Date
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {dateRange
                        .filter((date) => {
                          const dateStr = formatLocalDate(date);
                          return serviceAvailDates.includes(dateStr);
                        })
                        .map((date) => {
                          const isSelected =
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString();
                          return (
                            <button
                              key={formatLocalDate(date)}
                              onClick={() => handleDateSelect(date)}
                              className={`rounded-xl border-[3px] px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                                isSelected
                                  ? "border-[#5061E4] bg-[#5061E4] text-white"
                                  : "border-black bg-white text-gray-800"
                              }`}
                              style={{
                                boxShadow: isSelected
                                  ? "3px 3px 0 0 #000"
                                  : "2px 2px 0 0 #d1d5db",
                              }}
                            >
                              {date.toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                weekday: "short",
                              })}
                            </button>
                          );
                        })}
                      {dateRange.filter((d) =>
                        serviceAvailDates.includes(formatLocalDate(d)),
                      ).length === 0 && (
                        <p className="col-span-full text-sm text-gray-400 text-center py-4">
                          No available dates for this service
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  {selectedDate && (
                    <div>
                      <h5 className="text-sm font-extrabold text-gray-900 mb-3">
                        Select a Time Slot
                      </h5>
                      {slotsLoading ? (
                        <div className="flex h-20 items-center justify-center">
                          <Loader2
                            className="animate-spin text-[#5061E4]"
                            size={24}
                          />
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">
                          No slots available
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {slots.map((slot, idx) => {
                            const isSelected =
                              selectedSlot?.startTime === slot.startTime;
                            return (
                              <button
                                key={`${slot.startTime}-${idx}`}
                                onClick={() => setSelectedSlot(slot)}
                                className={`rounded-xl border-[3px] py-2.5 text-center text-sm font-bold transition-all hover:-translate-y-0.5 ${
                                  isSelected
                                    ? "border-[#22C55E] bg-[#22C55E] text-white"
                                    : "border-black bg-white text-gray-800 hover:bg-[#F0FDF4]"
                                }`}
                                style={{
                                  boxShadow: isSelected
                                    ? "3px 3px 0 0 #000"
                                    : "2px 2px 0 0 #d1d5db",
                                }}
                              >
                                {formatSlotTime(slot.startTime)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Continue Button */}
                  {selectedSlot && (
                    <button
                      onClick={handleContinueToBook}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ boxShadow: "4px 4px 0 0 #000" }}
                    >
                      <Calendar size={16} />
                      Continue to Book Session
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
