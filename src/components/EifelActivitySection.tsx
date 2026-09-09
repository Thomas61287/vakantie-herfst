import React from 'react';
import { EIFEL_TRIP_MASTER } from '../data/eifelPlanData';
import { Trophy, Star, ShieldCheck, Clock, ExternalLink, Flame, Waves, CheckCircle2 } from 'lucide-react';

export const EifelActivitySection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          ONDERZOEK NAAR ACTIVITEITEN & BRONNEN
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          Vette Dingen Om Te Doen (Legaal op je 17e!)
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Iedere activiteit is gecontroleerd op leeftijd, toegankelijkheid zonder autorijbewijs en actuele entreeprijzen.
          Hieronder vind je de geverifieerde gegevens voor de indoor karts, de offroad quads, het subtropisch zwemparadijs Aqua Mundo en het F1 museum.
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EIFEL_TRIP_MASTER.activities.map((act) => (
          <div
            key={act.id}
            className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl flex flex-col justify-between space-y-5 hover:border-zinc-700 transition-colors shadow-xl"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-white">{act.name}</h3>
                  <span className="text-xs font-bold text-amber-400">{act.highlight}</span>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-black text-amber-400">
                    {act.costPerPerson === 0 ? 'GRATIS' : `€ ${act.costPerPerson},-`}
                  </div>
                  <span className="text-[11px] text-zinc-400 block">per persoon</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {act.description}
              </p>

              {/* Badges Box */}
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Leeftijdseis: {act.ageRequirement}</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>Tijdsduur: <strong className="text-zinc-200">{act.duration}</strong></span>
                </div>

                {act.rating && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                    <span>Google Beoordeling: <strong className="text-amber-400">{act.rating} / 5</strong> ({act.reviewCount} recensies)</span>
                  </div>
                )}
              </div>

              {/* Source label */}
              {act.sourceLabel && (
                <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Gecontroleerde bron: <strong className="text-zinc-400">{act.sourceLabel}</strong></span>
                </div>
              )}
            </div>

            {/* Link button */}
            {act.officialWebsite && (
              <div className="pt-4 border-t border-zinc-800">
                <a
                  href={act.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors text-decoration-none"
                >
                  <span>Bekijk Officiële Website & Boekingsinfo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
