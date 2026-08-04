import React from 'react';
import {
  FileText,
  Target,
  PieChart,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Play,
  Calendar,
} from 'lucide-react';
import { WeeklyBrief, BrandSettings } from '../types';

interface WeeklyBriefViewProps {
  weeklyBrief: WeeklyBrief;
  brandSettings: BrandSettings;
  onGenerateTopic: (topic: string) => void;
}

export const WeeklyBriefView: React.FC<WeeklyBriefViewProps> = ({
  weeklyBrief,
  brandSettings,
  onGenerateTopic,
}) => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Weekly Intelligence Report
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Marketing & Content Strategy Brief</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Period: <span className="text-slate-200 font-medium">{weeklyBrief.weekOf}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-right">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Brand Context</p>
            <p className="text-xs font-bold text-indigo-300">{brandSettings.brandName}</p>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Executive AI Summary</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-normal">
          {weeklyBrief.summary}
        </p>
      </div>

      {/* Grid: Strategic Goals + Pillars & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Goals */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Top Priorities For The Week</h3>
          </div>

          <div className="space-y-2.5">
            {weeklyBrief.topGoals.map((goal, i) => (
              <div
                key={i}
                className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-medium leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Pillars Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <PieChart className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Recommended Pillar Allocation</h3>
          </div>

          <div className="space-y-3">
            {weeklyBrief.contentPillarsFocus.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                  <span>{p}</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: `${i === 0 ? 40 : 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Competitor Alerts */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 uppercase">
              <AlertTriangle className="w-3.5 h-3.5" /> Competitor Signals
            </span>
            {weeklyBrief.competitorAlerts.map((alt, idx) => (
              <p key={idx} className="text-xs text-slate-300 bg-amber-950/20 border border-amber-900/30 p-2.5 rounded-xl leading-relaxed">
                {alt}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* High-Converting Topic Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Recommended High-Intent Topics</h3>
          </div>
          <span className="text-xs text-slate-500">1-Click Content Launch</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyBrief.suggestedTopics.map((top, i) => (
            <div
              key={i}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl flex flex-col justify-between space-y-3 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {top.platform}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">High Reach</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {top.topic}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{top.reasoning}</p>
              </div>

              <button
                onClick={() => onGenerateTopic(top.topic)}
                className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Generate Campaign Post</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
