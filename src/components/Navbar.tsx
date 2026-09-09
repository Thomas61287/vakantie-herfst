import React from 'react';
import { Calendar, Home, Utensils, Trophy, Share2, ShieldCheck } from 'lucide-react';

export type EifelTabType = 'masterplan' | 'villas' | 'restaurants' | 'activities' | 'whatsapp-poster' | 'safety';

interface NavbarProps {
  activeTab: EifelTabType;
  setActiveTab: (tab: EifelTabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'masterplan' as const, label: '3-Dagen Draaiboek', icon: Calendar },
    { id: 'villas' as const, label: 'Villa\'s & Sleutelkluis', icon: Home, badge: 'Methode 1' },
    { id: 'restaurants' as const, label: 'Restaurants & Menu\'s', icon: Utensils, badge: '16+ Bier' },
    { id: 'activities' as const, label: 'Quads, Karts & Pool', icon: Trophy },
    { id: 'whatsapp-poster' as const, label: 'WhatsApp & Poster', icon: Share2 },
    { id: 'safety' as const, label: 'Ouders & 0% Sketchy', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('masterplan')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-lg shadow-lg shadow-amber-500/20">
            🏁
          </div>
          <div>
            <div className="font-black text-sm text-zinc-100 flex items-center gap-1.5 tracking-tight">
              EIFEL & NÜRBURGRING
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                2 Nachten • 3 Dagen
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-medium">
              3 Vrienden (17 jr) • Vertrek v.a. Sittard
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-amber-400 border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="lg:hidden flex items-center gap-1.5 px-4 py-2 overflow-x-auto border-t border-zinc-900 bg-zinc-950">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 font-black shadow'
                  : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
