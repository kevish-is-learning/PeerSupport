"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Star,
  MessageCircle,
  ExternalLink,
  X,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { useMenteeStore } from "../../../stores/menteeStore";
import { useAuthStore } from "../../stores/authStore";
import { api } from "../../../lib/api";
import { getInitials, formatDate, formatTime, formatCurrency } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";

export default function BookingsPage() {
  const user = useAuthStore((state) => state.user);
  const { bookings, bookingsLoading, fetchBookings } = useMenteeStore();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBookings({});
  }, [fetchBookings]);

  const upcomingBookings = bookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "PENDING"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED" || b.status === "NO_SHOW"
  );

  const handleCancel = async () => {
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      await api.mentee.cancelBooking(selectedBooking.id);
      toast.success("Booking cancelled successfully");
      fetchBookings({});
      setCancelDialog(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReview = async () => {
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      await api.mentee.submitReview(selectedBooking.id, {
        rating,
        comment,
      });
      toast.success("Review submitted successfully");
      fetchBookings({});
      setReviewDialog(false);
      setSelectedBooking(null);
      setRating(5);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: "secondary",
      CONFIRMED: "success",
      COMPLETED: "default",
      CANCELLED: "destructive",
      NO_SHOW: "warning",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const BookingCard = ({ booking }) => {
    const mentor = user?.role === "MENTOR" ? booking.mentee : booking.mentor;
    const isPast = ["COMPLETED", "CANCELLED", "NO_SHOW"].includes(booking.status);

    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-14 w-14">
              <AvatarImage src={mentor?.profilePicture} />
              <AvatarFallback>{getInitials(mentor?.name || "U")}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{mentor?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {user?.role === "MENTOR"
                      ? "Mentee"
                      : booking.mentor?.mentorProfile?.headline || "Mentor"}
                  </p>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(booking.slot?.startTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatTime(booking.slot?.startTime)} -{" "}
                    {formatTime(booking.slot?.endTime)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {booking.sessionMode === "VIDEO" ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span>{booking.sessionMode === "VIDEO" ? "Video Call" : "In Person"}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {booking.status === "CONFIRMED" && booking.meetingLink && (
                <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Join
                  </Button>
                </a>
              )}
              {booking.status === "PENDING" && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setCancelDialog(true);
                  }}
                >
                  Cancel
                </Button>
              )}
              {booking.status === "CONFIRMED" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setCancelDialog(true);
                  }}
                >
                  Cancel
                </Button>
              )}
              {booking.status === "COMPLETED" && !booking.review && user?.role !== "MENTOR" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setReviewDialog(true);
                  }}
                >
                  <Star className="h-4 w-4" />
                  Review
                </Button>
              )}
              {booking.status === "COMPLETED" && booking.review && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {booking.review.rating}
                </Badge>
              )}
            </div>
          </div>

          {booking.notes && (
            <div className="mt-4 rounded-lg bg-muted p-3">
              <p className="text-sm text-gray-600">
                <MessageCircle className="mr-1 inline h-4 w-4" />
                {booking.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-1 text-gray-600">Manage your mentorship sessions</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {bookingsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No upcoming sessions
                </h3>
                <p className="mt-2 text-gray-600">
                  Book a session with a mentor to get started
                </p>
                <Link href="/dashboard/mentors">
                  <Button className="mt-4">Find Mentors</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {bookingsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : pastBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No past sessions
                </h3>
                <p className="mt-2 text-gray-600">
                  Your completed sessions will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(false)}>
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={submitting}
            >
              {submitting ? "Cancelling..." : "Cancel Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
            <DialogDescription>
              Share your experience with {selectedBooking?.mentor?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Rating</Label>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReview} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
