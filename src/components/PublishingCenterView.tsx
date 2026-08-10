import React, { useState } from 'react';
import {
  Send,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Play,
  Trash2,
  ExternalLink,
  Users,
  Sparkles,
} from 'lucide-react';
import { PostItem, PostStatus, UserRole } from '../types';

interface PublishingCenterViewProps {
  posts: PostItem[];
  userRole: UserRole;
  onUpdateStatus: (postId: string, newStatus: PostStatus) => void;
  onDeletePost: (postId: string) => void;
  onOpenCreatePost: () => void;
}

export const PublishingCenterView: React.FC<PublishingCenterViewProps> = ({
  posts,
  userRole,
  onUpdateStatus,
  onDeletePost,
  onOpenCreatePost,
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'drafts' | 'published'>('queue');
  const [publishedToast, setPublishedToast] = useState<string | null>(null);
  const [publishingPostId, setPublishingPostId] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleInstantPublish = async (post: PostItem) => {
    setPublishingPostId(post.id);
    setPublishError(null);

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/social/post/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          postId: post.id,
          channel: post.channel,
          content: post.content,
          mediaUrl: post.mediaUrl,
          title: post.title,
          hashtags: post.hashtags,
        }),
      });

      const data = await res.json();

      if (data.success) {
        onUpdateStatus(post.id, 'published');
        setPublishedToast(
          post.channel === 'twitter'
            ? `Tweet published successfully! ${data.platformUrl || ''}`
            : `Post published to ${post.channel.toUpperCase()} successfully! ${data.platformUrl || ''}`
        );
      } else {
        setPublishError(data.error || `Failed to publish to ${post.channel}`);
        setPublishedToast(null);
      }
    } catch (err: any) {
      setPublishError(err.message || 'Network error - is the backend running?');
      setPublishedToast(null);
    } finally {
      setPublishingPostId(null);
      setTimeout(() => {
        setPublishedToast(null);
        setPublishError(null);
      }, 6000);
    }
  };

  const scheduledPosts = posts.filter((p) => p.status === 'scheduled' || p.status === 'in_review');
  const draftPosts = posts.filter((p) => p.status === 'draft');
  const publishedPosts = posts.filter((p) => p.status === 'published');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {publishedToast && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{publishedToast}</span>
        </div>
      )}

      {publishError && (
        <div className="bg-red-600 text-white p-4 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{publishError}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" />
            Multi-Platform Publishing & Approval Queue
          </h2>
          <p className="text-xs text-slate-400">
            Automate post timing, manage draft approvals, and publish instantly across 8 channels.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'queue' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Scheduled Queue ({scheduledPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'drafts' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Drafts ({draftPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'published' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Published History ({publishedPosts.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Scheduled Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Upcoming Scheduled Posts</h3>
            <span className="text-xs text-slate-400">Role Permissions: {userRole.toUpperCase()}</span>
          </div>

          <div className="space-y-3">
            {scheduledPosts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
                No scheduled posts in the queue.
              </div>
            ) : (
              scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 shadow-lg transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {post.channel}
                      </span>
                      <span className="text-xs font-bold text-slate-100">{post.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          post.status === 'in_review'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {post.status.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {post.scheduledAt
                          ? new Date(post.scheduledAt).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Scheduled'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal whitespace-pre-wrap line-clamp-3">
                    {post.content}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-[11px] text-slate-400">
                      Author: <span className="text-slate-200 font-medium">{post.author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {userRole === 'viewer' ? (
                        <span className="text-[11px] text-slate-500 italic">Read-only view mode</span>
                      ) : (
                        <>
                          {post.status === 'in_review' && (
                            <button
                              onClick={() => onUpdateStatus(post.id, 'scheduled')}
                              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold transition-all"
                            >
                              Approve & Schedule
                            </button>
                          )}

                          <button
                            onClick={() => handleInstantPublish(post)}
                            disabled={publishingPostId === post.id}
                            className={`px-3.5 py-1.5 ${
                              publishingPostId === post.id
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-500'
                            } text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all`}
                          >
                            {publishingPostId === post.id ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Publishing...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Publish Now</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => onDeletePost(post.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Drafts */}
      {activeTab === 'drafts' && (
        <div className="space-y-3">
          {draftPosts.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{post.title}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">{post.channel}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">{post.content}</p>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onUpdateStatus(post.id, 'scheduled')}
                  className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
                >
                  Move to Scheduled Queue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Published History */}
      {activeTab === 'published' && (
        <div className="space-y-3">
          {publishedPosts.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {post.title}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">{post.channel}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
              {post.analytics && (
                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Views: {post.analytics.views}</span>
                  <span>Likes: {post.analytics.likes}</span>
                  <span>CTR: {post.analytics.ctr}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
