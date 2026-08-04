import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "marketmind-jwt-secret-change-in-production";

export interface JWTPayload {
  userId: number;
  email: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: { headers: { authorization?: string } }): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}

export function getUserIdFromRequest(req: { headers: { authorization?: string } }): number | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

export function requireAuth(req: { headers: { authorization?: string } }, res: { status: (code: number) => { json: (data: any) => any } }): number | null {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return null;
  }
  return userId;
}
