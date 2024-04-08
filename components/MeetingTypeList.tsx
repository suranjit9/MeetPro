"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();


  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
  >();
  const createdMeeting = () => {
    
  }
  return (
    <section className=" grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Nwe Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isJoinMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your next meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recording"
        description="Check your meeting recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via Invitation Link"
        handleClick={() => setMeetingState("isJoinMeeting")}
        className="bg-yellow-1"
      />
      <MeetingModal 
      isOpen = {meetingState === "isJoinMeeting"}
      onClose = {() => setMeetingState(undefined)}
      title= 'Start an instant meeting'
      className = 'text-center'
      buttonText = 'Start Meeting'
      handleClick = {createdMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
