"use client";

import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "http://localhost:8080";

/**
 * Hook to manage Socket.io connection and mentor room subscriptions.
 *
 * @param {string|null} mentorProfileId — Join this mentor's room for real-time slot updates
 * @param {(payload: { startTime: string, endTime: string, serviceId: string, action: 'taken'|'released' }) => void} onSlotUpdate
 * @returns {{ isConnected: boolean }}
 */
export default function useSocket(mentorProfileId, onSlotUpdate) {
  const socketRef = useRef(null);
  const connectedRef = useRef(false);

  const stableCallback = useCallback(
    (payload) => {
      if (onSlotUpdate) onSlotUpdate(payload);
    },
    [onSlotUpdate]
  );

  useEffect(() => {
    // Initialize socket
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        connectedRef.current = true;
        console.log("🔌 Socket connected:", socketRef.current.id);
      });

      socketRef.current.on("disconnect", () => {
        connectedRef.current = false;
      });
    }

    // Join mentor room
    if (mentorProfileId && socketRef.current) {
      socketRef.current.emit("join-mentor-room", mentorProfileId);
    }

    // Listen for slot updates
    const handler = (payload) => stableCallback(payload);
    socketRef.current?.on("slot-update", handler);

    return () => {
      // Leave room and remove listener on cleanup
      if (mentorProfileId && socketRef.current) {
        socketRef.current.emit("leave-mentor-room", mentorProfileId);
      }
      socketRef.current?.off("slot-update", handler);
    };
  }, [mentorProfileId, stableCallback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { isConnected: connectedRef.current };
}
