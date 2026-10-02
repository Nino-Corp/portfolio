"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DataArchitectureDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  
  const logMessages = [
    "[DATA QUALITY] Validation Pytest : 142 tests passed.",
    "[SECURITY] Authentification Rundeck (AWS SSO) réussie.",
    "[ETL] Transformation appliquée : title-casing & OpenSearch indexing.",
    "[INGESTION] Chargement Data Lake en cours...",
    "[COMPUTE] Optimisation du cluster Spark distribué...",
    "[IoT STREAM] Réception et structuration MDP.",
    "[DATAVIZ] Mise à jour de l'interface Streamlit.",
    "[DEPLOY] Déploiement Staging terminé sans erreur."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, logMessages[currentIndex]];
        if (newLogs.length > 3) newLogs.shift();
        return newLogs;
      });
      currentIndex = (currentIndex + 1) % logMessages.length;
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      width: '100%', height: '100%', 
      backgroundColor: '#0a0a0c', 
      position: 'absolute', inset: 0, 
      padding: '75px 40px 30px 40px', // 75px top padding to stay clear of the title
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
    }}>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 255, 204, 0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* TOPOLOGY DIAGRAM */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'flex-start', zIndex: 10 }}>
        
        {/* Node 1: Source */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
          <motion.div 
            animate={{ boxShadow: ['0 0 5px rgba(255,51,102,0.5)', '0 0 15px rgba(255,51,102,0.8)', '0 0 5px rgba(255,51,102,0.5)'] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,51,102,0.1)', border: '1px solid #ff3366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff3366' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </motion.div>
          <span style={{ marginTop: '12px', fontSize: '0.65rem', color: '#a1a1a6', textAlign: 'center', lineHeight: 1.4, fontWeight: 500 }}>IoT Sensors<br/>Prod DB</span>
        </div>

        {/* Line 1 */}
        <div style={{ flex: 1, maxWidth: '200px', height: '2px', background: 'rgba(255,255,255,0.05)', alignSelf: 'flex-start', marginTop: '23px', position: 'relative', marginInline: '15px' }}>
          <motion.div
            animate={{ left: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ position: 'absolute', top: '-1px', width: '30px', height: '4px', background: '#00ffcc', borderRadius: '2px', boxShadow: '0 0 10px #00ffcc' }}
          />
          <div style={{ position: 'absolute', top: '-18px', width: '100%', textAlign: 'center', fontSize: '0.5rem', color: '#00ffcc', letterSpacing: '0.1em', fontWeight: 600 }}>AWS / ETL</div>
        </div>

        {/* Node 2: Processing */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,255,204,0.05)', border: '2px dashed #00ffcc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ffcc' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </motion.div>
          <span style={{ marginTop: '12px', fontSize: '0.65rem', color: '#a1a1a6', textAlign: 'center', lineHeight: 1.4, fontWeight: 500 }}>Spark Cluster<br/>Data Lake</span>
        </div>

        {/* Line 2 */}
        <div style={{ flex: 1, maxWidth: '200px', height: '2px', background: 'rgba(255,255,255,0.05)', alignSelf: 'flex-start', marginTop: '23px', position: 'relative', marginInline: '15px' }}>
          <motion.div
            animate={{ left: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
            style={{ position: 'absolute', top: '-1px', width: '30px', height: '4px', background: '#ff3366', borderRadius: '2px', boxShadow: '0 0 10px #ff3366' }}
          />
        </div>

        {/* Node 3: Output */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
          <span style={{ marginTop: '12px', fontSize: '0.65rem', color: '#a1a1a6', textAlign: 'center', lineHeight: 1.4, fontWeight: 500 }}>Dataviz<br/>OpenSearch</span>
        </div>

      </div>

      {/* CONSOLE TERMINAL */}
      <div style={{ 
        zIndex: 10, width: '100%', height: '100px', 
        background: '#050505', 
        border: '1px solid rgba(255,255,255,0.08)', 
        borderRadius: '8px', 
        padding: '12px 15px', 
        fontFamily: 'monospace', fontSize: '0.75rem', color: '#00ffcc', 
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', 
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={log + index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, display: 'none' }}
              transition={{ duration: 0.2 }}
              style={{ marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              <span style={{ color: '#555', marginRight: '8px' }}>{`>`}</span>
              <span style={{ color: log.includes('ERROR') ? '#ff3366' : '#00ffcc' }}>{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
