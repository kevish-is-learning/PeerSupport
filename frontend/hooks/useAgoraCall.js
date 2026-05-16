"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { meetingApi } from "../lib/api";

/**
 * useAgoraCall — manages the complete Agora RTC lifecycle.
 *
 * @param {string} bookingId
 * @returns {{ localTracks, remoteUsers, joined, joining, error, toggleMic, toggleCamera, leaveCall, screenSharing, toggleScreenShare, connectionState }}
 */
export default function useAgoraCall(bookingId) {
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState({ audio: null, video: null });
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [connectionState, setConnectionState] = useState("DISCONNECTED");

  const clientRef = useRef(null);
  const localTracksRef = useRef({ audio: null, video: null });
  const screenTrackRef = useRef(null);
  const originalVideoTrackRef = useRef(null);

  // Join the channel
  const join = useCallback(async () => {
    if (joined || joining) return;
    setJoining(true);
    setError(null);

    try {
      // Dynamically import Agora SDK (client-side only)
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      AgoraRTC.setLogLevel(3); // Warning only

      // 1. Get token from backend
      const res = await meetingApi.getToken(bookingId);
      const { appId, channel, token, uid } = res.data;

      // 2. Create client
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      clientRef.current = client;

      // 3. Set up event handlers
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        setRemoteUsers((prev) => {
          const existing = prev.find((u) => u.uid === user.uid);
          if (existing) {
            return prev.map((u) => (u.uid === user.uid ? user : u));
          }
          return [...prev, user];
        });
      });

      client.on("user-unpublished", (user, mediaType) => {
        setRemoteUsers((prev) =>
          prev.map((u) => (u.uid === user.uid ? user : u))
        );
      });

      client.on("user-left", (user) => {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
      });

      client.on("connection-state-change", (curState) => {
        setConnectionState(curState);
      });

      // 4. Join channel
      await client.join(appId, channel, token, uid);

      // 5. Create local tracks
      const [audioTrack, videoTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks(
          { encoderConfig: "speech_standard" },
          {
            encoderConfig: {
              width: 640,
              height: 480,
              frameRate: 24,
              bitrateMax: 800,
            },
          }
        );

      localTracksRef.current = { audio: audioTrack, video: videoTrack };
      setLocalTracks({ audio: audioTrack, video: videoTrack });

      // 6. Publish
      await client.publish([audioTrack, videoTrack]);

      setJoined(true);
      setConnectionState("CONNECTED");

      return res.data; // Return booking info
    } catch (err) {
      console.error("Agora join error:", err);
      setError(err.message || "Failed to join meeting");
      throw err;
    } finally {
      setJoining(false);
    }
  }, [bookingId, joined, joining]);

  // Toggle microphone
  const toggleMic = useCallback(async () => {
    const track = localTracksRef.current.audio;
    if (!track) return;
    await track.setEnabled(!track.enabled);
    setMicOn(track.enabled);
  }, []);

  // Toggle camera
  const toggleCamera = useCallback(async () => {
    const track = localTracksRef.current.video;
    if (!track) return;
    await track.setEnabled(!track.enabled);
    setCameraOn(track.enabled);
  }, []);

  // Screen share
  const toggleScreenShare = useCallback(async () => {
    const client = clientRef.current;
    if (!client || !joined) return;

    if (screenSharing) {
      // Stop screen share — restore camera
      if (screenTrackRef.current) {
        await client.unpublish(screenTrackRef.current);
        screenTrackRef.current.close();
        screenTrackRef.current = null;
      }
      if (originalVideoTrackRef.current) {
        await client.publish(originalVideoTrackRef.current);
        localTracksRef.current.video = originalVideoTrackRef.current;
        setLocalTracks((prev) => ({
          ...prev,
          video: originalVideoTrackRef.current,
        }));
        originalVideoTrackRef.current = null;
      }
      setScreenSharing(false);
    } else {
      // Start screen share
      try {
        const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
        const screenTrack = await AgoraRTC.createScreenVideoTrack({}, "disable");

        // Save original camera track
        originalVideoTrackRef.current = localTracksRef.current.video;
        await client.unpublish(localTracksRef.current.video);

        // Publish screen track
        screenTrackRef.current = screenTrack;
        await client.publish(screenTrack);

        localTracksRef.current.video = screenTrack;
        setLocalTracks((prev) => ({ ...prev, video: screenTrack }));

        // Handle browser "Stop sharing" button
        screenTrack.on("track-ended", () => {
          toggleScreenShare();
        });

        setScreenSharing(true);
      } catch (err) {
        console.error("Screen share error:", err);
        // User cancelled the dialog
      }
    }
  }, [joined, screenSharing]);

  // Leave call
  const leaveCall = useCallback(async () => {
    const client = clientRef.current;

    // Close screen track if active
    if (screenTrackRef.current) {
      screenTrackRef.current.close();
      screenTrackRef.current = null;
    }
    if (originalVideoTrackRef.current) {
      originalVideoTrackRef.current.close();
      originalVideoTrackRef.current = null;
    }

    // Close local tracks
    if (localTracksRef.current.audio) {
      localTracksRef.current.audio.close();
    }
    if (localTracksRef.current.video) {
      localTracksRef.current.video.close();
    }
    localTracksRef.current = { audio: null, video: null };
    setLocalTracks({ audio: null, video: null });

    // Leave channel
    if (client) {
      await client.leave();
      clientRef.current = null;
    }

    setJoined(false);
    setRemoteUsers([]);
    setConnectionState("DISCONNECTED");
    setScreenSharing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      leaveCall();
    };
  }, [leaveCall]);

  return {
    join,
    joined,
    joining,
    error,
    localTracks,
    remoteUsers,
    micOn,
    cameraOn,
    toggleMic,
    toggleCamera,
    leaveCall,
    screenSharing,
    toggleScreenShare,
    connectionState,
  };
}
