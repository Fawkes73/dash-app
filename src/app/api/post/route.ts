import { NextResponse } from "next/server";
import samplePosts from "../../../../data/post"; // ✅ Importing local JSON data

export async function GET() {
  return NextResponse.json(samplePosts);
}
