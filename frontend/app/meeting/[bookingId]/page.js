"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  MonitorOff,
  Clock,
  User,
  Wifi,
  WifiOff,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  LogOut,
} from "lucide-react";
import useAgoraCall from "../../../hooks/useAgoraCall";
import { meetingApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";

/* ── Video Player Component ─────────────────────────────────── */

function VideoPlayer({ track, isLocal = false, name, profilePic, isMuted }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !track) return;
    track.play(containerRef.current);
    return () => {
      track.stop();
    };
  }, [track]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border-3 border-black bg-gray-900 shadow-[4px_4px_0_0_#000]">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ transform: isLocal ? "scaleX(-1)" : "none" }}
      />
      {/* Name badge */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl border-2 border-black bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-[2px_2px_0_0_#000]">
        {profilePic ? (
          <img
            src={resolveUploadUrl(profilePic)}
            alt=""
            className="h-6 w-6 rounded-full border border-black object-cover"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black bg-[#5061E4]">
            <User size={12} className="text-white" />
          </div>
        )}
        <span className="text-xs font-bold text-gray-900">
          {name || "Participant"}
          {isLocal && " (You)"}
        </span>
        {isMuted && <MicOff size={12} className="text-red-500" />}
      </div>
    </div>
  );
}

/* ── Session Timer ──────────────────────────────────────────── */

function SessionTimer({ endTime }) {
  const [remaining, setRemaining] = useState("");
  const [urgency, setUrgency] = useState("normal"); // normal | warning | ended

  useEffect(() => {
    if (!endTime) return;
    const end = new Date(endTime).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setRemaining("Session ended");
        setUrgency("ended");
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setRemaining(`${mins}:${String(secs).padStart(2, "0")}`);

      if (mins < 5) setUrgency("warning");
      else setUrgency("normal");
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const color =
    urgency === "ended"
      ? "text-red-500"
      : urgency === "warning"
        ? "text-amber-500"
        : "text-emerald-500";

  return (
    <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${color}`}>
      <Clock size={14} />
      <span>{remaining}</span>
    </div>
  );
}

/* ── Connection Status ──────────────────────────────────────── */

function ConnectionBadge({ state }) {
  if (state === "CONNECTED") return null;

  const isReconnecting = state === "RECONNECTING";

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="flex items-center gap-2 rounded-xl border-3 border-black bg-amber-50 px-5 py-3 shadow-[4px_4px_0_0_#000]">
        {isReconnecting ? (
          <Loader2 size={18} className="animate-spin text-amber-600" />
        ) : (
          <WifiOff size={18} className="text-red-500" />
        )}
        <span className="text-sm font-bold text-gray-800">
          {isReconnecting ? "Reconnecting..." : "Disconnected"}
        </span>
      </div>
    </div>
  );
}

/* ── Main Meeting Page ──────────────────────────────────────── */

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId;

  const [sessionInfo, setSessionInfo] = useState(null);
  const [preJoinLoading, setPreJoinLoading] = useState(true);
  const [preJoinError, setPreJoinError] = useState(null);
  // 'lobby' → 'incall' → 'left' (can rejoin) → 'finished' (done)
  const [meetingState, setMeetingState] = useState("lobby");
  const [finishing, setFinishing] = useState(false);

  const {
    join,
    joined,
    joining,
    error: agoraError,
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
  } = useAgoraCall(bookingId);

  // Pre-join: validate the session
  useEffect(() => {
    async function preflight() {
      try {
        const res = await meetingApi.getToken(bookingId);
        setSessionInfo(res.data);
      } catch (err) {
        setPreJoinError(err.message || "Cannot access this meeting");
      } finally {
        setPreJoinLoading(false);
      }
    }
    preflight();
  }, [bookingId]);

  // Handle joining
  const handleJoin = async () => {
    try {
      const data = await join();
      if (data?.booking) setSessionInfo((prev) => ({ ...prev, ...data }));
      setMeetingState("incall");
    } catch {
      // Error is already in agoraError
    }
  };

  // Handle leaving (temporary — user can rejoin)
  const handleLeave = async () => {
    await leaveCall();
    setMeetingState("left");
  };

  // Handle rejoin
  const handleRejoin = async () => {
    setMeetingState("lobby");
    // Re-fetch token since the old one might have been consumed
    try {
      const res = await meetingApi.getToken(bookingId);
      setSessionInfo(res.data);
      setPreJoinError(null);
    } catch (err) {
      setPreJoinError(err.message || "Cannot rejoin this meeting");
    }
  };

  // Handle finish — signal to backend
  const handleFinish = async () => {
    setFinishing(true);
    try {
      // Leave Agora first if still connected
      if (joined) await leaveCall();
      // Signal finish to backend
      const res = await meetingApi.finish(bookingId);
      if (res.data?.completed) {
        toast.success("Session completed!");
      } else {
        toast.info(res.data?.message || "Waiting for other participant to finish");
      }
    } catch (e) {
      console.error("Failed to finish meeting", e);
    } finally {
      setFinishing(false);
      setMeetingState("finished");
    }
  };

  // Session ended warning + auto-finish
  useEffect(() => {
    if (!sessionInfo?.booking?.endTime || meetingState !== "incall") return;

    const end = new Date(sessionInfo.booking.endTime).getTime();
    const fiveMinWarning = end - 5 * 60 * 1000;
    const autoEnd = end + 2 * 60 * 1000; // 2 min grace

    const now = Date.now();
    const timers = [];

    if (now < fiveMinWarning) {
      timers.push(
        setTimeout(() => {
          toast.warning("Session ends in 5 minutes", { duration: 8000 });
        }, fiveMinWarning - now)
      );
    }

    if (now < autoEnd) {
      timers.push(
        setTimeout(async () => {
          toast.error("Session has ended — finishing automatically");
          await handleFinish();
        }, autoEnd - now)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [sessionInfo, meetingState]);

  // Check if session is still within join window
  const isWithinJoinWindow = () => {
    if (!sessionInfo?.booking?.endTime) return false;
    const endPlus30 = new Date(sessionInfo.booking.endTime).getTime() + 30 * 60 * 1000;
    return Date.now() < endPlus30;
  };

  // ─── Finished screen (final — cannot rejoin) ────────────────
  if (meetingState === "finished") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4] p-4">
        <div
          className="w-full max-w-md rounded-2xl border-3 border-black bg-white p-8 text-center"
          style={{ boxShadow: "6px 6px 0 0 #22C55E" }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-emerald-100">
            <CheckCircle size={28} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Session Complete
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for the session! Your meeting has been recorded as completed.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl border-2 border-black bg-[#5061E4] py-3 text-sm font-bold text-white shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000]"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ─── Left screen (can rejoin or finish) ─────────────────────
  if (meetingState === "left") {
    const canRejoin = isWithinJoinWindow();
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4] p-4">
        <div
          className="w-full max-w-md rounded-2xl border-3 border-black bg-white p-8 text-center"
          style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-amber-100">
            <PhoneOff size={28} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            You Left the Meeting
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {canRejoin
              ? "You can rejoin the session or finish the meeting."
              : "The session window has ended."}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {canRejoin && (
              <button
                onClick={handleRejoin}
                className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-black bg-[#5061E4] py-3 text-sm font-bold text-white shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000]"
              >
                <RotateCcw size={16} />
                Rejoin Meeting
              </button>
            )}
            <button
              onClick={handleFinish}
              disabled={finishing}
              className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-black bg-[#22C55E] py-3 text-sm font-bold text-white shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {finishing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Finishing...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Finish Meeting
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-3 w-full rounded-xl border-2 border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-500 transition-all hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ─── Loading / Error states ───────────────────────────────
  if (preJoinLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#5061E4]" />
          <p className="text-sm font-bold text-gray-600">
            Preparing meeting room...
          </p>
        </div>
      </div>
    );
  }

  if (preJoinError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4] p-4">
        <div
          className="w-full max-w-md rounded-2xl border-3 border-black bg-white p-8 text-center"
          style={{ boxShadow: "6px 6px 0 0 #EF4444" }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-red-100">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">
            Cannot Join Meeting
          </h2>
          <p className="mt-2 text-sm text-gray-500">{preJoinError}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl border-2 border-black bg-gray-800 py-3 text-sm font-bold text-white shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ─── Pre-join lobby ───────────────────────────────────────
  if (!joined && meetingState === "lobby") {
    const booking = sessionInfo?.booking;
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4] p-4">
        <div
          className="w-full max-w-lg rounded-2xl border-3 border-black bg-white p-8"
          style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
        >
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
            Ready to join?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {booking?.serviceName || "Mentoring Session"} •{" "}
            {booking?.durationMinutes || 30} min
          </p>

          {/* Participants */}
          <div className="flex items-center gap-4 mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              {booking?.mentor?.profilePicture ? (
                <img
                  src={resolveUploadUrl(booking.mentor.profilePicture)}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-black object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#5061E4]">
                  <User size={18} className="text-white" />
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-gray-500">Mentor</p>
                <p className="text-sm font-extrabold text-gray-900">
                  {booking?.mentor?.name || "Mentor"}
                </p>
              </div>
            </div>
            <div className="text-gray-300 font-bold text-lg">×</div>
            <div className="flex items-center gap-3">
              {booking?.mentee?.profilePicture ? (
                <img
                  src={resolveUploadUrl(booking.mentee.profilePicture)}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-black object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#F59E0B]">
                  <User size={18} className="text-white" />
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-gray-500">Mentee</p>
                <p className="text-sm font-extrabold text-gray-900">
                  {booking?.mentee?.name || "Mentee"}
                </p>
              </div>
            </div>
          </div>

          {agoraError && (
            <div className="mb-4 rounded-xl border-2 border-red-200 bg-red-50 p-3 text-xs font-bold text-red-600">
              {agoraError}
            </div>
          )}

          <button
            onClick={handleJoin}
            disabled={joining}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-3 border-black bg-[#22C55E] py-3.5 text-base font-extrabold text-white shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {joining ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Video size={18} />
                Join Meeting
              </>
            )}
          </button>

          <button
            onClick={() => router.back()}
            className="mt-3 w-full rounded-xl border-2 border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ─── In-call view ─────────────────────────────────────────
  const booking = sessionInfo?.booking;
  const remoteUser = remoteUsers[0]; // 1:1 call

  return (
    <div className="flex h-screen flex-col bg-[#1A1A2E] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b-2 border-gray-700 bg-[#16213E] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Wifi size={14} className="text-emerald-400" />
            <span className="text-xs font-bold text-gray-300">Live</span>
          </div>
          <div className="h-4 w-px bg-gray-600" />
          <span className="text-sm font-extrabold text-white">
            {booking?.serviceName || "Session"}
          </span>
        </div>
        <SessionTimer endTime={booking?.endTime} />
      </div>

      {/* Video area */}
      <div className="relative flex-1 p-3">
        <ConnectionBadge state={connectionState} />

        {remoteUser ? (
          /* Both participants — side by side on desktop, stacked on mobile */
          <div className="grid h-full gap-3 grid-cols-1 md:grid-cols-2">
            {/* Remote (large) */}
            <div className="relative h-full min-h-[200px]">
              <VideoPlayer
                track={remoteUser.videoTrack}
                name={
                  sessionInfo?.role === "mentor"
                    ? booking?.mentee?.name
                    : booking?.mentor?.name
                }
                profilePic={
                  sessionInfo?.role === "mentor"
                    ? booking?.mentee?.profilePicture
                    : booking?.mentor?.profilePicture
                }
              />
            </div>
            {/* Local (equal size on desktop) */}
            <div className="relative h-full min-h-[200px]">
              <VideoPlayer
                track={localTracks.video}
                isLocal
                name={
                  sessionInfo?.role === "mentor"
                    ? booking?.mentor?.name
                    : booking?.mentee?.name
                }
                profilePic={
                  sessionInfo?.role === "mentor"
                    ? booking?.mentor?.profilePicture
                    : booking?.mentee?.profilePicture
                }
                isMuted={!micOn}
              />
            </div>
          </div>
        ) : (
          /* Solo — waiting for other participant */
          <div className="relative h-full">
            <VideoPlayer
              track={localTracks.video}
              isLocal
              name={
                sessionInfo?.role === "mentor"
                  ? booking?.mentor?.name
                  : booking?.mentee?.name
              }
              profilePic={
                sessionInfo?.role === "mentor"
                  ? booking?.mentor?.profilePicture
                  : booking?.mentee?.profilePicture
              }
              isMuted={!micOn}
            />
            {/* Waiting overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-amber-50 px-4 py-2 shadow-[2px_2px_0_0_#000]">
                <Loader2 size={14} className="animate-spin text-amber-600" />
                <span className="text-xs font-bold text-gray-700">
                  Waiting for{" "}
                  {sessionInfo?.role === "mentor" ? "mentee" : "mentor"} to
                  join...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-3 border-t-2 border-gray-700 bg-[#16213E] px-4 py-3">
        {/* Mic */}
        <button
          onClick={toggleMic}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 ${
            micOn
              ? "bg-gray-700 text-white"
              : "bg-red-500 text-white"
          }`}
          title={micOn ? "Mute" : "Unmute"}
        >
          {micOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>

        {/* Camera */}
        <button
          onClick={toggleCamera}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 ${
            cameraOn
              ? "bg-gray-700 text-white"
              : "bg-red-500 text-white"
          }`}
          title={cameraOn ? "Turn off camera" : "Turn on camera"}
        >
          {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>

        {/* Screen Share */}
        <button
          onClick={toggleScreenShare}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 ${
            screenSharing
              ? "bg-[#5061E4] text-white"
              : "bg-gray-700 text-white"
          }`}
          title={screenSharing ? "Stop sharing" : "Share screen"}
        >
          {screenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
        </button>

        {/* Leave Call (temporary) */}
        <button
          onClick={handleLeave}
          className="flex h-12 w-28 items-center justify-center gap-2 rounded-xl border-2 border-black bg-amber-500 text-white shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-amber-600"
          title="Leave meeting (you can rejoin)"
        >
          <LogOut size={18} />
          <span className="text-sm font-bold">Leave</span>
        </button>

        {/* Finish Meeting (permanent) */}
        <button
          onClick={handleFinish}
          disabled={finishing}
          className="flex h-12 w-28 items-center justify-center gap-2 rounded-xl border-2 border-black bg-red-500 text-white shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
          title="Finish and end your session"
        >
          <PhoneOff size={18} />
          <span className="text-sm font-bold">Finish</span>
        </button>
      </div>
    </div>
  );
}
