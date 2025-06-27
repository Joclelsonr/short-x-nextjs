import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { API_URL } from "@/constants";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  const urlId = (await params).id;

  if (!urlId) {
    return NextResponse.json(
      { message: "URL ID is required" },
      { status: 400 }
    );
  }

  const externalResponse = await fetch(`${API_URL}/urls/${urlId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!externalResponse.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  revalidateTag("urls");
  revalidatePath("/dashboard");

  return NextResponse.json(
    { message: "URL deleted successfully" },
    { status: 200 }
  );
}
