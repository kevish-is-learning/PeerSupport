import { prisma } from '../config/database.js';

/**
 * Booking Expiry Service
 *
 * Automatically expires PENDING bookings older than 10 minutes
 * whose payment has not been completed. This unblocks the slot
 * so other mentees can book it.
 *
 * DESIGN: Runs on a setInterval (every 2 minutes) inside the
 * Node process. For production at scale, replace with a proper
 * job queue (BullMQ / pg-boss).
 */

const EXPIRY_MINUTES = 10;
const CHECK_INTERVAL_MS = 2 * 60 * 1000; // every 2 minutes

let intervalId = null;

async function expireStaleBookings() {
  const cutoff = new Date(Date.now() - EXPIRY_MINUTES * 60 * 1000);

  try {
    // Find PENDING bookings older than 10 min with PENDING payment
    const staleBookings = await prisma.booking.findMany({
      where: {
        bookingStatus: 'PENDING',
        createdAt: { lt: cutoff },
        payment: {
          paymentStatus: { in: ['PENDING', 'FAILED'] },
        },
      },
      select: { id: true },
    });

    if (staleBookings.length === 0) return;

    const ids = staleBookings.map((b) => b.id);

    // Batch update: mark bookings as EXPIRED and payments as FAILED
    await prisma.$transaction([
      prisma.booking.updateMany({
        where: { id: { in: ids } },
        data: { bookingStatus: 'EXPIRED' },
      }),
      prisma.payment.updateMany({
        where: {
          bookingId: { in: ids },
          paymentStatus: { in: ['PENDING', 'FAILED'] },
        },
        data: { paymentStatus: 'FAILED' },
      }),
    ]);

    console.log(`🕐 Auto-expired ${ids.length} stale booking(s)`);
  } catch (error) {
    console.error('❌ Booking expiry job error:', error.message);
  }
}

export function startBookingExpiryJob() {
  if (intervalId) return; // already running

  // Run once immediately on startup
  expireStaleBookings();

  // Then schedule recurring checks
  intervalId = setInterval(expireStaleBookings, CHECK_INTERVAL_MS);

  console.log(
    `🕐 Booking expiry job started (every ${CHECK_INTERVAL_MS / 1000}s, expiry: ${EXPIRY_MINUTES}min)`
  );
}

export function stopBookingExpiryJob() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('🕐 Booking expiry job stopped');
  }
}
