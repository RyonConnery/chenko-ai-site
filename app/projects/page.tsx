"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { createClient } from "../lib/supabase";

const projectStages = [
  {
    status: "Order received",
    description:
      "Payment or quote request has been received and the project is ready for intake review.",
  },
  {
    status: "Intake review",
    description:
      "ChenkoAI reviews the selected product, business goal, website, and customization details.",
  },
  {
    status: "Requirements confirmed",
    description:
      "Project scope, chatbot name, business name, UI direction, and integration path are confirmed.",
  },
  {
    status: "Build in progress",
    description:
      "The AI workflow, assistant behavior, chatbot UI, or automation build is being assembled.",
  },
  {
    status: "Testing and revision",
    description:
      "The build is checked for useful behavior, clear responses, and customer-facing polish.",
  },
  {
    status: "Delivery and handoff",
    description:
      "The project is delivered with next steps, usage notes, and any setup or integration guidance.",
  },
];

const customerChecklist = [
  "Business or brand name",
  "Preferred chatbot or assistant name",
  "Website URL or hosting preference",
  "Selected product from Order AI",
  "Preferred UI style",
  "Knowledge files, FAQs, links, or notes",
];

const uiOptions = [
  "Compact website widget",
  "Full-page assistant UI",
  "Dark ChenkoAI-style interface",
  "Light business-style interface",
  "Embed on existing website",
  "New hosted chatbot page",
];

export default function ProjectsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setEmail(data.session?.user.email ?? null);
        setCheckingSession(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setEmail(session?.user.email ?? null);
        setCheckingSession(false);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedOptions = formData.getAll("uiOptions").join(", ");

    const body = [
      `Customer name: ${formData.get("customerName")}`,
      `Customer email: ${formData.get("customerEmail")}`,
      `Order or checkout email: ${formData.get("orderEmail")}`,
      `Business name: ${formData.get("businessName")}`,
      `Chatbot or assistant name: ${formData.get("assistantName")}`,
      `Selected AI product: ${formData.get("product")}`,
      `Website URL: ${formData.get("websiteUrl")}`,
      `Selected UI / hosting options: ${selectedOptions || "None selected"}`,
      "",
      "Project goals / customization notes:",
      String(formData.get("projectNotes") ?? ""),
    ].join("\n");

    window.location.href = `mailto:contact@chenkosoftworks.com?subject=${encodeURIComponent(
      "ChenkoAI project customization submission",
    )}&body=${encodeURIComponent(body)}`;

    setMessage(
      "Your email app should open with the project details. Send that email so ChenkoAI can review your customization options.",
    );
  }

  return (
    <PageShell
      eyebrow="Projects"
      title="Track AI project progress and submit order customization details."
      description="Use this page after ordering or requesting a quote. Customers can review the project stages and send ChenkoAI the details needed to configure a custom AI assistant, workflow, automation, or chatbot build."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          {projectStages.map((stage, index) => (
            <article
              key={stage.status}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
                    Stage {index + 1}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold">{stage.status}</h2>
                </div>
                <span className="rounded-full bg-cyan-300 px-3 py-1 text-sm font-semibold text-black">
                  Customer project flow
                </span>
              </div>
              <p className="mt-4 max-w-4xl leading-7 text-zinc-400">
                {stage.description}
              </p>
            </article>
          ))}
        </section>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 xl:sticky xl:top-6 xl:self-start">
          <h2 className="text-2xl font-bold">Before build work starts</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            ChenkoAI needs the details below to match the order to the correct
            project setup and customer-facing UI.
          </p>
          <div className="mt-6 space-y-3">
            {customerChecklist.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-black p-3 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
              Project Submission
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              Send customization options for your order.
            </h2>
            <p className="mt-4 leading-7 text-zinc-400">
              This form prepares an email with your project details. It does not
              change checkout, login, Supabase, or Stripe. Customers can use it
              to send the details ChenkoAI needs after payment or quote request.
            </p>
            <p className="mt-4 rounded-xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300">
              {checkingSession
                ? "Checking account status..."
                : email
                  ? `Signed in as ${email}.`
                  : "Sign in or create an account to submit project details."}
            </p>
          </div>

          {email ? (
            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Your name
                </span>
                <input
                  name="customerName"
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Your email
                </span>
                <input
                  name="customerEmail"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Order / checkout email
                </span>
                <input
                  name="orderEmail"
                  type="email"
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Selected AI product
                </span>
                <select
                  name="product"
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                >
                  <option value="">Choose product</option>
                  <option>Workflow Starter - $99</option>
                  <option>Custom AI Assistant - $299</option>
                  <option>AI Automation Build - $799</option>
                  <option>Custom Chatbot Build - $1,500</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Business name
                </span>
                <input
                  name="businessName"
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Chatbot / assistant name
                </span>
                <input
                  name="assistantName"
                  className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-zinc-300">
                Website URL or preferred hosting location
              </span>
              <input
                name="websiteUrl"
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
              />
            </label>

            <fieldset className="rounded-2xl border border-zinc-800 bg-black p-4">
              <legend className="px-2 text-sm font-semibold text-zinc-300">
                UI and integration options
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {uiOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300"
                  >
                    <input
                      type="checkbox"
                      name="uiOptions"
                      value={option}
                      className="mt-1"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm font-semibold text-zinc-300">
                Project goals, files, links, or customization notes
              </span>
              <textarea
                name="projectNotes"
                required
                rows={6}
                className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-300"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              Prepare Submission Email
            </button>

            {message && (
              <p className="rounded-xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300">
                {message}
              </p>
            )}
            </form>
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <h3 className="text-2xl font-bold">Sign in to submit details</h3>
              <p className="mt-4 leading-7 text-zinc-400">
                Project customization submissions are available to signed-in
                ChenkoAI customers so order details can be connected to a real
                account.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/auth"
                  className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-black transition hover:bg-zinc-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?mode=signup"
                  className="rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-100 transition hover:bg-zinc-900"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
