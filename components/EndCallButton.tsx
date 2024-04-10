"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwener =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;
  if (!isMeetingOwener) {
    return null;
  }
  return (
    <Button
      className="rounded-md bg-red-500 px-4 py-2.5"
      onClick={async () => {
        await call?.endCall();
        router.push("/");
      }}
    >
      End Call For EveryOne
    </Button>
  );
};

export default EndCallButton;
