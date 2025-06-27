import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/constants";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  const externalResponse = await fetch(`${API_URL}/urls`, {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!externalResponse.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const responseData = await externalResponse.json();
  return NextResponse.json(responseData, { status: 200 });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  const requestData = await request.json();

  const externalResponse = await fetch(`${API_URL}/urls/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken ? `Bearer ${authToken}` : "",
    },
    body: JSON.stringify(requestData),
  });

  if (!externalResponse.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const responseData = await externalResponse.json();
  return NextResponse.json(responseData, { status: 200 });
}
