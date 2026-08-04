import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Users,
  Key,
  FileCheck,
  Coins,
  Lock,
  Download,
  Plus,
  BarChart2,
  CheckCircle2,
  Sliders,
  Database,
  Globe,
} from 'lucide-react';
import { UserRole } from '../types';

interface EnterpriseViewProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const EnterpriseView: React.FC<EnterpriseViewProps> = ({ userRole, onRoleChange }) => {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'rbac' | 'sso_security' | 'audit_logs' | 'ai_tokens'>('workspaces');

  // Workspaces
  const workspaces = [
    { name: 'Shuroq Enterprise Main Org', brandCount: 4, members: 18, status: 'Active Workspace', plan: 'Enterprise Unlimited' },
    { name: 'Shuroq Cloud Solutions Client Hub', brandCount: 2, members: 8, status: 'Agency Client Hub', plan: 'Enterprise Dedicated' },
    { name: 'Shuroq R&D Sandbox', brandCount: 1, members: 5, status: 'Staging Environment', plan: 'Developer Tier' },
  ];

  // Audit Logs
  const auditLogs = [
    { user: 'Alex Rivera (Admin)', action: 'Updated Brand Guidelines for Shuroq Cloud', timestamp: 'Today, 08:32 AM', ip: '192.168.1.42' },
    { user: 'Sarah Chen (Strategy Lead)', action: 'Triggered Weekly Competitor SWOT Analysis Job', timestamp: 'Today, 07:15 AM', ip: '10.0.0.12' },
    { user: 'Marcus Vance (Editor)', action: 'Approved Post #post-102 for LinkedIn Scheduling', timestamp: 'Yesterday, 05:40 PM', ip: '172.16.0.8' },
    { user: 'Elena Rostova (DevOps)', action: 'Generated Production API Token (shuroq_live_sec_...)', timestamp: 'Yesterday, 02:10 PM', ip: '192.168.1.15' },
  ];

  // Token Usage Stats
  const tokenStats = {
    totalTokensUsed: '4,820,150',
    tokensLimit: '10,000,000 / month',
    estimatedCost: '$241.00 USD',
    topModel: 'Gemini 2.5 Flash / Pro Hybrid',
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 rounded-2xl border border-sky-500/30 shadow-xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider">
              Shuroq Governance & Compliance
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-sky-400" /> Enterprise Workspace & RBAC Controls
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage multi-brand workspaces, role-based access control, Single Sign-On (SSO), audit trails, and AI token costs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Role Preview:</span>
          <select
            value={userRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-950 border border-sky-500/40 text-sky-300 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="admin">Admin (Full Access)</option>
            <option value="team_member">Team Member (Editor)</option>
            <option value="viewer">Viewer (Read-Only)</option>
          </select>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('workspaces')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'workspaces'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Building className="w-4 h-4 text-sky-400" /> Multi-Workspace & Agency Hub
        </button>

        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'rbac'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-purple-400" /> Roles & Permissions (RBAC)
        </button>

        <button
          onClick={() => setActiveTab('sso_security')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'sso_security'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-400" /> SSO & Security Compliance
        </button>

        <button
          onClick={() => setActiveTab('audit_logs')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'audit_logs'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileCheck className="w-4 h-4 text-amber-400" /> Audit Logs
        </button>

        <button
          onClick={() => setActiveTab('ai_tokens')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'ai_tokens'
              ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Coins className="w-4 h-4 text-cyan-400" /> AI Token Usage & Costs
        </button>
      </div>

      {/* TAB 1: Workspaces */}
      {activeTab === 'workspaces' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-400" /> Provisioned Workspaces & Agency Hubs
            </h3>
            <button className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Create New Workspace
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workspaces.map((ws, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-bold text-white text-xs">{ws.name}</span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                    {ws.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <p>• {ws.brandCount} Managed Brands</p>
                  <p>• {ws.members} Active Team Members</p>
                  <p>• Tier: <strong className="text-sky-300">{ws.plan}</strong></p>
                </div>

                <button className="w-full py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-sky-300 transition-colors">
                  Switch to Workspace
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RBAC */}
      {activeTab === 'rbac' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-4 h-4 text-purple-400" /> Role-Based Access Control Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Feature / Capability</th>
                  <th className="p-3">Admin</th>
                  <th className="p-3">Editor / Strategist</th>
                  <th className="p-3 rounded-r-xl">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold">AI Content Generation & Editing</td>
                  <td className="p-3 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3 text-slate-500">Read-Only</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Post Publishing & Queue Approval</td>
                  <td className="p-3 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3 text-amber-400 font-bold">Requires Approval</td>
                  <td className="p-3 text-slate-500">Read-Only</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Brand Voice & Asset Management</td>
                  <td className="p-3 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3 text-slate-500">Read-Only</td>
                  <td className="p-3 text-slate-500">Read-Only</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">API Keys & Outbound Webhooks</td>
                  <td className="p-3 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3 text-slate-500">No Access</td>
                  <td className="p-3 text-slate-500">No Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SSO & Compliance */}
      {activeTab === 'sso_security' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Lock className="w-4 h-4 text-emerald-400" /> Single Sign-On (SAML 2.0 / Okta / Azure AD)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="font-bold text-white block">SAML 2.0 Identity Provider</span>
              <p className="text-slate-400">Status: <strong className="text-emerald-400">Configured & Enforced</strong></p>
              <p className="text-slate-500">Entity ID: https://auth.shuroqtech.com/saml/metadata</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="font-bold text-white block">Data Privacy & SOC2 Compliance</span>
              <p className="text-slate-400">SOC2 Type II Certified • GDPR Compliant • Zero Data Retention on AI Inputs</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Audit Logs */}
      {activeTab === 'audit_logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" /> Immutable Workspace Audit Trail
            </h3>
            <button className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export Audit CSV
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.user} • IP: {log.ip}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AI Tokens */}
      {activeTab === 'ai_tokens' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Coins className="w-4 h-4 text-cyan-400" /> AI Model Token Usage & Cost Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Tokens Consumed</span>
              <p className="text-lg font-extrabold text-white mt-1">{tokenStats.totalTokensUsed}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Monthly Allocation</span>
              <p className="text-lg font-extrabold text-emerald-400 mt-1">{tokenStats.tokensLimit}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Estimated Spend</span>
              <p className="text-lg font-extrabold text-sky-400 mt-1">{tokenStats.estimatedCost}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Primary AI Engine</span>
              <p className="text-xs font-bold text-purple-300 mt-2">{tokenStats.topModel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
