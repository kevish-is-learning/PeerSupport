"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useMentorStore } from "../../../stores/mentorStore";
import { api } from "../../../lib/api";
import { formatDate, formatTime } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";

export default function SlotsPage() {
  const { slots, slotsLoading, fetchSlots } = useMentorStore();
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Form state
  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringWeeks, setRecurringWeeks] = useState(4);

  useEffect(() => {
    fetchSlots({});
  }, [fetchSlots]);

  const getWeekDays = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getSlotsForDay = (date) => {
    return slots.filter((slot) => {
      const slotDate = new Date(slot.startTime);
      return slotDate.toDateString() === date.toDateString();
    });
  };

  const handleCreateSlot = async () => {
    if (!slotDate || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const startDateTime = new Date(`${slotDate}T${startTime}`);
      const endDateTime = new Date(`${slotDate}T${endTime}`);

      await api.mentor.createSlots([{
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        isRecurring,
        recurringWeeks: isRecurring ? recurringWeeks : undefined,
      }]);

      toast.success("Slot created successfully");
      fetchSlots({});
      setCreateDialog(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create slot");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSlot = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    try {
      await api.mentor.deleteSlot(selectedSlot.id);
      toast.success("Slot deleted successfully");
      fetchSlots({});
      setDeleteDialog(false);
      setSelectedSlot(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete slot");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSlotDate("");
    setStartTime("");
    setEndTime("");
    setIsRecurring(false);
    setRecurringWeeks(4);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 border-green-300 text-green-800";
      case "BOOKED":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "COMPLETED":
        return "bg-gray-100 border-gray-300 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Slots</h1>
          <p className="mt-1 text-gray-600">
            Create and manage your availability for mentee bookings
          </p>
        </div>
        <Button onClick={() => setCreateDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Slot
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const prev = new Date(currentWeek);
                prev.setDate(prev.getDate() - 7);
                setCurrentWeek(prev);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <h3 className="font-semibold">
                {weekDays[0].toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {weekDays[6].toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const next = new Date(currentWeek);
                next.setDate(next.getDate() + 7);
                setCurrentWeek(next);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      {slotsLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {weekDays.map((day) => {
            const daySlots = getSlotsForDay(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isPast = day < new Date() && !isToday;

            return (
              <Card
                key={day.toISOString()}
                className={`${isPast ? "opacity-50" : ""} ${
                  isToday ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardHeader className="p-3 pb-2">
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-500">
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        isToday ? "text-primary" : ""
                      }`}
                    >
                      {day.getDate()}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {daySlots.length === 0 ? (
                    <p className="text-center text-xs text-gray-400">
                      No slots
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {daySlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`rounded-lg border p-2 text-center text-xs ${getStatusColor(
                            slot.status
                          )}`}
                        >
                          <p className="font-medium">
                            {formatTime(slot.startTime)}
                          </p>
                          <p className="text-xs opacity-75">
                            {formatTime(slot.endTime)}
                          </p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {slot.status}
                          </Badge>
                          {slot.status === "AVAILABLE" && !isPast && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-6 w-6 p-0"
                              onClick={() => {
                                setSelectedSlot(slot);
                                setDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Slot List */}
      <Card>
        <CardHeader>
          <CardTitle>All Slots</CardTitle>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <div className="py-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-600">No slots created yet</p>
              <Button
                className="mt-4"
                onClick={() => setCreateDialog(true)}
              >
                Create Your First Slot
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{formatDate(slot.startTime)}</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        slot.status === "AVAILABLE"
                          ? "success"
                          : slot.status === "BOOKED"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {slot.status}
                    </Badge>
                    {slot.status === "AVAILABLE" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSlot(slot);
                          setDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Slot Dialog */}
      <Dialog open={createDialog} onOpenChange={setCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="recurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="recurring">Repeat weekly</Label>
            </div>
            {isRecurring && (
              <div>
                <Label htmlFor="weeks">Number of weeks</Label>
                <Input
                  id="weeks"
                  type="number"
                  min={1}
                  max={12}
                  value={recurringWeeks}
                  onChange={(e) => setRecurringWeeks(parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSlot} disabled={submitting}>
              {submitting ? "Creating..." : "Create Slot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Slot</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete this slot? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSlot}
              disabled={submitting}
            >
              {submitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
