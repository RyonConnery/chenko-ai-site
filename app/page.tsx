import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <Hero />

      <section className="px-8 py-16 border-t border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-10">
          Chenko Softworks Ecosystem
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <a
            href="https://www.chenkosoftworks.com"
            className="border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900 transition"
          >
            <h3 className="text-xl font-bold mb-3">
              Chenko Softworks
            </h3>

            <p className="text-zinc-400">
              Main company ecosystem and technology hub.
            </p>
          </a>

          <a
            href="https://finance.chenkosoftworks.com"
            className="border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900 transition"
          >
            <h3 className="text-xl font-bold mb-3">
              Chenko Finance
            </h3>

            <p className="text-zinc-400">
              AI finance education, memberships,
              paper trading, and learning systems.
            </p>
          </a>

          <a
            href="https://studios.chenkosoftworks.com"
            className="border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900 transition"
          >
            <h3 className="text-xl font-bold mb-3">
              Chenko Studios
            </h3>

            <p className="text-zinc-400">
              GhostNet 3020 and future game development projects.
            </p>
          </a>

        </div>
      </section>
    </main>
  );
}
