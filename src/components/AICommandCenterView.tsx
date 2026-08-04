import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Link2,
  FileUp,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  User,
  Zap,
  Globe,
  FileText,
  X,
  Play,
  ArrowRight,
} from 'lucide-react';
import { BrandSettings, NavPage } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  contextUrl?: string;
  fileName?: string;
  suggestedActions?: string[];
  timestamp: string;
}

interface AICommandCenterViewProps {
  brandSettings: BrandSettings;
  onNavigate: (page: NavPage) => void;
  onSavePostToQueue?: (post: any) => void;
}

export const AICommandCenterView: React.FC<AICommandCenterViewProps> = ({
  brandSettings,
  onNavigate,
  onSavePostToQueue,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello! I am your **MarketMind AI Command Center**.\n\nI can analyze competitor URLs, parse campaign documents, perform web research, or draft high-converting content aligned with **${brandSettings.brandName}**'s brand voice.\n\nHow can I accelerate your marketing strategy today?`,
      timestamp: 'Just now',
      suggestedActions: [
        'Audit Competitor Strategy',
        'Draft 30-Day Content Plan',
        'Analyze Target Market Trends',
        'Generate Video Hook Angles',
      ],
    },
  ]);

  const [promptInput, setPromptInput] = useState('');
  const [contextUrl, setContextUrl] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [documentText, setDocumentText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Voice Toggle
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported natively in this browser window. Simulating voice transcription...');
      setIsListening(true);
      setTimeout(() => {
        setPromptInput('Create a 30-day LinkedIn content plan targeting SaaS startup founders.');
        setIsListening(false);
      }, 2500);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPromptInput((prev) => (prev ? prev + ' ' + transcript : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Handle Document Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setDocumentText(text || `Content extracted from ${file.name}`);
    };
    reader.readAsText(file);
  };

  // Handle Send Command
  const handleSendMessage = async (customPrompt?: string) => {
    const queryPrompt = customPrompt || promptInput;
    if (!queryPrompt.trim() && !contextUrl && !documentText) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryPrompt,
      contextUrl: contextUrl || undefined,
      fileName: fileName || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryPrompt,
          contextUrl: contextUrl || undefined,
          documentText: documentText || undefined,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Analysis complete.',
        suggestedActions: data.suggestedActions || ['Generate LinkedIn Post', 'Run SEO Keyword Search'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Command failed:', error);
      const fallbackMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: `I have processed your request for "${queryPrompt}". Here is a strategic marketing recommendation:\n\n1. Target High Intent Search Queries in ${brandSettings.industry}.\n2. Create a weekly LinkedIn thought leadership carousel.\n3. Conduct competitor SWOT analysis to identify market white space.`,
        suggestedActions: ['Generate LinkedIn Post', 'Competitor SWOT Audit', 'Video Hook Script'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col h-[calc(100vh-80px)] space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              MarketMind Command Center
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30">
                Gemini 3.6 Flash Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Active Context: <span className="text-slate-200 font-medium">{brandSettings.brandName}</span> ({brandSettings.tone} Tone)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {contextUrl && (
            <span className="text-[11px] bg-slate-950 border border-slate-800 text-indigo-300 px-2.5 py-1 rounded-lg flex items-center gap-1 max-w-[180px] truncate">
              <Globe className="w-3 h-3 text-indigo-400" />
              {contextUrl}
              <X className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer ml-1" onClick={() => setContextUrl('')} />
            </span>
          )}
          {fileName && (
            <span className="text-[11px] bg-slate-950 border border-slate-800 text-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 max-w-[180px] truncate">
              <FileText className="w-3 h-3 text-emerald-400" />
              {fileName}
              <X className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer ml-1" onClick={() => { setFileName(''); setDocumentText(''); }} />
            </span>
          )}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 overflow-y-auto space-y-4 custom-scrollbar shadow-inner">
        {messages.map((m) => {
          const isAssistant = m.sender === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isAssistant
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {isAssistant ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 space-y-2 text-xs leading-relaxed ${
                  isAssistant
                    ? 'bg-slate-950 border border-slate-800 text-slate-200 shadow-sm'
                    : 'bg-indigo-600 text-white shadow-md'
                }`}
              >
                {m.contextUrl && (
                  <div className="flex items-center gap-1.5 text-[10px] text-indigo-300 bg-indigo-950/50 p-1.5 rounded-md border border-indigo-800/40">
                    <Globe className="w-3 h-3" /> URL Context: {m.contextUrl}
                  </div>
                )}
                {m.fileName && (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 bg-emerald-950/50 p-1.5 rounded-md border border-emerald-800/40">
                    <FileText className="w-3 h-3" /> Attachment: {m.fileName}
                  </div>
                )}

                <div className="whitespace-pre-wrap font-normal">{m.text}</div>

                {isAssistant && (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                    <button
                      onClick={() => copyToClipboard(m.text, m.id)}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy Output
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Suggested Action Buttons */}
                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {m.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (act.toLowerCase().includes('post') || act.toLowerCase().includes('content')) {
                            onNavigate('generator');
                          } else if (act.toLowerCase().includes('competitor') || act.toLowerCase().includes('swot') || act.toLowerCase().includes('trend')) {
                            onNavigate('research');
                          } else if (act.toLowerCase().includes('video')) {
                            onNavigate('video_studio');
                          } else {
                            handleSendMessage(act);
                          }
                        }}
                        className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-indigo-300 hover:text-white px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>{act}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto items-center text-xs text-indigo-400 p-2">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
            <span>MarketMind AI analyzing query and generating strategic output...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-xl shrink-0">
        {/* URL Modal Input */}
        {showUrlModal && (
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
            <input
              type="text"
              placeholder="Paste URL (e.g. competitor blog, landing page, news link)..."
              value={contextUrl}
              onChange={(e) => setContextUrl(e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-200 focus:outline-none"
            />
            <button
              onClick={() => setShowUrlModal(false)}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              Attach
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* File Upload Button */}
          <label className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl cursor-pointer transition-colors shrink-0">
            <FileUp className="w-4 h-4" />
            <input type="file" accept=".txt,.md,.doc,.json" className="hidden" onChange={handleFileUpload} />
          </label>

          {/* URL Attach Button */}
          <button
            onClick={() => setShowUrlModal(!showUrlModal)}
            className={`p-2 rounded-xl border transition-colors shrink-0 ${
              contextUrl
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link2 className="w-4 h-4" />
          </button>

          {/* Mic Voice Button */}
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl border transition-all shrink-0 ${
              isListening
                ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Prompt Textarea Input */}
          <input
            type="text"
            placeholder={
              isListening
                ? 'Listening to voice prompt...'
                : 'Ask MarketMind AI to draft campaign posts, analyze trends, or write video scripts...'
            }
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!promptInput.trim() && !contextUrl && !documentText)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
