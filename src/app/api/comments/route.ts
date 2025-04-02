import { NextResponse } from "next/server";
import comments from "../../../../data/comments"; // ✅ Importing local JSON data


// GET method to fetch comments
export async function GET() {
  return NextResponse.json(comments);
}
