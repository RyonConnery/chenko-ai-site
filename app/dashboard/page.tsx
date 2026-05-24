import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { createClient } from "../../utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-8 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Protected Dashboard
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Welcome to your ChenkoAI workspace.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          Signed in as {user.email}. This protected area is ready for AI order
          history, chatbot projects, research access, and customer workspaces.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            "AI Orders",
            "Custom Chatbots",
            "Research Access",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <h2 className="text-2xl font-bold">{item}</h2>
              <p className="mt-4 text-zinc-400">
                Account-connected tools can be added here as ChenkoAI grows.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
