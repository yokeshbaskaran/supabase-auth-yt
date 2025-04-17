"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { signOutAction } from "../actions/users";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("User Logged out");
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="rounded-lg p-2 text-white flex justify-center bg-emerald-700 w-40"
        disabled={isPending}
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOut;
