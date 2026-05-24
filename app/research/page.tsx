import PageShell from "../components/PageShell";

const findings = [
  {
    topic: "IDE workflow automation",
    finding:
      "ChenkoAI is exploring an uploadable AI plugin concept designed to automate developer workflows inside IDEs. The research target is a C++ native system that can assist with coding, project navigation, build steps, and repetitive engineering tasks.",
  },
  {
    topic: "Unreal Engine automation",
    finding:
      "Experimental work includes AI-assisted Unreal Engine workflow automation for project setup, editor tasks, asset pipeline support, and C++ development patterns.",
  },
  {
    topic: "Autonomous system control",
    finding:
      "ChenkoAI is also researching a fully autonomous AI system as an MSOS-compatible application capable of full system automation under controlled design rules.",
  },
];

export default function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Experimental AI systems, automation research, and autonomous tools."
      description="ChenkoAI research focuses on practical AI products, C++ native automation, IDE and Unreal Engine workflow systems, and the path from guided assistants toward fully autonomous AI applications."
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
        <h2 className="text-2xl font-bold">Current experimental projects</h2>
        <p className="mt-3 max-w-4xl leading-7 text-zinc-400">
          Current ChenkoAI research includes an uploadable AI plugin for IDE
          and Unreal Engine workflow automation, built around a C++ native
          direction, plus a fully autonomous AI application designed for
          MSOS-compatible system automation. These projects are experimental
          research efforts and are separate from customer-ready Order AI
          products.
        </p>
      </section>
    </PageShell>
  );
}
