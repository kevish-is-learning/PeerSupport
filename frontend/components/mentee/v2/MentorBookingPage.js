"use client";

import { useState, useEffect, useCallback } from "react";
import { v2Api, publicMentorApi } from "../../../lib/api";
import useSocket from "../../../lib/useSocket";
import { toast } from "sonner";
import {
  Loader2, Clock, IndianRupee, Calendar, ChevronLeft, ChevronRight,
  Check, AlertTriangle, Zap, User, Star,
} from "lucide-react";

function formatSlotTime(isoString) {
  // "2026-05-15T14:30:00+05:30" → "2:30 PM"
  const d = new Date(isoString);
  return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
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
  const [mentorServices, setMentorServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [dateRange] = useState(() => generateDates(new Date()));

  // Socket.io for real-time slot updates
  const onSlotUpdate = useCallback(
    (payload) => {
      if (!selectedService || payload.serviceId !== selectedService.id) return;

      if (payload.action === "taken") {
        setSlots((prev) =>
          prev.filter(
            (s) => !(s.startTime === payload.startTime && s.endTime === payload.endTime)
          )
        );
      } else if (payload.action === "released") {
        setSlots((prev) => {
          // Add back the slot (avoid duplicates)
          const exists = prev.some(
            (s) => s.startTime === payload.startTime && s.endTime === payload.endTime
          );
          if (exists) return prev;
          const updated = [...prev, { startTime: payload.startTime, endTime: payload.endTime }];
          updated.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
          return updated;
        });
      }
    },
    [selectedService]
  );

  useSocket(mentorProfileId, onSlotUpdate);

  useEffect(() => {
    loadServices();
  }, [mentorProfileId]);

  const loadServices = async () => {
    try {
      // Fetch mentor's active services from their profile
      const res = await publicMentorApi.getMentorProfile(mentorProfileId);
      const services = res?.data?.services || [];
      
      // Map them to match the expected format (id -> serviceId for the V2 API, or keep as is)
      setMentorServices(services);
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
      const dateStr = date.toISOString().split("T")[0];
      const res = await v2Api.getSlots(mentorProfileId, {
        serviceId: service.id,
        date: dateStr,
      });

      const result = res?.data;
      setSlots(result?.slots || []);

      // Update service info from the response if available
      if (result?.service) {
        setSelectedService(result.service);
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

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedSlot(null);
    setSlots([]);
    if (selectedDate) {
      fetchSlots(service, selectedDate);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (selectedService) {
      fetchSlots(selectedService, date);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !selectedService) return;

    setBooking(true);
    try {
      // 1. Create booking and generate Razorpay order (unified v2 API call)
      const res = await v2Api.createBooking({
        mentorProfileId,
        mentorServiceId: selectedService.id,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });

      const { booking, order } = res?.data;
      if (!booking?.id || !order?.orderId) {
        throw new Error("Failed to initiate booking or generate payment order");
      }

      setConfirmModal(false);

      // 2. Open Razorpay checkout — slot is held from this moment
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Peer Support",
        description: `${selectedService.name || selectedService.serviceName}`,
        order_id: order.orderId,
        prefill: order.prefill,
        theme: { color: "#5061E4" },
        handler: async (response) => {
          // Payment success → verify & confirm the booking
          try {
            // We use the existing paymentApi.verify which expects razorpay response + bookingId
            const { paymentApi } = await import("../../../lib/api");
            await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id,
            });
            setBookingResult(res.data);
            toast.success("Booking confirmed! 🎉");
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: async () => {
            // User dismissed → release the slot immediately
            const { paymentApi } = await import("../../../lib/api");
            await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: booking.id }).catch(() => {});
            toast.error("Payment cancelled. The slot has been released.");
          },
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (r) => {
          // Payment failed → release the slot immediately
          const { paymentApi } = await import("../../../lib/api");
          await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: booking.id }).catch(() => {});
          toast.error(r.error?.description || "Payment failed. The slot has been released.");
        });
        rzp.open();
      } else {
        toast.error("Payment gateway not loaded. Please refresh the page.");
      }
    } catch (e) {
      if (e.status === 409) {
        toast.error("This slot was just booked by someone else. Please choose another slot.", {
          duration: 5000,
        });
        // Refresh slots
        if (selectedService && selectedDate) {
          fetchSlots(selectedService, selectedDate);
        }
      } else {
        toast.error(e.message || "Booking failed");
      }
      setConfirmModal(false);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-[#5061E4]" size={32} />
      </div>
    );
  }

  // Success view
  if (bookingResult) {
    const b = bookingResult.booking;
    return (
      <div className="mx-auto max-w-lg p-6">
        <div
          className="rounded-2xl border-[3px] border-black bg-[#E8FFE8] p-8 text-center"
          style={{ boxShadow: "8px 8px 0 0 #22C55E" }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-black bg-[#22C55E]">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold">Booking Confirmed!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your session has been booked successfully
          </p>
          <div className="mt-6 rounded-xl border-2 border-black bg-white p-4 text-left">
            <p className="text-sm font-bold text-gray-500">Service</p>
            <p className="font-bold">{b?.service?.serviceName}</p>
            <p className="mt-3 text-sm font-bold text-gray-500">Time</p>
            <p className="font-bold">{formatSlotTime(b?.startTime)} — {formatSlotTime(b?.endTime)}</p>
            <p className="mt-3 text-sm font-bold text-gray-500">Price</p>
            <p className="font-bold">₹{b?.service?.price}</p>
          </div>
          <button
            onClick={() => {
              setBookingResult(null);
              setSelectedSlot(null);
              if (selectedService && selectedDate) {
                fetchSlots(selectedService, selectedDate);
              }
            }}
            className="mt-6 rounded-xl border-[3px] border-black bg-[#5061E4] px-6 py-3 text-sm font-bold text-white"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
          >
            Book Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Select Service */}
      <section>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-[#5061E4] text-xs font-bold text-white">
            1
          </span>
          Select a Service
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mentorServices.map((svc) => {
            const isSelected = selectedService?.id === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => handleServiceSelect(svc)}
                className={`rounded-xl border-[3px] p-4 text-left transition-all hover:-translate-y-0.5 ${
                  isSelected
                    ? "border-[#5061E4] bg-[#EEF0FF]"
                    : "border-black bg-white"
                }`}
                style={{
                  boxShadow: isSelected ? "5px 5px 0 0 #5061E4" : "4px 4px 0 0 #d1d5db",
                }}
              >
                <h4 className="font-bold text-[#111]">{svc.name}</h4>
                {svc.description && (
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{svc.description}</p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Select Date */}
      {selectedService && (
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-[#5061E4] text-xs font-bold text-white">
              2
            </span>
            Pick a Date
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dateRange.map((date) => {
              const isSelected =
                selectedDate && date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`flex flex-col items-center rounded-xl border-[3px] px-4 py-3 transition-all hover:-translate-y-0.5 shrink-0 ${
                    isSelected
                      ? "border-[#5061E4] bg-[#5061E4] text-white"
                      : "border-black bg-white text-[#111]"
                  }`}
                  style={{
                    boxShadow: isSelected ? "4px 4px 0 0 #000" : "3px 3px 0 0 #d1d5db",
                  }}
                >
                  <span className="text-[10px] font-bold uppercase">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-lg font-extrabold">{date.getDate()}</span>
                  <span className="text-[10px] font-semibold">
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                  {isToday && (
                    <span className={`mt-1 text-[8px] font-bold uppercase ${isSelected ? "text-white/80" : "text-[#5061E4]"}`}>
                      Today
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 3: Pick a Slot */}
      {selectedService && selectedDate && (
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-[#5061E4] text-xs font-bold text-white">
              3
            </span>
            Available Slots
            {selectedService.durationMinutes && (
              <span className="ml-2 rounded-lg border-2 border-gray-300 px-2 py-0.5 text-xs font-bold text-gray-500">
                <Clock size={10} className="mr-1 inline" />
                {selectedService.durationMinutes} min
              </span>
            )}
            {selectedService.price && (
              <span className="rounded-lg border-2 border-gray-300 px-2 py-0.5 text-xs font-bold text-gray-500">
                ₹{selectedService.price}
              </span>
            )}
          </h3>

          {slotsLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="animate-spin text-[#5061E4]" size={24} />
            </div>
          ) : slots.length === 0 ? (
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-8 text-center">
              <Calendar size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-bold text-gray-400">No slots available for this date</p>
              <p className="text-xs text-gray-400 mt-1">Try a different date or service</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {slots.map((slot, idx) => {
                const isSelected =
                  selectedSlot?.startTime === slot.startTime &&
                  selectedSlot?.endTime === slot.endTime;

                return (
                  <button
                    key={`${slot.startTime}-${idx}`}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setConfirmModal(true);
                    }}
                    className={`rounded-xl border-[3px] py-3 text-center text-sm font-bold transition-all hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-[#5061E4] bg-[#5061E4] text-white"
                        : "border-black bg-white text-[#111] hover:bg-[#EEF0FF]"
                    }`}
                    style={{
                      boxShadow: isSelected ? "3px 3px 0 0 #000" : "2px 2px 0 0 #d1d5db",
                    }}
                  >
                    {formatSlotTime(slot.startTime)}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Confirm Modal */}
      {confirmModal && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="w-full max-w-sm rounded-2xl border-[3px] border-black bg-white p-6"
            style={{ boxShadow: "8px 8px 0 0 #5061E4" }}
          >
            <h3 className="text-xl font-extrabold mb-4">Confirm Booking</h3>

            <div className="space-y-3">
              <div className="flex justify-between rounded-lg border-2 border-gray-200 px-4 py-2.5">
                <span className="text-sm font-bold text-gray-500">Service</span>
                <span className="text-sm font-bold">{selectedService?.serviceName || selectedService?.name}</span>
              </div>
              <div className="flex justify-between rounded-lg border-2 border-gray-200 px-4 py-2.5">
                <span className="text-sm font-bold text-gray-500">Date</span>
                <span className="text-sm font-bold">
                  {selectedDate?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                </span>
              </div>
              <div className="flex justify-between rounded-lg border-2 border-gray-200 px-4 py-2.5">
                <span className="text-sm font-bold text-gray-500">Time</span>
                <span className="text-sm font-bold">
                  {formatSlotTime(selectedSlot.startTime)} — {formatSlotTime(selectedSlot.endTime)}
                </span>
              </div>
              {selectedService?.price && (
                <div className="flex justify-between rounded-lg border-2 border-[#5061E4] bg-[#EEF0FF] px-4 py-2.5">
                  <span className="text-sm font-bold text-[#5061E4]">Total</span>
                  <span className="text-sm font-extrabold text-[#5061E4]">₹{selectedService.price}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmModal(false)}
                className="flex-1 rounded-xl border-[3px] border-black px-4 py-2.5 text-sm font-bold hover:bg-gray-50"
                style={{ boxShadow: "3px 3px 0 0 #d1d5db" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={booking}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                style={{ boxShadow: "3px 3px 0 0 #000" }}
              >
                {booking ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                {booking ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
