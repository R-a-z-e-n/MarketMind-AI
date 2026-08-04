import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Send,
  Calendar,
  Layers,
  ShieldCheck,
  Sliders,
  Play,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  FileText,
  Megaphone,
} from 'lucide-react';
import { PlatformChannel, BrandSettings, PostItem } from '../types';

interface ContentGeneratorViewProps {
  brandSettings: BrandSettings;
  initialTopic?: string;
  onSaveGeneratedPost: (post: Partial<PostItem>) => void;
  onSendToReview: (post: Partial<PostItem>) => void;
}

export const ContentGeneratorView: React.FC<ContentGeneratorViewProps> = ({
  brandSettings,
  initialTopic,
  onSaveGeneratedPost,
  onSendToReview,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<PlatformChannel>('linkedin');
  const [topic, setTopic] = useState(initialTopic || '');
  const [keyTakeaway, setKeyTakeaway] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [toneOverride, setToneOverride] = useState(brandSettings.tone);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariations, setGeneratedVariations] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    }
  }, [initialTopic]);

  const channelPresets: { id: PlatformChannel; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'linkedin', label: 'LinkedIn Post', icon: Linkedin },
    { id: 'twitter', label: 'X (Twitter) Thread', icon: Twitter },
    { id: 'instagram', label: 'Instagram Caption', icon: Instagram },
    { id: 'facebook', label: 'Facebook Post', icon: Facebook },
    { id: 'threads', label: 'Threads Post', icon: Sparkles },
    { id: 'blog', label: 'SEO Blog Outline', icon: FileText },
    { id: 'newsletter', label: 'Email Newsletter', icon: Mail },
    { id: 'ad_copy', label: 'Product Ad Copy', icon: Megaphone },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: selectedChannel,
          topic,
          keyTakeaway,
          callToAction,
          toneOverride,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setGeneratedVariations(data.variations || []);
    } catch (e) {
      console.error('Generation failed:', e);
      setGeneratedVariations([
        {
          title: `Option 1: High Converting ${selectedChannel.toUpperCase()} Copy`,
          content: `🚀 Accelerate your ${selectedChannel} growth with MarketMind AI!\n\nTopic: ${topic}\n\nTakeaways:\n• ${keyTakeaway || 'Automate workflow & save time'}\n• Maintain 100% brand voice alignment\n\n${callToAction || 'Comment below to request a demo!'}`,
          hashtags: ['#MarketingAI', '#Automation', '#Growth'],
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Multi-Platform Content Generator</span>
        </div>
        <h2 className="text-xl font-bold text-white">Generate High-Converting Brand Content</h2>
        <p className="text-xs text-slate-400">
          Powered by Gemini 3.6 Flash. Tailored to <span className="text-indigo-300 font-semibold">{brandSettings.brandName}</span> ({toneOverride} Tone).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Platform Selector & Parameters Input Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Channel Selection Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Select Platform Channel
            </span>
            <div className="grid grid-cols-2 gap-2">
              {channelPresets.map((ch) => {
                const Icon = ch.icon;
                const isSelected = selectedChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50 font-semibold shadow-sm'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="text-xs">{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Parameters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Input Topic & Core Angle
            </span>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Topic or Concept *</label>
              <textarea
                rows={3}
                placeholder="e.g. Why B2B marketing teams need automated research before drafting content..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Key Takeaways / Main Value</label>
              <input
                type="text"
                placeholder="e.g. Save 15 hours/week, maintain tone, improve reach"
                value={keyTakeaway}
                onChange={(e) => setKeyTakeaway(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Call To Action (CTA)</label>
              <input
                type="text"
                placeholder="e.g. Comment 'AI' to claim workspace access, or link to blog"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Tone Override</label>
              <select
                value={toneOverride}
                onChange={(e) => setToneOverride(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="Professional">Professional & Authoritative</option>
                <option value="Bold & Witty">Bold & Witty</option>
                <option value="Friendly & Warm">Friendly & Warm</option>
                <option value="Tech-Savvy">Tech-Savvy & Concise</option>
                <option value="Casual">Casual Conversational</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating {selectedChannel} Variations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Content Options</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generated Variations Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Generated Content Variations</h3>
            <span className="text-xs text-slate-400">
              {generatedVariations.length} Options Generated
            </span>
          </div>

          {generatedVariations.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto opacity-40" />
              <p className="text-xs font-semibold text-slate-300">No content generated yet.</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select a channel, type your topic idea on the left, and click 'Generate Content Options' to generate multi-version social copy.
              </p>
            </div>
          ) : (
            generatedVariations.map((v, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {selectedChannel}
                    </span>
                    <h4 className="font-bold text-slate-100 text-xs">{v.title || `Variation ${idx + 1}`}</h4>
                  </div>

                  <button
                    onClick={() => copyText(v.content, idx)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-950 p-1.5 rounded-lg border border-slate-800"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                  {v.content}
                </div>

                {v.hashtags && (
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-indigo-400">
                    {v.hashtags.map((h: string, hIdx: number) => (
                      <span key={hIdx} className="bg-indigo-950/40 border border-indigo-900/40 px-2 py-0.5 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      onSendToReview({
                        title: topic || 'New Generated Post',
                        channel: selectedChannel,
                        content: v.content,
                        status: 'in_review',
                        author: 'Alex Rivera',
                      })
                    }
                    className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Send to AI Review</span>
                  </button>

                  <button
                    onClick={() =>
                      onSaveGeneratedPost({
                        title: topic || 'New Generated Post',
                        channel: selectedChannel,
                        content: v.content,
                        status: 'scheduled',
                        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
                        author: 'Alex Rivera',
                      })
                    }
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Save & Schedule</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
