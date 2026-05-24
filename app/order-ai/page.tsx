"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import { createClient } from "../lib/supabase";

type AiProduct = {
  id: string;
  name: string;
  price: string;
  summary: string;
  fit: string;
  includes: string[];
};

const assistantOptions = [
  "Compact website widget",
  "Full-page assistant UI",
  "Dark ChenkoAI-style interface",
  "Light business-style interface",
  "Embed on existing website",
  "New hosted chatbot page",
  "Custom chatbot display name",
  "Business name in chatbot header",
];

const aiProducts: AiProduct[] = [
  {
    id: "workflow-starter",
    name: "AI Workflow Starter",
    price: "$99",
    summary:
      "A focused AI system for one repeatable business task, intake process, or productivity workflow.",
    fit: "Best for first AI projects, small business operations, and internal assistants.",
    includes: ["Workflow mapping", "Prompt system", "Launch checklist"],
  },
  {
    id: "custom-assistant",
    name: "Custom AI Assistant",
    price: "$299",
    summary:
      "A branded assistant designed around your company knowledge, customer questions, or team process.",
    fit: "Best for support, education, research, and knowledge-base experiences.",
    includes: [
      "Assistant behavior design",
      "Knowledge structure",
      "Testing support",
    ],
  },
  {
    id: "automation-build",
    name: "AI Automation Build",
    price: "$799",
    summary:
      "A custom AI-assisted automation concept for intake, drafting, routing, research, or reporting.",
    fit: "Best for repeatable workflows that waste time when handled manually.",
    includes: ["Process map", "Automation logic", "Handoff notes"],
  },
  {
    id: "chatbot-build",
    name: "Custom Chatbot Build",
    price: "$1,500",
    summary:
      "A chatbot for customer service, course support, product guidance, or internal documentation lookup.",
    fit: "Best for websites that need guided answers and a clear escalation path.",
    includes: ["Conversation design", "Knowledge base plan", "Safety boundaries"],
  },
];

export default function OrderAIPage() {
  const [cart, setCart] = useState<string[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [selectedAssistantOptions, setSelectedAssistantOptions] = useState<
    string[]
  >([]);

  const selectedProducts = useMemo(
    () => aiProducts.filter((product) => cart.includes(product.id)),
    [cart],
  );

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

  function toggleCart(productId: string) {
    setCart((currentCart) =>
      currentCart.includes(productId)
        ? currentCart.filter((item) => item !== productId)
        : [...currentCart, productId],
    );
  }

  function toggleAssistantOption(option: string) {
    setSelectedAssistantOptions((currentOptions) =>
      currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option],
    );
  }

  return (
    <PageShell
      eyebrow="Order AI"
      title="Request quotes or shop custom AI builds for real business workflows."
      description="Choose the AI build that matches your project, add one or more options to the cart, or request a quote before checkout. Stripe checkout is prepared for one-time AI build purchases."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-6 lg:grid-cols-2">
          {aiProducts.map((product) => {
            const selected = cart.includes(product.id);

            return (
              <article
                key={product.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  {product.price}
                </p>
                <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
                <p className="mt-4 leading-7 text-zinc-400">
                  {product.summary}
                </p>
                <p className="mt-4 rounded-xl border border-zinc-800 bg-black p-4 text-sm leading-6 text-zinc-300">
                  {product.fit}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  {product.includes.map((item) => (
                    <li key={item} className="rounded-xl bg-black p-3">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCart(product.id)}
                    className={`rounded-xl px-5 py-3 font-semibold transition ${
                      selected
                        ? "border border-cyan-300 bg-cyan-300 text-black"
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    {selected ? "Added to Cart" : "Add to Cart"}
                  </button>
                  <a
                    href={`mailto:contact@chenkosoftworks.com?subject=ChenkoAI quote request: ${encodeURIComponent(
                      product.name,
                    )}`}
                    className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-100 transition hover:bg-zinc-900"
                  >
                    Request Quote
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 xl:sticky xl:top-6 xl:self-start">
          <h2 className="text-2xl font-bold">AI Build Cart</h2>
          <p className="mt-3 leading-7 text-zinc-400">
            Select one or more AI builds. Checkout is available to signed-in
            ChenkoAI customers so orders can be connected to a real customer.
          </p>
          <p className="mt-4 rounded-xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300">
            {checkingSession
              ? "Checking account status..."
              : email
                ? `Signed in as ${email}.`
                : "Sign in or create an account before checkout."}
          </p>

          <div className="mt-6 space-y-3">
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-zinc-800 bg-black p-4"
                >
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">{product.price}</p>
                  <input type="hidden" name="products" value={product.id} />
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-zinc-800 bg-black p-4 text-sm text-zinc-400">
                Your cart is empty.
              </p>
            )}
          </div>

          {email ? (
            <form action="/api/ai-checkout" method="POST" className="mt-6">
            {selectedProducts.map((product) => (
              <input
                key={product.id}
                type="hidden"
                name="products"
                value={product.id}
              />
            ))}
            {selectedAssistantOptions.map((option) => (
              <input
                key={option}
                type="hidden"
                name="assistantOptions"
                value={option}
              />
            ))}
            <button
              type="submit"
              disabled={checkingSession || selectedProducts.length === 0}
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout with Stripe
            </button>
            </form>
          ) : (
            <div className="mt-6 grid gap-3">
              <Link
                href="/auth"
                className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-black transition hover:bg-zinc-200"
              >
                Sign In to Checkout
              </Link>
              <Link
                href="/auth?mode=signup"
                className="rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-100 transition hover:bg-zinc-900"
              >
                Create Account
              </Link>
            </div>
          )}

          <a
            href="mailto:contact@chenkosoftworks.com?subject=Question about ordering ChenkoAI"
            className="mt-4 block rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-100 transition hover:bg-zinc-900"
          >
            Contact Us
          </a>
        </aside>
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
              Custom AI Assistant Options
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              Choose the assistant presentation details.
            </h2>
            <p className="mt-4 leading-7 text-zinc-400">
              The assistant is not a fully custom software platform at this
              price. Clients can choose the UI direction, where it should be
              hosted or embedded, and the chatbot or business name that appears
              in the assistant interface.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {assistantOptions.map((option) => {
              const selected = selectedAssistantOptions.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleAssistantOption(option)}
                  className={`rounded-xl border p-4 text-left text-sm font-semibold transition ${
                    selected
                      ? "border-cyan-300 bg-cyan-300 text-black"
                      : "border-zinc-800 bg-black text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
