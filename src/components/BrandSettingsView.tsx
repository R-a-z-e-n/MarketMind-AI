import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Building2,
  Hash,
  AlertOctagon,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Copy,
  Check,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface BrandSettingsViewProps {
  brandSettings: BrandSettings;
  onSaveBrandSettings: (settings: BrandSettings) => void;
}

export const BrandSettingsView: React.FC<BrandSettingsViewProps> = ({
  brandSettings,
  onSaveBrandSettings,
}) => {
  const [formData, setFormData] = useState<BrandSettings>(brandSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const brandAssets = [
    {
      title: 'Primary Logo (Horizontal)',
      subtitle: 'Official Shuroq logo with "TECH REDEFINED" tagline',
      url: '/shuroq-logo.svg',
      preview: (
        <div className="bg-white p-4 rounded-xl border border-slate-700 flex items-center justify-center h-24">
          <img src="/shuroq-logo.svg" alt="Shuroq Primary Logo" className="h-12 object-contain" />
        </div>
      ),
    },
    {
      title: 'App Icon Badge',
      subtitle: 'Circuit rising sun emblem app icon badge',
      url: '/shuroq-icon.svg',
      preview: (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center h-24">
          <img src="/shuroq-icon.svg" alt="Shuroq App Icon" className="h-16 w-16 object-contain" />
        </div>
      ),
    },
    {
      title: 'Corporate Hero Banner',
      subtitle: 'Services suite showcase banner with 5 core pillars',
      url: '/shuroq-banner.svg',
      preview: (
        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-center h-24 overflow-hidden">
          <img src="/shuroq-banner.svg" alt="Shuroq Corporate Banner" className="w-full h-full object-cover rounded-lg" />
        </div>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBrandSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4 text-indigo-400" />
            <span>Brand Identity & Voice Guardrails</span>
          </div>
          <h2 className="text-xl font-bold text-white">Brand Voice Guidelines & Settings</h2>
          <p className="text-xs text-slate-400">
            Define target personas, tone rules, forbidden terminology, and core value propositions for AI generation.
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3 py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 className="w-4 h-4" /> Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Official Brand Logos & Media Assets */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-sky-400" /> Official Shuroq Brand Assets & Logos
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full">
              3 High-Res Assets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {brandAssets.map((asset, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 flex flex-col justify-between">
                <div>
                  {asset.preview}
                  <h4 className="text-xs font-bold text-white mt-3">{asset.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{asset.subtitle}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                  <code className="text-slate-400 text-[10px] truncate max-w-[120px]">{asset.url}</code>
                  <button
                    type="button"
                    onClick={() => handleCopyPath(asset.url)}
                    className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    {copiedPath === asset.url ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-indigo-400" /> Core Brand Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Brand Name</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Industry / Vertical</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400">Core Value Proposition</label>
              <textarea
                rows={2}
                value={formData.valueProposition}
                onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400">Target Audience Persona</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tone & Guardrails */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Tone & Quality Safeguards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Primary Tone of Voice</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="Professional">Professional & Authoritative</option>
                <option value="Bold & Witty">Bold & Witty</option>
                <option value="Friendly & Warm">Friendly & Warm</option>
                <option value="Tech-Savvy">Tech-Savvy & Concise</option>
                <option value="Casual">Casual Conversational</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Forbidden Terminology (Comma Separated)</label>
              <input
                type="text"
                value={formData.forbiddenWords.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    forbiddenWords: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-400">Default Brand Hashtags (Comma Separated)</label>
              <input
                type="text"
                value={formData.defaultHashtags.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    defaultHashtags: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Brand Guidelines</span>
          </button>
        </div>
      </form>
    </div>
  );
};
