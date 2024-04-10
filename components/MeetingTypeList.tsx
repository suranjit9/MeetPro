"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useRouter } from "next/router"; // Import corrected
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>(); // Space removed
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createdMeeting = async () => {
    if (!client || !user) {
      return console.log("Client or user not found", client, user);
    }
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = await client.call("default", id);
      if (!call) throw new Error("Failed to Call not created");
      const startAt = values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created successfully",
      });
    } catch (error) {
      console.log("Error", error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_MEETING_URL}/${callDetails?.id}`;

  return (
    <section className=" grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Nwe Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          buttonText=''
          handleClick={createdMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-medium leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              className="border-none bg-dark-3 focus-visible:right-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base font-medium leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date:any) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="border-none bg-dark-3 focus-visible:right-0 focus-visible:ring-offset-0"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting Link Copied",
            })
          }}
          image="/icons/checked.svg"
          buttinIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isJoinMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the Meeting Link"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={()=>router.push(values.link)}>
           <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />

      </MeetingModal>
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createdMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
