"use client";
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function RLCarDemo() {
  const [epoch, setEpoch] = useState(1);
  const [status, setStatus] = useState("LEARNING");
  const controls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const runSimulation = async () => {
      const safeStart = async (anim: any) => { if (isMounted) await controls.start(anim); };
      const safeSet = async (anim: any) => { if (isMounted) await controls.set(anim); };

      while (isMounted) {
        // Position de départ (Centre de la ligne du bas)
        await safeSet({ left: '50%', top: '88%', rotate: 0, opacity: 1 });
        
        let crash = false;
        let success = false;

        // Le circuit est un anneau (O-shape)
        if (epoch < 3) {
          await safeStart({ left: '95%', transition: { duration: 0.6, ease: "linear" } });
          crash = true;
        } else if (epoch < 6) {
          await safeStart({ left: '88%', transition: { duration: 0.5, ease: "linear" } });
          await safeStart({ rotate: -90, transition: { duration: 0.1 } });
          await safeStart({ top: '5%', transition: { duration: 0.8, ease: "linear" } });
          crash = true;
        } else if (epoch < 10) {
          await safeStart({ left: '88%', transition: { duration: 0.5, ease: "linear" } });
          await safeStart({ rotate: -90, transition: { duration: 0.1 } });
          await safeStart({ top: '12%', transition: { duration: 0.8, ease: "linear" } });
          await safeStart({ rotate: -180, transition: { duration: 0.1 } });
          await safeStart({ left: '15%', transition: { duration: 0.8, ease: "linear" } });
          crash = true;
        } else {
          await safeStart({ left: '88%', transition: { duration: 0.5, ease: "linear" } });
          await safeStart({ rotate: -90, transition: { duration: 0.1 } });
          await safeStart({ top: '12%', transition: { duration: 0.8, ease: "linear" } });
          await safeStart({ rotate: -180, transition: { duration: 0.1 } });
          await safeStart({ left: '12%', transition: { duration: 0.8, ease: "linear" } });
          await safeStart({ rotate: -270, transition: { duration: 0.1 } });
          await safeStart({ top: '88%', transition: { duration: 0.8, ease: "linear" } });
          await safeStart({ rotate: -360, transition: { duration: 0.1 } });
          await safeStart({ left: '50%', transition: { duration: 0.4, ease: "linear" } });
          success = true;
        }

        if (crash) {
          if (isMounted) setStatus("CRASH !");
          await safeStart({ scale: 2, backgroundColor: '#ff3366', transition: { duration: 0.1 } });
          await new Promise(r => setTimeout(r, 600)); 
          await safeSet({ scale: 1, backgroundColor: '#00ffcc' });
          if (isMounted) setEpoch(e => e + 1);
        }

        if (success) {
          if (isMounted) setStatus("GOAL REACHED !");
          await safeStart({ scale: [1, 1.5, 1], backgroundColor: '#00ffcc', transition: { duration: 0.5, repeat: 2 } });
          await new Promise(r => setTimeout(r, 1500));
          if (isMounted) setEpoch(1); // Reset infini
        }
        
        if (isMounted) setStatus("LEARNING");
      }
    };

    runSimulation();
    return () => { isMounted = false; };
  }, [epoch, controls]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#050505', display: 'flex', flexDirection: 'column', padding: '25px', paddingBottom: '90px' }}>
      
      {/* Header stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10, paddingBottom: '15px' }}>
        <div>
          <div style={{ fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em' }}>SIMULATION EPOCH</div>
          <div style={{ fontFamily: 'monospace', fontSize: '1.4rem', color: 'white' }}>{epoch.toString().padStart(3, '0')}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em' }}>STATUS</div>
          <div style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.2rem', 
            fontWeight: 'bold',
            color: status === "CRASH !" ? '#ff3366' : status === "GOAL REACHED !" ? '#00ffcc' : 'white' 
          }}>
            {status}
          </div>
        </div>
      </div>

      {/* Circuit Area (Prend tout l'espace restant) */}
      <div style={{ flex: 1, position: 'relative', marginTop: '10px', background: '#0a0a0c', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        
        {/* Grille de fond pour le style technique */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Mur extérieur du circuit */}
        <div style={{ position: 'absolute', inset: '5%', border: '4px solid rgba(255,255,255,0.2)', borderRadius: '30px' }} />
        
        {/* Mur intérieur du circuit */}
        <div style={{ position: 'absolute', inset: '22%', border: '4px solid rgba(255,255,255,0.2)', borderRadius: '15px', background: '#111' }} />
        
        {/* Ligne de départ / arrivée */}
        <div style={{ position: 'absolute', left: '50%', bottom: '5%', width: '4px', height: '17%', background: 'repeating-linear-gradient(0deg, #fff, #fff 5px, #000 5px, #000 10px)', transform: 'translateX(-50%)' }} />

        {/* Labels START/GOAL */}
        <div style={{ position: 'absolute', left: '50%', bottom: '2%', transform: 'translateX(-50%)', fontSize: '0.5rem', color: '#888', fontWeight: 'bold' }}>START / FINISH</div>

        {/* La "Voiture" AI */}
        <motion.div
          animate={controls}
          style={{
            position: 'absolute',
            width: '16px',
            height: '10px',
            backgroundColor: '#00ffcc',
            borderRadius: '2px',
            boxShadow: '0 0 15px #00ffcc, 0 0 5px #fff',
            zIndex: 20,
            transformOrigin: 'center center',
            marginLeft: '-8px', // Centrage
            marginTop: '-5px'
          }}
        >
          {/* Petits "phares" */}
          <div style={{ position: 'absolute', right: '-2px', top: '1px', width: '3px', height: '2px', background: '#fff', borderRadius: '50%', boxShadow: '2px 0 5px #fff' }} />
          <div style={{ position: 'absolute', right: '-2px', bottom: '1px', width: '3px', height: '2px', background: '#fff', borderRadius: '50%', boxShadow: '2px 0 5px #fff' }} />
        </motion.div>

      </div>
    </div>
  );
}
