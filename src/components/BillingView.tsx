import React from 'react';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const BillingView: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            <span>Workspace Plan & AI Generation Quota</span>
          </div>
          <h2 className="text-xl font-bold text-white">Subscription & Token Usage</h2>
          <p className="text-xs text-slate-400">
            Monitor real-time Gemini token consumption, team seats, and plan tier limits.
          </p>
        </div>

        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-bold text-xs">
          Growth Pro Plan ($79/mo)
        </span>
      </div>

      {/* Usage Meter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center justify-between">
          <span>Monthly AI Generation Quota</span>
          <span className="text-xs text-slate-400 font-normal">Resets in 12 days</span>
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>68,400 / 100,000 Credits Used</span>
            <span className="text-indigo-400">68.4%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full w-[68.4%]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Posts Generated</span>
            <p className="text-lg font-bold text-white">428 Posts</p>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Research Audits</span>
            <p className="text-lg font-bold text-white">92 Scans</p>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Team Members</span>
            <p className="text-lg font-bold text-white">3 / 5 Seats</p>
          </div>
        </div>
      </div>

      {/* Plans comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-white text-sm">Starter</h4>
          <p className="text-2xl font-bold text-white">$29 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 20,000 AI Credits</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1 Team Seat</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standard Generation</li>
          </ul>
        </div>

        <div className="bg-slate-900 border-2 border-indigo-500 rounded-2xl p-5 space-y-4 relative shadow-2xl">
          <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase">
            Active Plan
          </span>
          <h4 className="font-bold text-white text-sm">Growth Pro</h4>
          <p className="text-2xl font-bold text-white">$79 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100,000 AI Credits</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5 Team Seats + RBAC</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Google Search Grounding</li>
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-white text-sm">Enterprise</h4>
          <p className="text-2xl font-bold text-white">$249 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Credits</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Team Seats</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Custom API Access</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
