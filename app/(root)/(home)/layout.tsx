import NavBar from "@/components/NavBar";
import SiderBar from "@/components/SiderBar";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "MeetPro",
  description: "MeetPro",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const Homelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <NavBar />
      <div className="flex">
        <SiderBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Homelayout;
