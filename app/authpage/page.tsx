"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { createAccountAction } from "../actions/users";

const CreateAccountPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClickCreateAccountButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Verification link has sent to your email");
      }
    });
  };

  return (
    <div>
      <div className="bg-emerald-700 w-96 rounded-lg p-8">
        <h1 className="text-2xl text-center mb-8">Create Account</h1>

        <form
          className="flex flex-col bg-emerald-700 gap-4"
          action={handleClickCreateAccountButton}
        >
          <input
            type="email"
            name="email"
            className="rounded-lg p-2"
            placeholder="Email"
            disabled={isPending}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg p-2"
            disabled={isPending}
          />

          <button
            disabled={isPending}
            className="rounded-lg p-2 mt-4 bg-black text-white flex justify-center"
          >
            {isPending ? "Creating" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;
