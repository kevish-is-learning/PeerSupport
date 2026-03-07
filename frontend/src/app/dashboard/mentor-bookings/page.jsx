"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
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
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { useMentorStore } from "../../../stores/mentorStore";
import { api } from "../../../lib/api";
import { getInitials, formatDate, formatTime, formatCurrency } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";

export default function MentorBookingsPage() {
  const { bookings, bookingsLoading, fetchBookings } = useMentorStore();
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionDialog, setActionDialog] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBookings({});
  }, [fetchBookings]);

  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const pastBookings = bookings.filter(
    (b) =>
      b.status === "COMPLETED" || b.status === "CANCELLED" || b.status === "NO_SHOW"
  );

  const handleConfirm = async () => {
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      // Note: Backend automatically confirms bookings via payment
      // This is just a manual confirmation which should update meetingLink
      // Since there's no explicit confirm endpoint, we'll use complete for now
      toast.info("Bookings are auto-confirmed on payment. Use Complete to finish session.");
      setActionDialog(null);
      setSelectedBooking(null);
      setMeetingLink("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to confirm booking");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      await api.mentor.cancelBooking(selectedBooking.id, notes);
      toast.success("Booking cancelled");
      fetchBookings({});
      setActionDialog(null);
      setSelectedBooking(null);
      setNotes("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async () => {
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      await api.mentor.completeBooking(selectedBooking.id, { mentorNotes: notes });
      toast.success("Session marked as completed");
      fetchBookings({});
      setActionDialog(null);
      setSelectedBooking(null);
      setNotes("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to complete session");
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

  const BookingCard = ({ booking }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-14 w-14">
            <AvatarImage src={booking.mentee?.profilePicture} />
            <AvatarFallback>
              {getInitials(booking.mentee?.name || "U")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{booking.mentee?.name}</h3>
                <p className="text-sm text-gray-600">{booking.mentee?.email}</p>
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
                <span>
                  {booking.sessionMode === "VIDEO" ? "Video Call" : "In Person"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {booking.status === "PENDING" && (
              <>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setActionDialog("confirm");
                  }}
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setActionDialog("cancel");
                  }}
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </>
            )}
            {booking.status === "CONFIRMED" && (
              <>
                {booking.meetingLink && (
                  <a
                    href={booking.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Join
                    </Button>
                  </a>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setActionDialog("complete");
                  }}
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Complete
                </Button>
              </>
            )}
          </div>
        </div>

        {booking.notes && (
          <div className="mt-4 rounded-lg bg-muted p-3">
            <p className="text-sm text-gray-600">
              <MessageCircle className="mr-1 inline h-4 w-4" />
              <strong>Mentee Notes:</strong> {booking.notes}
            </p>
          </div>
        )}

        {booking.shareProfile && (
          <div className="mt-2 rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-700">
              <Eye className="mr-1 inline h-4 w-4" />
              Mentee has shared their profile with you
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-1 text-gray-600">
          Manage your mentorship session bookings
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{pendingBookings.length}</p>
              </div>
              <div className="rounded-lg bg-orange-100 p-2">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold">{confirmedBookings.length}</p>
              </div>
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">
                  {pastBookings.filter((b) => b.status === "COMPLETED").length}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({confirmedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {bookingsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No pending bookings
                </h3>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          {bookingsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : confirmedBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No confirmed bookings
                </h3>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {confirmedBookings.map((booking) => (
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
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No past bookings
                </h3>
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

      {/* Confirm Dialog */}
      <Dialog
        open={actionDialog === "confirm"}
        onOpenChange={() => setActionDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Add a meeting link for the video session (optional)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="meetingLink">Meeting Link</Label>
            <Input
              id="meetingLink"
              placeholder="https://meet.google.com/..."
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={submitting}>
              {submitting ? "Confirming..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog
        open={actionDialog === "cancel"}
        onOpenChange={() => setActionDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this booking?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="cancelNotes">Reason (optional)</Label>
            <Textarea
              id="cancelNotes"
              placeholder="Provide a reason for rejection..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={submitting}>
              {submitting ? "Rejecting..." : "Reject Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Dialog */}
      <Dialog
        open={actionDialog === "complete"}
        onOpenChange={() => setActionDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Session</DialogTitle>
            <DialogDescription>
              Mark this session as completed
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="completeNotes">Session Notes (optional)</Label>
            <Textarea
              id="completeNotes"
              placeholder="Add notes about the session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleComplete} disabled={submitting}>
              {submitting ? "Completing..." : "Mark as Completed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
