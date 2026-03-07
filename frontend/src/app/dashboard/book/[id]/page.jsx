"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Video, MapPin, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import { api } from "../../../../lib/api";
import { getInitials, formatCurrency, formatDate, formatTime } from "../../../../lib/utils";
import { Spinner } from "../../../../components/ui/spinner";
import { toast } from "sonner";

function BookingContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slotId = searchParams.get("slot");

  const [mentor, setMentor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sessionMode, setSessionMode] = useState("VIDEO");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorRes, slotsRes] = await Promise.all([
          api.mentee.getMentorById(params.id),
          api.mentee.getMentorSlots(params.id),
        ]);
        setMentor(mentorRes.data.mentor);
        setSlots(slotsRes.data.slots?.filter((s) => s.status === "AVAILABLE") || []);

        if (slotId) {
          const slot = slotsRes.data.slots?.find((s) => s.id === slotId);
          if (slot) setSelectedSlot(slot);
        }
      } catch (error) {
        toast.error("Failed to load booking data");
        router.push("/dashboard/mentors");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, slotId, router]);

  const handleBook = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    setBooking(true);
    try {
      const response = await api.mentee.createBooking({
        slotId: selectedSlot.id,
        mentorId: mentor.id,
        sessionMode,
        notes,
      });

      if (response.data.paymentUrl) {
        // Redirect to payment
        window.location.href = response.data.paymentUrl;
      } else {
        toast.success("Booking created successfully!");
        router.push("/dashboard/bookings");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!mentor) {
    return null;
  }

  const profile = mentor.mentorProfile;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back Button */}
      <Link href={`/dashboard/mentors/${mentor.id}`}>
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>
      </Link>

      <h1 className="text-2xl font-bold">Book a Session</h1>

      {/* Mentor Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mentor.profilePicture} />
              <AvatarFallback>{getInitials(mentor.name || "M")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{mentor.name}</h3>
              <p className="text-sm text-gray-600">
                {profile?.headline || "Expert Mentor"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">
                {formatCurrency(profile?.pricePerSession || 0)}
              </p>
              <p className="text-sm text-gray-600">
                {profile?.sessionDuration || 30} min
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Slot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Time Slot
          </CardTitle>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <div className="py-8 text-center">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-600">No available slots</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex items-center justify-between rounded-lg border p-4 text-left transition-colors ${
                    selectedSlot?.id === slot.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-gray-400"
                  }`}
                >
                  <div>
                    <p className="font-medium">{formatDate(slot.startTime)}</p>
                    <p className="text-sm text-gray-600">
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </p>
                  </div>
                  {selectedSlot?.id === slot.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Session Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setSessionMode("VIDEO")}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                sessionMode === "VIDEO"
                  ? "border-primary bg-primary/5"
                  : "hover:border-gray-400"
              }`}
            >
              <Video className="h-6 w-6" />
              <div>
                <p className="font-medium">Video Call</p>
                <p className="text-sm text-gray-600">Online video session</p>
              </div>
              {sessionMode === "VIDEO" && (
                <Check className="ml-auto h-5 w-5 text-primary" />
              )}
            </button>
            <button
              onClick={() => setSessionMode("IN_PERSON")}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                sessionMode === "IN_PERSON"
                  ? "border-primary bg-primary/5"
                  : "hover:border-gray-400"
              }`}
            >
              <MapPin className="h-6 w-6" />
              <div>
                <p className="font-medium">In Person</p>
                <p className="text-sm text-gray-600">Meet at a location</p>
              </div>
              {sessionMode === "IN_PERSON" && (
                <Check className="ml-auto h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Let the mentor know what you'd like to discuss..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Summary & Book */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold">
                {formatCurrency(profile?.pricePerSession || 0)}
              </p>
            </div>
            <Button
              size="lg"
              disabled={!selectedSlot || booking}
              onClick={handleBook}
            >
              {booking ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Spinner size="lg" /></div>}>
      <BookingContent />
    </Suspense>
  );
}
