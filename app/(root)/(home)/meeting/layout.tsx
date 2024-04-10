import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "MeetPro",
  description: "MeetPro",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
