import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Sliders,
  Webhook,
  Database,
  Link,
  ShieldCheck,
  Send,
  Bell,
  Layers,
  Code,
  Copy,
  Check,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface AutomationIntegrationsViewProps {
  brandSettings: BrandSettings;
}

interface SocialAccount {
  platform: string;
  isConnected: boolean;
  username: string | null;
  platformUserId: string | null;
  connectedAt: string | null;
}

export const AutomationIntegrationsView: React.FC<AutomationIntegrationsViewProps> = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'scheduled_jobs' | 'integrations' | 'api_webhooks' | 'social_accounts'>('workflows');

  // Workflows
  const [workflows, setWorkflows] = useState([
    {
      id: 'wf-1',
      name: 'Auto-Publish Weekly Shuroq Tech Digest',
      trigger: 'Every Monday at 09:00 AM UTC',
      action: 'Generate LinkedIn & Blog Post from Trending Signals',
      status: 'Active',
      lastRun: 'Today, 09:00 AM',
      executions: 24,
    },
    {
      id: 'wf-2',
      name: 'Slack Notification on AI Quality Score < 80%',
      trigger: 'Post Created in In Review State',
      action: 'Send Warning Alert to #marketing-approvals in Slack',
      status: 'Active',
      lastRun: 'Yesterday, 04:15 PM',
      executions: 18,
    },
    {
      id: 'wf-3',
      name: 'Sync Published Posts to HubSpot CRM Campaigns',
      trigger: 'Post Status Changed to Published',
      action: 'Push Metadata & Engagement Metrics to HubSpot',
      status: 'Active',
      lastRun: '2 days ago',
      executions: 56,
    },
  ]);

  // Social Accounts State
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [connectError, setConnectError] = useState<string | null>(null);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);

  const platformIcons: Record<string, string> = {
    linkedin: '💼',
    twitter: '🐦',
    instagram: '📸',
    facebook: '📘',
  };

  const platformColors: Record<string, string> = {
    linkedin: 'from-blue-600 to-blue-800',
    twitter: 'from-sky-500 to-sky-700',
    instagram: 'from-pink-500 via-purple-500 to-orange-500',
    facebook: 'from-blue-700 to-blue-900',
  };

  // Fetch social accounts
  const fetchSocialAccounts = async () => {
    setLoadingAccounts(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/social/accounts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setSocialAccounts(data.accounts || []);
    } catch (err) {
      console.error('Failed to fetch social accounts:', err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    fetchSocialAccounts();
  }, []);

  // Connect a social account
  const handleConnect = async (platform: string) => {
    setConnectError(null);
    setConnectSuccess(null);
    setConnectingPlatform(platform);

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/social/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          platform,
          accessToken: tokenInput,
          platformUserId: userIdInput,
          platformUsername: usernameInput,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConnectSuccess(`Successfully connected ${platform}!`);
        setShowTokenModal(null);
        setTokenInput('');
        setUserIdInput('');
        setUsernameInput('');
        fetchSocialAccounts();
      } else {
        setConnectError(data.error || `Failed to connect ${platform}`);
      }
    } catch (err: any) {
      setConnectError(err.message || 'Network error');
    } finally {
      setConnectingPlatform(null);
    }
  };

  // Disconnect a social account
  const handleDisconnect = async (platform: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/social/accounts?platform=${platform}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      fetchSocialAccounts();
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  };

  // Integrations List
  const integrations = [
    { name: 'HubSpot CRM', category: 'CRM', icon: '🧡', status: 'Connected', account: 'Shuroq Portal (ID: 882194)' },
    { name: 'Salesforce Marketing Cloud', category: 'CRM', icon: '☁️', status: 'Connected', account: 'Shuroq Prod Org' },
    { name: 'Google Drive & Workspace', category: 'Storage', icon: '📁', status: 'Connected', account: 'assets@shuroqtech.com' },
    { name: 'Notion Knowledge Base', category: 'Docs', icon: '📝', status: 'Connected', account: 'Shuroq Brand Workspace' },
    { name: 'Slack Workspace', category: 'Messaging', icon: '💬', status: 'Connected', account: '#shuroq-announcements' },
    { name: 'Zapier Automation', category: 'IPaaS', icon: '⚡', status: 'Connected', account: 'ApiKey Verified' },
    { name: 'n8n Workflow Engine', category: 'IPaaS', icon: '🔄', status: 'Connected', account: 'Self-Hosted Webhook' },
  ];

  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' } : w))
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
              Autonomous Operations
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-400" /> Automation Workflows & Integration Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Connect LinkedIn, Twitter, Instagram, Facebook, HubSpot, Salesforce, Slack, Notion, Google Drive, n8n, Zapier & custom Webhooks.
          </p>
        </div>

        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto">
          <Plus className="w-4 h-4" /> Create New Automation Rule
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'workflows'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4 text-indigo-400" /> Workflow Builder
        </button>

        <button
          onClick={() => setActiveTab('social_accounts')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'social_accounts'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Send className="w-4 h-4 text-emerald-400" /> Social Accounts
        </button>

        <button
          onClick={() => setActiveTab('scheduled_jobs')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'scheduled_jobs'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" /> Scheduled AI Jobs
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'integrations'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Link className="w-4 h-4 text-emerald-400" /> CRM & App Integrations
        </button>

        <button
          onClick={() => setActiveTab('api_webhooks')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'api_webhooks'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Webhook className="w-4 h-4 text-cyan-400" /> Webhooks & API Center
        </button>
      </div>

      {/* TAB 1: Workflows */}
      {activeTab === 'workflows' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" /> Active Rule-Based Automations ({workflows.length})
            </h3>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => (
              <div key={wf.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{wf.name}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        wf.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {wf.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    <strong className="text-indigo-400">Trigger:</strong> {wf.trigger} → <strong className="text-emerald-400">Action:</strong> {wf.action}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Last Run: {wf.lastRun} • Total Executions: {wf.executions}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => toggleWorkflow(wf.id)}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 transition-colors"
                  >
                    {wf.status === 'Active' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Social Accounts */}
      {activeTab === 'social_accounts' && (
        <div className="space-y-4">
          {/* Success/Error Messages */}
          {connectSuccess && (
            <div className="bg-emerald-600 text-white p-4 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              {connectSuccess}
            </div>
          )}
          {connectError && (
            <div className="bg-red-600 text-white p-4 rounded-xl text-xs font-bold flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              {connectError}
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" /> Social Media Accounts
            </h3>
            <button
              onClick={fetchSocialAccounts}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingAccounts ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialAccounts.map((account) => (
              <div
                key={account.platform}
                className={`bg-slate-900 border rounded-2xl p-5 space-y-3 shadow-xl transition-all ${
                  account.isConnected ? 'border-emerald-500/30' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platformColors[account.platform]} flex items-center justify-center text-2xl shadow-lg`}>
                      {platformIcons[account.platform]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white capitalize">{account.platform}</h4>
                      {account.username && (
                        <span className="text-[11px] text-slate-400">@{account.username}</span>
                      )}
                      {!account.username && account.isConnected && (
                        <span className="text-[11px] text-emerald-400">Connected</span>
                      )}
                      {!account.isConnected && (
                        <span className="text-[11px] text-slate-500">Not connected</span>
                      )}
                    </div>
                  </div>

                  {account.isConnected ? (
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold">
                      Disconnected
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  {account.isConnected ? (
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      User ID: {account.platformUserId || 'N/A'}
                    </span>
                  ) : (
                    <span>Click connect to link your {account.platform} account</span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  {account.isConnected ? (
                    <button
                      onClick={() => handleDisconnect(account.platform)}
                      className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 hover:text-red-200 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Disconnect {account.platform}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowTokenModal(account.platform)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Connect {account.platform}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Connect Modal */}
          {showTokenModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Connect {showTokenModal}
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your {showTokenModal} credentials to connect your account.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 font-bold mb-1">Access Token *</label>
                    <input
                      type="password"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="Enter your access token"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 font-bold mb-1">Platform User/Page ID</label>
                    <input
                      type="text"
                      value={userIdInput}
                      onChange={(e) => setUserIdInput(e.target.value)}
                      placeholder="e.g., LinkedIn person URN, Twitter user ID, Facebook Page ID"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 font-bold mb-1">Username (optional)</label>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="@username"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowTokenModal(null);
                      setTokenInput('');
                      setUserIdInput('');
                      setUsernameInput('');
                      setConnectError(null);
                    }}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConnect(showTokenModal)}
                    disabled={!tokenInput || connectingPlatform === showTokenModal}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      connectingPlatform === showTokenModal
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500'
                    } text-white`}
                  >
                    {connectingPlatform === showTokenModal ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Scheduled Jobs */}
      {activeTab === 'scheduled_jobs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="w-4 h-4 text-amber-400" /> Cron & Scheduled AI Jobs
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block text-sm">Weekly Competitor SWOT & Trend Scan</span>
                <span className="text-slate-400">Schedule: Every Sunday at 11:00 PM UTC • Cron: 0 23 * * 0</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                Scheduled
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block text-sm">Daily Social Engagement & Comment Analysis</span>
                <span className="text-slate-400">Schedule: Everyday at 08:00 AM UTC • Cron: 0 8 * * *</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Link className="w-4 h-4 text-emerald-400" /> Enterprise Workspace & CRM Integrations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.category}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Connected
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800/80 truncate">
                  {item.account}
                </p>

                <button className="w-full py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-colors">
                  Configure Settings
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: API & Webhooks */}
      {activeTab === 'api_webhooks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Webhook className="w-4 h-4 text-cyan-400" /> API Access Keys & Outbound Webhook Endpoints
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Programmatically trigger Shuroq AI content generation and receive event payloads in real time.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Production API Token</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value="shuroq_live_sec_991823748291048291048"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-mono"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('shuroq_live_sec_991823748291048291048');
                    setApiKeyCopied(true);
                    setTimeout(() => setApiKeyCopied(false), 2000);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                >
                  {apiKeyCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{apiKeyCopied ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Active Outbound Webhook URL</label>
              <input
                type="text"
                readOnly
                value="https://api.shuroqtech.com/v1/webhooks/content_events"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
