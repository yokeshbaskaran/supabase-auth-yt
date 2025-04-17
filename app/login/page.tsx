"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { loginAction } from "../actions/users";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClickLoginButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Logined success!");
      }
    });
  };

  return (
    <div>
      <div className="bg-emerald-700 w-96 rounded-lg p-8">
        <h1 className="text-2xl text-center mb-8">Login</h1>

        <form
          className="flex flex-col bg-emerald-700 gap-4"
          action={handleClickLoginButton}
        >
          <input
            type="email"
            name="email"
            className="rounded-lg p-2 bg-white"
            placeholder="Email"
            disabled={isPending}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg p-2 bg-white"
            disabled={isPending}
          />

          <button
            disabled={isPending}
            className="rounded-lg p-2 mt-4 bg-black text-white flex justify-center"
          >
            {isPending ? "Loading" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {`Don't`} have an account?{" "}
          <Link href="/create" className="underline">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
