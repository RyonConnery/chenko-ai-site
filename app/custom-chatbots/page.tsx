import PageShell from "../components/PageShell";

const chatbotPackages = [
  {
    name: "Support Chatbot",
    use: "Customer questions, business FAQs, and support routing.",
    features: ["FAQ knowledge base", "Brand voice", "Escalation guidance"],
  },
  {
    name: "Education Chatbot",
    use: "Course help, lesson support, study guidance, and learner Q&A.",
    features: ["Lesson-aware responses", "Study prompts", "Safety rules"],
  },
  {
    name: "Project Chatbot",
    use: "Internal project information, documentation lookup, and workflow help.",
    features: ["Project context", "Team workflows", "Knowledge refresh plan"],
  },
];

export default function CustomChatbotsPage() {
  return (
    <PageShell
      eyebrow="Custom Chatbots"
      title="Order chatbot systems for customers, learners, and teams."
      description="ChenkoAI chatbot builds focus on useful behavior, clear scope, brand fit, and safe handoff. Start with the chatbot type that matches the job."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {chatbotPackages.map((chatbot) => (
          <article
            key={chatbot.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <h2 className="text-2xl font-bold">{chatbot.name}</h2>
            <p className="mt-4 leading-7 text-zinc-400">{chatbot.use}</p>
            <div className="mt-6 space-y-3">
              {chatbot.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-zinc-800 bg-black p-3 text-sm text-zinc-300"
                >
                  {feature}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 grid gap-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Step 1
          </p>
          <h3 className="mt-3 text-xl font-bold">Choose purpose</h3>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Step 2
          </p>
          <h3 className="mt-3 text-xl font-bold">Define knowledge</h3>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Step 3
          </p>
          <h3 className="mt-3 text-xl font-bold">Build and test</h3>
        </div>
      </section>
    </PageShell>
  );
}
