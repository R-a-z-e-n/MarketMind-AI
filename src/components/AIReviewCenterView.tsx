import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ThumbsUp,
  BarChart,
  Zap,
} from 'lucide-react';
import { BrandSettings, PostItem } from '../types';

interface AIReviewCenterViewProps {
  brandSettings: BrandSettings;
  postsInReview: PostItem[];
  onApprovePost: (postId: string) => void;
}

export const AIReviewCenterView: React.FC<AIReviewCenterViewProps> = ({
  brandSettings,
  postsInReview,
  onApprovePost,
}) => {
  const [contentToReview, setContentToReview] = useState(
    postsInReview.length > 0
      ? postsInReview[0].content
      : `🚀 Turning 1 Hour of Marketing Planning Into 30 Days of Content.\n\nMost founders struggle with content volume because they rely on manual research and inconsistent writing.\n\nHere is how MarketMind AI fixes it:\n1. Live Competitor SWOT Research\n2. 100% Brand Voice Consistency\n3. Instant Multi-Platform Publishing\n\nClaim your workspace demo today!`
  );

  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<any>({
    overallScore: 94,
    brandVoiceCompliance: 96,
    readabilityGrade: 'Grade 8 (Easy to scan)',
    grammarCheck: {
      errorsFound: 0,
      status: 'Clean & Pristine',
    },
    toneAnalysis: `${brandSettings.tone}, confident, and value-driven`,
    duplicateRisk: 'Low (0.8% similarity across web)',
    improvements: [
      'Consider adding a specific question at the end to boost comments and organic reach.',
      'Forbidden words check passed: No prohibited terms detected.',
    ],
  });

  const handleRunReview = async () => {
    setIsReviewing(true);

    try {
      const res = await fetch('/api/ai/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: contentToReview,
          targetChannel: 'General Social',
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setReviewResult(data);
    } catch (e) {
      console.error('Review failed:', e);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>AI Quality & Brand Compliance Review</span>
        </div>
        <h2 className="text-xl font-bold text-white">Brand Voice, Grammar & Quality Inspection</h2>
        <p className="text-xs text-slate-400">
          Ensure 100% compliance with <span className="text-indigo-300 font-semibold">{brandSettings.brandName}</span> guidelines, check readability, and auto-detect tone deviations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input text */}
        <div className="lg:col-span-6 space-y-6">
          {postsInReview.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase">Posts Pending Approval:</span>
              <div className="space-y-2">
                {postsInReview.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setContentToReview(p.content)}
                    className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-indigo-500/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-200">{p.title}</span>
                      <span className="text-[10px] text-indigo-400 block uppercase">{p.channel}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprovePost(p.id);
                      }}
                      className="px-2.5 py-1 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-semibold"
                    >
                      Approve Post
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> Content Copy to Inspect
            </h3>

            <textarea
              rows={8}
              value={contentToReview}
              onChange={(e) => setContentToReview(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-normal leading-relaxed"
            />

            <button
              onClick={handleRunReview}
              disabled={isReviewing || !contentToReview.trim()}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {isReviewing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Brand Compliance...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Quality Inspection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Score Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart className="w-4 h-4 text-indigo-400" /> AI Review Score Breakdown
              </h3>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-bold text-xs">
                Score: {reviewResult.overallScore}/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Brand Tone Match</span>
                <p className="text-base font-bold text-indigo-300">{reviewResult.brandVoiceCompliance}%</p>
                <p className="text-[10px] text-slate-400">{reviewResult.toneAnalysis}</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Readability Score</span>
                <p className="text-base font-bold text-emerald-300">{reviewResult.readabilityGrade}</p>
                <p className="text-[10px] text-slate-400">Optimal for mobile feed dwell time</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Grammar Check</span>
                <p className="text-base font-bold text-purple-300">{reviewResult.grammarCheck?.status || 'Pristine'}</p>
                <p className="text-[10px] text-slate-400">
                  {reviewResult.grammarCheck?.errorsFound || 0} Errors Detected
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Plagiarism Risk</span>
                <p className="text-base font-bold text-amber-300">{reviewResult.duplicateRisk}</p>
                <p className="text-[10px] text-slate-400">Unique copy fingerprint</p>
              </div>
            </div>

            {/* Actionable Improvements */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-300 block">AI Editorial Recommendations:</span>
              <div className="space-y-2">
                {reviewResult.improvements?.map((imp: string, i: number) => (
                  <div key={i} className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
