import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Users,
  Filter,
  Repeat,
  BookOpen,
  Database,
  Bot,
  Layers,
  ArrowRight,
  Plus,
  Search,
  CheckCircle2,
  FileText,
  Zap,
  Clock,
  Briefcase,
} from 'lucide-react';
import { BrandSettings, PageId } from '../types';

interface AIStrategyHubViewProps {
  brandSettings: BrandSettings;
  onNavigate: (page: PageId) => void;
  onGenerateCampaign: (topic: string) => void;
}

export const AIStrategyHubView: React.FC<AIStrategyHubViewProps> = ({
  brandSettings,
  onNavigate,
  onGenerateCampaign,
}) => {
  const [activeTab, setActiveTab] = useState<
    'campaign_builder' | 'gtm' | 'personas' | 'funnel' | 'repurposer' | 'prompts' | 'knowledge_base' | 'agents'
  >('campaign_builder');

  // Campaign Builder State
  const [campaignName, setCampaignName] = useState('Shuroq Cloud Enterprise Launch Q3');
  const [targetGoal, setTargetGoal] = useState('Lead Generation & Enterprise Demos');
  const [targetAudience, setTargetAudience] = useState(brandSettings.targetAudience);
  const [campaignOutput, setCampaignOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Personas State
  const personas = [
    {
      name: 'Elena Rostova',
      role: 'Chief Technology Officer (CTO)',
      companySize: '250 - 1,000 Employees',
      painPoints: ['Legacy monolithic bottlenecks', 'High cloud egress costs', 'Compliance and data sovereignty'],
      goals: ['Modernize tech stack with microservices', 'Seamless multi-cloud deployment', 'AI-driven operations'],
      preferredChannels: ['LinkedIn', 'Tech Conferences', 'Gartner Reports'],
    },
    {
      name: 'David Chen',
      role: 'VP of Digital Transformation',
      companySize: '1,000+ Employees',
      painPoints: ['Slow time-to-market', 'Siloed IT & business teams', 'Security approval friction'],
      goals: ['Automate business workflows', 'Integrate enterprise AI assistants', 'Measurable ROI in 90 days'],
      preferredChannels: ['Executive Newsletters', 'Industry Webinars', 'Direct Consultations'],
    },
  ];

  // AI Prompt Library
  const promptLibrary = [
    { title: 'GTM Positioning Matrix', category: 'Strategy', prompt: 'Act as a Senior B2B Tech Strategist. Analyze Shuroq enterprise solution and generate a 4-quadrant positioning matrix vs competitors.' },
    { title: 'High-Converting LinkedIn Thought Leadership', category: 'Social', prompt: 'Write a 250-word LinkedIn post for Shuroq on Cloud Modernization with 3 actionable takeaways and an executive CTA.' },
    { title: 'Enterprise Cold Outreach Sequence', category: 'Email', prompt: 'Draft a 3-step cold email sequence targeting CTOs focusing on AI-driven IT cost reduction.' },
    { title: 'SEO Pillar Article Outline', category: 'SEO', prompt: 'Create a comprehensive 2,000-word article outline on "Next-Gen Cloud Architecture for Financial Services".' },
  ];

  // Knowledge Base Docs
  const knowledgeDocs = [
    { title: 'Shuroq_Enterprise_Services_Whitepaper_2026.pdf', size: '2.4 MB', status: 'Indexed', chunkCount: 142 },
    { title: 'Brand_Voice_Identity_Guidelines.pdf', size: '1.1 MB', status: 'Indexed', chunkCount: 56 },
    { title: 'Competitor_SWOT_Analysis_Q2.docx', size: '840 KB', status: 'Indexed', chunkCount: 38 },
  ];

  // AI Agent Marketplace
  const agents = [
    { id: 'research_agent', name: 'Shuroq Deep Research Agent', desc: 'Autonomous market intelligence and competitive SWOT analyst.', status: 'Active', runsThisMonth: 128 },
    { id: 'seo_agent', name: 'Shuroq Technical SEO Agent', desc: 'Continuous keyword gap analysis and SERP rank optimizer.', status: 'Active', runsThisMonth: 342 },
    { id: 'social_agent', name: 'Shuroq Multi-Channel Social Agent', desc: 'Auto-adapts technical copy across LinkedIn, Twitter & Press Releases.', status: 'Active', runsThisMonth: 512 },
    { id: 'rag_agent', name: 'Shuroq Knowledge Base RAG Agent', desc: 'Answers queries grounded strictly in company whitepapers and PDFs.', status: 'Active', runsThisMonth: 210 },
  ];

  const handleRunCampaignBuilder = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCampaignOutput(`
### 🚀 Shuroq GTM Campaign Strategy: ${campaignName}

**Goal:** ${targetGoal}
**Primary Persona:** CTOs & Enterprise IT Leaders

#### 1. Positioning & Core Value Narrative
"Shuroq Redefines Enterprise Tech with self-healing cloud architecture and native AI workflow automation — reducing IT operational complexity by 40%."

#### 2. Multi-Channel Content Blueprint
- **LinkedIn (Top of Funnel):** Executive thought leadership on cloud egress cost containment.
- **Whitepaper / Lead Magnet:** "The 2026 Enterprise Cloud Architecture Benchmark Report".
- **Email Nurture (Middle of Funnel):** 3-part case study sequence showing 3.2x ROI.
- **Demo Landing Page (Bottom of Funnel):** Interactive Cloud ROI Calculator & 15-min Architecture Review.

#### 3. Recommended Execution Timeline
- **Week 1-2:** Teaser posts & Research whitepaper launch.
- **Week 3-4:** Target cold outreach & Retargeting ad campaign.
      `);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-500/30 shadow-xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider">
              Shuroq Intelligence Engine
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2">
            <Target className="w-6 h-6 text-sky-400" /> AI Strategy Hub & Agent Marketplace
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            GTM campaign building, customer persona modeling, RAG knowledge base, and autonomous AI agents.
          </p>
        </div>

        <button
          onClick={() => onNavigate('generator')}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" /> Quick Content Generator
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-medium custom-scrollbar">
        <button
          onClick={() => setActiveTab('campaign_builder')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'campaign_builder'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Target className="w-4 h-4 text-sky-400" /> Campaign Builder
        </button>

        <button
          onClick={() => setActiveTab('gtm')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'gtm'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4 text-emerald-400" /> GTM & Positioning
        </button>

        <button
          onClick={() => setActiveTab('personas')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'personas'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-purple-400" /> Customer Personas
        </button>

        <button
          onClick={() => setActiveTab('funnel')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'funnel'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Filter className="w-4 h-4 text-amber-400" /> Funnel Architect
        </button>

        <button
          onClick={() => setActiveTab('repurposer')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'repurposer'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Repeat className="w-4 h-4 text-indigo-400" /> AI Repurposer
        </button>

        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'prompts'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-pink-400" /> Prompt Library
        </button>

        <button
          onClick={() => setActiveTab('knowledge_base')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'knowledge_base'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-cyan-400" /> RAG Knowledge Base
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'agents'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Bot className="w-4 h-4 text-teal-400" /> AI Agent Marketplace
        </button>
      </div>

      {/* TAB 1: Campaign Builder */}
      {activeTab === 'campaign_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Target className="w-4 h-4 text-sky-400" /> Configure Campaign Parameters
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Primary Campaign Goal</label>
                <select
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Lead Generation & Enterprise Demos">Lead Generation & Enterprise Demos</option>
                  <option value="Brand Positioning & Thought Leadership">Brand Positioning & Thought Leadership</option>
                  <option value="Product Launch & Feature Announcement">Product Launch & Feature Announcement</option>
                  <option value="Customer Retention & Upsell">Customer Retention & Upsell</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Audience Profile</label>
                <textarea
                  rows={3}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                onClick={handleRunCampaignBuilder}
                disabled={isGenerating}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Architecting Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Campaign Strategy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" /> Generated Campaign Output
              </h3>
              {campaignOutput && (
                <button
                  onClick={() => onGenerateCampaign(campaignName)}
                  className="text-xs px-3 py-1 bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 rounded-lg font-bold transition-all flex items-center gap-1"
                >
                  Create Posts from Blueprint →
                </button>
              )}
            </div>

            {campaignOutput ? (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                {campaignOutput}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-slate-950/50 rounded-xl border border-dashed border-slate-800 text-slate-500 space-y-2">
                <Target className="w-8 h-8 text-slate-700" />
                <p className="text-xs font-semibold text-slate-400">No campaign generated yet.</p>
                <p className="text-[11px] text-slate-600 max-w-sm">
                  Set your parameters on the left and click "Generate AI Campaign Strategy" to create an enterprise go-to-market plan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GTM & Positioning */}
      {activeTab === 'gtm' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" /> Go-To-Market & Brand Positioning Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                AI-driven competitive differentiation, key messaging pillars, and elevator pitch formulations for Shuroq.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
              Brand Voice Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Pillar 1: Innovation</span>
              <h4 className="text-sm font-bold text-white">Cloud Architecture & AI Native</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Position Shuroq as the modern alternative to legacy IT monoliths with self-healing cloud infrastructure.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Pillar 2: Enterprise Security</span>
              <h4 className="text-sm font-bold text-white">Sovereignty & Zero-Trust</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empower financial and healthcare enterprises with strict compliance, RBAC, and dedicated encryption.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Pillar 3: Measurable ROI</span>
              <h4 className="text-sm font-bold text-white">Automated Operations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drive up to 40% operational cost savings with automated workflow orchestration and AI agents.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Personas */}
      {activeTab === 'personas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" /> Modeled Buyer Personas ({personas.length})
            </h3>
            <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all">
              <Plus className="w-3.5 h-3.5" /> Generate New Persona
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((p, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <p className="text-xs text-purple-400 font-semibold">{p.role} • {p.companySize}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs border border-purple-500/30">
                    {p.name.charAt(0)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Core Pain Points</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5 mt-1">
                      {p.painPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Strategic Goals</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5 mt-1">
                      {p.goals.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Prompt Library & Knowledge Base & Agents */}
      {activeTab === 'prompts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-4 h-4 text-pink-400" /> Enterprise AI Prompt Library
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promptLibrary.map((pr, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-pink-500/40 transition-all">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{pr.title}</span>
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">
                    {pr.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  {pr.prompt}
                </p>
                <button
                  onClick={() => onGenerateCampaign(pr.prompt)}
                  className="text-[11px] font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
                >
                  Use Prompt in Generator →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'knowledge_base' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" /> RAG Knowledge Base Document Index
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload PDFs, whitepapers, and specs for grounded AI content generation.
              </p>
            </div>
            <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Upload Document
            </button>
          </div>

          <div className="space-y-2">
            {knowledgeDocs.map((doc, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="font-bold text-white block">{doc.title}</span>
                    <span className="text-[10px] text-slate-400">{doc.size} • {doc.chunkCount} Vector Chunks</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'agents' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-teal-400" /> Shuroq Autonomous AI Agent Marketplace
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((ag) => (
              <div key={ag.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-bold">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{ag.name}</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold">{ag.status}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">{ag.runsThisMonth} Runs / mo</span>
                </div>

                <p className="text-xs text-slate-300">{ag.desc}</p>

                <button
                  onClick={() => onNavigate('command_center')}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-teal-300 flex items-center justify-center gap-1 transition-colors"
                >
                  Interact in AI Command Center →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
