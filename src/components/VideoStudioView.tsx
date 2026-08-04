import React, { useState } from 'react';
import {
  Video,
  Play,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Clapperboard,
  Mic,
  Clock,
  Zap,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface VideoStudioViewProps {
  brandSettings: BrandSettings;
}

export const VideoStudioView: React.FC<VideoStudioViewProps> = ({ brandSettings }) => {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState('Instagram Reel / TikTok');
  const [duration, setDuration] = useState('30 Seconds');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoPackage, setVideoPackage] = useState<any>({
    hooks: [
      'Stop making this $10,000 marketing mistake in 2026!',
      '3 AI marketing tools that feel completely illegal to know...',
      'How we scaled organic reach by 300% without spending a single dollar on ads.',
    ],
    script: {
      hook: 'Stop making this $10,000 marketing mistake in 2026!',
      body: 'Most marketing teams create content first, then try to find an audience. Here is the exact 3-step reversal framework used by top growth leaders.',
      callToAction: 'Save this reel and hit follow for daily AI growth hacks!',
    },
    storyboard: [
      { scene: 1, visual: 'Creator pointing at high-contrast red warning metric screen', audio: 'Stop making this $10,000 marketing mistake!' },
      { scene: 2, visual: 'Fast transition to clean screen showing automated content queue', audio: 'Step 1: Automate your research and keyword discovery.' },
      { scene: 3, visual: 'Over-the-shoulder shot scrolling through published analytics', audio: 'Step 2: Maintain brand consistency across every channel.' },
      { scene: 4, visual: 'Ending card with animated follow icon and clear call to action', audio: 'Follow MarketMind AI for more growth strategies.' },
    ],
  });

  const [copiedHookIdx, setCopiedHookIdx] = useState<number | null>(null);

  const handleGenerateVideoScript = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/video-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic || brandSettings.industry,
          format,
          targetDuration: duration,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setVideoPackage(data);
    } catch (e) {
      console.error('Video Studio failed:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyHookText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedHookIdx(idx);
    setTimeout(() => setCopiedHookIdx(null), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Video className="w-4 h-4 text-indigo-400" />
          <span>Short-Form Video Script Studio</span>
        </div>
        <h2 className="text-xl font-bold text-white">Reel, Shorts & TikTok Script Generator</h2>
        <p className="text-xs text-slate-400">
          Generate 3-second viral attention hooks, full spoken voiceovers, and visual storyboards tailored to <span className="text-indigo-300 font-semibold">{brandSettings.brandName}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Generator Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-indigo-400" /> Video Script Parameters
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Video Topic or Core Message</label>
              <textarea
                rows={3}
                placeholder="e.g. How to automate 30 days of social media posts in under 1 hour using AI..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Video Platform Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="Instagram Reel / TikTok">Instagram Reel / TikTok</option>
                <option value="YouTube Short">YouTube Short</option>
                <option value="LinkedIn Short Video">LinkedIn Executive Short</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Target Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="15 Seconds">15 Seconds (Ultra Short)</option>
                <option value="30 Seconds">30 Seconds (Standard Reel)</option>
                <option value="60 Seconds">60 Seconds (Deep Dive)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateVideoScript}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Drafting Script & Storyboard...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Video Package</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output Package */}
        <div className="lg:col-span-8 space-y-6">
          {/* 3-Second Viral Hooks */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> 3-Second High-Retention Hooks
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {videoPackage.hooks?.map((hk: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-200"
                >
                  <span className="font-semibold text-slate-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    "{hk}"
                  </span>

                  <button
                    onClick={() => copyHookText(hk, idx)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 shrink-0"
                  >
                    {copiedHookIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHookIdx === idx ? 'Copied' : 'Copy Hook'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Spoken Script & Storyboard */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Mic className="w-4 h-4 text-indigo-400" /> Spoken Voiceover Script
              </h3>
              <span className="text-[10px] text-indigo-400 font-semibold">{duration} Target</span>
            </div>

            {videoPackage.script && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Selected Hook:</span>
                  <p className="text-slate-100 font-semibold mt-0.5">{videoPackage.script.hook}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">Spoken Body:</span>
                  <p className="text-slate-200 leading-relaxed mt-0.5">{videoPackage.script.body}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Call to Action:</span>
                  <p className="text-slate-100 font-semibold mt-0.5">{videoPackage.script.callToAction}</p>
                </div>
              </div>
            )}

            {/* Visual Storyboard Steps */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Visual Scene Storyboard:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {videoPackage.storyboard?.map((sb: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">Scene {sb.scene || i + 1}</span>
                    <p className="text-slate-200 font-semibold text-[11px]">🎬 Visual: {sb.visual}</p>
                    <p className="text-slate-400 text-[10px]">🗣️ Audio: "{sb.audio}"</p>
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
