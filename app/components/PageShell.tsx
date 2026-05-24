import Navbar from "./Navbar";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="mx-auto max-w-7xl px-8 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          {description}
        </p>
        <div className="mt-12">{children}</div>
      </section>
    </main>
  );
}
