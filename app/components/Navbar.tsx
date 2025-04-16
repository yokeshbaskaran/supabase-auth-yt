"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const { signInWithGitHub, signOut, user } = useAuth();
  const displayName = user?.user_metadata.user_name || user?.email;

  const navLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Create post",
      link: "/create",
    },
    // {
    //   label: "Sign up",
    //   link: "/signup",
    // },
  ];

  return (
    <header className="h-14 px-2 py-2">
      <nav className="flex items-center">
        <h2>Moments</h2>

        <ul className="w-fit ml-auto px-5 flex items-center space-x-5">
          {navLinks.map((nav, idx) => (
            <Link href={nav.link} key={idx}>
              {nav.label}
            </Link>
          ))}

          {user ? (
            <li className="flex items-center space-x-3">
              <span>{displayName}</span>
              {user.user_metadata.avatar_url && (
                <Image
                  className="rounded-full"
                  width={20}
                  height={20}
                  src={user.user_metadata.avatar_url}
                  alt="user-avatar"
                />
              )}
              <button onClick={signOut}>Logout</button>
            </li>
          ) : (
            <li>
              <button onClick={signInWithGitHub}>Signup with GitHub</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
