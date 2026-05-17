"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle, Calendar, Clock, Mail, Phone, Video, X } from "lucide-react";
import { publicMentorApi, bookingApi, paymentApi, resolveUploadUrl } from "../../../../../lib/api";
import useAuthStore from "../../../../../store/useAuthStore";

const PLATFORM_FEE_PCT = 10;
const GST_PCT = 18;

function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${String(h > 12 ? h - 12 : h || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
}

/* ── Stepper ── */
function Stepper({ step }) {
  const steps = ["Session Details", "Your Information", "Payment"];
  return (
    <div className="rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#F59E0B]">
      <div className="flex items-center justify-between">
        {steps.map((label, i) => {
          const num = i + 1;
          const done = step > num;
          const active = step === num;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              {i > 0 && <div className={`h-0.5 flex-1 ${done ? "bg-[#F59E0B]" : "bg-gray-200"}`} />}
              <div className="flex flex-col items-center gap-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  done ? "border-[#22C55E] bg-[#22C55E] text-white" : active ? "border-[#F59E0B] bg-[#F59E0B] text-white" : "border-gray-300 bg-white text-gray-400"
                }`}>
                  {done ? <CheckCircle className="h-4 w-4" /> : num}
                </div>
                <span className={`text-[10px] font-bold ${active || done ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Success Modal ── */
function SuccessModal({ mentor, serviceLabel, dateLabel, slotTime, amount, onClose, router }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#22C55E] text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#22C55E] bg-[#DCFCE7]">
          <CheckCircle className="h-8 w-8 text-[#22C55E]" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-sm text-gray-500">Your session has been booked successfully. A confirmation email with the meeting link will be sent to you shortly.</p>
        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left text-sm space-y-2">
          <div className="flex justify-between"><span className="text-gray-500">Session with:</span><span className="font-bold text-gray-900">{mentor?.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Date & Time:</span><span className="font-bold text-gray-900">{dateLabel} at {formatTime(slotTime)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Amount Paid:</span><span className="font-bold text-[#22C55E]">₹{Math.round(amount)}</span></div>
        </div>
        <button onClick={() => router.push("/mentee/dashboard")} className="mt-5 w-full rounded-xl border-2 border-black bg-[#8B5CF6] py-3 text-sm font-extrabold text-white shadow-[3px_3px_0px_0px_#5B21B6] transition hover:-translate-y-0.5">Go to Dashboard</button>
        <button onClick={() => router.push("/mentee/sessions")} className="mt-3 w-full rounded-xl border-2 border-black bg-white py-3 text-sm font-extrabold text-gray-900 shadow-[3px_3px_0px_0px_#1E1E1E] transition hover:-translate-y-0.5">View My Sessions</button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function BookSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sp = useSearchParams();
  const { user } = useAuthStore();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [checkFeedback, setCheckFeedback] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Form data
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // From URL params
  const serviceId = sp.get("serviceId") || "";
  const serviceLabel = sp.get("serviceLabel") || "";
  const serviceType = sp.get("serviceType") || "";
  const price = Number(sp.get("price") || 0);
  const duration = Number(sp.get("duration") || 60);
  const date = sp.get("date") || "";
  const dateLabel = sp.get("dateLabel") || "";
  const slotId = sp.get("slotId") || "";
  const slotTime = sp.get("slotTime") || "";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await publicMentorApi.getMentorProfile(params.mentorId);
        if (!cancelled) setMentor(res.data);
      } catch { if (!cancelled) toast.error("Failed to load"); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [params.mentorId]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    const pf = price * (PLATFORM_FEE_PCT / 100);
    const gst = (price + pf) * (GST_PCT / 100);
    setTotalAmount(price + pf + gst);
  }, [price]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#FAF9F7]"><div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B5CF6]" /></div>;
  if (!mentor || !serviceId) { router.push(`/mentee/find-mentors/${params.mentorId}`); return null; }

  const handlePay = async () => {
    if (!agreedTerms) { toast.error("Please agree to terms"); return; }
    if (!user) { router.push("/auth?mode=login"); return; }
    setSubmitting(true);
    try {
      // 1. Single call: creates PENDING booking + payment + Razorpay order
      const res = await bookingApi.initiate({
        mentorProfileId: mentor.id,
        mentorServiceId: serviceId,
        availabilitySlotId: slotId,
        scheduledDate: date,
        sessionType: "ONE_ON_ONE",
        purposeOfCall: purpose || undefined,
        notes: notes || undefined,
      });
      const { booking, order } = res.data;
      if (!booking?.id || !order?.orderId) throw new Error("Failed to initiate booking");

      // 2. Open Razorpay checkout — slot is held from this moment
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Peer Support",
        description: `${serviceLabel} with ${mentor.name}`,
        order_id: order.orderId,
        prefill: { ...order.prefill, contact: phone || undefined },
        theme: { color: "#8B5CF6" },
        handler: async (response) => {
          // Payment success → verify & confirm the booking
          try {
            await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id,
            });
            setShowSuccess(true);
          } catch { toast.error("Payment verification failed"); }
        },
        modal: {
          ondismiss: async () => {
            // User dismissed → release the slot immediately
            await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: booking.id }).catch(() => {});
            toast.error("Payment cancelled. The slot has been released.");
          },
        },
      };
      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (r) => {
          // Payment failed → release the slot immediately
          await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: booking.id }).catch(() => {});
          toast.error(r.error?.description || "Payment failed. The slot has been released.");
        });
        rzp.open();
      } else { toast.error("Payment gateway not loaded. Please refresh."); }
    } catch (err) { toast.error(err.message || "Booking failed"); }
    finally { setSubmitting(false); }
  };

  const canGoStep2 = purpose.trim().length >= 10;
  const canGoStep3 = email.trim().length > 0 && phone.trim().length >= 10;
  const pfAmt = price * (PLATFORM_FEE_PCT / 100);
  const gstAmt = (price + pfAmt) * (GST_PCT / 100);

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      {showSuccess && <SuccessModal mentor={mentor} serviceLabel={serviceLabel} dateLabel={dateLabel} slotTime={slotTime} amount={totalAmount} onClose={() => router.push("/mentee/sessions")} router={router} />}

      <div className="min-h-screen bg-[#FAF9F7] font-sans">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          {/* Back */}
          <Link href={`/mentee/find-mentors/${params.mentorId}`} className="mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:shadow-[4px_4px_0px_0px_#1E1E1E] no-underline">
            <ArrowLeft className="h-4 w-4" /> Back to Profile
          </Link>

          <h1 className="text-3xl font-black text-gray-900">Book a Session</h1>
          <p className="mt-1 text-sm text-gray-500">Schedule your mentoring session with {mentor.name}</p>

          {/* Mentor mini card */}
          <div className="mt-5 flex items-center gap-4 rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#8B5CF6]">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 border-black bg-[#F3E8FF]">
              {mentor.profilePicture ? <img src={resolveUploadUrl(mentor.profilePicture)} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-black text-[#8B5CF6]">{mentor.name?.charAt(0)}</div>}
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900">{mentor.name}</h3>
              <p className="text-xs font-semibold text-[#8B5CF6]">{mentor.expertiseTags?.slice(0,2).join(" & ") || "Consulting & Strategy"}</p>
            </div>
          </div>

          {/* Selected session summary */}
          <div className="mt-4 rounded-2xl border-2 border-black bg-[#FFFBEB] p-4 shadow-[4px_4px_0px_0px_#F59E0B]">
            <div className="flex items-center gap-2 mb-3"><CheckCircle className="h-4 w-4 text-[#F59E0B]" /><span className="text-sm font-extrabold text-gray-900">Your Selected Session Details</span></div>
            <p className="text-xs text-gray-500 mb-3">Review your selections below and continue filling in additional details</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-200 bg-white p-3"><p className="text-[10px] font-semibold text-gray-400">Service</p><p className="text-sm font-bold text-gray-900">{serviceLabel}</p><p className="text-xs text-[#22C55E] font-semibold">{duration >= 60 ? `${duration/60} hour` : `${duration} min`}</p></div>
              <div className="rounded-xl border border-gray-200 bg-white p-3"><p className="text-[10px] font-semibold text-gray-400">Date</p><p className="text-sm font-bold text-gray-900">{dateLabel}</p></div>
              <div className="rounded-xl border border-gray-200 bg-white p-3"><p className="text-[10px] font-semibold text-gray-400">Time</p><p className="text-sm font-bold text-gray-900">{formatTime(slotTime)}</p></div>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-5"><Stepper step={step} /></div>

          {/* ── Step 1: Session Details ── */}
          {step === 1 && (
            <div className="mt-5 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#06B6D4]">
              <h2 className="text-lg font-black text-gray-900 mb-5">Session Details</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">What would you like to discuss? *</label>
                  <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={4} placeholder="Briefly describe what you'd like to cover in this session..." className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#8B5CF6] focus:outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Specific Questions (Optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Any specific questions you'd like the mentor to prepare for?" className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#8B5CF6] focus:outline-none resize-none" />
                </div>
                <label className="flex items-start gap-3 rounded-xl bg-[#FFF7ED] border border-[#FDBA74] p-4 cursor-pointer">
                  <input type="checkbox" checked={checkFeedback} onChange={(e) => setCheckFeedback(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#F59E0B]" />
                  <div><p className="text-sm font-bold text-gray-900">Ask mentor to check previous session feedback</p><p className="text-xs text-gray-500">The mentor will review your past session notes before this meeting for better continuity</p></div>
                </label>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <button disabled className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-300"><ArrowLeft className="h-4 w-4" /> Previous</button>
                <button onClick={() => { if (canGoStep2) setStep(2); else toast.error("Please describe your discussion topic (min 10 chars)"); }} className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#06B6D4] px-6 py-2.5 text-sm font-extrabold text-white shadow-[3px_3px_0px_0px_#0E7490] transition hover:-translate-y-0.5">Continue <ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          )}

          {/* ── Step 2: Your Information ── */}
          {step === 2 && (
            <div className="mt-5 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#06B6D4]">
              <h2 className="text-lg font-black text-gray-900 mb-5">Your Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Email Address *</label>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3"><Mail className="h-4 w-4 text-gray-400 shrink-0" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none" /></div>
                  <p className="mt-1 text-xs text-gray-400">Session confirmation and meeting link will be sent here</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number *</label>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3"><Phone className="h-4 w-4 text-gray-400 shrink-0" /><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} minLength={10} placeholder="+91 XXXXX XXXXX" className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none" /></div>
                  <p className="mt-1 text-xs text-gray-400">For session reminders and updates</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm space-y-2">
                  <h4 className="font-bold text-gray-900">Session Summary</h4>
                  <div className="flex justify-between"><span className="text-gray-500">Service:</span><span className="font-bold">{serviceLabel}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Date & Time:</span><span className="font-bold">{dateLabel} at {formatTime(slotTime)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Duration:</span><span className="font-bold">{duration >= 60 ? `${duration/60} hour` : `${duration} min`}</span></div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#EFF6FF] border border-[#93C5FD] p-4">
                  <Video className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div><p className="text-sm font-bold text-gray-900">Video Call Platform</p><p className="text-xs text-gray-500">The session will be conducted via Google Meet. A meeting link will be sent to your email before the scheduled time.</p></div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E]"><ArrowLeft className="h-4 w-4" /> Previous</button>
                <button onClick={() => { if (canGoStep3) setStep(3); else toast.error("Please fill email and phone number"); }} className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#06B6D4] px-6 py-2.5 text-sm font-extrabold text-white shadow-[3px_3px_0px_0px_#0E7490] transition hover:-translate-y-0.5">Continue <ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          )}

          {/* ── Step 3: Payment ── */}
          {step === 3 && (
            <div className="mt-5 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#06B6D4]">
              <h2 className="text-lg font-black text-gray-900 mb-5">Payment Details</h2>
              <div className="space-y-5">
                {/* Price breakdown */}
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm space-y-3">
                  <h4 className="font-bold text-gray-900">Price Breakdown</h4>
                  <div className="flex justify-between"><span className="text-gray-600">{serviceLabel} ({duration >= 60 ? `${duration/60} hour` : `${duration} min`})</span><span className="font-bold">₹{Math.round(price)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Platform Fee ({PLATFORM_FEE_PCT}%)</span><span className="font-bold">₹{Math.round(pfAmt)}</span></div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-bold text-gray-900">Total Amount</span><span className="font-black text-[#22C55E]">₹{Math.round(totalAmount)}</span></div>
                </div>
                {/* Confirmation */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm space-y-2">
                  <h4 className="flex items-center gap-2 font-bold text-gray-900"><Calendar className="h-4 w-4" /> Session Confirmation</h4>
                  <div className="flex justify-between"><span className="text-gray-500">Mentor:</span><span className="font-bold">{mentor.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Service:</span><span className="font-bold">{serviceLabel}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-bold">{dateLabel}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Time:</span><span className="font-bold">{formatTime(slotTime)}</span></div>
                </div>
                {/* Cancellation Policy */}
                <div className="rounded-xl bg-[#FFF7ED] border border-[#FDBA74] p-4">
                  <p className="text-xs text-gray-700"><span className="font-bold text-gray-900">Cancellation Policy:</span> Free cancellation up to 24 hours before the session. Cancellations made within 24 hours will incur a 50% charge. No refunds for no-shows.</p>
                </div>
                {/* Terms */}
                <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer">
                  <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} className="h-4 w-4 accent-[#8B5CF6]" />
                  <span className="text-sm text-gray-600">I agree to the <span className="font-bold text-[#8B5CF6]">terms and conditions</span> and the <span className="font-bold text-[#8B5CF6]">cancellation policy</span></span>
                </label>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-5 py-2.5 text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E]"><ArrowLeft className="h-4 w-4" /> Previous</button>
                <button onClick={handlePay} disabled={submitting || !agreedTerms} className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#22C55E] px-6 py-2.5 text-sm font-extrabold text-white shadow-[3px_3px_0px_0px_#166534] transition hover:-translate-y-0.5 disabled:opacity-50">
                  ₹ Pay ₹{Math.round(totalAmount)}
                </button>
              </div>
            </div>
          )}

          <div className="h-12" />
        </div>
      </div>
    </>
  );
}
