import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 border-b border-zinc-800 bg-black">
      <Link href="/" className="text-xl font-bold text-white">
        ChenkoAI
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          href="/custom-chatbots"
          className="text-zinc-300 hover:text-white transition"
        >
          Custom Chatbots
        </Link>

        <Link
          href="/projects"
          className="text-zinc-300 hover:text-white transition"
        >
          Projects
        </Link>

        <Link
          href="/research"
          className="text-zinc-300 hover:text-white transition"
        >
          Research
        </Link>

        <Link
          href="/auth"
          className="text-zinc-300 hover:text-white transition"
        >
          Sign In
        </Link>

        <Link
          href="/contact"
          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition"
        >
          Order AI
        </Link>
      </div>
    </nav>
  );
}