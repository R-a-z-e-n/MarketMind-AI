import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  Send,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Play,
  FileText,
} from 'lucide-react';
import { PostItem, CampaignItem, PlatformChannel, PostStatus } from '../types';

interface ContentPlannerViewProps {
  posts: PostItem[];
  campaigns: CampaignItem[];
  onOpenCreatePost: () => void;
  onSelectPost: (post: PostItem) => void;
  onGenerateCampaignPost: (campaignName: string) => void;
}

export const ContentPlannerView: React.FC<ContentPlannerViewProps> = ({
  posts = [],
  campaigns = [],
  onOpenCreatePost,
  onSelectPost,
  onGenerateCampaignPost,
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'campaigns'>('calendar');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const channelsList: { id: string; label: string }[] = [
    { id: 'all', label: 'All Channels' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'twitter', label: 'X / Twitter' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'blog', label: 'Blog' },
    { id: 'newsletter', label: 'Newsletter' },
  ];

  const filteredPosts = posts.filter((p) => {
    if (selectedChannel !== 'all' && p.channel !== selectedChannel) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    return true;
  });

  // Simple calendar grid representation
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Content & Editorial Calendar Planner</h2>
            <p className="text-xs text-slate-400">
              Schedule, structure, and orchestrate multi-platform marketing campaigns seamlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-xl">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === 'calendar'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Editorial Calendar</span>
              </button>

              <button
                onClick={() => setViewMode('campaigns')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === 'campaigns'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Campaign Hub</span>
              </button>
            </div>

            <button
              onClick={onOpenCreatePost}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
              <Filter className="w-3.5 h-3.5" /> Channel:
            </span>
            {channelsList.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChannel(ch.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedChannel === ch.id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 text-xs focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_review">In Review</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar View Mode */}
      {viewMode === 'calendar' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                August 2026 Editorial View
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-200">Current Week</span>
                <button className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Days Grid Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
              {daysOfWeek.map((d, i) => (
                <div key={i} className="py-1">
                  {d} <span className="text-[10px] text-slate-600 font-normal">Aug {3 + i}</span>
                </div>
              ))}
            </div>

            {/* Calendar Day Slots */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 min-h-[360px]">
              {daysOfWeek.map((day, idx) => {
                const dayDateNum = 3 + idx;
                const dayPosts = filteredPosts.filter((p) => {
                  if (!p.scheduledAt && !p.publishedAt) return idx === 0; // place drafts on first day for visibility
                  const d = new Date(p.scheduledAt || p.publishedAt || '');
                  return d.getDate() === dayDateNum || (idx === 0 && p.status === 'draft');
                });

                return (
                  <div
                    key={idx}
                    className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2 flex flex-col justify-between space-y-2 min-h-[120px]"
                  >
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-500 flex items-center justify-between">
                        <span>Day {dayDateNum}</span>
                        {dayPosts.length > 0 && (
                          <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                            {dayPosts.length}
                          </span>
                        )}
                      </div>

                      {dayPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => onSelectPost(post)}
                          className={`p-2 rounded-lg border text-left cursor-pointer transition-all hover:scale-[1.02] ${
                            post.status === 'published'
                              ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                              : post.status === 'scheduled'
                              ? 'bg-indigo-950/30 border-indigo-800/40 text-indigo-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] font-bold uppercase mb-1">
                            <span className="text-indigo-400">{post.channel}</span>
                            <span className="capitalize text-slate-400">{post.status.replace('_', ' ')}</span>
                          </div>
                          <p className="text-[11px] font-semibold line-clamp-2 leading-tight">{post.title}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={onOpenCreatePost}
                      className="w-full py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 rounded text-[10px] text-slate-400 hover:text-slate-200 text-center font-medium transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Campaigns View Mode */}
      {viewMode === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Strategic Campaigns</h3>
            <span className="text-xs text-slate-400">{campaigns.length} Active Campaigns</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {camp.status}
                    </span>
                    <h4 className="font-bold text-white text-base mt-1">{camp.name}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{camp.postsCount} Posts</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{camp.objective}</p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>
                    Duration: {camp.startDate} to {camp.endDate}
                  </span>
                  <button
                    onClick={() => onGenerateCampaignPost(camp.name)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Campaign Content</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
