import Link from "next/link";
import PageShell from "../../components/PageShell";

export default function OrderCancelPage() {
  return (
    <PageShell
      eyebrow="Checkout Cancelled"
      title="Your ChenkoAI checkout was not completed."
      description="No payment was completed from this checkout session. You can return to the AI build menu, adjust the cart, or request a quote before purchasing."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">Try checkout again</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            Return to Order AI and select the build that fits your project.
          </p>
          <Link
            href="/order-ai"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Back to Order AI
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">Ask before buying</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            Request a quote if you are unsure which AI product is right for
            your business or website.
          </p>
          <a
            href="mailto:contact@chenkosoftworks.com?subject=ChenkoAI quote question"
            className="mt-6 inline-block rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-100 transition hover:bg-zinc-900"
          >
            Request Quote
          </a>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-bold">Review AI types</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            Read the AI Knowledge Base before choosing a product.
          </p>
          <Link
            href="/custom-chatbots"
            className="mt-6 inline-block rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-100 transition hover:bg-zinc-900"
          >
            AI Knowledge Base
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
