import Link from "next/link";
import PageShell from "../components/PageShell";

const aiTypes = [
  {
    name: "Text and Knowledge AI",
    description:
      "AI systems that answer questions, summarize documents, draft content, and help users navigate structured knowledge.",
    examples: ["Business FAQ assistants", "Course support AI", "Internal documentation helpers"],
  },
  {
    name: "Workflow AI",
    description:
      "AI builds that support repeatable processes such as intake, research, drafting, routing, and reporting.",
    examples: ["Lead intake", "Research briefs", "Operations checklists"],
  },
  {
    name: "Customer Support AI",
    description:
      "Chatbot-style experiences that guide customers through common questions and clarify when human follow-up is needed.",
    examples: ["Website chatbots", "Product guidance", "Support triage"],
  },
  {
    name: "Creative AI",
    description:
      "Generative AI concepts for writing, design planning, game development support, brand assets, and production workflows.",
    examples: ["Content systems", "Game design assistants", "Brand concept helpers"],
  },
];

export default function CustomChatbotsPage() {
  return (
    <PageShell
      eyebrow="AI Knowledge Base"
      title="Learn what kinds of generative AI ChenkoAI can build."
      description="Use this guide before ordering AI. It explains common AI build types, what they are useful for, and when to request a quote instead of going straight to checkout."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {aiTypes.map((aiType) => (
          <article
            key={aiType.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <h2 className="text-2xl font-bold">{aiType.name}</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              {aiType.description}
            </p>
            <div className="mt-6 space-y-3">
              {aiType.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-xl border border-zinc-800 bg-black p-3 text-sm text-zinc-300"
                >
                  {example}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 grid gap-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 lg:grid-cols-[1fr_280px]">
        <div>
          <h2 className="text-2xl font-bold">Questions before ordering?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            If you are not sure which AI build fits your idea, send a question
            first. ChenkoAI can help narrow the project into a quote, product
            purchase, or staged build plan.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/order-ai"
            className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-black transition hover:bg-zinc-200"
          >
            Open Order AI
          </Link>
          <a
            href="mailto:contact@chenkosoftworks.com?subject=Question about ChenkoAI builds"
            className="rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-100 transition hover:bg-zinc-900"
          >
            Contact Us
          </a>
        </div>
      </section>
    </PageShell>
  );
}
