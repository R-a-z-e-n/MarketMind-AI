import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  CheckCircle2,
  Mail,
  UserCheck,
  Building,
  MoreVertical,
} from 'lucide-react';
import { TeamMember, UserRole } from '../types';

interface TeamWorkspaceViewProps {
  teamMembers: TeamMember[];
  userRole: UserRole;
  onInviteMember: (member: TeamMember) => void;
}

export const TeamWorkspaceView: React.FC<TeamWorkspaceViewProps> = ({
  teamMembers,
  userRole,
  onInviteMember,
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('team_member');
  const [newDepartment, setNewDepartment] = useState('Content & Growth');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    onInviteMember({
      id: `m-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      department: newDepartment,
      status: 'active',
    });

    setNewName('');
    setNewEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Team Workspace & Role-Based Permissions (RBAC)</span>
          </div>
          <h2 className="text-xl font-bold text-white">Team Collaboration & Approval Workflow</h2>
          <p className="text-xs text-slate-400">
            Manage Admin, Team Member, and Viewer access, assign posts, and maintain approval logs.
          </p>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleInvite}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl"
          >
            <h3 className="font-bold text-white text-sm">Invite New Workspace Member</h3>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Jordan Smith"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Email Address</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="jordan@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Workspace Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as UserRole)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="admin">Admin (Full Access & Billing)</option>
                <option value="team_member">Team Member (Generate & Schedule)</option>
                <option value="viewer">Viewer (Read Only & Comment)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 text-slate-400 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 text-white font-semibold rounded-xl text-xs"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Active Members ({teamMembers.length})</span>
          <span className="text-xs text-slate-400">Current Role: {userRole.toUpperCase()}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-100 text-xs">{member.name}</h4>
                  <p className="text-[11px] text-slate-400">{member.email}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{member.department}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {member.role.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
