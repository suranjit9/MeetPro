import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex-center min-h-screen">
      <SignIn />
    </div>
  );
}
