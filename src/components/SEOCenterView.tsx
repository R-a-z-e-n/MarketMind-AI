import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Sparkles,
  RefreshCw,
  Hash,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface SEOCenterViewProps {
  brandSettings: BrandSettings;
  onGeneratePostFromKeyword: (kw: string) => void;
}

export const SEOCenterView: React.FC<SEOCenterViewProps> = ({
  brandSettings,
  onGeneratePostFromKeyword,
}) => {
  const [topic, setTopic] = useState('');
  const [contentToOptimize, setContentToOptimize] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [seoResult, setSeoResult] = useState<any>({
    keywords: [
      { keyword: 'ai marketing automation platform', volume: '22.4K/mo', difficulty: 'Medium (42)', intent: 'Commercial' },
      { keyword: 'automated social media content planner', volume: '14.8K/mo', difficulty: 'Low (28)', intent: 'Commercial' },
      { keyword: 'generative engine optimization strategy', volume: '31.1K/mo', difficulty: 'High (68)', intent: 'Informational' },
      { keyword: 'b2b brand voice compliance software', volume: '8.2K/mo', difficulty: 'Low (19)', intent: 'Transactional' },
    ],
    hashtags: ['#MarketingAI', '#GrowthHacking', '#ContentStrategy', '#B2BGrowth', '#SaaS'],
    meta: {
      title: `${brandSettings.brandName} - AI Marketing & Content Automation Workspace`,
      description: `Automate research, content planning, multi-channel post generation, and SEO optimization in one intelligent workspace with ${brandSettings.brandName}.`,
    },
    optimizationScore: 92,
    suggestions: [
      "Include primary keyword 'ai marketing automation platform' in the first 100 words.",
      "Add 2 internal links to your features breakdown and pricing page.",
      "Ensure H2 and H3 subheadings incorporate search intent questions.",
    ],
  });

  const [copiedMeta, setCopiedMeta] = useState(false);

  const handleRunSeoAnalysis = async () => {
    setIsSearching(true);

    try {
      const res = await fetch('/api/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywordOrTopic: topic || brandSettings.industry,
          contentToOptimize,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setSeoResult(data);
    } catch (e) {
      console.error('SEO analysis failed:', e);
    } finally {
      setIsSearching(false);
    }
  };

  const copyMetaText = () => {
    const fullMeta = `Meta Title: ${seoResult.meta?.title}\nMeta Description: ${seoResult.meta?.description}`;
    navigator.clipboard.writeText(fullMeta);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span>SEO & Generative Search Center</span>
        </div>
        <h2 className="text-xl font-bold text-white">Keyword Discovery & Content Optimization</h2>
        <p className="text-xs text-slate-400">
          Discover high-intent target keywords, trending hashtags, and optimized meta tags for <span className="text-indigo-300 font-semibold">{brandSettings.brandName}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-400" /> SEO Query & Content Optimizer
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Target Keyword or Industry Niche</label>
              <input
                type="text"
                placeholder="e.g. AI marketing automation, B2B SaaS content strategy..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Content Snippet to Audit (Optional)</label>
              <textarea
                rows={4}
                placeholder="Paste blog draft or page content here to calculate SEO optimization score..."
                value={contentToOptimize}
                onChange={(e) => setContentToOptimize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleRunSeoAnalysis}
              disabled={isSearching}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Search Engines...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze SEO & Keywords</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Keyword Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> Discovered High-Intent Keywords
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">{seoResult.keywords?.length || 0} Suggestions</span>
            </div>

            <div className="space-y-2">
              {seoResult.keywords?.map((kw: any, i: number) => (
                <div
                  key={i}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-100">{kw.keyword}</span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>Volume: {kw.volume}</span>
                      <span>• Diff: {kw.difficulty}</span>
                      <span className="text-indigo-400 font-medium">• Intent: {kw.intent}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onGeneratePostFromKeyword(kw.keyword)}
                    className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white rounded-lg text-[10px] font-semibold transition-all"
                  >
                    + Generate Post
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Tags & Score */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" /> Auto-Generated Meta Title & Description
              </h3>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Score: {seoResult.optimizationScore}/100
                </span>
                <button onClick={copyMetaText} className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1">
                  {copiedMeta ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedMeta ? 'Copied' : 'Copy Meta'}</span>
                </button>
              </div>
            </div>

            {seoResult.meta && (
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">Meta Title (58 chars):</span>
                  <p className="text-slate-100 font-semibold">{seoResult.meta.title}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Meta Description (152 chars):</span>
                  <p className="text-slate-300 leading-relaxed">{seoResult.meta.description}</p>
                </div>
              </div>
            )}

            {/* Trending Hashtags */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-indigo-400" /> Trending Hashtags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoResult.hashtags?.map((tag: string, tIdx: number) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded bg-indigo-950/50 border border-indigo-900/50 text-indigo-300 text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
