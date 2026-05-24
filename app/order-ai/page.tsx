import PageShell from "../components/PageShell";

const products = [
  {
    name: "AI Workflow Starter",
    price: "Project quote",
    description:
      "A focused AI setup for a single business workflow, research task, or internal productivity process.",
    includes: ["Use-case planning", "Prompt system", "Basic handoff guide"],
  },
  {
    name: "Custom AI Assistant",
    price: "Project quote",
    description:
      "A branded assistant designed for customer support, education, internal knowledge, or project operations.",
    includes: ["Assistant design", "Knowledge structure", "Launch support"],
  },
  {
    name: "AI Automation Build",
    price: "Project quote",
    description:
      "A custom automation concept for repeatable tasks, lead intake, content workflows, or research pipelines.",
    includes: ["Workflow map", "Automation logic", "Testing checklist"],
  },
];

export default function OrderAIPage() {
  return (
    <PageShell
      eyebrow="Order AI"
      title="Purchase custom AI systems built around a real workflow."
      description="Choose a starting point for an AI product, assistant, or automation project. ChenkoAI reviews the request and scopes the build before production work begins."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
              {product.price}
            </p>
            <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              {product.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              {product.includes.map((item) => (
                <li key={item} className="rounded-xl bg-black p-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-2xl font-bold">Order intake</h2>
        <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
          Full checkout and deposit collection can be connected after the
          product menu is approved. For now, this page gives visitors a clear
          service menu and purchasing path for AI work.
        </p>
      </section>
    </PageShell>
  );
}
