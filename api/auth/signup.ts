
import bcrypt from "bcryptjs";
import { ensureDB, createUser, getUserByEmail } from "../../lib/db";
import { signToken } from "../../lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    await ensureDB();

    const { name, email, password, role, organization } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, passwordHash, role || "team_member", organization || "");

    const token = signToken({ userId: user.id, email: user.email });

    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);

    return res.json({
      user: {
        id: `user-${user.id}`,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        organization: user.organization,
      },
      token,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: error.message || "Failed to create account" });
  }
}
