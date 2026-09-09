import React from 'react';
import { EIFEL_TRIP_MASTER } from '../data/eifelPlanData';
import { Utensils, Star, MapPin, ExternalLink, Beer, ShieldCheck, Flame, DollarSign } from 'lucide-react';

export const EifelRestaurantSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
          <Utensils className="w-3.5 h-3.5" />
          ONDERZOEK NAAR RESTAURANTS & STAPPEN
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          Waar Eten We & Wat Kost Het?
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          We hebben de menukaarten, actuele prijzen, Google recensies en officiële websites onderzocht. 
          Hieronder vind je de beste plekken van de Eifel: van biefstuk bakken op een hete lavasteen bij het legendarische Formule 1 steakhouse <strong>Pistenklause</strong> tot monsterburgers eten terwijl raceauto's voorbij razen bij <strong>Bistro Cockpit</strong>.
        </p>
      </div>

      {/* German Alcohol Law 16+ Callout */}
      <div className="p-5 bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-zinc-900 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <Beer className="w-4 h-4" />
            <span>Duits Horecarecht (§9 Jugendschutzgesetz): Bier & Cider Legaal Vanaf 16 Jaar!</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            In Duitsland mag de horeca zwak-alcoholische dranken (bier, pilsener, radler, cider en wijn) legaal serveren aan jongeren vanaf 16 jaar. Jullie worden niet geweigerd en hoeven niet stiekem te doen. Sterke drank (wodka, shots) blijft 18+.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold shrink-0 text-center">
          ✓ 100% Legaal voor 17-jarigen
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EIFEL_TRIP_MASTER.restaurantsAndNightlife.map((resto) => (
          <div
            key={resto.id}
            className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl flex flex-col justify-between space-y-5 hover:border-zinc-700 transition-colors shadow-xl"
          >
            <div className="space-y-4">
              {/* Header with name and rating */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-white">{resto.name}</h3>
                  <span className="text-xs font-bold text-amber-400">{resto.category}</span>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{resto.location}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-amber-400 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{resto.rating}</span>
                    <span className="text-zinc-500 text-[10px]">({resto.reviewCount})</span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 mt-1.5 inline-block">
                    {resto.priceRange}
                  </span>
                </div>
              </div>

              {/* Vibe description */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {resto.vibeDescription}
              </p>

              {/* Menu Highlights with verified prices */}
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Menukaart & Actuele Prijzen:</span>
                </div>

                <div className="space-y-1.5 bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800/80">
                  {resto.menuHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 pb-2 border-b border-zinc-800/60 last:border-0 last:pb-0"
                    >
                      <div>
                        <strong className="text-xs text-zinc-200 block">{item.item}</strong>
                        <span className="text-[11px] text-zinc-400">{item.note}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400 shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Quote */}
              <blockquote className="p-3 bg-zinc-950/60 rounded-xl text-xs text-zinc-400 italic border-l-2 border-amber-500">
                {resto.reviewHighlight}
              </blockquote>

              {/* Legal Note */}
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{resto.legal16Check}</span>
              </div>
            </div>

            {/* Link to official site */}
            <div className="pt-4 border-t border-zinc-800">
              <a
                href={resto.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors text-decoration-none"
              >
                <span>Bezoek Officiële Website & Volledige Menukaart</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
