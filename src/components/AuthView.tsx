import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Eye,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  Bot,
  Zap,
  Briefcase,
  Layers,
  Globe,
  Chrome,
} from 'lucide-react';
import { AuthUser, UserRole } from '../types';

interface AuthViewProps {
  onLogin: (user: AuthUser) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('Shuroq Technologies');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Preset Accounts for instant demo
  const presetAccounts: { role: UserRole; name: string; email: string; title: string; avatar: string; desc: string }[] = [
    {
      role: 'admin',
      name: 'Alex Rivera',
      email: 'alex.rivera@shuroqtech.com',
      title: 'Workspace Administrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      desc: 'Full administrative access to settings, billing, API keys, brand voice, and team permissions.',
    },
    {
      role: 'team_member',
      name: 'Sarah Chen',
      email: 'sarah.chen@shuroqtech.com',
      title: 'Lead Content Strategist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      desc: 'Content creation, AI strategy tools, post scheduling, image/video studio, and publishing.',
    },
    {
      role: 'viewer',
      name: 'David Vance',
      email: 'david.vance@clientorg.com',
      title: 'Client / Stakeholder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      desc: 'Read-only access to campaign analytics, weekly briefs, and approval review requests.',
    },
  ];

  const handleDemoLogin = (acc: typeof presetAccounts[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: `user-${acc.role}`,
        name: acc.name,
        email: acc.email,
        role: acc.role,
        avatar: acc.avatar,
        organization: 'Shuroq Technologies',
      });
      setIsLoading(false);
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }
    if (mode === 'signup' && !name) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const body = mode === 'signup'
        ? { name, email, password, role: selectedRole, organization }
        : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      onLogin(data.user);
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Side: Brand Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-b from-sky-950 via-slate-900 to-indigo-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 text-white">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-sky-500/20 text-white">
                S
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight flex items-center gap-1.5">
                  Shuroq <span className="text-sky-400 font-semibold text-xs px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30">AI Platform</span>
                </h2>
                <p className="text-[11px] text-slate-300">Enterprise AI Marketing & Strategy Workspace</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-extrabold leading-snug">
                Powering Enterprise Marketing with Autonomous AI Agents & Real-Time Intelligence.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamlessly collaborate across Admin, Marketing Strategists, and Client Stakeholders with unified brand guidelines, automated publishing, and RAG knowledge base.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <span><strong>Multi-Role Workspace:</strong> Admin controls, Team execution, and Client review portals.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>AI Strategy Engine:</strong> GTM positioning, persona generators & RAG document grounding.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span><strong>Omni-Channel Distribution:</strong> One-click publishing to LinkedIn, Twitter, Blogs & Newsletters.</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>© 2026 Shuroq AI Technologies Inc.</span>
            <span className="text-sky-400 font-medium">v2.4 Enterprise Edition</span>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6 flex flex-col justify-center">
          
          {/* Top Toggle & Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {mode === 'login' ? 'Welcome Back to Shuroq' : 'Create Enterprise Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'login' ? 'Sign in to access your marketing workspace' : 'Get started with Shuroq AI Marketing Suite'}
              </p>
            </div>

            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-bold">
              <button
                onClick={() => setMode('login')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  mode === 'signup' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Quick Demo Login Preset Bar */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Instant One-Click Demo Login
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presetAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleDemoLogin(acc)}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-left space-y-1 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-sky-300">
                      {acc.name}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        acc.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : acc.role === 'team_member'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {acc.role.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{acc.title}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500">
              <span className="bg-slate-900 px-2">or continue with credentials</span>
            </div>
          </div>

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Role Selection Tabs for Signup / Login */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Select Access Role</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-2.5 rounded-xl border font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-purple-600/20 border-purple-500 text-purple-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('team_member')}
                  className={`p-2.5 rounded-xl border font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedRole === 'team_member'
                      ? 'bg-sky-600/20 border-sky-500 text-sky-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Team Member</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('viewer')}
                  className={`p-2.5 rounded-xl border font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedRole === 'viewer'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>User / Client</span>
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Team</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Shuroq Enterprise"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="name@shuroqtech.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                {mode === 'login' && (
                  <button type="button" className="text-[11px] text-sky-400 hover:underline font-medium">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-sky-600 focus:ring-sky-500"
                />
                <span>I agree to the Enterprise Terms of Service & Privacy Policy.</span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Authenticating Workspace Session...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? `Sign In as ${selectedRole.replace('_', ' ')}` : `Create ${selectedRole.replace('_', ' ')} Account`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social / SSO Auth */}
          <div className="pt-2 border-t border-slate-800 text-center space-y-2">
            <span className="text-[11px] text-slate-500 font-medium block">Or sign in with Identity Provider</span>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleDemoLogin(presetAccounts[0])}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2 transition-colors"
              >
                <Chrome className="w-3.5 h-3.5 text-sky-400" /> Google Workspace
              </button>
              <button
                onClick={() => handleDemoLogin(presetAccounts[1])}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> Okta / SAML SSO
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
