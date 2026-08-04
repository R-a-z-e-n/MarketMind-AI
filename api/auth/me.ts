
import { ensureDB, getUserById } from "../../lib/db";
import { getUserIdFromRequest } from "../../lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    await ensureDB();

    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.json({
      user: {
        id: `user-${user.id}`,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        organization: user.organization,
      },
    });
  } catch (error: any) {
    console.error("Auth me error:", error);
    return res.status(500).json({ error: error.message || "Failed to get user" });
  }
}
