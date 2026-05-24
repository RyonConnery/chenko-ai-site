import Stripe from "stripe";

type AiProductId =
  | "workflow-starter"
  | "custom-assistant"
  | "automation-build"
  | "chatbot-build";

const productPriceEnv: Record<AiProductId, string> = {
  "workflow-starter": "STRIPE_AI_WORKFLOW_STARTER_PRICE_ID",
  "custom-assistant": "STRIPE_CUSTOM_AI_ASSISTANT_PRICE_ID",
  "automation-build": "STRIPE_AI_AUTOMATION_BUILD_PRICE_ID",
  "chatbot-build": "STRIPE_CUSTOM_CHATBOT_BUILD_PRICE_ID",
};

function isAiProductId(value: string): value is AiProductId {
  return value in productPriceEnv;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const selectedProducts = formData
      .getAll("products")
      .map((product) => String(product))
      .filter(isAiProductId);
    const assistantOptions = formData
      .getAll("assistantOptions")
      .map((option) => String(option))
      .slice(0, 6);

    if (selectedProducts.length === 0) {
      return Response.json(
        { error: "Choose at least one AI build before checkout." },
        { status: 400 },
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return Response.json(
        { error: "AI checkout is not configured yet." },
        { status: 500 },
      );
    }

    const lineItems = selectedProducts.map((productId) => {
      const priceId = process.env[productPriceEnv[productId]];

      if (!priceId) {
        throw new Error(`${productPriceEnv[productId]} is not configured.`);
      }

      return {
        price: priceId,
        quantity: 1,
      };
    });

    const stripe = new Stripe(stripeSecretKey);
    const origin = new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/order-ai/success`,
      cancel_url: `${origin}/order-ai/cancel`,
      allow_promotion_codes: true,
      metadata: {
        source: "chenkoai-order-ai",
        products: selectedProducts.join(","),
        assistantOptions: assistantOptions.join(","),
      },
    });

    if (!session.url) {
      return Response.json(
        { error: "Unable to start AI checkout." },
        { status: 500 },
      );
    }

    return Response.redirect(session.url, 303);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "There was an error starting AI checkout.",
      },
      { status: 500 },
    );
  }
}
