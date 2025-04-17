import Link from "next/link";
import { getUser } from "./auth/server";
import SignOut from "./components/SignOut";

async function Home() {
  const user = await getUser();
  return (
    <>
      <div className="flex flex-col items-center space-y-3">
        {user ? (
          <>
            <p>User is logined</p>
            <SignOut />
          </>
        ) : (
          <>
            <p>Not logined</p>
            <Link
              href="/login"
              className="rounded-lg p-2 text-white flex justify-center
              bg-emerald-700 w-40"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
