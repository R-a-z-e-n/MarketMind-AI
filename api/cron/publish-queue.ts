import { getScheduledPosts, updatePostStatus, createPublishLog, updatePublishLog, getSocialConnection } from '../../lib/db';
import { publishToSocialPlatform, SocialPlatform, SocialPostPayload } from '../../lib/social';

// Vercel Cron endpoint - runs every minute to process scheduled posts
export default async function handler(req: any, res: any) {
  // Verify cron secret in production
  const cronSecret = req.headers['x-vercel-cron-signature'] || req.query.token;
  if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const scheduledPosts = await getScheduledPosts();

    if (scheduledPosts.length === 0) {
      return res.json({ message: 'No scheduled posts to process', processed: 0 });
    }

    const results = [];

    for (const post of scheduledPosts) {
      try {
        // Update status to publishing
        await updatePostStatus(post.id, 'publishing');

        // Get user's connection for this platform
        // We need to find the user_id from the post
        if (!post.user_id) {
          await updatePostStatus(post.id, 'failed');
          results.push({ postId: post.id, status: 'failed', error: 'No user associated' });
          continue;
        }

        const connection = await getSocialConnection(post.user_id, post.channel);
        if (!connection) {
          await updatePostStatus(post.id, 'failed');
          results.push({ postId: post.id, status: 'failed', error: `No ${post.channel} connection` });
          continue;
        }

        const publishLog = await createPublishLog(post.id, post.channel, 'publishing');

        const payload: SocialPostPayload = {
          content: post.content,
          mediaUrl: post.media_url || undefined,
          mediaType: (post.media_type as any) || 'image',
          title: post.title,
        };

        const auth = {
          accessToken: connection.access_token,
          refreshToken: connection.refresh_token || undefined,
          platformUserId: connection.platform_user_id || undefined,
          platformUsername: connection.platform_username || undefined,
          expiresAt: connection.expires_at || undefined,
        };

        const result = await publishToSocialPlatform(post.channel as SocialPlatform, auth, payload);

        if (result.success) {
          await updatePublishLog(publishLog.id, {
            platformPostId: result.platformPostId || '',
            platformUrl: result.platformUrl || '',
            status: 'success',
          });
          await updatePostStatus(post.id, 'published', new Date().toISOString());
          results.push({
            postId: post.id,
            status: 'success',
            channel: post.channel,
            platformPostId: result.platformPostId,
          });
        } else {
          await updatePublishLog(publishLog.id, {
            status: 'failed',
            errorMessage: result.error || 'Publish failed',
          });
          // Retry logic: if retry count < 3, increment and keep scheduled
          if (publishLog.retry_count < 3) {
            await updatePublishLog(publishLog.id, { retryCount: publishLog.retry_count + 1 });
            await updatePostStatus(post.id, 'scheduled');
          } else {
            await updatePostStatus(post.id, 'failed');
          }
          results.push({
            postId: post.id,
            status: 'failed',
            error: result.error,
            retryCount: publishLog.retry_count + 1,
          });
        }
      } catch (err: any) {
        await updatePostStatus(post.id, 'failed');
        results.push({ postId: post.id, status: 'failed', error: err.message });
      }
    }

    return res.json({
      message: `Processed ${results.length} scheduled posts`,
      results,
    });
  } catch (error: any) {
    console.error('Cron publish error:', error);
    return res.status(500).json({ error: error.message || 'Cron processing failed' });
  }
}
