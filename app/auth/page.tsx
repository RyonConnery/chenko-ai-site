"use client";

import { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createClient } from "../lib/supabase";

type AuthMode = "signin" | "signup";

type SignupResponse = {
  message?: string;
  error?: string;
};

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "signup") {
      setMode("signup");
    }

    supabase.auth.getSession().then(({ data }) => {
      setCurrentUserEmail(data.session?.user.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUserEmail(session?.user.email ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const response = await fetch("/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const result = (await response.json()) as SignupResponse;

        if (!response.ok || result.error) {
          setMessage(result.error ?? "Supabase auth request failed.");
          return;
        }

        setMessage(
          result.message ??
            "Account created. Check your email to confirm your account.",
        );
        return;
      }

      const supabase = createClient();
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (result.error) {
        setMessage(result.error.message);
        return;
      }

      setMessage("Signed in successfully.");
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Supabase auth request failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setCurrentUserEmail(null);
    setMessage("Signed out.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="mx-auto max-w-5xl px-8 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Account
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Sign in or create your ChenkoAI account.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          Accounts prepare ChenkoAI for order history, chatbot projects,
          research access, and future customer workspaces.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold">Account status</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              {currentUserEmail
                ? `Signed in as ${currentUserEmail}.`
                : "You are not signed in."}
            </p>
            {currentUserEmail && (
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="mt-6 rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-100 transition hover:bg-zinc-900 disabled:opacity-60"
              >
                {loading ? "Working..." : "Sign Out"}
              </button>
            )}
          </aside>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex rounded-xl border border-zinc-800 bg-black p-1">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-lg px-4 py-3 font-semibold transition ${
                  mode === "signin"
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-lg px-4 py-3 font-semibold transition ${
                  mode === "signup"
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
              >
                {loading
                  ? "Working..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {message && (
              <p className="mt-5 rounded-xl bg-black p-4 text-sm font-medium text-zinc-300">
                {message}
              </p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
