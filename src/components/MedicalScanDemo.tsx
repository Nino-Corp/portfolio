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
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '20px', color: 'white', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            LANCER LE DIAGNOSTIC IA
          </div>
        </motion.div>
      )}

      {/* Laser de scan */}
      {isScanning && (
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#00ffcc', boxShadow: '0 0 20px 5px rgba(0,255,204,0.5)', zIndex: 10 }}
          initial={{ y: '0%' }}
          animate={{ y: '100vh' }}
          transition={{ duration: 2, ease: "linear" }}
        />
      )}

      {/* Bounding Boxes (Résultats) */}
      {hasScanned && (
        <>
          {/* Right Lung Box */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            style={{
              position: 'absolute',
              top: '30%',
              right: '25%',
              width: '120px',
              height: '120px',
              border: `2px solid ${results.right.isAnomaly ? '#ff3366' : '#00ffcc'}`,
              backgroundColor: results.right.isAnomaly ? 'rgba(255,51,102,0.1)' : 'rgba(0,255,204,0.1)',
              zIndex: 10
            }}
          >
            <div style={{ position: 'absolute', top: '-25px', left: '-2px', background: results.right.isAnomaly ? '#ff3366' : '#00ffcc', color: results.right.isAnomaly ? 'white' : 'black', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 8px', whiteSpace: 'nowrap' }}>
              {results.right.isAnomaly ? 'ANOMALIE DÉTECTÉE' : 'SAIN'} ({results.right.score}%)
            </div>
          </motion.div>

          {/* Left Lung Box */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '40%',
              left: '20%',
              width: '100px',
              height: '140px',
              border: `2px solid ${results.left.isAnomaly ? '#ff3366' : '#00ffcc'}`,
              backgroundColor: results.left.isAnomaly ? 'rgba(255,51,102,0.1)' : 'rgba(0,255,204,0.1)',
              zIndex: 10
            }}
          >
            <div style={{ position: 'absolute', top: '-25px', left: '-2px', background: results.left.isAnomaly ? '#ff3366' : '#00ffcc', color: results.left.isAnomaly ? 'white' : 'black', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 8px', whiteSpace: 'nowrap' }}>
              {results.left.isAnomaly ? 'ANOMALIE DÉTECTÉE' : 'SAIN'} ({results.left.score}%)
            </div>
          </motion.div>
          
          {/* Bouton Reset */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={(e) => { e.stopPropagation(); setHasScanned(false); }}
            style={{ position: 'absolute', bottom: '20px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', zIndex: 20 }}
          >
            RÉINITIALISER
          </motion.button>
        </>
      )}
    </div>
  );
}
