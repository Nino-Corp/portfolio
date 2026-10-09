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
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#050505', display: 'flex', flexDirection: 'column', paddingTop: '70px', paddingLeft: '25px', paddingRight: '25px', paddingBottom: '25px' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }} />

      <div style={{ flex: 1, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
          <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', marginBottom: '10px' }}>MOTEUR IA & BACKEND</div>
          
          <div style={{ width: '100%', position: 'relative', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ligne de connexion */}
            <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', top: '50%', transform: 'translateY(-50%)' }} />
            
            {/* Particules de données circulant */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
                style={{ position: 'absolute', width: '8px', height: '8px', background: '#00ffcc', borderRadius: '50%', boxShadow: '0 0 10px #00ffcc', top: '50%', transform: 'translate(-50%, -50%)' }}
              />
            ))}
            
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
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', marginBottom: '15px' }}>MOBILE APP</div>
          
          {/* Smartphone Frame */}
          <div style={{ width: '120px', height: '220px', background: '#0a0a0c', border: '3px solid #333', borderRadius: '20px', padding: '10px', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            
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
