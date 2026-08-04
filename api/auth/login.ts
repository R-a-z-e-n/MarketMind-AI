
import bcrypt from "bcryptjs";
import { ensureDB, getUserByEmail } from "../../lib/db";
import { signToken } from "../../lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    await ensureDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

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
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message || "Failed to log in" });
  }
}
