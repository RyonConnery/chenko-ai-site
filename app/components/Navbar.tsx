"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase";

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setEmail(data.session?.user.email ?? null);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setEmail(session?.user.email ?? null);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setEmail(null);
    window.location.href = "/";
  }

  return (
    <nav className="w-full border-b border-zinc-800 bg-black px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
      <Link href="/" className="text-xl font-bold text-white">
        ChenkoAI
      </Link>

      <div className="flex flex-wrap items-center gap-5 text-sm">
        <Link
          href="/order-ai"
          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition"
        >
          Order AI
        </Link>

        <Link
          href="/custom-chatbots"
          className="text-zinc-300 hover:text-white transition"
        >
          AI Knowledge Base
        </Link>

        <Link
          href="/projects"
          className="text-zinc-300 hover:text-white transition"
        >
          Projects
        </Link>

        <Link
          href="/research"
          className="text-zinc-300 hover:text-white transition"
        >
          Research
        </Link>

        {email ? (
          <button
            onClick={handleSignOut}
            className="rounded-lg border border-zinc-700 px-4 py-2 font-medium text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link
              href="/auth"
              className="text-zinc-300 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="rounded-lg border border-zinc-700 px-4 py-2 font-medium text-zinc-200 transition hover:bg-zinc-900 hover:text-white"
            >
              Create Account
            </Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
}
