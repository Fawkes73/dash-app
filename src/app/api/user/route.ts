import { NextResponse } from "next/server";
import users from "../../../../data/user"; // Import user data

export async function GET() {
  // Remove passwords before sending response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredUsers = users.map(({ password, ...user }) => user);

  return NextResponse.json(filteredUsers);
}
