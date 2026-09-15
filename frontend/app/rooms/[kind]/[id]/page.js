"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, Users, ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import useAgoraCall from "../../../../hooks/useAgoraCall";
import { webinarApi, groupDiscussionApi } from "../../../../lib/api";
import { Badge, Button, Spinner, cx } from "../../../../components/ui/kit";

/**
 * Shared video room for webinars and group discussions.
 * `kind` is "webinar" or "discussion" and selects the token endpoint.
 */
export default function GroupRoomPage() {
  const { kind, id } = useParams();
  const router = useRouter();

  const isWebinar = kind === "webinar";
  const backHref = isWebinar ? "/webinars" : "/group-discussions";

  const fetchToken = useCallback(
    (roomId) =>
      isWebinar ? webinarApi.getRoomToken(roomId) : groupDiscussionApi.getRoomToken(roomId),
    [isWebinar]
  );

  const {
    join,
    remoteUsers,
    localTracks,
    joined,
    joining,
    error,
    micOn,
    cameraOn,
    screenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    leaveCall,
  } = useAgoraCall(id, fetchToken);

  const [meta, setMeta] = useState(null);
  const joinAttempted = useRef(false);

  useEffect(() => {
    const loader = isWebinar ? webinarApi.get(id) : groupDiscussionApi.get(id);
    loader
      .then((res) => setMeta(res.data?.webinar || res.data?.discussion || null))
      .catch(() => setMeta(null));
  }, [id, isWebinar]);

  // Join once on mount; the guard survives strict-mode's double effect.
  useEffect(() => {
    if (joinAttempted.current) return;
    joinAttempted.current = true;
    join();
  }, [join]);

  const handleLeave = async () => {
    await leaveCall();
    router.push(backHref);
  };

  const participantCount = remoteUsers.length + (joined ? 1 : 0);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center">
        <p className="text-sm font-semibold text-white">Can&apos;t join this room</p>
        <p className="mt-1 max-w-sm text-xs text-gray-400">{error}</p>
        <Button variant="secondary" className="mt-5" onClick={() => router.push(backHref)}>
          <ArrowLeft className="h-4 w-4" />
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950">
      <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold text-white">
            {meta?.title || meta?.topic || (isWebinar ? "Webinar" : "Group Discussion")}
          </h1>
          <p className="mt-0.5 text-[11px] text-gray-400">
            {joining ? "Connecting…" : joined ? "Live" : "Not connected"}
          </p>
        </div>

        <Badge tone="neutral" className="shrink-0 bg-white/10 text-white">
          <Users className="h-3 w-3" />
          {participantCount}
        </Badge>
      </header>

      <main className="flex-1 p-3 sm:p-5">
        {joining && (
          <div className="flex h-full min-h-[50vh] items-center justify-center">
            <Spinner className="text-white/50" />
          </div>
        )}

        {!joining && (
          <div
            className={cx(
              "grid h-full gap-3",
              participantCount <= 1
                ? "grid-cols-1"
                : participantCount <= 4
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 lg:grid-cols-3"
            )}
          >
            <VideoTile track={localTracks.video} label="You" muted={!micOn} cameraOff={!cameraOn} isLocal />
            {remoteUsers.map((user) => (
              <VideoTile key={user.uid} user={user} label={`Participant ${user.uid}`} />
            ))}
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-3">
        <ControlButton active={micOn} onClick={toggleMic} label={micOn ? "Mute" : "Unmute"}>
          {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </ControlButton>

        <ControlButton
          active={cameraOn}
          onClick={toggleCamera}
          label={cameraOn ? "Turn camera off" : "Turn camera on"}
        >
          {cameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
        </ControlButton>

        <ControlButton
          active={screenSharing}
          onClick={async () => {
            try {
              await toggleScreenShare();
            } catch {
              toast.error("Could not start screen sharing");
            }
          }}
          label="Share screen"
        >
          <MonitorUp className="h-4 w-4" />
        </ControlButton>

        <button
          onClick={handleLeave}
          aria-label="Leave room"
          className="ml-2 flex h-11 items-center gap-2 rounded-full bg-red-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
        >
          <PhoneOff className="h-4 w-4" />
          Leave
        </button>
      </footer>
    </div>
  );
}

function VideoTile({ track, user, label, muted, cameraOff, isLocal }) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const videoTrack = isLocal ? track : user?.videoTrack;
    if (videoTrack) videoTrack.play(container);

    if (!isLocal && user?.audioTrack) user.audioTrack.play();

    return () => {
      if (videoTrack) videoTrack.stop();
    };
  }, [track, user, isLocal]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900 ring-1 ring-white/10">
      <div ref={ref} className="h-full w-full" />

      {(cameraOff || (!isLocal && !user?.videoTrack)) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
            {label?.charAt(0) ?? "?"}
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 backdrop-blur-sm">
        <span className="text-[11px] font-medium text-white">{label}</span>
        {muted && <MicOff className="h-3 w-3 text-red-400" />}
      </div>
    </div>
  );
}

function ControlButton({ active, onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cx(
        "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
        active ? "bg-white/15 text-white hover:bg-white/25" : "bg-red-500/90 text-white hover:bg-red-500"
      )}
    >
      {children}
    </button>
  );
}
