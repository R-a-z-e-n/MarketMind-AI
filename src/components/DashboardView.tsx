import React from 'react';
import { ShuroqBannerCard } from './ShuroqBrand';
import {
  Sparkles,
  TrendingUp,
  Send,
  BarChart2,
  Calendar as CalendarIcon,
  Search,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Zap,
  Play,
  FileText,
  AlertCircle,
  Users,
} from 'lucide-react';
import {
  PageId,
  PostItem,
  WeeklyBrief,
  AnalyticsSummary,
  TrendItem,
  BrandSettings,
  UserRole,
} from '../types';

interface DashboardViewProps {
  setActivePage?: (page: PageId) => void;
  onNavigate?: (page: PageId) => void;
  weeklyBrief: WeeklyBrief;
  posts: PostItem[];
  analytics: AnalyticsSummary;
  trends?: TrendItem[];
  brandSettings?: BrandSettings;
  userRole?: UserRole;
  onOpenCreatePost?: () => void;
  onGenerateTopic?: (topic: string) => void;
  onQuickGenerateTopic?: (topic: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActivePage,
  onNavigate,
  weeklyBrief,
  posts = [],
  analytics,
  trends = [],
  onGenerateTopic,
  onQuickGenerateTopic,
}) => {
  const nav = onNavigate || setActivePage || (() => {});
  const genTopic = onGenerateTopic || onQuickGenerateTopic || (() => {});

  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');
  const recentPublished = posts.filter((p) => p.status === 'published');
  const suggestedTopics = weeklyBrief?.suggestedTopics || [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Shuroq Corporate Service Banner */}
      <ShuroqBannerCard
        onSelectService={(service) => {
          genTopic(`Campaign strategy for Shuroq ${service}`);
          nav('generator');
        }}
      />

      {/* Top AI Brief Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/80 via-slate-900 to-slate-900 border border-indigo-500/30 p-6 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                AI Strategy Brief • {weeklyBrief?.weekOf}
              </span>
            </div>
            <button
              onClick={() => nav('weekly_brief')}
              className="text-xs text-indigo-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              <span>View Full Intelligence Report</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-normal max-w-3xl">
            "{weeklyBrief?.summary}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {suggestedTopics.map((top, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl p-3 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span className="uppercase font-bold tracking-wider text-indigo-400">{top.platform}</span>
                    <span className="text-emerald-400 font-medium">High Impact</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {top.topic}
                  </p>
                </div>
                <button
                  onClick={() => genTopic(top.topic)}
                  className="mt-3 text-[11px] font-medium text-indigo-400 hover:text-indigo-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <Play className="w-3 h-3 fill-indigo-400" />
                  <span>Generate Post</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Impressions</p>
            <h3 className="text-xl font-bold text-white mt-1">{analytics.totalImpressions.toLocaleString()}</h3>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> +{analytics.impressionsGrowth}% this month
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Engagement</p>
            <h3 className="text-xl font-bold text-white mt-1">{analytics.totalEngagement.toLocaleString()}</h3>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> +{analytics.engagementGrowth}% vs last month
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-400 font-medium">Avg CTR Score</p>
            <h3 className="text-xl font-bold text-white mt-1">{analytics.avgCTR}%</h3>
            <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-0.5 mt-1">
              Top channel: {analytics.topPerformingChannel}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs text-slate-400 font-medium">Scheduled Queue</p>
            <h3 className="text-xl font-bold text-white mt-1">{scheduledPosts.length} Posts</h3>
            <span className="text-[11px] font-medium text-amber-400 flex items-center gap-0.5 mt-1">
              <Clock className="w-3 h-3" /> Next post in 18 hrs
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Scheduled Queue + Trending Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upcoming Scheduled Posts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Upcoming Publishing Queue</h3>
              </div>
              <button
                onClick={() => nav('publishing')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                View Queue
              </button>
            </div>

            <div className="space-y-3">
              {scheduledPosts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No posts scheduled. Click New Content to draft one!</div>
              ) : (
                scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {post.channel}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Scheduled'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-100 truncate">{post.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{post.content}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                        {post.aiQualityScore}% Quality
                      </span>
                      <button
                        onClick={() => nav('publishing')}
                        className="text-[11px] text-slate-400 hover:text-white"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AI Quick Launch Actions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => nav('generator')}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Generate Post</p>
                <p className="text-[10px] text-slate-500 mt-0.5">LinkedIn, X, Blogs</p>
              </button>

              <button
                onClick={() => nav('research')}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
              >
                <Search className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">SWOT Audit</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Competitor Live Web</p>
              </button>

              <button
                onClick={() => nav('image_studio')}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
              >
                <FileText className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Image Carousel</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Infographics & Banners</p>
              </button>

              <button
                onClick={() => nav('video_studio')}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
              >
                <Play className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Video Scripts</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Reels & TikTok Hooks</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Trending Topics & Research Radar */}
        <div className="space-y-4">
          {/* Trending Topics Radar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Trending Market Signals</h3>
              </div>
              <button
                onClick={() => nav('research')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Explore Radar
              </button>
            </div>

            <div className="space-y-3">
              {trends.map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-400">{t.category}</span>
                    <span className="text-emerald-400 font-bold">{t.growth} growth</span>
                  </div>
                  <p className="text-xs font-bold text-slate-100">{t.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{t.summary}</p>
                  <button
                    onClick={() => genTopic(t.title)}
                    className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 pt-1 block"
                  >
                    + Create Campaign Post Around This →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Team Activity Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> Team Activity
              </span>
              <button onClick={() => nav('team')} className="text-[11px] text-indigo-400 hover:underline">
                Manage Team
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">Sarah Chen updated brand tone guidelines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                <span className="truncate">Alex Rivera scheduled 2 LinkedIn posts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate">David Kalu requested AI Review for newsletter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
