import { sql } from "@vercel/postgres";

export interface DBUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  avatar: string;
  organization: string;
  created_at: string;
  updated_at: string;
}

export async function ensureDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'team_member',
      avatar TEXT DEFAULT '',
      organization TEXT DEFAULT '',
      created_at TEXT DEFAULT (now()),
      updated_at TEXT DEFAULT (now())
    )
  `;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string,
  role: string = "team_member",
  organization: string = ""
): Promise<DBUser> {
  const avatarDefaults: Record<string, string> = {
    admin: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    team_member: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    viewer: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  };

  const result = await sql<DBUser>`
    INSERT INTO users (name, email, password_hash, role, avatar, organization)
    VALUES (${name}, ${email}, ${passwordHash}, ${role}, ${avatarDefaults[role] || ""}, ${organization})
    RETURNING *
  `;
  return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<DBUser | null> {
  const result = await sql<DBUser>`SELECT * FROM users WHERE email = ${email}`;
  return result.rows[0] || null;
}

export async function getUserById(id: number): Promise<DBUser | null> {
  const result = await sql<DBUser>`SELECT * FROM users WHERE id = ${id}`;
  return result.rows[0] || null;
}
