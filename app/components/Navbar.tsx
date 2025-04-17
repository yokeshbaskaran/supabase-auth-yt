"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { createSupabaseClient } from "../auth/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const Navbar = () => {
  const { signInWithGitHub, signOut } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const { auth } = createSupabaseClient();

  useEffect(() => {
    const { data: listener } = auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const displayName = user?.user_metadata.user_name || user?.email;

  const navLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Signup/Login",
      link: "/authpage",
    },
    {
      label: "Upload Img",
      link: "/upload-img",
    },
  ];

  const navStyles = `px-2 py-1 rounded hover:shadow hover:bg-gray-700 hover:text-white`;

  return (
    <header className="px-2 py-2">
      <nav className="flex items-center">
        <h2>Moments</h2>

        <ul className="w-fit ml-auto px-5 flex items-center space-x-5">
          {navLinks.map((nav, idx) => (
            <Link className={navStyles} href={nav.link} key={idx}>
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
            <li className={navStyles}>
              <button onClick={signInWithGitHub}>GitHub Signup</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
