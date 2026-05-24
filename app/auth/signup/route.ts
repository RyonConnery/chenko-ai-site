import { NextResponse } from "next/server";
import { supabaseKey, supabaseUrl } from "../../../utils/supabase/config";

const SIGNUP_REDIRECT_URL = "https://ai.chenkosoftworks.com/auth/callback";

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Supabase auth request failed. Please try again.";
  }

  const cause =
    "cause" in error && error.cause instanceof Error
      ? ` ${error.cause.message}`
      : "";

  return `${error.message}${cause}`;
}

export async function POST(request: Request) {
  let signupUrl: URL | null = null;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    signupUrl = new URL(`${supabaseUrl}/auth/v1/signup`);
    signupUrl.searchParams.set("redirect_to", SIGNUP_REDIRECT_URL);

    const response = await fetch(signupUrl, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            result.msg ??
            result.message ??
            result.error_description ??
            result.error ??
            "Supabase signup failed.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      message: "Account created. Check your email to confirm your account.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error),
        authHost: signupUrl?.host ?? "unknown",
      },
      { status: 500 },
    );
  }
}
