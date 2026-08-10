import { getTokenFromRequest, verifyToken } from '../../../lib/auth';
import { getSocialConnection, upsertSocialConnection } from '../../../lib/db';

// Direct token-based connection (for demo/testing)
// In production, this would use OAuth flows
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ error: 'Unauthorized' });

    const { platform, accessToken, refreshToken, platformUserId, platformUsername, expiresAt, scopes } = req.body;

    if (!platform || !accessToken) {
      return res.status(400).json({ error: 'platform and accessToken are required' });
    }

    const validPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}` });
    }

    const connection = await upsertSocialConnection(
      payload.userId,
      platform,
      accessToken,
      refreshToken,
      platformUserId,
      platformUsername,
      expiresAt,
      scopes
    );

    return res.json({
      success: true,
      connection: {
        id: connection.id,
        platform: connection.platform,
        platformUsername: connection.platform_username,
        isConnected: true,
      },
    });
  } catch (error: any) {
    console.error('Social connect error:', error);
    return res.status(500).json({ error: error.message || 'Failed to connect social account' });
  }
}
