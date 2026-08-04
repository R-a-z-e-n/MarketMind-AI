import React from 'react';
import {
  LayoutDashboard,
  Bot,
  FileText,
  Search,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Video,
  TrendingUp,
  ShieldCheck,
  Send,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Target,
  Sliders,
  Building,
  ChevronRight,
} from 'lucide-react';
import { NavPage, UserRole } from '../types';

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  userRole: UserRole;
  scheduledCount?: number;
  inReviewCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  userRole,
  scheduledCount = 2,
  inReviewCount = 1,
}) => {
  const navItems: { id: NavPage; label: string; icon: React.FC<{ className?: string }>; badge?: number | string; category?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'command_center', label: 'AI Command Center', icon: Bot, badge: 'AI' },
    { id: 'weekly_brief', label: 'Weekly Brief', icon: FileText, badge: 'New' },

    { id: 'ai_strategy', label: 'AI Strategy Hub', icon: Target, category: 'STRATEGY', badge: 'Hub' },
    { id: 'research', label: 'Research Center', icon: Search, category: 'STRATEGY' },
    { id: 'planner', label: 'Content Planner', icon: Calendar, category: 'STRATEGY' },

    { id: 'generator', label: 'Content Generator', icon: Sparkles, category: 'CREATION', badge: 'Popular' },
    { id: 'image_studio', label: 'Image Studio', icon: ImageIcon, category: 'CREATION' },
    { id: 'video_studio', label: 'Video Studio', icon: Video, category: 'CREATION' },

    { id: 'seo', label: 'SEO Center', icon: TrendingUp, category: 'OPTIMIZATION' },
    { id: 'review', label: 'AI Review Center', icon: ShieldCheck, category: 'OPTIMIZATION', badge: inReviewCount > 0 ? inReviewCount : undefined },

    { id: 'publishing', label: 'Publishing Queue', icon: Send, category: 'DISTRIBUTION', badge: scheduledCount > 0 ? scheduledCount : undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'DISTRIBUTION' },

    { id: 'automation', label: 'Automation & APIs', icon: Sliders, category: 'AUTOMATION', badge: 'Rules' },

    { id: 'team', label: 'Team Workspace', icon: Users, category: 'SETTINGS' },
    { id: 'brand_settings', label: 'Brand & Assets', icon: Settings, category: 'SETTINGS' },
    { id: 'enterprise', label: 'Enterprise & RBAC', icon: Building, category: 'SETTINGS' },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard, category: 'SETTINGS' },
  ];

  let currentCategory = '';

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-screen sticky top-0 z-30 select-none shrink-0">
      {/* Brand Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-700/80 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img src="/shuroq-icon.svg" alt="Shuroq" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1">
                Shuroq
              </h1>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30">
                TECH
              </span>
            </div>
            <p className="text-[10px] text-sky-400 font-bold tracking-widest uppercase truncate">
              TECH REDEFINED
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isCategoryStart = item.category && item.category !== currentCategory;
          if (isCategoryStart) {
            currentCategory = item.category!;
          }

          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <React.Fragment key={item.id}>
              {isCategoryStart && (
                <div className="pt-4 pb-1.5 px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  {item.category}
                </div>
              )}
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : typeof item.badge === 'number'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Role Card */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
              AR
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">Alex Rivera</p>
              <p className="text-[10px] text-indigo-400 capitalize font-medium">{userRole.replace('_', ' ')}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </aside>
  );
};
