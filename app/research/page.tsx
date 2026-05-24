import PageShell from "../components/PageShell";

const findings = [
  {
    topic: "AI assistants need product boundaries",
    finding:
      "Useful assistants perform best when their role, data sources, escalation rules, and safety limits are defined before launch.",
  },
  {
    topic: "Education AI works best with structured courses",
    finding:
      "Course-aware AI can support learners more safely when lessons, quizzes, and completion rules are already organized.",
  },
  {
    topic: "Automation should start with repeatable workflows",
    finding:
      "The strongest early automation candidates are tasks with clear inputs, repeated steps, and measurable outputs.",
  },
];

export default function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Current AI research projects and practical findings."
      description="ChenkoAI research focuses on applied AI systems, safer assistants, education workflows, automation patterns, and the path from chatbots toward more autonomous tools."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {findings.map((item) => (
          <article
            key={item.topic}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <h2 className="text-2xl font-bold">{item.topic}</h2>
            <p className="mt-4 leading-7 text-zinc-400">{item.finding}</p>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-2xl font-bold">Research direction</h2>
        <p className="mt-3 max-w-4xl leading-7 text-zinc-400">
          The research page will continue to collect project notes, test
          results, system design findings, and AI workflow lessons as ChenkoAI
          products move from homepage, to order flow, to working customer tools.
        </p>
      </section>
    </PageShell>
  );
}
