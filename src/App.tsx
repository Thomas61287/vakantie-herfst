/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, EifelTabType } from './components/Navbar';
import { EifelMasterPlan } from './components/EifelMasterPlan';
import { EifelVillaSection } from './components/EifelVillaSection';
import { EifelRestaurantSection } from './components/EifelRestaurantSection';
import { EifelActivitySection } from './components/EifelActivitySection';
import { EifelPosterCard } from './components/EifelPosterCard';
import { EifelSafetySection } from './components/EifelSafetySection';
import { Flame, ShieldCheck, Trophy, Home, Utensils, Share2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<EifelTabType>('masterplan');
  const [groupSize, setGroupSize] = useState<number>(3); // 3 friends default
  const [selectedVillaId, setSelectedVillaId] = useState<string>('nring-villa-adenau');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Intro Notification Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-l-4 border-amber-500 p-4 rounded-r-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="space-y-0.5">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <span>Eifel & Nürburgring Masterplan • 2 Nachten & 3 Volle Dagen (Sittard ➔ Adenau)</span>
            </div>
            <p className="text-zinc-300 text-xs">
              Specifiek uitgewerkt voor <strong>3 vrienden (17 jaar)</strong> met <strong>Methode 1 (Sleutelkluis)</strong>, geverifieerde restaurants (o.a. Pistenklause lava-steak), karten, quads, Center Parcs Aqua Mundo en werkende Booking/Airbnb links!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('safety')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ouderbrief & 0% Sketchy</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'masterplan' && (
          <EifelMasterPlan />
        )}

        {activeTab === 'villas' && (
          <EifelVillaSection
            groupSize={groupSize}
            selectedVillaId={selectedVillaId}
            onSelectVilla={setSelectedVillaId}
          />
        )}

        {activeTab === 'restaurants' && (
          <EifelRestaurantSection />
        )}

        {activeTab === 'activities' && (
          <EifelActivitySection />
        )}

        {activeTab === 'whatsapp-poster' && (
          <EifelPosterCard
            groupSize={groupSize}
            selectedVillaId={selectedVillaId}
          />
        )}

        {activeTab === 'safety' && (
          <EifelSafetySection
            groupSize={groupSize}
            selectedVillaId={selectedVillaId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 bg-zinc-950">
        <p>Eifel & Nürburgring Herfsttrip Masterplan • Gemaakt voor 3 vrienden (17 jaar) uit Sittard • 100% Geverifieerd</p>
      </footer>
    </div>
  );
}
