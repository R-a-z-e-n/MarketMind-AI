import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'dark' | 'light';
}

export const ShuroqLogo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'full' }) => {
  const heightClass = {
    sm: 'h-6',
    md: 'h-9',
    lg: 'h-12',
    xl: 'h-16',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <img
        src="/shuroq-logo.svg"
        alt="Shuroq - Tech Redefined"
        className={`${heightClass} w-auto object-contain transition-transform hover:scale-105`}
      />
    </div>
  );
};

export const ShuroqIconBadge: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-white p-1 border border-slate-700/50 hover:scale-105 transition-transform ${className}`}
    >
      <img src="/shuroq-icon.svg" alt="Shuroq Badge" className="w-full h-full object-contain" />
    </div>
  );
};

export const ShuroqBannerCard: React.FC<{
  onSelectService?: (serviceName: string) => void;
}> = ({ onSelectService }) => {
  const services = [
    { name: 'Enterprise Solutions', icon: '⚙️', desc: 'Custom enterprise software, ERP integrations, and workflow automation.' },
    { name: 'IT Services', icon: '💻', desc: 'Managed IT infrastructure, cybersecurity, and system optimization.' },
    { name: 'Consulting', icon: '💡', desc: 'Strategic technology transformation, AI adoption, and architecture planning.' },
    { name: 'Business Solutions', icon: '📈', desc: 'Automated workflow engines, data analytics, and growth tools.' },
    { name: 'Cloud Services', icon: '☁️', desc: 'Cloud migration, DevOps pipelines, AWS/GCP architecture & management.' },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-sky-900/90 via-slate-900 to-indigo-950 p-6 md:p-8 shadow-2xl text-white">
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/shuroq-banner.svg')] bg-cover bg-right opacity-20 pointer-events-none hidden lg:block" />

      <div className="relative z-10 space-y-6">
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img src="/shuroq-logo.svg" alt="Shuroq" className="h-10 w-auto bg-white/95 px-3 py-1 rounded-xl shadow-md" />
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[11px] font-bold tracking-wide uppercase">
                Official Brand Showcase
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed pt-1">
              Shuroq provides end-to-end technology solutions to accelerate digital transformation, cloud architecture, and AI automation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Services Suite:</span>
            <span className="px-3 py-1 rounded-lg bg-sky-600/30 text-sky-200 border border-sky-500/40 text-xs font-bold">
              5 Core Pillars
            </span>
          </div>
        </div>

        {/* 5 Service Pillars Interactive Grid (from Image 3) */}
        <div>
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">
            Core Service Offerings & Capabilities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {services.map((s, idx) => (
              <button
                key={idx}
                onClick={() => onSelectService && onSelectService(s.name)}
                className="group p-3.5 bg-slate-950/80 hover:bg-sky-950/60 border border-slate-800 hover:border-sky-500/50 rounded-xl transition-all text-left flex flex-col justify-between shadow-md"
              >
                <div>
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{s.icon}</span>
                  <p className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {s.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                    {s.desc}
                  </p>
                </div>
                <span className="text-[10px] text-sky-400 font-semibold mt-3 group-hover:translate-x-1 transition-transform inline-block">
                  Launch Brief →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
