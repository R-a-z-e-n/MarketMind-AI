import { getTokenFromRequest, verifyToken } from '../../../lib/auth';
import { getAllSocialConnections, deleteSocialConnection } from '../../../lib/db';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'GET') {
      const connections = await getAllSocialConnections(payload.userId);
      const accounts = connections.map((c) => ({
        platform: c.platform,
        isConnected: true,
        username: c.platform_username,
        platformUserId: c.platform_user_id,
        connectedAt: c.created_at,
      }));

      // Also include platforms not yet connected
      const allPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook'];
      const connectedPlatforms = accounts.map((a) => a.platform);
      const notConnected = allPlatforms
        .filter((p) => !connectedPlatforms.includes(p))
        .map((p) => ({
          platform: p,
          isConnected: false,
          username: null,
          platformUserId: null,
          connectedAt: null,
        }));

      return res.json({ accounts: [...accounts, ...notConnected] });
    }

    if (req.method === 'DELETE') {
      const { platform } = req.query;
      if (!platform) {
        return res.status(400).json({ error: 'platform query parameter is required' });
      }
      await deleteSocialConnection(payload.userId, platform);
      return res.json({ success: true });
    }
  } catch (error: any) {
    console.error('Social accounts error:', error);
    return res.status(500).json({ error: error.message || 'Failed to manage social accounts' });
  }
}
