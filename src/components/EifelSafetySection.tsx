import React, { useState } from 'react';
import { EIFEL_TRIP_MASTER } from '../data/eifelPlanData';
import { ShieldCheck, CheckCircle2, FileText, Copy, Check, AlertCircle, Phone, MapPin, Key, HeartHandshake } from 'lucide-react';

interface EifelSafetySectionProps {
  groupSize: number;
  selectedVillaId: string;
}

export const EifelSafetySection: React.FC<EifelSafetySectionProps> = ({
  groupSize,
  selectedVillaId,
}) => {
  const [copied, setCopied] = useState(false);
  const selectedVilla = EIFEL_TRIP_MASTER.lodgingOptions.find((v) => v.id === selectedVillaId) || EIFEL_TRIP_MASTER.lodgingOptions[0];
  const lodgingPp = Math.round((selectedVilla.pricePerNightTotal * 2) / groupSize);
  const totalPp = lodgingPp + 131; // approx total

  const generateParentLetter = () => {
    return `Reis- en Veiligheidsdossier: Herfsttrip Eifel & Nürburgring 2026
Bestemd voor: Ouders en verzorgers

Beste ouders,

Wij hebben een gedetailleerd en transparant reisplan opgesteld voor onze reis naar de Duitse Eifel (Adenau / Nürburgring). Omdat wij 17 jaar oud zijn en veiligheid voorop staat, zijn alle onderdelen vooraf gecontroleerd en geverifieerd:

1. REISGEGEVENS & AFSTAND:
• Bestemming: Adenau, Duitsland (Direct nabij de Nürburgring)
• Afstand vanaf Sittard: Slechts 125 kilometer (ca. 1 uur en 20 minuten per auto, of 2u 40m per trein/bus).
• Reisduur: 2 nachten, 3 volle dagen (Vrijdagochtend t/m Zondagavond).
• Reisgezelschap: ${groupSize} personen (17 jaar).

2. VERBLIJF & CONTRACT (METHODE 1):
• Accommodatie: ${selectedVilla.name} (Vrijstaand vakantiehuis).
• Boekingswijze: Eén van de ouders treedt op als officiële hoofdhuurder via Booking.com of Airbnb. De betaling en eventuele borgreservering verlopen digitaal en transparant.
• Inchecken: Gebeurt 100% contactloos via een gecertificeerd MasterLock sleutelkluisje met pincode bij de voordeur. Er is geen sprake van informele contante betalingen of schimmige constructies.

3. VEILIGHEID VAN DE ACTIVITEITEN:
• De geplande activiteiten (zoals offroad quads en karten) vinden uitsluitend plaats op afgesloten, professionele adventure terreinen onder toezicht van gediplomeerde instructeurs en met verplichte veiligheidsuitrusting (integraalhelm, bodyprotection).
• Er wordt niet op de openbare weg gereden zonder rijbewijs.

4. WETGEVING & TOEZICHT:
• Volgens het Duitse jeugdrecht (§9 Jugendschutzgesetz) mogen jongeren vanaf 16 jaar in openbare horeca zelfstandig dineren en zwak-alcoholische consumpties (bier/wijn) nuttigen. Sterke dranken zijn strikt 18+.
• Iedere reiziger draagt een geldig paspoort/ID-kaart, de Europese zorgverzekeringspas (EHIC) en het officiële ingevulde formulier van de Rijksoverheid "Toestemming voor reizen met een minderjarige naar het buitenland".

5. BEREIKBAARHEID:
• Wij zijn te allen tijde telefonisch bereikbaar en delen onze live-locatie via WhatsApp/Find My.
• Door de geringe afstand (125 km) kan een ouder in geval van een calamiteit binnen vijf kwartier ter plaatse zijn.

Totale kostenbegroting: ca. € ${totalPp},- all-in per persoon.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateParentLetter());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/40 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          VEILIGHEIDSDOSSIER VOOR OUDERS (0% SKETCHY)
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          Waarom Ouders Hier Met een Gerust Hart "Ja" Op Zeggen
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Ouders vinden plannen van 17-jarigen vaak "sketchy" als er onduidelijkheid is over contracten, borg, leeftijd of veiligheid. 
          Hieronder vind je de 5 keiharde zekerheden die bewijzen dat dit plan 100% verantwoord en professioneel is geregeld.
        </p>
      </div>

      {/* 5 Hard Guarantees */}
      <div className="space-y-3">
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold mt-0.5">
            1
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-100">
              Slechts 125 km (1 uur en 20 minuten) van Sittard
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Adenau ligt net over de grens bij Aken/Heerlen via de Duitse A4 en A61 snelweg. Het is geen vliegreis of ver buitenland: bij een noodgeval kan een ouder er binnen vijf kwartier zijn met de auto.
            </p>
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold mt-0.5">
            2
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-100">
              Geen Schimmige Afspraken: Officiële Boeking op Ouderaccount
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Het vakantiehuis wordt geboekt via officiële platforms (Booking.com of Airbnb) op naam van een ouder met iDEAL of creditcard. De eventuele borg wordt digitaal gereserveerd en automatisch teruggestort.
            </p>
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold mt-0.5">
            3
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-100">
              Methode 1: Gecertificeerde Sleutelkluis (0% Baliecontrole)
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Er is geen hotelreceptie waar een baliemedewerker moeilijk kan doen over leeftijd. De eigenaar voorziet een cijfercode voor de MasterLock kluis aan de voordeur.
            </p>
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold mt-0.5">
            4
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-100">
              Activiteiten op Afgesloten & Gecertificeerde Terreinen
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              De quads en karts rijden uitsluitend op afgesloten adventure parcoursen met helmplicht, veiligheidsbriefing en instructeurs. Er wordt niet zonder rijbewijs op de openbare weg gereden.
            </p>
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold mt-0.5">
            5
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-100">
              Rijksoverheid Toestemmingsformulier & Legitimatie
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Iedereen neemt het officiële formulier "Toestemming voor reizen met een minderjarige naar het buitenland" mee in zijn reistas, ondertekend door de ouders inclusief kopie legitimatiebewijs en zorgpas.
            </p>
          </div>
        </div>
      </div>

      {/* Official Parent Briefing Letter */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-zinc-100">
              Kant-en-Klare Ouderbrief (Kopieer & Stuur in Gezinsapp)
            </h3>
          </div>

          <button
            id="copy-parent-letter-btn"
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Brief Gekopieerd!' : 'Kopieer Brief voor Ouders'}</span>
          </button>
        </div>

        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80 font-mono text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto">
          {generateParentLetter()}
        </div>
      </div>
    </div>
  );
};
