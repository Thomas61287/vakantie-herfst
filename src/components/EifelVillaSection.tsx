import React, { useState, useMemo } from 'react';
import { EIFEL_TRIP_MASTER } from '../data/eifelPlanData';
import { LodgingVilla, CompetitorDeal } from '../types';
import { 
  Home, Key, Star, MapPin, Check, ExternalLink, Waves, ShieldCheck, 
  Sparkles, CheckCircle2, Bed, DollarSign, Calendar, Users, 
  TrendingDown, RefreshCw, Copy, Sliders, ArrowUpRight, Flame, 
  ShieldAlert, Tag, Building2, HelpCircle
} from 'lucide-react';

interface EifelVillaSectionProps {
  groupSize: number;
  selectedVillaId: string;
  onSelectVilla: (id: string) => void;
}

export const EifelVillaSection: React.FC<EifelVillaSectionProps> = ({
  groupSize: initialGroupSize,
  selectedVillaId,
  onSelectVilla,
}) => {
  // Relevante Prijs Updater State
  const [groupSize, setGroupSize] = useState<number>(initialGroupSize || 3);
  const [nights, setNights] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState<string>('2026-10-16');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-10-18');
  const [includeCleaningFee, setIncludeCleaningFee] = useState<boolean>(true);
  const [includeTouristTax, setIncludeTouristTax] = useState<boolean>(true);
  const [activeTabPlatform, setActiveTabPlatform] = useState<Record<string, string>>({});
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Quick Date Presets
  const applyPreset = (preset: 'weekend1' | 'weekend2' | 'longweekend') => {
    if (preset === 'weekend1') {
      setCheckInDate('2026-10-16');
      setCheckOutDate('2026-10-18');
      setNights(2);
    } else if (preset === 'weekend2') {
      setCheckInDate('2026-10-23');
      setCheckOutDate('2026-10-25');
      setNights(2);
    } else if (preset === 'longweekend') {
      setCheckInDate('2026-10-22');
      setCheckOutDate('2026-10-25');
      setNights(3);
    }
  };

  // Helper to generate dynamic deep links for any platform
  const buildDeepLink = (baseUrl: string, platform: string, villa: LodgingVilla) => {
    try {
      const url = new URL(baseUrl);
      if (platform === 'Booking.com') {
        url.searchParams.set('checkin', checkInDate);
        url.searchParams.set('checkout', checkOutDate);
        url.searchParams.set('group_adults', String(groupSize));
        url.searchParams.set('no_rooms', '1');
      } else if (platform === 'Airbnb') {
        url.searchParams.set('checkin', checkInDate);
        url.searchParams.set('checkout', checkOutDate);
        url.searchParams.set('adults', String(groupSize));
      } else if (platform === 'FeWo-direkt') {
        url.searchParams.set('startDate', checkInDate);
        url.searchParams.set('endDate', checkOutDate);
        url.searchParams.set('adults', String(groupSize));
      } else if (platform === 'Agoda') {
        url.searchParams.set('checkIn', checkInDate);
        url.searchParams.set('checkOut', checkOutDate);
        url.searchParams.set('adults', String(groupSize));
      }
      return url.toString();
    } catch {
      return baseUrl;
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner with Methode 1 */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
            <Key className="w-3.5 h-3.5" />
            METHODE 1: 100% CONTACTLOZE SLEUTELKLUIS (KEYBOX)
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider">
            <TrendingDown className="w-3.5 h-3.5" />
            LIVE CONCURRENTEN PRIJSVERGELIJKER
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          Villa's in Adenau: Prijzen Vergelijken & Directe Boekingslinks
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Geen algemene homepages, maar <strong>de exacte advertentiepagina's</strong> van de villa's op Booking.com, FeWo-direkt, Airbnb en Agoda. Vergelijk direct de prijzen van concurrenten om de allergoedkoopste deal te scoren voor jullie herfstvakantie!
        </p>
      </div>

      {/* RELEVANTE PRIJS UPDATER & DATUM KIEZER (CONTROL PANEL) */}
      <div className="bg-zinc-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-amber-500/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>RELEVANTE PRIJS UPDATER & DATUMSELECTIE</span>
            </div>
            <h3 className="text-lg font-black text-white">
              Kies jullie Herfstvakantie Data & Reisgezelschap
            </h3>
            <p className="text-xs text-zinc-400">
              Prijzen, totaalbedragen en uitgaande links passen zich direct aan op basis van jullie gekozen nachten en personen.
            </p>
          </div>

          {/* Quick Date Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('weekend1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                checkInDate === '2026-10-16' && nights === 2
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              📅 Vr 16 - Zo 18 Okt (2 nachten)
            </button>
            <button
              onClick={() => applyPreset('weekend2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                checkInDate === '2026-10-23' && nights === 2
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              📅 Vr 23 - Zo 25 Okt (2 nachten)
            </button>
            <button
              onClick={() => applyPreset('longweekend')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                checkInDate === '2026-10-22' && nights === 3
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              ⭐ Do 22 - Zo 25 Okt (3 nachten)
            </button>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Check-in Date */}
          <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Incheckdatum (Aankomst):
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs rounded-lg px-2.5 py-1.5 w-full focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Uitcheckdatum (Vertrek):
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs rounded-lg px-2.5 py-1.5 w-full focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Nights Selector */}
          <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Aantal Nachten:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNights(2)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  nights === 2
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500 font-black'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                }`}
              >
                2 Nachten (Standaard)
              </button>
              <button
                onClick={() => setNights(3)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  nights === 3
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500 font-black'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                }`}
              >
                3 Nachten
              </button>
            </div>
          </div>

          {/* Group Size Selector */}
          <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
              Vrienden ({groupSize} personen):
            </label>
            <div className="flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-lg p-1">
              <button
                onClick={() => setGroupSize(Math.max(2, groupSize - 1))}
                className="w-7 h-7 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-black text-white px-3 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                {groupSize} boys
              </span>
              <button
                onClick={() => setGroupSize(Math.min(6, groupSize + 1))}
                className="w-7 h-7 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Cost Options & Status Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-zinc-300">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeCleaningFee}
                onChange={(e) => setIncludeCleaningFee(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs">Inclusief eenmalige eindschoonmaak</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeTouristTax}
                onChange={(e) => setIncludeTouristTax(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-700"
              />
              <span className="text-xs">Inclusief Kurtaxe Adenau (€ 1,50 p.p.p.n.)</span>
            </label>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Prijzen & links live gesynchroniseerd ({checkInDate} t/m {checkOutDate})</span>
          </div>
        </div>
      </div>

      {/* Methode 1 Step-by-Step Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h4 className="text-sm font-bold text-zinc-100">Ouders Boeken Digitaal</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Eén van jullie ouders klikt op de directe link van de gekozen villa en rekent af via iDEAL of creditcard op hun naam.
          </p>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h4 className="text-sm font-bold text-zinc-100">Pincode in de App</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            De host stuurt automatisch 24 uur voor aankomst de cijfercode van de MasterLock sleutelkluis of smartlock aan de voordeur.
          </p>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h4 className="text-sm font-bold text-zinc-100">Code Draaien & Binnen</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Jullie komen vrijdag aan in Adenau, toetsen de 4 cijfers in, pakken de sleutel en ploffen op de bank. 0% gedoe, 100% privacy!
          </p>
        </div>
      </div>

      {/* VILLA'S COMPARISON CARDS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-xl font-black text-white">
              De 4 Geverifieerde Accommodaties in Adenau
            </h3>
            <p className="text-xs text-zinc-400">
              Inclusief live concurrentenvergelijking en werkende deep-links naar de specifieke accommodatiepagina's.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Berekening: {groupSize} vrienden • {nights} nachten
          </span>
        </div>

        <div className="space-y-8">
          {EIFEL_TRIP_MASTER.lodgingOptions.map((villa) => {
            const isSelected = villa.id === selectedVillaId;
            const activePlatform = activeTabPlatform[villa.id] || 'compare';

            // Calculate live pricing with the Relevante Prijs Updater
            const baseNightPrice = villa.pricePerNightTotal;
            const cleaning = includeCleaningFee ? villa.cleaningFee : 0;
            const touristTax = includeTouristTax ? villa.touristTaxPpNight * groupSize * nights : 0;
            const totalStayCost = (baseNightPrice * nights) + cleaning + touristTax;
            const pricePerPerson = Math.round(totalStayCost / groupSize);

            // Find lowest price among competitors for this stay
            const lowestCompetitor = villa.competitorDeals.find(c => c.isLowestPrice) || villa.competitorDeals[0];
            const highestCompetitor = villa.competitorDeals.reduce((max, curr) => curr.pricePerNight > max.pricePerNight ? curr : max, villa.competitorDeals[0]);
            const maxSavingsTotal = Math.max(0, (highestCompetitor.pricePerNight - lowestCompetitor.pricePerNight) * nights + (highestCompetitor.serviceFee - lowestCompetitor.serviceFee));

            // Dynamic direct URLs with pre-filled checkin, checkout, group_adults
            const directBookingUrlWithDates = buildDeepLink(villa.bookingDirectUrl, 'Booking.com', villa);
            const directBookingSearchWithDates = buildDeepLink(villa.bookingSearchUrl, 'Booking.com', villa);
            const directFewoUrlWithDates = buildDeepLink(villa.fewoSearchUrl, 'FeWo-direkt', villa);
            const directAirbnbUrlWithDates = buildDeepLink(villa.airbnbSearchUrl, 'Airbnb', villa);
            const directAgodaUrlWithDates = buildDeepLink(villa.agodaUrl, 'Agoda', villa);

            return (
              <div
                key={villa.id}
                className={`rounded-3xl border transition-all overflow-hidden shadow-2xl ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-500 ring-2 ring-amber-500/40 shadow-amber-500/10'
                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                } ${villa.isLuxuryPoolOption ? 'border-sky-500/60 bg-gradient-to-b from-sky-950/20 via-zinc-900 to-zinc-900' : ''}`}
              >
                {/* Villa Card Header */}
                <div className="p-6 sm:p-7 space-y-5 border-b border-zinc-800/80">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {villa.isLuxuryPoolOption ? (
                          <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            <Waves className="w-3.5 h-3.5" />
                            Luxe Optie: Privé Verwarmd Binnenzwembad & Sauna
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            <Home className="w-3.5 h-3.5" />
                            Aanrader voor {groupSize} Boys (Kleine Privévilla)
                          </span>
                        )}

                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                          Bespaar tot € {maxSavingsTotal},- via Prijsvergelijker
                        </span>
                      </div>

                      <h4 className="text-2xl font-black text-white tracking-tight font-display">
                        {villa.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-amber-400/90 font-medium">
                        {villa.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{villa.exactAddress}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <Bed className="w-3.5 h-3.5 text-amber-400" />
                          <span>{villa.bedrooms} slaapkamers • {villa.bathrooms} badkamers • max {villa.sleeps} pers.</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Top Badges */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                      <div className="flex items-center gap-1.5 text-sm font-black text-amber-400 bg-zinc-950 px-3.5 py-1.5 rounded-xl border border-zinc-800">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{villa.rating}</span>
                        <span className="text-zinc-500 text-xs font-normal">/ 10 ({villa.reviewCount} geverifieerde reviews)</span>
                      </div>

                      <button
                        onClick={() => onSelectVilla(villa.id)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            Geselecteerd voor Begroting
                          </>
                        ) : (
                          'Selecteer deze Villa'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Pricing Breakdown Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Totaal per Persoon ({nights} nachten):
                      </span>
                      <div className="text-2xl font-black text-amber-400">
                        € {pricePerPerson},- <span className="text-xs text-zinc-400 font-normal">p.p. all-in</span>
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        Slechts € {Math.round(pricePerPerson / nights)},- per persoon per nacht
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Totaalprijs voor {groupSize} Boys:
                      </span>
                      <div className="text-xl font-bold text-zinc-100">
                        € {totalStayCost},-
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Basis: € {baseNightPrice * nights},- {includeCleaningFee ? `+ € ${cleaning} schoonmaak` : ''} {includeTouristTax ? `+ € ${touristTax} kurtaxe` : ''}
                      </div>
                    </div>

                    <div className="space-y-0.5 sm:border-l sm:border-zinc-800 sm:pl-4">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Goedkoopste Aanbieder:
                      </span>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{lowestCompetitor.platform}</span>
                        <span className="text-xs text-emerald-400">(vanaf € {lowestCompetitor.pricePerNight},- / nacht)</span>
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        Directe commissievrije verhuurdersprijs
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONCURRENTEN PRIJSVERGELIJKER (LIVE COMPARISON TABLE) */}
                <div className="p-6 sm:p-7 space-y-4 bg-zinc-950/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <h5 className="text-sm font-black text-zinc-100 uppercase tracking-wider">
                        Live Concurrenten Prijsvergelijker ({nights} nachten • {groupSize} personen)
                      </h5>
                    </div>
                    <span className="text-xs text-zinc-400">
                      Vergelijk de actuele tarieven over de 5 grootste boekingsplatforms:
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Boekingsplatform</th>
                          <th className="py-2.5 px-3">Tarief / Nacht</th>
                          <th className="py-2.5 px-3">Totaal ({nights}n)</th>
                          <th className="py-2.5 px-3">Prijs p.p.</th>
                          <th className="py-2.5 px-3">Kenmerken / Voordelen</th>
                          <th className="py-2.5 px-3 text-right">Directe Werkende Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        {villa.competitorDeals.map((deal, idx) => {
                          const dealTotal = (deal.pricePerNight * nights) + deal.serviceFee + (includeCleaningFee ? villa.cleaningFee : 0) + (includeTouristTax ? villa.touristTaxPpNight * groupSize * nights : 0);
                          const dealPp = Math.round(dealTotal / groupSize);
                          const dynamicLink = buildDeepLink(deal.directUrl, deal.platform, villa);

                          return (
                            <tr
                              key={idx}
                              className={`transition-colors ${
                                deal.isLowestPrice
                                  ? 'bg-emerald-950/20 text-zinc-100 font-semibold'
                                  : 'hover:bg-zinc-900/40'
                              }`}
                            >
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white">{deal.platform}</span>
                                  {deal.isLowestPrice && (
                                    <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
                                      LAAGSTE PRIJS
                                    </span>
                                  )}
                                  {deal.badge && !deal.isLowestPrice && (
                                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                                      {deal.badge}
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="py-3 px-3 font-bold text-zinc-100">
                                € {deal.pricePerNight},-
                              </td>

                              <td className="py-3 px-3 font-bold text-amber-400">
                                € {dealTotal},-
                              </td>

                              <td className="py-3 px-3 font-black text-white">
                                € {dealPp},- p.p.
                              </td>

                              <td className="py-3 px-3 text-zinc-400 text-[11px]">
                                {deal.notes}
                              </td>

                              <td className="py-3 px-3 text-right">
                                <a
                                  href={dynamicLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    deal.isLowestPrice
                                      ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black shadow-md shadow-emerald-500/20'
                                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                                  }`}
                                >
                                  <span>Bekijk op {deal.platform}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* PRECISE BOOKING.COM DIRECT LINK HIGHLIGHT */}
                  <div className="mt-4 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-blue-400" />
                          <span>Geverifieerde Directe Pagina op Booking.com</span>
                        </div>
                        <p className="text-xs text-zinc-300">
                          Deze link leidt rechtstreeks naar de specifieke listing van <strong>{villa.name}</strong> met reeds ingevulde data ({checkInDate} t/m {checkOutDate}) en {groupSize} volwassenen.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => copyToClipboard(directBookingUrlWithDates, villa.id)}
                          className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedUrl === villa.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Gekopieerd!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Kopieer Link</span>
                            </>
                          )}
                        </button>

                        <a
                          href={directBookingUrlWithDates}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
                        >
                          <span>Open Directe Pagina Booking.com</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Exact URL Preview in monospace */}
                    <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400 break-all flex items-center justify-between gap-2">
                      <span className="truncate">{directBookingUrlWithDates}</span>
                      <span className="text-[10px] text-zinc-500 shrink-0">100% specifiek hotel</span>
                    </div>
                  </div>
                </div>

                {/* Villa Details & Facilities */}
                <div className="p-6 sm:p-7 space-y-5 border-t border-zinc-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Methode 1 Check-in Details */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                        <Key className="w-4 h-4" />
                        <span>Sleutelkluis & 17 Jaar Protocol (Methode 1)</span>
                      </div>
                      <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80 space-y-2 text-xs">
                        <div className="font-bold text-zinc-200">
                          {villa.selfCheckInMethod}
                        </div>
                        <p className="text-zinc-400 leading-relaxed">
                          {villa.whyPerfectFor17}
                        </p>
                        <div className="text-zinc-500 text-[11px] pt-1 border-t border-zinc-800/60">
                          <strong>Stap voor stap:</strong> {villa.bookingStepByStep}
                        </div>
                      </div>
                    </div>

                    {/* Facilities & Guest Quote */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Faciliteiten van deze Villa:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                        {villa.facilities.map((fac, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-zinc-300">{fac}</span>
                          </div>
                        ))}
                      </div>

                      <blockquote className="p-3 bg-zinc-950 rounded-xl text-xs text-zinc-400 italic border-l-2 border-amber-500 mt-2">
                        {villa.reviewQuote}
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
