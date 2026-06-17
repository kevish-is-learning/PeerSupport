"use client";

import { useState, useEffect } from "react";
import { v2Api, paymentApi, authApi } from "../../../lib/api";
import { toast } from "sonner";
import {
  Loader2, Check, ArrowLeft, ArrowRight, X,
  MessageSquare, FileText, Phone, Mail, IndianRupee,
  Calendar, Clock, Video, CheckCircle, AlertCircle,
} from "lucide-react";

function formatSlotTime(iso) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

function formatDate(date) {
  return date?.toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short",
  });
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ current }) {
  const steps = ["Session Details", "Your Information", "Payment"];
  return (
    <div className="flex items-center justify-center gap-0 py-6 px-4 bg-white border-2 border-black rounded-2xl shadow-[5px_5px_0px_0px_#FDBA74] ">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = current > stepNum;
        const active = current === stepNum;
        return (
          <div key={i} className="flex items-center">
            {i > 0 && (
              <div className={`h-[3px] w-12 sm:w-16 mx-1 rounded-full transition-colors ${done ? "bg-[#22C55E]" : "bg-gray-300"}`} />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] text-sm font-bold transition-all ${
                done ? "border-[#22C55E] bg-[#22C55E] text-white"
                : active ? "border-[#F59E0B] bg-[#F59E0B] text-white shadow-md"
                : "border-gray-300 bg-white text-gray-400"
              }`}>
                {done ? <Check size={16} /> : stepNum}
              </div>
              <span className={`text-[10px] font-bold ${
                done ? "text-[#22C55E]" : active ? "text-[#F59E0B]" : "text-gray-400"
              }`}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Session Summary Card ────────────────────────────────────────────────────

function SessionSummary({ service, date, slot }) {
  return (
    <div className="rounded-2xl border-2 border-[#d1e7ff] p-5"
      style={{ background: "linear-gradient(135deg, #EEF0FF, #F0F9FF)" }}>
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle size={18} className="text-[#22C55E]" />
        <span className="text-sm font-bold text-gray-700">Your Selected Session Details</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Service", value: service?.label || service?.title || service?.serviceName, sub: `${service?.durationMinutes || 60} min` },
          { label: "Date", value: formatDate(date) },
          { label: "Time", value: formatSlotTime(slot?.startTime) },
        ].map((item, i) => (
          <div key={i} className="rounded-xl border-2 border-gray-200 bg-white p-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</p>
            <p className="text-sm font-bold text-gray-900 mt-1">{item.value}</p>
            {item.sub && <p className="text-xs text-[#22C55E] font-bold mt-0.5">{item.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Session Details ─────────────────────────────────────────────────

function Step1({ form, setForm }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-extrabold text-gray-900">Session Details</h3>
      <div>
        <label className="text-sm font-bold text-gray-800">
          What would you like to discuss? <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-2">
          <MessageSquare size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <textarea
            value={form.discussionTopic}
            onChange={(e) => setForm({ ...form, discussionTopic: e.target.value })}
            placeholder="Briefly describe what you'd like to cover in this session..."
            rows={4}
            className="w-full rounded-xl border-2 border-gray-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-[#5061E4] focus:outline-none resize-none transition-colors"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{form.discussionTopic.length}/1000</p>
      </div>
      <div>
        <label className="text-sm font-bold text-gray-800">Specific Questions (Optional)</label>
        <div className="relative mt-2">
          <FileText size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <textarea
            value={form.specificQuestions}
            onChange={(e) => setForm({ ...form, specificQuestions: e.target.value })}
            placeholder="Any specific questions you'd like the mentor to prepare for?"
            rows={3}
            className="w-full rounded-xl border-2 border-gray-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-[#5061E4] focus:outline-none resize-none transition-colors"
          />
        </div>
      </div>
      <div className="rounded-xl border-2 border-[#FBBF24]/30 bg-[#FFFBEB] p-4">
        <p className="text-sm font-bold text-[#92400E]">💡 Ask mentor to check previous session feedback</p>
        <p className="text-xs text-[#92400E]/70 mt-1">The mentor will review your past session notes before this meeting for better continuity.</p>
      </div>
    </div>
  );
}

// ─── Step 2: Your Information ────────────────────────────────────────────────

function Step2({ form, setForm, service, date, slot }) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-extrabold text-gray-900">Your Information</h3>
      <div>
        <label className="text-sm font-bold text-gray-800">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-2">
          <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            value={form.menteeEmail}
            readOnly
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-500 cursor-not-allowed"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Session confirmation and meeting link will be sent here</p>
      </div>
      <div>
        <label className="text-sm font-bold text-gray-800">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-2">
          <Phone size={16} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="tel"
            value={form.menteePhone}
            onChange={(e) => setForm({ ...form, menteePhone: e.target.value.replace(/[^0-9+\s-]/g, "") })}
            maxLength={10}
            minLength={10}
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-xl border-2 border-gray-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-[#5061E4] focus:outline-none transition-colors"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">For session reminders and updates</p>
      </div>
      {/* Session Summary */}
      <div className="rounded-xl border-2 border-gray-200 bg-[#FFF7F5] p-4 space-y-2">
        <p className="text-sm font-extrabold text-gray-900">Session Summary</p>
        {[
          ["Service:", service?.label || service?.title || service?.serviceName],
          ["Date & Time:", `${formatDate(date)} at ${formatSlotTime(slot?.startTime)}`],
          ["Duration:", `${service?.durationMinutes || 60} min`],
        ].map(([k, v], i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-500">{k}</span>
            <span className="font-bold text-gray-900">{v}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
        <Video size={16} className="text-blue-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold text-blue-900">Video Call Platform</p>
          <p className="text-xs text-blue-700">The session will be conducted via Google Meet. A meeting link will be sent to your email before the scheduled time.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Payment ─────────────────────────────────────────────────────────

function Step3({ service, date, slot, mentor, agreedToTerms, setAgreedToTerms }) {
  const price = service?.price || 0;
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-extrabold text-gray-900">Payment Details</h3>
      {/* Price Breakdown - service charge only */}
      <div className="rounded-xl border-2 border-gray-200 bg-white p-5 space-y-3">
        <p className="text-base font-extrabold text-gray-900">Price Breakdown</p>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{service?.label || service?.title || service?.serviceName} ({service?.durationMinutes || 60} min)</span>
          <span className="font-bold">₹{price}</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-base">
          <span className="font-extrabold text-gray-900">Total Amount</span>
          <span className="font-extrabold text-[#22C55E]">₹{price}</span>
        </div>
      </div>
      {/* Session Confirmation */}
      <div className="rounded-xl border-2 border-gray-200 bg-[#FFF7F5] p-5 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={16} className="text-gray-600" />
          <span className="text-sm font-extrabold text-gray-900">Session Confirmation</span>
        </div>
        {[
          ["Mentor:", mentor?.name || "Mentor"],
          ["Service:", service?.label || service?.title || service?.serviceName],
          ["Date:", formatDate(date)],
          ["Time:", formatSlotTime(slot?.startTime)],
        ].map(([k, v], i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-500">{k}</span>
            <span className="font-bold text-gray-900">{v}</span>
          </div>
        ))}
      </div>
      {/* Cancellation Policy */}
      <div className="rounded-xl border-2 border-[#FBBF24]/30 bg-[#FFFBEB] p-4">
        <p className="text-xs text-[#92400E]"><strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before the session. Cancellations made within 24 hours will incur a 50% charge. No refunds for no-shows.</p>
      </div>
      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer rounded-xl border-2 border-gray-200 p-4 hover:bg-gray-50 transition-colors">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded accent-[#5061E4]"
        />
        <span className="text-sm text-gray-600">I agree to the <span className="text-[#5061E4] font-bold">terms and conditions</span> and the <span className="text-[#5061E4] font-bold">cancellation policy</span></span>
      </label>
    </div>
  );
}

// ─── Success Modal ───────────────────────────────────────────────────────────

function SuccessModal({ booking, mentor, service, onClose }) {
  const amount = booking?.payment?.amount || service?.price || 0;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border-[3px] border-black bg-white p-8 mx-4 relative"
        style={{ boxShadow: "8px 8px 0 0 #22C55E" }}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100">
          <X size={18} />
        </button>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#22C55E] bg-[#DCFCE7]">
            <CheckCircle size={40} className="text-[#22C55E]" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-sm text-gray-500">Your session has been booked successfully. A confirmation email with the meeting link will be sent to you shortly.</p>
        </div>
        <div className="mt-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 space-y-2">
          {[
            ["Session with:", mentor?.name || "Mentor"],
            ["Date & Time:", `${booking?.startTime ? new Date(booking.startTime).toLocaleDateString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit" }) : ""} at ${booking?.startTime ? formatSlotTime(booking.startTime) : ""}`],
            ["Amount Paid:", `₹${amount}`],
          ].map(([k, v], i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-500">{k}</span>
              <span className={`font-bold ${i === 2 ? "text-[#22C55E]" : "text-gray-900"}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          <a href="/mentee/dashboard"
            className="block w-full rounded-xl border-[3px] border-black bg-[#22C55E] py-3 text-center text-sm font-bold text-white"
            style={{ boxShadow: "4px 4px 0 0 #000" }}>
            Go to Dashboard
          </a>
          <a href="/mentee/sessions"
            className="block w-full rounded-xl border-[3px] border-black bg-white py-3 text-center text-sm font-bold text-gray-900"
            style={{ boxShadow: "4px 4px 0 0 #d1d5db" }}>
            View My Sessions
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Wizard ─────────────────────────────────────────────────────────────

export default function BookingWizard({ mentor, service, date, slot, onBack, onBookingComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [form, setForm] = useState({
    discussionTopic: "",
    specificQuestions: "",
    menteeEmail: "",
    menteePhone: "",
  });

  // Load user email on mount
  useEffect(() => {
    authApi.me().then((res) => {
      const user = res?.data?.user || res?.data;
      if (user?.email) setForm((f) => ({ ...f, menteeEmail: user.email }));
    }).catch(() => {});
  }, []);

  const validateStep = () => {
    if (step === 1) {
      if (form.discussionTopic.trim().length < 10) {
        toast.error("Please describe what you want to discuss (min 10 characters)");
        return false;
      }
    }
    if (step === 2) {
      if (!form.menteePhone || form.menteePhone.replace(/[\s-+]/g, "").length < 10) {
        toast.error("Please enter a valid phone number");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const handlePay = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      const res = await v2Api.createBooking({
        mentorProfileId: mentor?.id,
        mentorServiceId: service?.id || service?.serviceId,
        startTime: slot.startTime,
        endTime: slot.endTime,
        discussionTopic: form.discussionTopic,
        specificQuestions: form.specificQuestions || undefined,
        menteePhone: form.menteePhone,
        menteeEmail: form.menteeEmail,
        purposeOfCall: form.discussionTopic,
      });

      const { booking, order } = res?.data || {};
      if (!booking?.id || !order?.orderId) throw new Error("Failed to initiate booking");

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Peer Support",
        description: service?.label || service?.title || service?.serviceName || "Session",
        order_id: order.orderId,
        prefill: { ...order.prefill, contact: form.menteePhone },
        theme: { color: "#22C55E" },
        handler: async (response) => {
          try {
            await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id,
            });
            setSuccessData(booking);
            toast.success("Payment successful! 🎉");
          } catch {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        modal: {
          ondismiss: async () => {
            await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: booking.id }).catch(() => {});
            toast.error("Payment cancelled. Slot released.");
          },
        },
      };

      if (window?.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (r) => {
          await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: booking.id }).catch(() => {});
          toast.error(r.error?.description || "Payment failed. Slot released.");
        });
        rzp.open();
      } else {
        toast.error("Payment gateway not loaded. Refresh the page.");
      }
    } catch (e) {
      if (e.status === 409) {
        toast.error("Slot just booked by someone else. Please go back and choose another.");
      } else {
        toast.error(e.message || "Booking failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return <SuccessModal booking={successData} mentor={mentor} service={service} onClose={() => onBookingComplete?.()} />;
  }

  return (
    <div className="space-y-6">
      {/* Mentor Card */}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-4"
        style={{ background: "linear-gradient(90deg, #f8f9fa, #fff)" }}>
        {mentor?.profilePicture ? (
          <img src={mentor.profilePicture} alt={mentor.name} className="h-12 w-12 rounded-full border-2 border-black object-cover" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#5061E4] text-white font-bold text-lg">
            {(mentor?.name || "M")[0]}
          </div>
        )}
        <div>
          <h3 className="text-base font-extrabold text-gray-900">{mentor?.name || "Mentor"}</h3>
          <p className="text-xs text-gray-500">{mentor?.bio?.substring(0, 60) || "Expert Mentor"}</p>
        </div>
      </div>

      <SessionSummary service={service} date={date} slot={slot} />
      <StepIndicator current={step} />

      {/* Step Content */}
      <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#5061E4]">
        {step === 1 && <Step1 form={form} setForm={setForm} />}
        {step === 2 && <Step2 form={form} setForm={setForm} service={service} date={date} slot={slot} />}
        {step === 3 && <Step3 service={service} date={date} slot={slot} mentor={mentor} agreedToTerms={agreedToTerms} setAgreedToTerms={setAgreedToTerms} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={step === 1 ? onBack : () => setStep((s) => s - 1)}
          className="flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-5 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors"
          style={{ boxShadow: "3px 3px 0 0 #d1d5db" }}>
          <ArrowLeft size={14} /> Previous
        </button>

        {step < 3 ? (
          <button onClick={handleNext}
            className="flex items-center gap-2 rounded-full border-[3px] border-black bg-[#0D9488] px-6 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5 transition-all"
            style={{ boxShadow: "3px 3px 0 0 #000" }}>
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button onClick={handlePay} disabled={loading || !agreedToTerms}
            className="flex items-center gap-2 rounded-full border-[3px] border-black bg-[#22C55E] px-6 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: "3px 3px 0 0 #000" }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <IndianRupee size={14} />}
            {loading ? "Processing..." : `Pay ₹${service?.price || 0}`}
          </button>
        )}
      </div>
    </div>
  );
}
