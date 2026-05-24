import PageShell from "../components/PageShell";

const projects = [
  {
    name: "ChenkoAI Homepage",
    status: "Live platform",
    description:
      "The public home for ChenkoAI services, chatbot ordering, AI projects, research, and account access.",
  },
  {
    name: "Custom AI Ordering System",
    status: "Current build",
    description:
      "A product menu and request flow for visitors who want AI assistants, automation, or chatbot builds.",
  },
  {
    name: "Chenko Finance AI Support",
    status: "Active ecosystem project",
    description:
      "AI support concepts for finance education, course guidance, market learning, and safer user workflows.",
  },
];

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Projects"
      title="Current ChenkoAI projects and product work."
      description="Track live platforms, active builds, and AI product directions connected to the Chenko Softworks ecosystem."
    >
      <div className="space-y-5">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <span className="rounded-full bg-cyan-300 px-3 py-1 text-sm font-semibold text-black">
                {project.status}
              </span>
            </div>
            <p className="mt-4 max-w-4xl leading-7 text-zinc-400">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
