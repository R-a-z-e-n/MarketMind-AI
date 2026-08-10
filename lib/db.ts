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

  await sql`
    CREATE TABLE IF NOT EXISTS social_connections (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      access_token TEXT NOT NULL,
      refresh_token TEXT,
      platform_user_id TEXT,
      platform_username TEXT,
      expires_at TEXT,
      scopes TEXT DEFAULT '',
      created_at TEXT DEFAULT (now()),
      updated_at TEXT DEFAULT (now()),
      UNIQUE(user_id, platform)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      title TEXT NOT NULL DEFAULT '',
      channel TEXT NOT NULL,
      content TEXT NOT NULL,
      media_url TEXT DEFAULT '',
      media_type TEXT DEFAULT 'image',
      scheduled_at TEXT,
      published_at TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      author TEXT DEFAULT '',
      campaign_id TEXT DEFAULT '',
      hashtags TEXT DEFAULT '[]',
      tags TEXT DEFAULT '[]',
      ai_quality_score INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (now()),
      updated_at TEXT DEFAULT (now())
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS post_publish_logs (
      id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      platform_post_id TEXT DEFAULT '',
      platform_url TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      error_message TEXT DEFAULT '',
      retry_count INTEGER DEFAULT 0,
      published_at TEXT DEFAULT (now()),
      created_at TEXT DEFAULT (now())
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

export interface DBSocialConnection {
  id: number;
  user_id: number;
  platform: string;
  access_token: string;
  refresh_token: string | null;
  platform_user_id: string | null;
  platform_username: string | null;
  expires_at: string | null;
  scopes: string;
  created_at: string;
  updated_at: string;
}

export async function upsertSocialConnection(
  userId: number,
  platform: string,
  accessToken: string,
  refreshToken?: string,
  platformUserId?: string,
  platformUsername?: string,
  expiresAt?: string,
  scopes?: string
): Promise<DBSocialConnection> {
  const result = await sql<DBSocialConnection>`
    INSERT INTO social_connections (user_id, platform, access_token, refresh_token, platform_user_id, platform_username, expires_at, scopes)
    VALUES (${userId}, ${platform}, ${accessToken}, ${refreshToken || ''}, ${platformUserId || ''}, ${platformUsername || ''}, ${expiresAt || ''}, ${scopes || ''})
    ON CONFLICT (user_id, platform)
    DO UPDATE SET
      access_token = EXCLUDED.access_token,
      refresh_token = COALESCE(EXCLUDED.refresh_token, social_connections.refresh_token),
      platform_user_id = COALESCE(NULLIF(EXCLUDED.platform_user_id, ''), social_connections.platform_user_id),
      platform_username = COALESCE(NULLIF(EXCLUDED.platform_username, ''), social_connections.platform_username),
      expires_at = COALESCE(NULLIF(EXCLUDED.expires_at, ''), social_connections.expires_at),
      scopes = COALESCE(NULLIF(EXCLUDED.scopes, ''), social_connections.scopes),
      updated_at = now()
    RETURNING *
  `;
  return result.rows[0];
}

export async function getSocialConnection(
  userId: number,
  platform: string
): Promise<DBSocialConnection | null> {
  const result = await sql<DBSocialConnection>`
    SELECT * FROM social_connections WHERE user_id = ${userId} AND platform = ${platform}
  `;
  return result.rows[0] || null;
}

export async function getAllSocialConnections(userId: number): Promise<DBSocialConnection[]> {
  const result = await sql<DBSocialConnection>`
    SELECT * FROM social_connections WHERE user_id = ${userId}
  `;
  return result.rows;
}

export async function deleteSocialConnection(userId: number, platform: string): Promise<void> {
  await sql`DELETE FROM social_connections WHERE user_id = ${userId} AND platform = ${platform}`;
}

export interface DBPost {
  id: number;
  user_id: number | null;
  title: string;
  channel: string;
  content: string;
  media_url: string;
  media_type: string;
  scheduled_at: string | null;
  published_at: string | null;
  status: string;
  author: string;
  campaign_id: string;
  hashtags: string;
  tags: string;
  ai_quality_score: number;
  created_at: string;
  updated_at: string;
}

export async function createPost(
  userId: number | null,
  data: {
    title: string;
    channel: string;
    content: string;
    mediaUrl?: string;
    mediaType?: string;
    scheduledAt?: string;
    status?: string;
    author?: string;
    campaignId?: string;
    hashtags?: string[];
    tags?: string[];
    aiQualityScore?: number;
  }
): Promise<DBPost> {
  const result = await sql<DBPost>`
    INSERT INTO posts (user_id, title, channel, content, media_url, media_type, scheduled_at, status, author, campaign_id, hashtags, tags, ai_quality_score)
    VALUES (
      ${userId},
      ${data.title || ''},
      ${data.channel},
      ${data.content},
      ${data.mediaUrl || ''},
      ${data.mediaType || 'image'},
      ${data.scheduledAt || ''},
      ${data.status || 'draft'},
      ${data.author || ''},
      ${data.campaignId || ''},
      ${JSON.stringify(data.hashtags || [])},
      ${JSON.stringify(data.tags || [])},
      ${data.aiQualityScore || 0}
    )
    RETURNING *
  `;
  return result.rows[0];
}

export async function updatePostStatus(
  postId: number,
  status: string,
  publishedAt?: string
): Promise<DBPost | null> {
  if (publishedAt) {
    const result = await sql<DBPost>`
      UPDATE posts SET status = ${status}, published_at = ${publishedAt}, updated_at = now()
      WHERE id = ${postId} RETURNING *
    `;
    return result.rows[0] || null;
  }
  const result = await sql<DBPost>`
    UPDATE posts SET status = ${status}, updated_at = now()
    WHERE id = ${postId} RETURNING *
  `;
  return result.rows[0] || null;
}

export async function getPostById(postId: number): Promise<DBPost | null> {
  const result = await sql<DBPost>`SELECT * FROM posts WHERE id = ${postId}`;
  return result.rows[0] || null;
}

export async function getScheduledPosts(): Promise<DBPost[]> {
  const result = await sql<DBPost>`
    SELECT * FROM posts WHERE status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= now()
    ORDER BY scheduled_at ASC
  `;
  return result.rows;
}

export async function getAllPosts(userId?: number): Promise<DBPost[]> {
  if (userId) {
    const result = await sql<DBPost>`
      SELECT * FROM posts WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
    return result.rows;
  }
  const result = await sql<DBPost>`SELECT * FROM posts ORDER BY created_at DESC`;
  return result.rows;
}

