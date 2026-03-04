"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  menteeService,
  MentorWithProfile,
  Slot,
} from "@/services/mentee.service";
import { paymentService } from "@/services/payment.service";
import { useAuthStore } from "@/store/auth.store";

interface BookingFormData {
  slotId: string;
  sessionMode: "VIDEO" | "AUDIO" | "CHAT";
  purpose: string;
  shareProfile: boolean;
}

export default function MentorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const { user } = useAuthStore();

  const [mentor, setMentor] = useState<MentorWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<
    "select-slot" | "details" | "payment" | "success"
  >("select-slot");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    slotId: "",
    sessionMode: "VIDEO",
    purpose: "",
    shareProfile: false,
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    loadMentor();
  }, [id]);

  const loadMentor = async () => {
    try {
      setLoading(true);
      const response = await menteeService.getMentorById(id);
      if (response.data) {
        setMentor(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load mentor");
    } finally {
      setLoading(false);
    }
  };

  const groupSlotsByDate = (slots: Slot[]) => {
    const grouped: Record<string, Slot[]> = {};
    slots?.forEach((slot) => {
      const date = new Date(slot.startTime).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(slot);
    });
    return grouped;
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setBookingForm((prev) => ({ ...prev, slotId: slot.id }));
    setBookingStep("details");
  };

  const handleBookingSubmit = async () => {
    if (!selectedSlot || !bookingForm.purpose.trim()) {
      setBookingError("Please fill in the purpose for this session");
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError(null);

      // Create booking
      const bookingResponse = await menteeService.createBooking({
        mentorId: id,
        slotId: selectedSlot.id,
        sessionMode: bookingForm.sessionMode,
        purpose: bookingForm.purpose,
        shareProfile: bookingForm.shareProfile,
      });

      if (!bookingResponse.data) {
        throw new Error("Failed to create booking");
      }

      const { booking, amount } = bookingResponse.data;

      // Create payment order
      const paymentOrder = await paymentService.createPaymentOrder(booking.id);

      if (!paymentOrder.data) {
        throw new Error("Failed to create payment order");
      }

      const orderData = paymentOrder.data;

      // Initiate Razorpay payment
      setBookingStep("payment");

      paymentService.initiatePayment({
        orderId: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId: orderData.keyId,
        bookingId: booking.id,
        userEmail: user?.email || "",
        userName: user?.name || "",
        onSuccess: () => {
          setBookingStep("success");
        },
        onFailure: (error) => {
          setBookingError(error.message || "Payment failed. Please try again.");
          setBookingStep("details");
        },
      });
    } catch (err: any) {
      setBookingError(
        err.response?.data?.message || "Failed to create booking",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const resetBooking = () => {
    setShowBookingModal(false);
    setBookingStep("select-slot");
    setSelectedSlot(null);
    setBookingForm({
      slotId: "",
      sessionMode: "VIDEO",
      purpose: "",
      shareProfile: false,
    });
    setBookingError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Mentor not found</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link
          href="/dashboard/explore-mentors"
          className="text-blue-600 hover:underline"
        >
          Back to Explore Mentors
        </Link>
      </div>
    );
  }

  const slots = mentor.mentorProfile?.slots || [];
  const groupedSlots = groupSlotsByDate(slots);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/explore-mentors"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Explore Mentors
      </Link>

      {/* Mentor Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {mentor.name?.charAt(0).toUpperCase() || "M"}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{mentor.name}</h1>
                {mentor.mentorProfile?.verifiedBadge && (
                  <span className="inline-flex items-center gap-1 text-sm text-green-600 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified Mentor
                  </span>
                )}
                <p className="text-gray-600">{mentor.email}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">
                  ₹{mentor.mentorProfile?.pricePerSession || 0}
                </p>
                <p className="text-sm text-gray-500">per session</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="font-semibold flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {mentor.mentorProfile?.rating?.toFixed(1) || "0.0"}
                </p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div>
                <p className="font-semibold">
                  {mentor.mentorProfile?.totalReviews || 0}
                </p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
              <div>
                <p className="font-semibold">{slots.length}</p>
                <p className="text-sm text-gray-500">Available Slots</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {mentor.mentorProfile?.bio || "No bio available."}
            </p>
          </div>

          {/* Expertise */}
          {mentor.mentorProfile?.expertise &&
            mentor.mentorProfile.expertise.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.mentorProfile.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Certifications */}
          {mentor.mentorProfile?.certifications &&
            mentor.mentorProfile.certifications.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Certifications</h2>
                <ul className="space-y-2">
                  {mentor.mentorProfile.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* Right Column - Booking */}
        <div className="space-y-6">
          {/* Book Session Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Book a Session</h2>

            {slots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">📅</p>
                <p>No available slots</p>
                <p className="text-sm mt-1">Check back later for new slots</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  {slots.length} slot{slots.length > 1 ? "s" : ""} available
                </p>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  View Available Slots
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {bookingStep === "select-slot" && "Select a Time Slot"}
                {bookingStep === "details" && "Session Details"}
                {bookingStep === "payment" && "Processing Payment..."}
                {bookingStep === "success" && "Booking Confirmed!"}
              </h2>
              <button
                onClick={resetBooking}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Step 1: Select Slot */}
              {bookingStep === "select-slot" && (
                <div className="space-y-4">
                  {Object.entries(groupedSlots).map(([date, dateSlots]) => (
                    <div key={date}>
                      <h3 className="font-medium text-gray-700 mb-2">{date}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {dateSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot)}
                            className="px-4 py-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-colors text-sm"
                          >
                            {new Date(slot.startTime).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                            {" - "}
                            {new Date(slot.endTime).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Booking Details */}
              {bookingStep === "details" && selectedSlot && (
                <div className="space-y-6">
                  {/* Selected Slot Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Selected Slot</p>
                    <p className="font-medium">
                      {new Date(selectedSlot.startTime).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                    <p className="text-gray-700">
                      {new Date(selectedSlot.startTime).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                      {" - "}
                      {new Date(selectedSlot.endTime).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>

                  {/* Session Mode */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Session Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["VIDEO", "AUDIO", "CHAT"] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() =>
                            setBookingForm((prev) => ({
                              ...prev,
                              sessionMode: mode,
                            }))
                          }
                          className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                            bookingForm.sessionMode === mode
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {mode === "VIDEO" && "📹 "}
                          {mode === "AUDIO" && "🎙️ "}
                          {mode === "CHAT" && "💬 "}
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Purpose / Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fill in Purpose <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={bookingForm.purpose}
                      onChange={(e) =>
                        setBookingForm((prev) => ({
                          ...prev,
                          purpose: e.target.value,
                        }))
                      }
                      placeholder="Describe what you'd like to discuss in this session. This helps the mentor prepare..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    />
                  </div>

                  {/* Share Profile Toggle */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        Share your profile with mentor
                      </p>
                      <p className="text-sm text-gray-600">
                        Allow the mentor to view your educational details and
                        CAT score
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setBookingForm((prev) => ({
                          ...prev,
                          shareProfile: !prev.shareProfile,
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors ${
                        bookingForm.shareProfile ? "bg-black" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform shadow ${
                          bookingForm.shareProfile
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Session Fee</span>
                      <span className="text-xl font-bold">
                        ₹{mentor.mentorProfile?.pricePerSession || 0}
                      </span>
                    </div>
                  </div>

                  {/* Error */}
                  {bookingError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {bookingError}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Payment Processing */}
              {bookingStep === "payment" && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                  <p className="text-gray-600">Opening payment gateway...</p>
                </div>
              )}

              {/* Step 4: Success */}
              {bookingStep === "success" && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your session has been booked successfully. You'll receive a
                    confirmation email shortly.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => router.push("/dashboard/bookings")}
                      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      View My Bookings
                    </button>
                    <button
                      onClick={resetBooking}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {bookingStep === "details" && (
              <div className="flex gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setBookingStep("select-slot")}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleBookingSubmit}
                  disabled={bookingLoading || !bookingForm.purpose.trim()}
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {bookingLoading
                    ? "Processing..."
                    : `Pay ₹${mentor.mentorProfile?.pricePerSession || 0}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
