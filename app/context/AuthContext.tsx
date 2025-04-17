"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

interface AuthcontextType {
  user: User | null;
  signInWithGitHub: () => void;
  signOut: () => void;
}

const Authcontext = createContext<AuthcontextType | undefined>(undefined);

export function useAuth(): AuthcontextType {
  const context = useContext(Authcontext);

  if (context === undefined) {
    throw new Error("useAuth must used within");
  }

  return context;
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGitHub = () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  const contextvalues = { user, signInWithGitHub, signOut };

  return (
    <div>
      <Authcontext.Provider value={contextvalues}>
        {children}
      </Authcontext.Provider>
    </div>
  );
};
