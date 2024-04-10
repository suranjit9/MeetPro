import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "MeetPro",
  description: "MeetPro",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const Rootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Rootlayout;
