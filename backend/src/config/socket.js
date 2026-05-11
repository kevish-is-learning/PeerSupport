/**
 * Socket.io Server Configuration
 *
 * On booking CONFIRMED or CANCELLED, emits to room `mentor:{mentorId}`:
 * { event: 'slot-update', startTime, endTime, serviceId, action: 'taken'|'released' }
 *
 * Frontend joins the room when viewing a mentor's availability.
 */

import { Server } from 'socket.io';

let io = null;

/**
 * Initialize Socket.io on an HTTP server.
 *
 * @param {import('http').Server} httpServer
 * @returns {Server}
 */
export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // Client joins a mentor's room to receive real-time slot updates
    socket.on('join-mentor-room', (mentorProfileId) => {
      if (mentorProfileId) {
        const room = `mentor:${mentorProfileId}`;
        socket.join(room);
        console.log(`  → ${socket.id} joined ${room}`);
      }
    });

    // Client leaves a mentor's room
    socket.on('leave-mentor-room', (mentorProfileId) => {
      if (mentorProfileId) {
        const room = `mentor:${mentorProfileId}`;
        socket.leave(room);
        console.log(`  → ${socket.id} left ${room}`);
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}

/**
 * Get the Socket.io server instance.
 *
 * @returns {Server|null}
 */
export function getIO() {
  return io;
}

/**
 * Emit a slot-update event to a mentor's room.
 *
 * @param {string} mentorProfileId
 * @param {Object} payload
 * @param {string} payload.startTime - IST ISO string
 * @param {string} payload.endTime   - IST ISO string
 * @param {string} payload.serviceId - The mentor service ID
 * @param {'taken'|'released'} payload.action
 */
export function emitSlotUpdate(mentorProfileId, payload) {
  if (!io) {
    console.warn('⚠️ Socket.io not initialized — cannot emit slot-update');
    return;
  }

  const room = `mentor:${mentorProfileId}`;
  io.to(room).emit('slot-update', {
    event: 'slot-update',
    startTime: payload.startTime,
    endTime: payload.endTime,
    serviceId: payload.serviceId,
    action: payload.action,
  });

  console.log(`📡 Emitted slot-update to ${room}: ${payload.action}`);
}
