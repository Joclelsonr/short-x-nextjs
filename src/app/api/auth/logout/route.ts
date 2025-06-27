import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  cookieStore.delete("user");

  return new NextResponse(null, { status: 204 });
}
