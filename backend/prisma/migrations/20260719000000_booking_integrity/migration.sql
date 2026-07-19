-- Protect payment and booking state from duplicate callbacks and concurrent inserts.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "Payment"
  ADD CONSTRAINT "Payment_razorpayPaymentId_key" UNIQUE ("razorpayPaymentId");

ALTER TABLE "SessionAttendance"
  ADD COLUMN "mentorFinishedAt" TIMESTAMP(3),
  ADD COLUMN "menteeFinishedAt" TIMESTAMP(3);

ALTER TABLE "WalletTransaction"
  ADD COLUMN "idempotencyKey" TEXT;

CREATE UNIQUE INDEX "WalletTransaction_idempotencyKey_key"
  ON "WalletTransaction"("idempotencyKey");

ALTER TABLE "Booking"
  ADD CONSTRAINT "Booking_no_overlapping_active_slots"
  EXCLUDE USING gist (
    "mentorProfileId" WITH =,
    tsrange("startTime", "endTime", '[)') WITH &&
  ) WHERE (status IN ('PAYMENT_PENDING', 'CONFIRMED', 'IN_PROGRESS', 'RESCHEDULE_REQUESTED'));
