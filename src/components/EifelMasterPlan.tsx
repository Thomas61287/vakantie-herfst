import React, { useState } from 'react';
import { EIFEL_TRIP_MASTER, EIFEL_3DAYS_SCHEDULE } from '../data/eifelPlanData';
import { LodgingVilla, RestaurantGuide, Activity } from '../types';
import { 
  Calendar, Clock, DollarSign, MapPin, CheckCircle2, ShieldCheck, 
  Car, Train, Utensils, Waves, Flame, Trophy, Key, AlertCircle, 
  Share2, Copy, Check, MessageSquare, ExternalLink, Sparkles, Beer,
  Star, Users, Bed, Info, ArrowRight, ShieldAlert, Award
} from 'lucide-react';

export const EifelMasterPlan: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [groupSize, setGroupSize] = useState<number>(3); // User requested 3 friends!
  const [selectedVillaId, setSelectedVillaId] = useState<string>('nring-villa-adenau');
  const [copied, setCopied] = useState(false);
  const [copiedParentText, setCopiedParentText] = useState(false);

  const selectedVilla = EIFEL_TRIP_MASTER.lodgingOptions.find((v) => v.id === selectedVillaId) || EIFEL_TRIP_MASTER.lodgingOptions[0];
  const currentDay = EIFEL_3DAYS_SCHEDULE.find((d) => d.dayNumber === selectedDay) || EIFEL_3DAYS_SCHEDULE[0];

  // Dynamic cost calculations based on 2 nights and group size
  const lodgingCostTotal2Nights = selectedVilla.pricePerNightTotal * 2;
  const lodgingPp = Math.round(lodgingCostTotal2Nights / groupSize);

  // Activities & Food total over 3 days per person
  const activitiesAndFoodPp = EIFEL_3DAYS_SCHEDULE.reduce((sum, d) => sum + d.dayTotalPp, 0);
  const grandTotalPp = lodgingPp + activitiesAndFoodPp;
  const grandTotalGroup = grandTotalPp * groupSize;

  const generateVriendenWhatsapp = () => {
    return `🏁 *EIFEL & NÜRBURGRING TRIP - ONS 3-DAGEN PLAN* 🏁
📍 *Bestemming:* Adenau / Nürburgring (Eifel, Duitsland)
⏱ *Reistijd:* Slechts 1u 20m met de auto (of 2u 40m met trein/bus v.a. Sittard)
👥 *Groep:* ${groupSize} boys (17 jaar) • 2 nachten, 3 VOLLE DAGEN!

💰 *TOTAALBEDRAG P.P. (ALL-IN):* ca. € ${grandTotalPp},- (Totaal groep: € ${grandTotalGroup},-)
• Slaapplek (${selectedVilla.name} met sleutelkluis): € ${lodgingPp},- p.p. voor 2 nachten!
• Vervoer retour v.a. Sittard (trein/bus of auto): € 29,- p.p.
• Alle vette activiteiten:
   - 300cc Offroad Quads (1,5 uur crossen door heuvels & modder): € 55,- p.p.
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

Wie gooit definitief zijn akkoord in de groep? 🚀`;
  };

  const generateParentBriefing = () => {
    return `Beste ouders,

Hierbij het officiële en transparante reisplan voor onze herfstvakantietrip naar de Eifel / Nürburgring (Duitsland):

📍 Bestemming: Adenau, Duitsland (Slechts 125 km vanaf Sittard)
📅 Reisduur: 2 nachten & 3 volle dagen (Vrijdag t/m Zondag)
👥 Reizigers: ${groupSize} personen (17 jaar)
🏡 Accommodatie: ${selectedVilla.name} (Vrijstaand, contactloze sleutelkluis)
💰 Budget: ca. € ${grandTotalPp},- all-in per persoon (incl. verblijf, vervoer, eten en activiteiten)

Veiligheidsgaranties en afspraken:
1. Contactloos inchecken (Methode 1): Het verblijf beschikt over een gecertificeerde sleutelkluis met pincode. Geen risico op weigering bij een receptiebalie.
2. Vervoer: Duidelijke route met reguliere Deutsche Bahn treinen en Eifelbus (of directe carpool in 1 uur en 20 minuten).
3. Activiteiten: Quads en karten vinden uitsluitend plaats op afgesloten, professionele adventure terreinen met instructeur en helmplicht (geen openbare weg).
4. Verzekering & Toestemming: Iedereen neemt het ingevulde Rijksoverheid "Toestemmingsformulier minderjarige naar buitenland", paspoort en zorgpas mee.
5. Nabijheid: Bij eventuele noodsituaties is de Eifel binnen 80 minuten per auto bereikbaar vanuit Sittard.`;
  };

  const handleCopyVrienden = () => {
    navigator.clipboard.writeText(generateVriendenWhatsapp());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyParents = () => {
    navigator.clipboard.writeText(generateParentBriefing());
    setCopiedParentText(true);
    setTimeout(() => setCopiedParentText(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              EIFEL & NÜRBURGRING SPECIAL (2 NACHTEN • 3 VOLLE DAGEN)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              Het Ultieme Masterplan voor 3 Vrienden
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Volledig onderbouwd met betrouwbare bronnen, geverifieerde entreeprijzen, werkende Booking/Airbnb links, geverifieerde restaurantreviews en <strong>Methode 1 (Sleutelkluis)</strong> zodat jullie op je 17e zonder volwassene binnenkomen.
            </p>

            {/* Group Size Switcher (3 vs 4) */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-zinc-400">Aantal vrienden:</span>
              <div className="inline-flex p-1 bg-zinc-950 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setGroupSize(3)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    groupSize === 3
                      ? 'bg-amber-500 text-zinc-950 shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  3 Boys (Jullie groep)
                </button>
                <button
                  onClick={() => setGroupSize(4)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    groupSize === 4
                      ? 'bg-amber-500 text-zinc-950 shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  4 Boys
                </button>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                ✓ Berekend voor 2 nachten & 3 volle dagen!
              </span>
            </div>
          </div>

          {/* Quick budget summary badge */}
          <div className="bg-zinc-950/90 border border-amber-500/50 p-5 rounded-2xl text-center md:text-right shrink-0 shadow-lg">
            <div className="text-[11px] uppercase font-bold text-zinc-400">All-in p.p. (2 nachten)</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">€ {grandTotalPp},-</div>
            <div className="text-xs text-zinc-400 mt-1">
              Totaal voor {groupSize} vrienden: <strong className="text-zinc-200">€ {grandTotalGroup},-</strong>
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">
              (Incl. {selectedVilla.name.split('(')[0].trim()})
            </div>
          </div>
        </div>

        {/* Quick action share buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-zinc-800/80">
          <button
            id="eifel-copy-whatsapp-btn"
            onClick={handleCopyVrienden}
            className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
            {copied ? 'Gekopieerd voor Groepsapp!' : 'Deel 3-Dagen Plan in WhatsApp'}
          </button>

          <button
            id="eifel-copy-parents-btn"
            onClick={handleCopyParents}
            className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copiedParentText ? <Check className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-amber-400" />}
            {copiedParentText ? 'Ouderbrief Gekopieerd!' : 'Kopieer Veilige Brief voor Ouders'}
          </button>
        </div>
      </div>

      {/* METHODE 1 EXPLAINER: HOW YOU ENTER WITHOUT ADULTS */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Methode 1: Sleutelkluis (100% Zelfstandig Inchecken)
            </h3>
            <p className="text-xs text-zinc-400">
              Waarom dit voor 17-jarigen de enige slimme en zekere manier is zonder gedoe bij een hotelbalie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl space-y-2">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Stap 1: Ouders Boeken Thuis
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Je vader of moeder reserveert de villa online op Booking.com of Airbnb op hun account met iDEAL of creditcard. Zij zijn officieel de contractpartij.
            </p>
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl space-y-2">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Stap 2: Pincode Ontvangen
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              24 uur voor aankomst stuurt de host automatisch de 4-cijferige cijfercode van het MasterLock sleutelkluisje naast de voordeur via de app/e-mail.
            </p>
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl space-y-2">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Stap 3: Code Intoetsen & Chillen
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Jullie komen aan, toetsen de cijfers in, pakken de fysieke sleutel en stappen direct naar binnen. Er staat letterlijk <strong>niemand</strong> om ID’s of leeftijd te controleren!
            </p>
          </div>
        </div>
      </div>

      {/* VILLA'S & SLAAPPLEKKEN (INCL LUXURY PRIVATE POOL OPTION) */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 mb-1">
              <Bed className="w-3.5 h-3.5" />
              SPECIFIEKE VILLA'S & CONTACTLOZE KEYBOXEN
            </div>
            <h3 className="text-xl font-black text-white">
              Waar Slapen We Met Z'n Drieën?
            </h3>
            <p className="text-xs text-zinc-400">
              Kies hieronder welke villa je wilt selecteren om de totale reisbegroting live te updaten.
            </p>
          </div>

          <div className="text-xs text-zinc-400 bg-zinc-800/80 px-3 py-1.5 rounded-xl border border-zinc-700">
            Geselecteerd voor calculatie: <strong className="text-amber-400">{selectedVilla.name.split('(')[0]}</strong>
          </div>
        </div>

        {/* Villa Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EIFEL_TRIP_MASTER.lodgingOptions.map((villa) => {
            const isSelected = villa.id === selectedVillaId;
            const pricePp2N = Math.round((villa.pricePerNightTotal * 2) / groupSize);

            return (
              <div
                key={villa.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                  isSelected
                    ? 'bg-zinc-800/90 border-amber-500 ring-2 ring-amber-500/30 shadow-xl'
                    : 'bg-zinc-800/30 border-zinc-700/60 hover:border-zinc-500'
                } ${villa.isLuxuryPoolOption ? 'border-sky-500/40 bg-gradient-to-b from-sky-950/20 to-zinc-900' : ''}`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    {villa.isLuxuryPoolOption ? (
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Waves className="w-3 h-3" />
                        Privé Zwembad Optie!
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase">
                        Aanrader
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{villa.rating}</span>
                      <span className="text-zinc-500 text-[10px]">({villa.reviewCount})</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-zinc-100">{villa.name}</h4>
                    <p className="text-xs text-amber-400/90 font-medium">{villa.subtitle}</p>
                    <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {villa.location} • {villa.distanceToRing}
                    </div>
                  </div>

                  {/* Pricing for 2 nights */}
                  <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800 space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400">Prijs 2 nachten p.p.:</span>
                      <span className="text-xl font-black text-amber-400">€ {pricePp2N},-</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 flex justify-between">
                      <span>Totaal huis ({groupSize} boys):</span>
                      <span className="text-zinc-300 font-semibold">€ {villa.pricePerNightTotal * 2},-</span>
                    </div>
                  </div>

                  {/* Methode 1 Check-in badge */}
                  <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" />
                      {villa.selfCheckInMethod}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {villa.whyPerfectFor17}
                    </p>
                  </div>

                  {/* Facilities list */}
                  <div className="space-y-1 text-xs text-zinc-300">
                    {villa.facilities.map((fac, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span className="text-[11px] text-zinc-300">{fac}</span>
                      </div>
                    ))}
                  </div>

                  {/* Review quote */}
                  <blockquote className="p-2.5 bg-zinc-900/40 rounded-lg text-[11px] text-zinc-400 italic border-l-2 border-amber-500">
                    {villa.reviewQuote}
                  </blockquote>
                </div>

                {/* Direct Action & Booking Links */}
                <div className="space-y-2 pt-3 border-t border-zinc-700/60">
                  <button
                    onClick={() => setSelectedVillaId(villa.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 font-black shadow'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {isSelected ? '✓ Geselecteerd voor Plan' : 'Selecteer deze Villa'}
                  </button>

                  <div className="space-y-1.5">
                    <a
                      href={villa.bookingDirectUrl || villa.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-colors text-decoration-none"
                    >
                      <span>Directe Listing op Booking.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={villa.fewoSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-colors text-decoration-none"
                      >
                        <span>FeWo-direkt (Laagste Prijs)</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <a
                        href={villa.airbnbSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-colors text-decoration-none"
                      >
                        <span>Airbnb</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 FULL DAYS TIMELINE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            Het 3-Dagen Programma (Vrijdagochtend t/m Zondagavond):
          </h2>
          <span className="text-xs text-amber-400 font-bold">
            Klik op een dag voor de activiteiten & kosten
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {EIFEL_3DAYS_SCHEDULE.map((day) => {
            const isSelected = day.dayNumber === selectedDay;
            return (
              <button
                key={day.dayNumber}
                id={`eifel-day-tab-${day.dayNumber}`}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                    : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-800/60 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-amber-500 text-zinc-950 font-black' : 'bg-zinc-800 text-zinc-300'}`}>
                    Dag 0{day.dayNumber}
                  </span>
                  <span className="font-semibold text-zinc-300">
                    € {day.dayTotalPp},- p.p.
                  </span>
                </div>
                <div className={`text-sm font-bold mt-1 ${isSelected ? 'text-zinc-100' : 'text-zinc-300'}`}>
                  {day.dayTitle.split(':')[0]}
                </div>
                <div className="text-xs text-zinc-400 mt-1 line-clamp-1">{day.summary}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Detail Schedule */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Draaiboek van Uur tot Uur
            </span>
            <h3 className="text-xl font-black text-white">
              {currentDay.dayTitle}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{currentDay.summary}</p>
          </div>

          <div className="bg-zinc-800/80 px-4 py-2 rounded-xl border border-zinc-700/60 text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-zinc-400">Activiteiten & Eten dagtotaal</div>
            <div className="text-lg font-black text-amber-400">€ {currentDay.dayTotalPp},- p.p.</div>
            <div className="text-[10px] text-zinc-400">Groep ({groupSize} pers): € {currentDay.dayTotalPp * groupSize},-</div>
          </div>
        </div>

        {/* Hour by hour items */}
        <div className="space-y-4">
          {currentDay.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-zinc-500 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-zinc-900 text-amber-400 font-mono text-xs font-bold border border-zinc-700">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {item.time}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    {item.location}
                  </span>
                  {item.verifiedSource && (
                    <span className="text-[10px] text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                      Bron: {item.verifiedSource}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-zinc-100">{item.activity}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.details}</p>

                <div className="text-[11px] text-emerald-400 font-medium pt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>17-Jaar Check: {item.legalCheck17}</span>
                </div>
              </div>

              <div className="text-left md:text-right shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-zinc-700/50">
                <span className="text-xs text-zinc-400 block md:inline">Prijs p.p.:</span>
                <span className="text-base font-black text-amber-400 ml-1">
                  {item.costPp === 0 ? 'GRATIS' : `€ ${item.costPp},-`}
                </span>
                <div className="text-[11px] text-zinc-400">
                  Totaal {groupSize} boys: {item.costPp === 0 ? '€ 0,-' : `€ ${item.costPp * groupSize},-`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESTAURANTS & FOOD RESEARCH */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 mb-1">
              <Utensils className="w-3.5 h-3.5" />
              ONDERZOEK RESTAURANTS & REVIEWS
            </div>
            <h3 className="text-xl font-black text-white">
              Waar Gaan We Eten & Chillen?
            </h3>
            <p className="text-xs text-zinc-400">
              Geverifieerde recensies, menuprijzen, officiële websites en 16+ alcoholregelgeving.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EIFEL_TRIP_MASTER.restaurantsAndNightlife.map((resto) => (
            <div
              key={resto.id}
              className="p-5 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-base text-zinc-100">{resto.name}</h4>
                    <span className="text-xs text-amber-400 font-semibold">{resto.category}</span>
                    <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {resto.location}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{resto.rating}</span>
                      <span className="text-zinc-500 text-[10px]">({resto.reviewCount})</span>
                    </div>
                    <span className="text-xs font-semibold text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700 mt-1 inline-block">
                      {resto.priceRange}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{resto.vibeDescription}</p>

                {/* Menu Highlights with verified prices */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
                    Menukaart Toppers (Geverifieerde prijzen):
                  </div>
                  <div className="space-y-1 text-xs bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                    {resto.menuHighlights.map((dish, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 pb-1 border-b border-zinc-800/60 last:border-0 last:pb-0">
                        <div>
                          <strong className="text-zinc-200 block text-xs">{dish.item}</strong>
                          <span className="text-[11px] text-zinc-400">{dish.note}</span>
                        </div>
                        <span className="font-bold text-amber-400 shrink-0 text-xs">{dish.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Highlight */}
                <p className="text-[11px] text-zinc-400 italic bg-zinc-900/40 p-2 rounded-lg border-l-2 border-amber-500">
                  {resto.reviewHighlight}
                </p>

                {/* 16+ Alcohol Check */}
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                  <Beer className="w-3.5 h-3.5 shrink-0" />
                  <span>{resto.legal16Check}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-700/60">
                <a
                  href={resto.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-decoration-none"
                >
                  <span>Bekijk Officiële Website & Menu</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVITIES RESEARCH & OFFICIAL SOURCES */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 mb-1">
              <Trophy className="w-3.5 h-3.5" />
              ACTIVITEITEN & REVIEWS
            </div>
            <h3 className="text-xl font-black text-white">
              De Vette Activiteiten (Quads, Karts, Zwemmen & F1)
            </h3>
            <p className="text-xs text-zinc-400">
              Geverifieerde prijzen, leeftijdsgrenzen (legaal voor 17-jarigen zonder autorijbewijs) en officiële links.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EIFEL_TRIP_MASTER.activities.map((act) => (
            <div
              key={act.id}
              className="p-5 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-base text-zinc-100">{act.name}</h4>
                    <span className="text-xs text-amber-400 font-semibold">{act.highlight}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-amber-400">
                      {act.costPerPerson === 0 ? 'GRATIS' : `€ ${act.costPerPerson},-`}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">per persoon</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{act.description}</p>

                <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1 text-xs">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Leeftijd & Rijbewijs: {act.ageRequirement}
                  </div>
                  <div className="text-zinc-400 text-[11px]">
                    Duur: <strong className="text-zinc-200">{act.duration}</strong>
                  </div>
                </div>

                {act.sourceLabel && (
                  <div className="text-[10px] text-zinc-500">
                    Geverifieerd via: <strong className="text-zinc-400">{act.sourceLabel}</strong>
                  </div>
                )}
              </div>

              {act.officialWebsite && (
                <div className="pt-2 border-t border-zinc-700/60">
                  <a
                    href={act.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-decoration-none"
                  >
                    <span>Officiële Website & Tickets</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TRANSIT & TRAVEL GUIDE FROM SITTARD */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Train className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Hoe Komen We Vanuit Sittard in Adenau?</h3>
            <p className="text-xs text-zinc-400">Volledige OV-route met trein en bus, of carpoolen in slechts 80 minuten.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              🚆 Openbaar Vervoer (Ca. 2u 40m)
            </span>
            <p className="text-xs text-zinc-200 font-medium">{EIFEL_TRIP_MASTER.transitDetails.route}</p>
            <div className="text-xs text-zinc-400 pt-1">
              Ticket: <strong className="text-zinc-200">{EIFEL_TRIP_MASTER.transitDetails.tickets}</strong>
            </div>
            <div className="text-sm font-extrabold text-amber-400">
              Kosten: Slechts ca. € 29,- retour p.p.!
            </div>
          </div>

          <div className="p-4 bg-zinc-800/40 border border-zinc-700/60 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              🚗 Ouders Brengen (Slechts 1u 20m • 125 km!)
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Vanaf Sittard is het slechts 125 km via Heerlen over de Duitse A4 en A61. Eén van jullie ouders kan jullie er vrijdagochtend in 80 minuten afzetten en zondagavond ophalen.
            </p>
            <div className="text-xs text-emerald-400 font-semibold pt-1">
              ✓ Benzinekosten: Slechts ca. € 15,- p.p. retour!
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-300">
            De 4 overstappen:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {EIFEL_TRIP_MASTER.transitDetails.steps.map((s, idx) => (
              <div key={idx} className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-800">
                <strong className="text-amber-400 block mb-0.5">{s.step}</strong>
                <span className="text-zinc-400">{s.info}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 0% SKETCHY FOR PARENTS */}
      <div className="p-6 bg-gradient-to-r from-emerald-950/30 to-zinc-900 border border-emerald-500/30 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          Waarom dit 0,0% "sketchy" is voor jullie ouders:
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Ouders maken zich vaak zorgen over het onbekende. Laat ze deze 6 harde feiten lezen:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
          {EIFEL_TRIP_MASTER.parentSecurityChecklist.map((check, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{check}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
