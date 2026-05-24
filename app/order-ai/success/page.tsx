import Link from "next/link";
import PageShell from "../../components/PageShell";

const nextSteps = [
  "You will receive a Stripe payment receipt from the email used at checkout.",
  "ChenkoAI will review the selected AI build and prepare the project intake follow-up.",
  "Reply with your business name, project goal, website link, and any knowledge files or notes you want considered.",
  "If the order needs clarification, ChenkoAI will contact you before build work begins.",
];

export default function OrderSuccessPage() {
  return (
    <PageShell
      eyebrow="Payment Received"
      title="Your ChenkoAI order was submitted."
      description="Thank you for ordering a ChenkoAI build. This page explains what happens next so customers are not left guessing after checkout."
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">Next steps</h2>
          <div className="mt-6 space-y-3">
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-xl border border-zinc-800 bg-black p-4"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  Step {index + 1}
                </p>
                <p className="mt-2 leading-7 text-zinc-300">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">Project follow-up</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            Send any extra project notes, website links, preferred chatbot
            name, business name, or AI goals so ChenkoAI can match the order to
            the right build plan.
          </p>
          <a
            href="mailto:contact@chenkosoftworks.com?subject=ChenkoAI order follow-up"
            className="mt-6 block rounded-xl bg-white px-5 py-3 text-center font-semibold text-black transition hover:bg-zinc-200"
          >
            Send Project Notes
          </a>
          <Link
            href="/order-ai"
            className="mt-3 block rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-100 transition hover:bg-zinc-900"
          >
            Back to Order AI
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
