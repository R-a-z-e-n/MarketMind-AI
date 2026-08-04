import React, { useState } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  Building2,
  UserCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  X,
  Plus,
  LogOut,
  ShieldCheck,
  Users,
  Eye,
} from 'lucide-react';
import { NavPage, UserRole, AuthUser } from '../types';

interface HeaderProps {
  activePage: NavPage;
  userRole: UserRole;
  currentUser: AuthUser | null;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onOpenNewPostModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  userRole,
  currentUser,
  onRoleChange,
  onLogout,
  onOpenNewPostModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'Post Scheduled',
      time: '10m ago',
      desc: 'LinkedIn Thought Leadership post scheduled for tomorrow at 9:00 AM.',
    },
    {
      id: '2',
      title: 'AI Review Complete',
      time: '1h ago',
      desc: 'Instagram Carousel reviewed with 96% Brand Voice score.',
    },
    {
      id: '3',
      title: 'Competitor SWOT Alert',
      time: '3h ago',
      desc: 'Competitor launched a new campaign. Check Research Center.',
    },
  ];

  const pageTitles: Record<NavPage, { title: string; subtitle: string }> = {
    dashboard: { title: 'Executive Command Center', subtitle: 'Real-time marketing metrics, AI brief, and upcoming queue' },
    command_center: { title: 'AI Command Center', subtitle: 'Interactive assistant for marketing strategy & prompt generation' },
    weekly_brief: { title: 'Weekly Strategy Brief', subtitle: 'Automated intelligence briefing and top campaign priorities' },
    ai_strategy: { title: 'AI Strategy Hub & Agents', subtitle: 'GTM strategy, buyer personas, RAG knowledge base, and agent marketplace' },
    research: { title: 'Research & Competitor Center', subtitle: 'AI web research, Google search grounding, and SWOT detection' },
    planner: { title: 'Content Planner & Calendar', subtitle: 'Multi-platform campaign scheduling and editorial management' },
    generator: { title: 'Multi-Platform Content Generator', subtitle: 'Generate LinkedIn, X, Instagram, Blog, and Newsletter copy' },
    image_studio: { title: 'AI Image & Visual Studio', subtitle: 'Social banners, carousel slides, and visual prompt engineering' },
    video_studio: { title: 'Short-Form Video Studio', subtitle: 'Reels, Shorts & TikTok script generator with viral hooks' },
    seo: { title: 'SEO & Search Optimization', subtitle: 'Keyword suggestions, hashtags, and meta tag optimization' },
    review: { title: 'AI Review & Compliance Center', subtitle: 'Grammar, readability, and brand voice alignment check' },
    publishing: { title: 'Publishing & Approval Queue', subtitle: 'Instant multi-platform distribution and scheduling queue' },
    automation: { title: 'Automation & Integrations', subtitle: 'Workflow builder, CRM connectors (HubSpot, Salesforce), n8n & webhooks' },
    analytics: { title: 'Performance Analytics Dashboard', subtitle: 'Multi-channel engagement metrics, CTR rates, and reach' },
    team: { title: 'Team Workspace & Permissions', subtitle: 'Role-based access control, team seats, and approval workflows' },
    brand_settings: { title: 'Brand & Digital Assets', subtitle: 'Shuroq logos, banners, tone of voice, and brand guidelines' },
    enterprise: { title: 'Enterprise & Governance', subtitle: 'Multi-workspace management, RBAC, SSO, audit logs & AI cost control' },
    billing: { title: 'Billing & Token Usage', subtitle: 'Subscription plan, Gemini API credit consumption, and limits' },
  };

  const currentMeta = pageTitles[activePage] || {
    title: 'Shuroq Tech Redefined Workspace',
    subtitle: 'Autonomous AI technology & content platform',
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Context Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="hidden md:flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
          <img src="/shuroq-icon.svg" alt="Shuroq Icon" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-extrabold text-sky-400 tracking-wider uppercase">Shuroq AI</span>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span>{currentMeta.title}</span>
          </h2>
          <p className="text-[11px] text-slate-400 truncate max-w-md hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Quick Action Button */}
        <button
          onClick={onOpenNewPostModal}
          className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Post</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Menu */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-indigo-500/40"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-white line-clamp-1">
                {currentUser?.name || 'User Account'}
              </span>
              <span className="block text-[9px] text-indigo-400 capitalize font-medium">
                {userRole.replace('_', ' ')}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 space-y-3 z-50 text-xs">
              {/* User Profile Card */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-sky-500/40"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="overflow-hidden">
                  <span className="font-bold text-white block text-xs truncate">
                    {currentUser?.name || 'Logged User'}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {currentUser?.email || 'user@shuroqtech.com'}
                  </span>
                  <span
                    className={`inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      userRole === 'admin'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : userRole === 'team_member'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    Role: {userRole.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="space-y-1">
                <span className="px-1 text-[10px] font-bold text-slate-500 uppercase block">
                  Switch Active Role View
                </span>
                {(['admin', 'team_member', 'viewer'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg capitalize font-medium flex items-center justify-between ${
                      userRole === r
                        ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {r === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
                      {r === 'team_member' && <Users className="w-3.5 h-3.5 text-sky-400" />}
                      {r === 'viewer' && <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{r.replace('_', ' ')}</span>
                    </div>
                    {userRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowRoleMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 font-bold flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out / Switch User</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
