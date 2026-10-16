"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Wifi, PawPrint, Cpu, Navigation } from 'lucide-react';

export default function PawriseCareDemo() {
  const [heartRate, setHeartRate] = useState(112);
  const [activeTab, setActiveTab] = useState<'health' | 'map'>('health');

  // Simulation du battement de coeur en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 106 ? 108 : next > 118 ? 116 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-[#050505] flex flex-col justify-center select-none"
      style={{ padding: '8px 12px 12px 12px' }}
    >
      {/* Grille de fond subtile + Halo ambiant style Apple */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.05) 0%, transparent 70%)'
        }}
      />

      {/* Animation CSS responsive pour les particules de données */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pawriseFlowMobile {
          0% { top: 0%; left: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { top: 100%; left: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
        @keyframes pawriseFlowDesktop {
          0% { left: 0%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { left: 100%; top: 50%; opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
        .pawrise-particle {
          animation: pawriseFlowMobile 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (min-width: 768px) {
          .pawrise-particle {
            animation-name: pawriseFlowDesktop;
          }
        }
      `}} />

      {/* Conteneur Principal : Vertical sur Mobile, Horizontal sur Desktop */}
      <div 
        className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between md:justify-around overflow-hidden"
        style={{ padding: '4px 8px' }}
      >
        
        {/* =========================================================
            1. COLLIER IoT (Style AirTag / Capteur Biométrique)
           ========================================================= */}
        <div className="flex flex-col items-center shrink-0">
          <div 
            className="text-[10px] sm:text-[11px] font-medium text-[#86868b] tracking-[0.16em] uppercase"
            style={{ marginBottom: '8px' }}
          >
            Collier IoT
          </div>

          <div className="relative w-[78px] h-[78px] sm:w-[92px] sm:h-[92px] flex items-center justify-center">
            {/* Ondes radar concentriques */}
            <motion.div
              animate={{ scale: [1, 1.55], opacity: [0.35, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[#00ffcc]/40 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.3], opacity: [0.25, 0] }}
              transition={{ duration: 2.4, delay: 0.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[#00ffcc]/30 pointer-events-none"
            />

            {/* Anneau du collier façon céramique sombre */}
            <div 
              className="w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] rounded-full flex items-center justify-center relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.08),0_10px_25px_rgba(0,0,0,0.8)]"
              style={{ 
                background: ' radial-gradient(circle at 30% 30%, #1c1c1e, #0a0a0c)',
                border: '4px solid rgba(255,255,255,0.12)' 
              }}
            >
              <PawPrint className="w-6 h-6 sm:w-7 sm:h-7 text-white/25" />
            </div>

            {/* Module capteur IoT actif */}
            <div 
              className="absolute -bottom-1.5 flex items-center gap-1 rounded-full bg-[#111113]/95 border border-[#00ffcc]/50 shadow-[0_0_15px_rgba(0,255,204,0.3)] backdrop-blur-md"
              style={{ padding: '3px 8px' }}
            >
              <motion.span 
                animate={{ opacity: [1, 0.25, 1] }} 
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] shadow-[0_0_6px_#00ffcc]"
              />
              <span className="text-[9px] font-mono font-semibold text-[#00ffcc] tracking-wider">
                MQTT
              </span>
            </div>

            {/* Icône d'émission sans-fil */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-0 bg-[#00ffcc]/10 border border-[#00ffcc]/30 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ width: '22px', height: '22px' }}
            >
              <Wifi size={12} color="#00ffcc" />
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            2. MOTEUR IA & BACKEND (Pipeline & Puce Neural Engine)
           ========================================================= */}
        <div 
          className="flex-1 flex flex-col items-center justify-center relative w-full md:w-auto"
          style={{ margin: '4px 0', minHeight: '78px' }}
        >
          <div 
            className="text-[10px] sm:text-[11px] font-medium text-[#86868b] tracking-[0.16em] uppercase whitespace-nowrap z-10"
            style={{ marginBottom: '6px' }}
          >
            Moteur IA &amp; Backend
          </div>

          {/* Zone de transit des données */}
          <div className="relative w-[44px] h-[56px] md:w-full md:max-w-[260px] lg:max-w-[320px] md:h-[48px] flex items-center justify-center">
            
            {/* Ligne de connexion (Verticale sur mobile, Horizontale sur desktop) */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-0 md:right-0 md:translate-x-0 md:w-full md:h-[1.5px] bg-gradient-to-b md:bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Particules lumineuses */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="pawrise-particle absolute bg-[#00ffcc] rounded-full shadow-[0_0_10px_#00ffcc] w-[7px] h-[7px]"
                  style={{ animationDelay: `${i * 0.7}s` }}
                />
              ))}
            </div>

            {/* Puce Centrale IA (Style Apple Silicon) */}
            <div 
              className="relative z-10 flex items-center gap-2 rounded-xl bg-[#141417]/90 border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              style={{ padding: '6px 10px' }}
            >
              <div className="relative w-6 h-6 rounded-lg bg-[#00ffcc]/10 border border-[#00ffcc]/30 flex items-center justify-center">
                <Cpu size={14} className="text-[#00ffcc]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-semibold text-white leading-tight whitespace-nowrap">
                  Anomaly AI
                </span>
                <span className="text-[8px] font-mono text-[#00ffcc] leading-tight whitespace-nowrap">
                  Score: 99.4% OK
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. APPLICATION MOBILE (Style iPhone Pro / Apple Santé)
           ========================================================= */}
        <div className="flex flex-col items-center shrink-0">
          <div 
            className="text-[10px] sm:text-[11px] font-medium text-[#86868b] tracking-[0.16em] uppercase"
            style={{ marginBottom: '8px' }}
          >
            Mobile App
          </div>

          {/* Châssis iPhone Pro */}
          <div 
            className="w-[185px] h-[222px] sm:w-[190px] sm:h-[230px] bg-[#0b0b0e] border-[2.5px] border-[#2c2c2e] rounded-[26px] relative flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden shrink-0"
            style={{ padding: '10px 10px 8px 10px' }}
          >
            {/* Dynamic Island */}
            <div 
              className="w-[46px] h-[11px] bg-black rounded-full mx-auto flex items-center justify-end shrink-0 border border-white/[0.06]"
              style={{ padding: '0 4px', marginBottom: '6px' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]/80" />
            </div>

            {/* Contenu Dynamique de l'écran */}
            <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'health' ? (
                  <motion.div
                    key="health"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full"
                  >
                    {/* En-tête Profil Animal */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full border border-white/20 shrink-0"
                          style={{ 
                            background: 'url(https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=80&h=80&fit=crop) center/cover' 
                          }} 
                        />
                        <div className="leading-none">
                          <div className="text-white text-[11px] font-semibold">Rex</div>
                          <div className="text-[#00ffcc] text-[8px] font-medium flex items-center gap-1" style={{ marginTop: '2px' }}>
                            <span className="w-1 h-1 rounded-full bg-[#00ffcc]" /> En ligne
                          </div>
                        </div>
                      </div>
                      <span 
                        className="text-[8px] font-mono text-white/60 bg-white/[0.06] rounded-full border border-white/10"
                        style={{ padding: '2px 5px' }}
                      >
                        LIVE
                      </span>
                    </div>

                    {/* Carte Fréquence Cardiaque (Apple Health Style) */}
                    <div 
                      className="rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between"
                      style={{ padding: '8px 10px', margin: '6px 0' }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          animate={{ scale: [1, 1.22, 1] }} 
                          transition={{ duration: 0.75, repeat: Infinity }}
                          className="w-7 h-7 rounded-lg bg-[#ff2d55]/15 border border-[#ff2d55]/30 flex items-center justify-center"
                        >
                          <Heart size={15} color="#ff2d55" fill="#ff2d55" />
                        </motion.div>
                        <div>
                          <div className="text-[8px] text-[#86868b] uppercase tracking-wider">Rythme</div>
                          <div className="text-[9px] text-[#00ffcc] font-medium">Normal</div>
                        </div>
                      </div>
                      <div className="text-right leading-none">
                        <div className="text-white text-[15px] font-mono font-bold tabular-nums">
                          {heartRate}
                        </div>
                        <div className="text-[#86868b] text-[8px] font-medium" style={{ marginTop: '2px' }}>
                          BPM
                        </div>
                      </div>
                    </div>

                    {/* Mini Graphe Temporel (Time-Series) */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center text-[8px] text-[#86868b]" style={{ marginBottom: '3px' }}>
                        <span>Variabilité (HRV)</span>
                        <span className="text-white/70 font-mono">60s</span>
                      </div>
                      <div className="h-[24px] flex items-end gap-[3px]">
                        {[42, 65, 52, 84, 58, 74, 92, 68, 78].map((h, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ height: 0 }} 
                            animate={{ height: `${h}%` }} 
                            transition={{ duration: 0.6, delay: i * 0.05 }} 
                            className="flex-1 rounded-[2px] bg-gradient-to-t from-[#00ffcc]/30 to-[#00ffcc]/80" 
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                      <span className="text-white text-[10px] font-semibold">Localisation GPS</span>
                      <span className="text-[#00ffcc] text-[8px] font-mono">± 1.2m</span>
                    </div>

                    {/* Carte Radar Style "Localiser" d'Apple */}
                    <div 
                      className="flex-1 w-full rounded-xl relative overflow-hidden border border-white/10 flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(0,255,204,0.12) 0%, rgba(15,15,18,0.95) 75%)',
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '14px 14px'
                      }}
                    >
                      {/* Cercle de périmètre */}
                      <motion.div
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="w-7 h-7 rounded-full border border-[#00ffcc] absolute"
                      />
                      {/* Point GPS Rex */}
                      <div className="relative z-10 w-3 h-3 rounded-full bg-[#00ffcc] border-2 border-white shadow-[0_0_12px_#00ffcc]" />

                      {/* Badge distance */}
                      <div 
                        className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/75 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-between"
                        style={{ padding: '3px 6px' }}
                      >
                        <span className="text-[8px] text-white/90 flex items-center gap-1">
                          <Navigation size={8} className="text-[#00ffcc]" /> Zone sûre
                        </span>
                        <span className="text-[8px] font-mono text-[#00ffcc]">à 14m</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Barre de navigation inférieure (Segmented Dock) */}
            <div 
              className="bg-white/[0.06] border border-white/[0.08] rounded-xl flex justify-between items-center shrink-0"
              style={{ padding: '3px', marginTop: '6px' }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('health')}
                className={`flex-1 flex items-center justify-center gap-1 rounded-lg text-[9px] font-medium transition-all cursor-pointer border-none ${
                  activeTab === 'health' ? 'bg-white/15 text-[#00ffcc]' : 'bg-transparent text-[#86868b]'
                }`}
                style={{ padding: '4px 0' }}
              >
                <Activity size={11} />
                <span>Santé</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className={`flex-1 flex items-center justify-center gap-1 rounded-lg text-[9px] font-medium transition-all cursor-pointer border-none ${
                  activeTab === 'map' ? 'bg-white/15 text-[#00ffcc]' : 'bg-transparent text-[#86868b]'
                }`}
                style={{ padding: '4px 0' }}
              >
                <Navigation size={11} />
                <span>GPS</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}