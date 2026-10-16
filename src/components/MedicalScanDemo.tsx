"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MedicalScanDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [results, setResults] = useState({ left: { isAnomaly: false, score: 99 }, right: { isAnomaly: true, score: 98 } });

  const handleScan = () => {
    if (isScanning) return;
    
    // Randomize results
    setResults({
      left: { isAnomaly: Math.random() > 0.5, score: Math.floor(Math.random() * 15) + 85 },
      right: { isAnomaly: Math.random() > 0.5, score: Math.floor(Math.random() * 15) + 85 }
    });

    setIsScanning(true);
    setHasScanned(false);
    
    // Simuler la durée du scan
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'black', cursor: 'pointer' }} className="group" onClick={handleScan}>
      {/* Background Image */}
      <Image 
        src="/xray-ultra-clean.jpg" 
        alt="Medical Scan" 
        fill 
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover', opacity: 0.6, filter: 'grayscale(100%)' }} 
        className="transition-transform duration-700 group-hover:scale-105"
      />

      {/* Bouton d'action (caché pendant et après le scan) */}
      {!isScanning && !hasScanned && (
        <motion.div 
          className="absolute z-20 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 22px', borderRadius: '24px', color: 'white', fontWeight: 600, fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            LANCER LE DIAGNOSTIC IA
          </div>
        </motion.div>
      )}

      {/* Laser de scan */}
      {isScanning && (
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#00ffcc', boxShadow: '0 0 20px 5px rgba(0,255,204,0.5)', zIndex: 10 }}
          initial={{ y: '0%' }}
          animate={{ y: '100vh' }}
          transition={{ duration: 2, ease: "linear" }}
        />
      )}

      {/* Bounding Boxes (Résultats) */}
      {hasScanned && (
        <>
          {/* Right Lung Box — positions en % pour s'adapter à toutes tailles */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            style={{
              position: 'absolute',
              top: '28%',
              right: '22%',
              width: 'clamp(70px, 22%, 120px)',
              height: 'clamp(80px, 25%, 120px)',
              border: `2px solid ${results.right.isAnomaly ? '#ff3366' : '#00ffcc'}`,
              backgroundColor: results.right.isAnomaly ? 'rgba(255,51,102,0.1)' : 'rgba(0,255,204,0.1)',
              zIndex: 10
            }}
          >
            <div style={{ position: 'absolute', top: '-22px', left: '-2px', background: results.right.isAnomaly ? '#ff3366' : '#00ffcc', color: results.right.isAnomaly ? 'white' : 'black', fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)', fontWeight: 'bold', padding: '2px 6px', maxWidth: '130px', lineHeight: '1.2', whiteSpace: 'nowrap' }}>
              {results.right.isAnomaly ? 'ANOMALIE' : 'SAIN'} ({results.right.score}%)
            </div>
          </motion.div>

          {/* Left Lung Box */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '38%',
              left: '18%',
              width: 'clamp(60px, 18%, 100px)',
              height: 'clamp(90px, 28%, 140px)',
              border: `2px solid ${results.left.isAnomaly ? '#ff3366' : '#00ffcc'}`,
              backgroundColor: results.left.isAnomaly ? 'rgba(255,51,102,0.1)' : 'rgba(0,255,204,0.1)',
              zIndex: 10
            }}
          >
            <div style={{ position: 'absolute', top: '-22px', left: '-2px', background: results.left.isAnomaly ? '#ff3366' : '#00ffcc', color: results.left.isAnomaly ? 'white' : 'black', fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)', fontWeight: 'bold', padding: '2px 6px', maxWidth: '130px', lineHeight: '1.2', whiteSpace: 'nowrap' }}>
              {results.left.isAnomaly ? 'ANOMALIE' : 'SAIN'} ({results.left.score}%)
            </div>
          </motion.div>
          
          {/* Bouton Reset */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={(e) => { e.stopPropagation(); setHasScanned(false); }}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.7rem', zIndex: 20, cursor: 'pointer', letterSpacing: '0.05em' }}
          >
            RÉINITIALISER
          </motion.button>
        </>
      )}
    </div>
  );
}
