import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Layers,
  Layout,
  RefreshCw,
  Download,
  Copy,
  Check,
  Palette,
  FileImage,
  Sliders,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface ImageStudioViewProps {
  brandSettings: BrandSettings;
}

export const ImageStudioView: React.FC<ImageStudioViewProps> = ({ brandSettings }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Modern Minimalist Gradient');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80'
  );
  const [expandedPrompt, setExpandedPrompt] = useState<string>('');
  const [carouselSlides, setCarouselSlides] = useState<any[]>([
    { slide: 1, headline: 'The Old Way vs The AI Way', subtext: 'Why traditional content marketing is breaking down in 2026.' },
    { slide: 2, headline: '80% Creation Time Saved', subtext: 'Automate research, drafting, and scheduling in one command.' },
    { slide: 3, headline: '100% Brand Consistency', subtext: 'Enforce tone guidelines across LinkedIn, X, and Instagram.' },
    { slide: 4, headline: 'Ready to Automate?', subtext: 'Try MarketMind AI workspace today.' },
  ]);

  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const shuroqTemplates = [
    { title: 'Shuroq Corporate Banner', url: '/shuroq-banner.svg', ratio: '16:9' },
    { title: 'Shuroq Primary Horizontal Logo', url: '/shuroq-logo.svg', ratio: '3:1' },
    { title: 'Shuroq App Icon Emblem', url: '/shuroq-icon.svg', ratio: '1:1' },
  ];

  const handleGenerateImageStudio = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/image-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          aspectRatio,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      }
      if (data.expandedPrompt) {
        setExpandedPrompt(data.expandedPrompt);
      }
      if (data.carouselSlides) {
        setCarouselSlides(data.carouselSlides);
      }
    } catch (e) {
      console.error('Image Studio failed:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPromptText = () => {
    if (!expandedPrompt) return;
    navigator.clipboard.writeText(expandedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-indigo-400" />
          <span>AI Image & Visual Asset Studio</span>
        </div>
        <h2 className="text-xl font-bold text-white">Design Banners, Carousels & Visual Assets</h2>
        <p className="text-xs text-slate-400">
          Generate AI image prompts, visual slide carousels, and social media banners aligned with <span className="text-indigo-300 font-semibold">{brandSettings.brandName}</span>'s aesthetic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" /> Image Studio Settings
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Concept / Prompt Idea</label>
              <textarea
                rows={3}
                placeholder="e.g. Modern B2B SaaS dashboard UI preview with sleek neon gradient highlights and growth metrics..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Visual Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="Modern Minimalist Gradient">Modern Minimalist Gradient</option>
                <option value="3D Vector Glassmorphism">3D Vector Glassmorphism</option>
                <option value="SaaS UI Mockup">SaaS Product UI Mockup</option>
                <option value="Editorial Cyberpunk Dark">Editorial Cyberpunk Dark</option>
                <option value="Infographic Typography Card">Infographic Typography Card</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {['16:9', '1:1', '4:5'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      aspectRatio === ratio
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateImageStudio}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Visual Assets...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Visual Package</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output Showcase */}
        <div className="lg:col-span-7 space-y-6">
          {/* Official Shuroq Brand Asset Presets */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-sky-400" /> Official Shuroq Brand Graphic Assets
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full">
                Ready to Use
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shuroqTemplates.map((tpl, i) => (
                <div
                  key={i}
                  onClick={() => setResultImage(tpl.url)}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-sky-500/60 rounded-xl cursor-pointer transition-all space-y-2 group"
                >
                  <div className="h-20 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center p-2 border border-slate-800/80">
                    <img src={tpl.url} alt={tpl.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-200 group-hover:text-sky-300">{tpl.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">{tpl.ratio}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Banner Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileImage className="w-4 h-4 text-indigo-400" /> Generated Social Banner Preview
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">{aspectRatio} Ratio</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[260px] group">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Generated marketing banner"
                  className="w-full h-auto max-h-[360px] object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="text-center p-8 text-slate-500 text-xs">No image generated yet.</div>
              )}
            </div>

            {expandedPrompt && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300 text-[10px] uppercase">Expanded AI Image Prompt</span>
                  <button onClick={copyPromptText} className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1">
                    {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] font-mono leading-relaxed">{expandedPrompt}</p>
              </div>
            )}
          </div>

          {/* Carousel Slide Builder Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Multi-Slide Carousel Deck
              </h3>
              <span className="text-[10px] text-indigo-400 font-semibold">{carouselSlides.length} Slides Ready</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {carouselSlides.map((slide, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center">
                      {slide.slide || i + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2">{slide.headline}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed">{slide.subtext}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium pt-1 border-t border-slate-900">
                    Slide {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
