import { getTokenFromRequest, verifyToken } from '../../../lib/auth';
import { getSocialConnection, createPost, createPublishLog, updatePublishLog, updatePostStatus, getPostById } from '../../../lib/db';
import { publishToSocialPlatform, SocialPlatform, SocialPostPayload } from '../../../lib/social';

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

    const { postId, channel, content, mediaUrl, mediaType, title, hashtags, scheduledAt } = req.body;

    // If postId is provided, fetch the existing post
    let existingPost = null;
    if (postId) {
      // postId might be a string like "post-1234", try to extract numeric part
      const numericId = parseInt(postId.replace('post-', ''), 10);
      if (!isNaN(numericId)) {
        existingPost = await getPostById(numericId);
      }
      if (!existingPost) {
        // Create a new post in DB if it doesn't exist yet
        existingPost = await createPost(payload.userId, {
          title: title || 'Social Post',
          channel: channel || 'linkedin',
          content: content || '',
          mediaUrl: mediaUrl || '',
          mediaType: mediaType || 'image',
          status: 'scheduled',
          author: payload.email,
        });
      }
    }

    const channelName = channel || existingPost?.channel;
    if (!channelName) {
      return res.status(400).json({ error: 'channel is required' });
    }

    const validChannels: SocialPlatform[] = ['linkedin', 'twitter', 'instagram', 'facebook'];
    if (!validChannels.includes(channelName as SocialPlatform)) {
      return res.status(400).json({ error: `Channel must be one of: ${validChannels.join(', ')}` });
    }

    const postContent = content || existingPost?.content;
    if (!postContent) {
      return res.status(400).json({ error: 'content is required' });
    }

    // Get the social connection for this platform
    const connection = await getSocialConnection(payload.userId, channelName);
    if (!connection) {
      return res.status(400).json({
        error: `No ${channelName} account connected. Please connect your ${channelName} account first.`,
      });
    }

    // If scheduledAt is in the future, just save it
    if (scheduledAt && new Date(scheduledAt) > new Date()) {
      if (existingPost) {
        await updatePostStatus(existingPost.id, 'scheduled');
      }
      return res.json({
        success: true,
        scheduled: true,
        postId: existingPost?.id,
        scheduledAt,
        message: `Post scheduled for ${new Date(scheduledAt).toLocaleString()}`,
      });
    }

    // Create publish log
    const publishLog = await createPublishLog(existingPost?.id || 0, channelName, 'publishing');

    // Publish to the platform
    const socialPayload: SocialPostPayload = {
      content: postContent,
      mediaUrl: mediaUrl || existingPost?.media_url || undefined,
      mediaType: (mediaType as any) || 'image',
      hashtags: hashtags || [],
      title: title || existingPost?.title || '',
    };

    const auth = {
      accessToken: connection.access_token,
      refreshToken: connection.refresh_token || undefined,
      platformUserId: connection.platform_user_id || undefined,
      platformUsername: connection.platform_username || undefined,
      expiresAt: connection.expires_at || undefined,
    };

    const result = await publishToSocialPlatform(channelName as SocialPlatform, auth, socialPayload);

    if (result.success) {
      await updatePublishLog(publishLog.id, {
        platformPostId: result.platformPostId || '',
        platformUrl: result.platformUrl || '',
        status: 'success',
      });
      if (existingPost) {
        await updatePostStatus(existingPost.id, 'published', new Date().toISOString());
      }

      return res.json({
        success: true,
        published: true,
        postId: existingPost?.id,
        platformPostId: result.platformPostId,
        platformUrl: result.platformUrl,
        channel: channelName,
      });
    } else {
      await updatePublishLog(publishLog.id, {
        status: 'failed',
        errorMessage: result.error || 'Unknown error',
      });

      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to publish to social platform',
        channel: channelName,
      });
    }
  } catch (error: any) {
    console.error('Publish error:', error);
    return res.status(500).json({ error: error.message || 'Failed to publish post' });
  }
}
