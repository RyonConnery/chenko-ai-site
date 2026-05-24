import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

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

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: SIGNUP_REDIRECT_URL,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
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
