import React, { useState } from 'react';
import { X, Sparkles, Calendar, Send, Layers } from 'lucide-react';
import { PostItem, PlatformChannel, PostStatus } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Partial<PostItem>) => void;
  initialData?: Partial<PostItem>;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [channel, setChannel] = useState<PlatformChannel>(initialData?.channel || 'linkedin');
  const [content, setContent] = useState(initialData?.content || '');
  const [status, setStatus] = useState<PostStatus>(initialData?.status || 'scheduled');
  const [scheduledAt, setScheduledAt] = useState(
    initialData?.scheduledAt || new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      title,
      channel,
      content,
      status,
      scheduledAt: new Date(scheduledAt).toISOString(),
      author: 'Alex Rivera',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            {initialData ? 'Edit Campaign Post' : 'Schedule New Campaign Post'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Post Title / Topic *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 AI Marketing Automations for B2B Founders"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Platform Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as PlatformChannel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none"
              >
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">X / Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="blog">SEO Blog</option>
                <option value="newsletter">Email Newsletter</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Approval Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none"
              >
                <option value="scheduled">Scheduled Queue</option>
                <option value="in_review">Send to AI Review</option>
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Instantly</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Schedule Date & Time</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Post Content / Copy *</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type or paste post copy here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 font-normal leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