export interface DBPostPublishLog {
  id: number;
  post_id: number;
  platform: string;
  platform_post_id: string;
  platform_url: string;
  status: string;
  error_message: string;
  retry_count: number;
  published_at: string;
  created_at: string;
}

export async function createPublishLog(
  postId: number,
  platform: string,
  status: string = 'pending'
): Promise<DBPostPublishLog> {
  const result = await sql<DBPostPublishLog>`
    INSERT INTO post_publish_logs (post_id, platform, status)
    VALUES (${postId}, ${platform}, ${status})
    RETURNING *
  `;
  return result.rows[0];
}

export async function updatePublishLog(
  logId: number,
  data: {
    platformPostId?: string;
    platformUrl?: string;
    status?: string;
    errorMessage?: string;
    retryCount?: number;
  }
): Promise<DBPostPublishLog | null> {
  const updates: string[] = [];
  const values: any[] = [];

  if (data.platformPostId !== undefined) {
    updates.push(`platform_post_id = $${values.length + 1}`);
    values.push(data.platformPostId);
  }
  if (data.platformUrl !== undefined) {
    updates.push(`platform_url = $${values.length + 1}`);
    values.push(data.platformUrl);
  }
  if (data.status !== undefined) {
    updates.push(`status = $${values.length + 1}`);
    values.push(data.status);
  }
  if (data.errorMessage !== undefined) {
    updates.push(`error_message = $${values.length + 1}`);
    values.push(data.errorMessage);
  }
  if (data.retryCount !== undefined) {
    updates.push(`retry_count = $${values.length + 1}`);
    values.push(data.retryCount);
  }

  if (updates.length === 0) return null;

  values.push(logId);

  const query = `UPDATE post_publish_logs SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;
  const result = await sql.query(query, values);
  return result.rows[0] || null;
}

export async function getPublishLogsForPost(postId: number): Promise<DBPostPublishLog[]> {
  const result = await sql<DBPostPublishLog>`
    SELECT * FROM post_publish_logs WHERE post_id = ${postId} ORDER BY created_at DESC
  `;
  return result.rows;
}

export async function deletePost(postId: number): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${postId}`;
}
