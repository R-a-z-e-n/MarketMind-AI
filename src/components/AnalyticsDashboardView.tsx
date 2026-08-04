import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Send,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Sparkles,
  Award,
} from 'lucide-react';
import { AnalyticsSummary, PostItem } from '../types';

interface AnalyticsDashboardViewProps {
  analytics: AnalyticsSummary;
  posts: PostItem[];
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  analytics,
  posts = [],
}) => {
  const publishedPosts = (posts || []).filter((p) => p.status === 'published' && p.analytics);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span>Performance & Channel Growth Intelligence</span>
        </div>
        <h2 className="text-xl font-bold text-white">Marketing Analytics & Growth Dashboard</h2>
        <p className="text-xs text-slate-400">
          Track multi-channel reach, click-through rates, viral coefficient scores, and AI recommendations.
        </p>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Impressions</span>
            <Eye className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">{analytics.totalImpressions.toLocaleString()}</p>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{analytics.impressionsGrowth}% this month
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Engagement Actions</span>
            <Heart className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{analytics.totalEngagement.toLocaleString()}</p>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{analytics.engagementGrowth}% vs target
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average CTR Rate</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{analytics.avgCTR}%</p>
          <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{analytics.ctrGrowth}% increase
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Top Channel</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white uppercase">{analytics.topPerformingChannel}</p>
          <span className="text-[11px] font-semibold text-slate-400">
            {analytics.publishedCount} Total Posts Published
          </span>
        </div>
      </div>

      {/* Grid: Channel Breakdown + Top Performing Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Channel Breakdown */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" /> Channel Engagement Distribution
          </h3>

          <div className="space-y-3">
            {(analytics?.channelBreakdown || []).map((cb, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 uppercase">{cb.channel}</span>
                  <span className="text-emerald-400 font-bold">{cb.growthRate}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{cb.posts} Posts</span>
                  <span>{cb.engagement.toLocaleString()} Engagements</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: `${(cb.engagement / 10000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Published Posts */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Highest Performing Published Posts
          </h3>

          <div className="space-y-3">
            {publishedPosts.map((post) => (
              <div key={post.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {post.channel}
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px]">{post.analytics?.ctr}% CTR</span>
                </div>

                <p className="text-xs font-semibold text-slate-100">{post.title}</p>

                <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                  <span>👁️ {post.analytics?.views} Views</span>
                  <span>❤️ {post.analytics?.likes} Likes</span>
                  <span>💬 {post.analytics?.commentsCount} Comments</span>
                  <span>🔄 {post.analytics?.shares} Shares</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
