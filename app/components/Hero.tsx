export default function Hero() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold mb-6">
        Custom AI, Autonomous Systems, and Future AI Research
      </h1>

      <p className="text-xl text-zinc-400 max-w-2xl mb-10">
        At ChenkoAI, we develop custom AI chatbots, intelligent automation
        systems, and experimental autonomous AI technologies designed to
        bridge the gap between AI assistants and fully autonomous systems.
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition">
          Explore ChenkoAI
        </button>

        <button className="border border-zinc-700 px-6 py-3 rounded-xl hover:bg-zinc-900 transition">
          View Research
        </button>
      </div>
    </section>
  );
}
