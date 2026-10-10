"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Wifi, PawPrint } from 'lucide-react';

export default function PawriseCareDemo() {
  const [heartRate, setHeartRate] = useState(112);
  const [activeTab, setActiveTab] = useState('health');
  
  // Simulation du battement de coeur pour les données
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] flex flex-col pb-[25px] px-[15px] sm:px-[25px]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="flex-1 z-10 flex flex-col md:flex-row items-center justify-between md:px-5 gap-6 md:gap-0 overflow-y-auto md:overflow-hidden pb-10 md:pb-0">
        
        {/* 1. IoT Collar */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', marginBottom: '15px' }}>COLLIER IoT</div>
          
          <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Collar shape */}
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '6px solid rgba(255,255,255,0.1)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PawPrint size={32} color="rgba(255,255,255,0.2)" />
            </div>
            {/* Smart Tag */}
            <div style={{ width: '25px', height: '35px', background: '#00ffcc', borderRadius: '5px', boxShadow: '0 0 15px rgba(0,255,204,0.4)', position: 'absolute', bottom: '-5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }}
              />
            </div>
            
            {/* Emitting waves */}
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              style={{ position: 'absolute', right: '-20px', top: '10px' }}
            >
              <Wifi size={24} color="#00ffcc" />
            </motion.div>
          </div>
        </div>

        {/* 2. Data Flow (Cloud / AI Engine) */}
        <div className="flex-1 flex flex-col items-center justify-center mx-0 md:mx-5 relative w-full md:w-auto min-h-[150px] md:min-h-[auto]">
          <div className="absolute top-0 md:static text-[0.6rem] sm:text-[0.7rem] text-[#888] tracking-widest mb-0 md:mb-2 whitespace-nowrap">MOTEUR IA & BACKEND</div>
          
          <div className="w-[40px] h-[100px] md:w-full md:h-[40px] relative flex items-center justify-center mt-4 md:mt-0">
            {/* Ligne de connexion */}
            <div className="absolute top-0 bottom-0 w-[2px] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:w-auto md:h-[2px] bg-white/10" />
            
            {/* Particules de données circulant */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ top: '0%', left: '50%' }}
                animate={{ top: '100%', left: '50%' }}
                // On desktop, we want it to go left to right instead. We can use a CSS class or just let Framer Motion handle simple layout changes. 
                // Wait, Framer Motion doesn't do media queries easily in `animate`.
                // Let's use CSS animations for the particles to make them fully responsive!
                className="hidden" // Hiding the framer motion ones to replace with CSS
              />
            ))}
            
            {/* Particules de données circulant (CSS Responsive) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {[0, 1, 2].map((i) => (
                 <div
                   key={i}
                   className="absolute bg-[#00ffcc] rounded-full shadow-[0_0_10px_#00ffcc] w-[8px] h-[8px]"
                   style={{
                     animation: `flowParticle 2s linear infinite ${i * 0.6}s`,
                   }}
                 />
               ))}
               <style dangerouslySetInnerHTML={{__html: `
                 @keyframes flowParticle {
                   0% { top: 0%; left: 50%; transform: translate(-50%, -50%); }
                   100% { top: 100%; left: 50%; transform: translate(-50%, -50%); }
                 }
                 @media (min-width: 768px) {
                   @keyframes flowParticle {
                     0% { left: 0%; top: 50%; transform: translate(-50%, -50%); }
                     100% { left: 100%; top: 50%; transform: translate(-50%, -50%); }
                   }
                 }
               `}} />
            </div>
            
            {/* Nœud central (Serveur IA) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, backdropFilter: 'blur(5px)' }}
            >
              <Activity size={20} color="white" />
            </motion.div>
          </div>
        </div>

        {/* 3. Smartphone App */}
        <div className="relative flex flex-col items-center shrink-0">
          <div className="text-[0.6rem] sm:text-[0.7rem] text-[#888] tracking-widest mb-3">MOBILE APP</div>
          
          {/* Smartphone Frame */}
          <div className="w-[120px] h-[220px] bg-[#0a0a0c] border-[3px] border-[#333] rounded-[20px] p-2 relative flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden shrink-0">
            
            {/* Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '30px', height: '10px', background: '#333', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', zIndex: 20 }} />
            
            {/* Dynamic App Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '15px', position: 'relative', zIndex: 10 }}>
              {activeTab === 'health' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: 'url(https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=50&h=50&fit=crop) center/cover' }} />
                    <div>
                      <div style={{ color: 'white', fontSize: '0.6rem', fontWeight: 'bold' }}>Rex</div>
                      <div style={{ color: '#00ffcc', fontSize: '0.4rem' }}>En ligne</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                      <Heart size={24} color="#ff3366" fill="rgba(255,51,102,0.3)" />
                    </motion.div>
                    <div style={{ marginTop: '5px', color: 'white', fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{heartRate}</div>
                    <div style={{ color: '#888', fontSize: '0.4rem' }}>BPM</div>
                  </div>
                  <div style={{ marginTop: 'auto', height: '25px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                    {[40, 60, 50, 80, 50, 70, 90].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }} style={{ flex: 1, background: 'rgba(0,255,204,0.5)', borderRadius: '2px' }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'map' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                  <div style={{ color: 'white', fontSize: '0.6rem', fontWeight: 'bold', marginBottom: '10px' }}>Localisation GPS</div>
                  <div style={{ flex: 1, width: '100%', borderRadius: '10px', background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 10px, transparent 10px, transparent 20px)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {/* Dog location blip */}
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', top: '40%', left: '40%', width: '10px', height: '10px', background: '#00ffcc', borderRadius: '50%', boxShadow: '0 0 10px #00ffcc' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Navigation Bar */}
            <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div onClick={() => setActiveTab('health')} style={{ cursor: 'pointer', padding: '5px', borderRadius: '5px', background: activeTab === 'health' ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                <Activity size={14} color={activeTab === 'health' ? '#00ffcc' : '#888'} />
              </div>
              <div onClick={() => setActiveTab('map')} style={{ cursor: 'pointer', padding: '5px', borderRadius: '5px', background: activeTab === 'map' ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                <Wifi size={14} color={activeTab === 'map' ? '#00ffcc' : '#888'} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
