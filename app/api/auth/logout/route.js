import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const response = NextResponse.json({ message: "You Logged out Successfully" });
  response.headers.set(
    "Set-Cookie",
    serialize("token", "", { httpOnly: true, path: "/", maxAge: 0 })
  );
  return response;
}
