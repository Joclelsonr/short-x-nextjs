import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/constants";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const externalResponse = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!externalResponse.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { acceess_token, user } = await externalResponse.json();

  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth-token",
    value: acceess_token,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  cookieStore.set({
    name: "user",
    value: JSON.stringify(user),
    httpOnly: false,
    sameSite: "lax",
  });

  return NextResponse.json({ success: true });
}
