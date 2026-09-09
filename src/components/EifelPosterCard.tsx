import React, { useState } from 'react';
import { EIFEL_TRIP_MASTER, EIFEL_3DAYS_SCHEDULE } from '../data/eifelPlanData';
import { Share2, Check, Copy, MessageSquare, MapPin, Calendar, Users, Trophy, ExternalLink, Key, ShieldCheck } from 'lucide-react';

interface EifelPosterCardProps {
  groupSize: number;
  selectedVillaId: string;
}

export const EifelPosterCard: React.FC<EifelPosterCardProps> = ({
  groupSize,
  selectedVillaId,
}) => {
  const [copied, setCopied] = useState(false);
  const selectedVilla = EIFEL_TRIP_MASTER.lodgingOptions.find((v) => v.id === selectedVillaId) || EIFEL_TRIP_MASTER.lodgingOptions[0];

  const lodgingPp = Math.round((selectedVilla.pricePerNightTotal * 2) / groupSize);
  const activitiesAndFoodPp = EIFEL_3DAYS_SCHEDULE.reduce((sum, d) => sum + d.dayTotalPp, 0);
  const totalPp = lodgingPp + activitiesAndFoodPp;
  const totalGroup = totalPp * groupSize;

  const appUrl = typeof window !== 'undefined' ? window.location.href : '';

  const generateWhatsappText = () => {
    return `🏁 *HERFSTVAKANTIE EIFEL & NÜRBURGRING PITCH* 🏁
📍 *Bestemming:* Adenau / Nürburgring (Duitsland)
⏱ *Duur:* 2 nachten, 3 VOLLE DAGEN met ${groupSize} boys (17 jr)
🚗 *Reistijd vanaf Sittard:* Slechts 1u 20m met de auto (of 2u 40m met trein/bus)

💰 *TOTAALPRIJS P.P. (ALL-IN):* ca. € ${totalPp},- (Totaal groep: € ${totalGroup},-)
• Slaapplek (${selectedVilla.name} met sleutelkluis): € ${lodgingPp},- p.p. voor 2 nachten!
• Vervoer retour Sittard (trein/bus of carpool): € 29,- p.p.
• Alle vette activiteiten:
   - 300cc Offroad Quads safari (crossen door heuvels & modder): € 55,- p.p.
   - ring°kartbahn (Overdekt high-tech karten bij de Nürburgring): € 15,- p.p.
   - Aqua Mundo Center Parcs Park Eifel (Subtropisch zwemparadijs & wildwaterbaan): € 21,- p.p.
   - ring°werk F1 Museum & 4D simulator: € 11,- p.p.
   - Nordschleife Drifting & Supercars spotten bij Brünnchen: GRATIS!
• Eten, drinken & Pistenklause biefstuk op hete lavasteen: € 67,- p.p.

🏡 *HOE WE BINNENKOMEN OP ONZE 17E (METHODE 1):*
• 100% Contactloos via een MasterLock sleutelkluisje met 4-cijferige pincode aan de voordeur van de villa!
• Onze ouders boeken via Booking.com of Airbnb op hun naam, wij krijgen de pincode via de app en lopen zo naar binnen. Nul receptiecontrole, nul risico!

🍺 *DRANK & STAPPEN:*
In Duitsland is bier en cider (§9 Jugendschutzgesetz) legaal vanaf 16 jaar! 's Avonds barbecue bij de villa of gezellig in het brauhaus poolbiljart spelen.

👉 *Bekijk het volledige draaiboek en de links hier:*
${appUrl}

Wie stemt 'JA' in de groepsapp? 🚀`;
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(generateWhatsappText())}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generateWhatsappText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Visual Pitch Poster */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/40 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
        {/* Background watermark */}
        <div className="absolute -right-12 -bottom-12 text-zinc-800/20 font-black text-9xl select-none pointer-events-none">
          RING
        </div>

        {/* Poster Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              OFFICIËLE VRIENDENPITCH • HERFSTVAKANTIE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              Eifel & Nürburgring Trip
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Adenau / Nürburgring (125 km v.a. Sittard)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                2 Nachten • 3 Volle Dagen
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                {groupSize} Boys (17 jaar)
              </span>
            </div>
          </div>

          {/* Big price box */}
          <div className="bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-amber-500/40 text-center sm:text-right shrink-0 shadow-lg">
            <div className="text-[10px] uppercase font-bold text-zinc-400">All-in Totaalprijs p.p.</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">€ {totalPp},-</div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Groepstotaal ({groupSize} pers): <strong className="text-zinc-200">€ {totalGroup},-</strong>
            </div>
          </div>
        </div>

        {/* Poster Key Selling Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
          <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Slaapplek</span>
            <div className="text-sm font-bold text-zinc-100 line-clamp-1">{selectedVilla.name}</div>
            <div className="text-xs text-amber-400 font-bold">€ {lodgingPp},- p.p. (2 nachten)</div>
          </div>

          <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Inchecken</span>
            <div className="text-sm font-bold text-zinc-100 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Sleutelkluis
            </div>
            <div className="text-xs text-emerald-400 font-medium">0% baliecontrole</div>
          </div>

          <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Vervoer</span>
            <div className="text-sm font-bold text-zinc-100">Trein of Carpool</div>
            <div className="text-xs text-amber-400 font-bold">Slechts 1u 20m rijden</div>
          </div>

          <div className="p-3.5 bg-zinc-950/70 rounded-2xl border border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Stappen & Drank</span>
            <div className="text-sm font-bold text-zinc-100">Bier & Wijn 16+</div>
            <div className="text-xs text-emerald-400 font-bold">100% Legaal in DE</div>
          </div>
        </div>

        {/* Highlights List */}
        <div className="space-y-3 relative z-10">
          <div className="text-xs font-black uppercase tracking-wider text-zinc-400">
            Wat We Gaan Doen Die 3 Dagen:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
              <span className="text-lg">🏎️</span>
              <div>
                <strong className="text-zinc-200 block">300cc Offroad Quads Safari</strong>
                <span className="text-zinc-400 text-[11px]">1,5 uur crossen door heuvels & modder (€ 55,-)</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
              <span className="text-lg">🏁</span>
              <div>
                <strong className="text-zinc-200 block">ring°kartbahn Nürburgring</strong>
                <span className="text-zinc-400 text-[11px]">Overdekte elektrokarts met live tijden (€ 15,-)</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
              <span className="text-lg">🏊‍♂️</span>
              <div>
                <strong className="text-zinc-200 block">Aqua Mundo Subtropisch Zwemmen</strong>
                <span className="text-zinc-400 text-[11px]">Wildwaterbaan & 30°C warm water (€ 21,-)</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
              <span className="text-lg">🥩</span>
              <div>
                <strong className="text-zinc-200 block">Restaurant Pistenklause</strong>
                <span className="text-zinc-400 text-[11px]">Biefstuk op hete lavasteen in legendarische F1 pub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-3 relative z-10">
          <a
            id="share-whatsapp-direct"
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[200px] py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20 text-decoration-none cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open in WhatsApp & Stuur naar Vrienden</span>
          </a>

          <button
            id="copy-poster-text-btn"
            onClick={handleCopy}
            className="py-3.5 px-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tekst Gekopieerd!' : 'Kopieer Pitch Tekst'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
