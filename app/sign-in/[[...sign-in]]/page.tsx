import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] sm:min-h-[85vh]">
      <SignIn />
    </div>
  );
}
