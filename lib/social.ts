export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'facebook';

export interface SocialPostResult {
  success: boolean;
  platformPostId?: string;
  platformUrl?: string;
  error?: string;
}

export interface SocialPostPayload {
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  hashtags?: string[];
  title?: string;
}

export interface PlatformAuthConfig {
  accessToken: string;
  refreshToken?: string;
  platformUserId?: string;
  expiresAt?: string;
}

// LinkedIn API integration
export async function postToLinkedIn(
  auth: PlatformAuthConfig,
  payload: SocialPostPayload
): Promise<SocialPostResult> {
  try {
    const personUrn = `urn:li:person:${auth.platformUserId}`;
    const organizationUrn = auth.platformUserId?.startsWith('org:')
      ? `urn:li:organization:${auth.platformUserId.replace('org:', '')}`
      : null;

    const authorUrn = organizationUrn || personUrn;

    const sharePayload: Record<string, any> = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: payload.content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    // If media URL is provided, add it to the post
    if (payload.mediaUrl) {
      // First upload the media to get a URN
      const uploadRes = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: authorUrn,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent',
            }],
          },
        }),
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        const uploadUrl = uploadData.value?.uploadMechanism?.[
          'com.linkedin.digitalmedia.UploadMedia'
        ]?.uploadUrl;
        const asset = uploadData.value?.asset;

        if (uploadUrl && asset) {
          // Download the image and upload to LinkedIn
          const imageRes = await fetch(payload.mediaUrl);
          if (imageRes.ok) {
            const imageBuffer = await imageRes.arrayBuffer();
            await fetch(uploadUrl, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
                'Content-Type': 'application/octet-stream',
              },
              body: imageBuffer,
            });

            sharePayload.specificContent['com.linkedin.ugc.ShareContent'].media = [{
              status: 'READY',
              media: asset,
              title: {
                text: payload.title || '',
              },
            }];
            sharePayload.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'IMAGE';
          }
        }
      }
    }

    const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(sharePayload),
    });

    if (!res.ok) {
      const errData = await res.json();
      return {
        success: false,
        error: errData.message || `LinkedIn API error: ${res.status}`,
      };
    }

    const data = await res.json();
    const postId = data.id;
    // Extract numeric ID from URN
    const numericId = postId?.split(':').pop() || '';

    return {
      success: true,
      platformPostId: numericId,
      platformUrl: `https://www.linkedin.com/feed/update/${postId}`,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'LinkedIn posting failed' };
  }
}

// Twitter/X API integration
export async function postToTwitter(
  auth: PlatformAuthConfig,
  payload: SocialPostPayload
): Promise<SocialPostResult> {
  try {
    // Twitter v2 API - create tweet
    const tweetPayload: Record<string, any> = {
      text: payload.content,
    };

    // If media URL is provided, upload and attach it
    if (payload.mediaUrl) {
      // Download the media
      const mediaRes = await fetch(payload.mediaUrl);
      if (mediaRes.ok) {
        const mediaBuffer = await mediaRes.arrayBuffer();
        const mediaBlob = new Blob([mediaBuffer]);

        // Upload media using Twitter media upload endpoint v1.1
        const formData = new FormData();
        formData.append('media', mediaBlob, 'media.jpg');

        const uploadRes = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          tweetPayload.media = {
            media_ids: [uploadData.media_id_string],
          };
        }
      }
    }

    const res = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetPayload),
    });

    if (!res.ok) {
      const errData = await res.json();
      return {
        success: false,
        error: errData.errors?.[0]?.message || `Twitter API error: ${res.status}`,
      };
    }

    const data = await res.json();
    const tweetId = data.data?.id;

    return {
      success: true,
      platformPostId: tweetId,
      platformUrl: tweetId ? `https://twitter.com/i/status/${tweetId}` : undefined,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Twitter posting failed' };
  }
}

// Facebook API integration
export async function postToFacebook(
  auth: PlatformAuthConfig,
  payload: SocialPostPayload
): Promise<SocialPostResult> {
  try {
    const pageId = auth.platformUserId;
    if (!pageId) {
      return { success: false, error: 'Facebook Page ID is required' };
    }

    const postBody: Record<string, any> = {
      message: payload.content,
      access_token: auth.accessToken,
    };

    // If media URL is provided
    if (payload.mediaUrl) {
      // For images, use the photo endpoint
      if (payload.mediaType === 'image' || !payload.mediaType) {
        postBody.url = payload.mediaUrl;

        const res = await fetch(
          `https://graph.facebook.com/v19.0/${pageId}/photos`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody),
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          return {
            success: false,
            error: errData.error?.message || `Facebook API error: ${res.status}`,
          };
        }

        const data = await res.json();
        return {
          success: true,
          platformPostId: data.id,
          platformUrl: `https://facebook.com/${pageId}/posts/${data.id}`,
        };
      }
    }

    // Text-only post
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/feed`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      return {
        success: false,
        error: errData.error?.message || `Facebook API error: ${res.status}`,
      };
    }

    const data = await res.json();
    return {
      success: true,
      platformPostId: data.id,
      platformUrl: `https://facebook.com/${pageId}/posts/${data.id}`,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Facebook posting failed' };
  }
}

// Instagram API integration (requires Facebook Business account)
export async function postToInstagram(
  auth: PlatformAuthConfig,
  payload: SocialPostPayload
): Promise<SocialPostResult> {
  try {
    const igUserId = auth.platformUserId;
    if (!igUserId) {
      return { success: false, error: 'Instagram Business Account ID is required' };
    }

    if (!payload.mediaUrl) {
      return { success: false, error: 'Instagram requires media (image or video)' };
    }

    // Step 1: Create media container
    const containerRes = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: payload.mediaUrl,
          caption: payload.content,
          access_token: auth.accessToken,
        }),
      }
    );

    if (!containerRes.ok) {
      const errData = await containerRes.json();
      return {
        success: false,
        error: errData.error?.message || `Instagram container creation failed: ${containerRes.status}`,
      };
    }

    const containerData = await containerRes.json();
    const containerId = containerData.id;

    // Step 2: Publish the container
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: auth.accessToken,
        }),
      }
    );

    if (!publishRes.ok) {
      const errData = await publishRes.json();
      return {
        success: false,
        error: errData.error?.message || `Instagram publish failed: ${publishRes.status}`,
      };
    }

    const publishData = await publishRes.json();
    return {
      success: true,
      platformPostId: publishData.id,
      platformUrl: `https://www.instagram.com/p/${publishData.id}`,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Instagram posting failed' };
  }
}

// Unified publish function
export async function publishToSocialPlatform(
  platform: SocialPlatform,
  auth: PlatformAuthConfig,
  payload: SocialPostPayload
): Promise<SocialPostResult> {
  switch (platform) {
    case 'linkedin':
      return postToLinkedIn(auth, payload);
    case 'twitter':
      return postToTwitter(auth, payload);
    case 'facebook':
      return postToFacebook(auth, payload);
    case 'instagram':
      return postToInstagram(auth, payload as any);
    default:
      return { success: false, error: `Unsupported platform: ${platform}` };
  }
}
