"use client";
import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSeup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
const call = useCall();
if (!call) {
  throw new Error("UseCall must be used within a StreamCall component");
}
  useEffect(()=>{
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  },[isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-3xl font-bold">Meeting Seup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center gap-3 justify-center font-medium">
            <input type="checkbox" checked={isMicCamToggledOn} onChange={(e)=>setIsMicCamToggledOn(e.target.checked)} className="accent-sky-1" />
            Join without Mic and Camera
        </label>
        <DeviceSettings/>
      </div>
      <Button onClick={()=>{call.join();setIsSetupComplete(true)}} className="rounded-md bg-green-500 px-4 py-2.5">
          Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSeup;
