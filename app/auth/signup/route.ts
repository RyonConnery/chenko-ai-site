import { NextResponse } from "next/server";
import { supabaseKey, supabaseUrl } from "../../../utils/supabase/config";

const SIGNUP_REDIRECT_URL = "https://ai.chenkosoftworks.com/auth/callback";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const signupUrl = new URL(`${supabaseUrl}/auth/v1/signup`);
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
        error:
          error instanceof Error
            ? error.message
            : "Supabase auth request failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
