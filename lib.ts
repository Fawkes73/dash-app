import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Session expires in 1 hour
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString(); // Extract password

  if (!email || !password) throw new Error("Invalid credentials!");

  const name = email.split("@")[0]; // Extract name from email
  const user = { email, name };

  const expires = new Date(Date.now() + 60 * 60 * 1000); // Set expiry to 1 hour
  const session = await encrypt({ user, expires });

  const cookieStore = cookies(); // 🔹 Get cookie store (no need for `await`)
  cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const cookieStore = cookies();
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000); // Refresh for 1 hour

  const res = NextResponse.next();
  res.cookies.set("session", await encrypt(parsed), {
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
