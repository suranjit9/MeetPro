import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-center min-h-screen">
      <SignIn />
    </div>
  );
}
