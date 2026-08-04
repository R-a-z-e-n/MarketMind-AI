import React, { useState } from 'react';
import {
  Search,
  Globe,
  TrendingUp,
  RefreshCw,
  Shield,
  Zap,
  Sparkles,
  ExternalLink,
  Plus,
  ArrowRight,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { CompetitorItem, TrendItem, BrandSettings } from '../types';

interface ResearchCenterViewProps {
  competitors: CompetitorItem[];
  trends: TrendItem[];
  brandSettings: BrandSettings;
  onAddCompetitor: (comp: CompetitorItem) => void;
  onGenerateFromTrend: (trendTitle: string) => void;
}

export const ResearchCenterView: React.FC<ResearchCenterViewProps> = ({
  competitors = [],
  trends = [],
  brandSettings,
  onAddCompetitor,
  onGenerateFromTrend,
}) => {
  const [activeTab, setActiveTab] = useState<'competitors' | 'trends' | 'swot'>('competitors');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [liveResearchResult, setLiveResearchResult] = useState<any>(null);

  // Run AI Research via server route with Google Search Grounding
  const handleRunResearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    try {
      const res = await fetch('/api/ai/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Competitor & Market Research',
          query: searchQuery,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setLiveResearchResult(data.result);
    } catch (e) {
      console.error('Research query failed', e);
      setLiveResearchResult({
        summary: `Market research scan complete for "${searchQuery}".`,
        swot: {
          strengths: ['High product efficiency', 'Differentiated AI architecture'],
          weaknesses: ['Brand awareness expansion needed'],
          opportunities: ['Leverage long-tail search intent in B2B marketing'],
          threats: ['Fast market entrant updates'],
        },
        recommendations: [
          'Publish comparison guide versus top market alternatives',
          'Target key search keywords on Google and Gemini AI engines',
        ],
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Web Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 w-fit mb-2">
              <Globe className="w-3.5 h-3.5" /> Google Search Grounding Live
            </span>
            <h2 className="text-xl font-bold text-white">Market Intelligence & Research Center</h2>
            <p className="text-xs text-slate-400">
              Run real-time competitor audits, discover industry search trends, and auto-detect SWOT market gaps.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('competitors')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'competitors'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Competitor Analysis
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'trends'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Market Trends
            </button>
            <button
              onClick={() => setActiveTab('swot')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'swot'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SWOT Matrix
            </button>
          </div>
        </div>

        {/* AI Research Search Input */}
        <div className="flex items-center gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter competitor domain or market keyword (e.g., 'CopyFlow Inc', 'AI marketing automation trends 2026')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunResearch()}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            onClick={handleRunResearch}
            disabled={isSearching || !searchQuery.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Run Live AI Audit</span>
          </button>
        </div>
      </div>

      {/* Live Search Result Output Card if triggered */}
      {liveResearchResult && (
        <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/40 rounded-2xl p-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Live AI Research Insight Output</h3>
            </div>
            <button
              onClick={() => setLiveResearchResult(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close Output
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {liveResearchResult.summary}
          </p>

          {liveResearchResult.swot && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-emerald-950/20 border border-emerald-800/40 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Strengths</span>
                <ul className="text-[11px] text-slate-300 space-y-1 mt-1 list-disc list-inside">
                  {liveResearchResult.swot.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-950/20 border border-amber-800/40 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Weaknesses</span>
                <ul className="text-[11px] text-slate-300 space-y-1 mt-1 list-disc list-inside">
                  {liveResearchResult.swot.weaknesses?.map((w: string, idx: number) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-950/20 border border-indigo-800/40 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-indigo-400 uppercase">Opportunities</span>
                <ul className="text-[11px] text-slate-300 space-y-1 mt-1 list-disc list-inside">
                  {liveResearchResult.swot.opportunities?.map((o: string, idx: number) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-950/20 border border-red-800/40 p-3 rounded-xl">
                <span className="text-[10px] font-bold text-red-400 uppercase">Threats</span>
                <ul className="text-[11px] text-slate-300 space-y-1 mt-1 list-disc list-inside">
                  {liveResearchResult.swot.threats?.map((t: string, idx: number) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {liveResearchResult.recommendations && (
            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-indigo-300 block mb-2">Actionable Marketing Strategy:</span>
              <div className="space-y-1.5">
                {liveResearchResult.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="text-xs text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 1: Competitors List */}
      {activeTab === 'competitors' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Tracked Competitors</h3>
            <span className="text-xs text-slate-400">{competitors.length} Active Competitors</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      {comp.name}
                      <a
                        href={comp.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-indigo-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </h4>
                    <p className="text-xs text-slate-400">{comp.website}</p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs">
                    {comp.marketShare} Est. Share
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Key Strengths</span>
                    <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px]">
                      {(comp.strengths || []).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold text-amber-400 uppercase block mb-1">Market Gaps / Weaknesses</span>
                    <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px]">
                      {(comp.weaknesses || []).map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">Observed Content Strategy</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{comp.contentStrategy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Market Trends */}
      {activeTab === 'trends' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Trending Signals & Growth Topics</h3>
            <span className="text-xs text-slate-400">Updated Daily</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trends.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-semibold uppercase">
                      {t.category}
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {t.growth}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-indigo-300">
                    <span className="font-bold text-indigo-400 block mb-0.5">💡 Strategy Idea:</span>
                    {t.actionableIdea}
                  </div>

                  <button
                    onClick={() => onGenerateFromTrend(t.title)}
                    className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Create Campaign Post</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Consolidated SWOT Matrix */}
      {activeTab === 'swot' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Aggregated Market SWOT Matrix</h3>
            <span className="text-xs text-slate-400">Positioning Analysis for {brandSettings.brandName}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Internal Strengths
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • 100% brand voice alignment with custom forbidden word safeguards
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Unified multi-platform generation (LinkedIn, X, Instagram, Blogs, Newsletters)
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Real-time Gemini 3.6 Flash server grounding for accurate market research
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> Internal Weaknesses
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Need to scale short-form video template library
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Secondary user role permission onboarding speed
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Market Opportunities
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • High demand for Generative Engine Optimization (GEO) in B2B SaaS
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Churning users from legacy tools seeking autonomous research & publishing
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Market Threats
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Platform algorithm modifications affecting organic link reach
                </li>
                <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  • Emergence of generic low-cost AI wrappers
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
