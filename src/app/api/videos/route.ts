import { NextResponse } from "next/server";
import videos from "../../../../data/videos";

export async function GET() {
  return NextResponse.json(videos);
}
