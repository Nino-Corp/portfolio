"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, GitMerge, Terminal, CheckCircle2, ArrowRight, ArrowDown } from 'lucide-react';

export default function DataArchitectureDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const rawTx = '{ "label": "AMZN Mktp US", "amt": -15.99 }';
  const enrichedTx = '{ "merchant": "Amazon", "type": "E_COMMERCE", "amt": -15.99 }';

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] flex flex-col" style={{ padding: '16px' }}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.02) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Layout : 2 colonnes desktop, 1 colonne mobile */}
      <div className="data-arch-layout z-10 relative" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', height: '100%' }}>
        
        {/* PANEL PIPELINE */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', overflow: 'hidden' }}>
          <div style={{ fontSize: '0.55rem', color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Pipeline Microservices</div>

          {/* Étapes pipeline — direction adaptative */}
          <div className="pipeline-steps" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px' }}>
            
            {/* Raw Input */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.18)', padding: '8px 10px', borderRadius: '8px', fontSize: '0.55rem', color: '#888', fontFamily: 'monospace', flexShrink: 0, maxWidth: '110px' }}>
              <div style={{ color: '#666', marginBottom: '2px' }}>[Raw Tx]</div>
              <div style={{ color: 'white', wordBreak: 'break-all', lineHeight: 1.3 }}>{rawTx.slice(0, 28)}…</div>
            </div>

            <ArrowRight size={14} color={step >= 1 ? '#00ffcc' : '#333'} style={{ flexShrink: 0 }} />

            {/* Pydantic */}
            <motion.div
              animate={{ borderColor: step === 1 ? '#00ffcc' : 'rgba(255,255,255,0.1)', backgroundColor: step === 1 ? 'rgba(0,255,204,0.07)' : '#0a0a0c' }}
              style={{ border: '2px solid', padding: '8px 10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}
            >
              <ShieldCheck size={16} color={step >= 1 ? '#00ffcc' : '#555'} />
              <div style={{ fontSize: '0.5rem', color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>Pydantic</div>
            </motion.div>

            <ArrowRight size={14} color={step >= 2 ? '#00ffcc' : '#333'} style={{ flexShrink: 0 }} />

            {/* Core lib */}
            <motion.div
              animate={{ borderColor: step === 2 ? '#00ffcc' : 'rgba(255,255,255,0.1)', backgroundColor: step === 2 ? 'rgba(0,255,204,0.07)' : '#0a0a0c' }}
              style={{ border: '2px solid', padding: '8px 10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}
            >
              <Server size={16} color={step >= 2 ? '#00ffcc' : '#555'} />
              <div style={{ fontSize: '0.5rem', color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>core-lib</div>
              <div style={{ fontSize: '0.45rem', color: '#00ffcc', whiteSpace: 'nowrap' }}>Pattern Match</div>
            </motion.div>

            <ArrowRight size={14} color={step >= 3 ? '#00ffcc' : '#333'} style={{ flexShrink: 0 }} />

            {/* Output */}
            <motion.div
              animate={{ opacity: step === 3 ? 1 : 0.4 }}
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid #00ffcc', padding: '8px 10px', borderRadius: '8px', fontSize: '0.5rem', color: '#00ffcc', fontFamily: 'monospace', flexShrink: 0, maxWidth: '110px' }}
            >
              <div style={{ marginBottom: '2px' }}>[Enriched]</div>
              <div style={{ color: 'white', wordBreak: 'break-all', lineHeight: 1.3 }}>{enrichedTx.slice(0, 26)}…</div>
            </motion.div>

          </div>

          {/* Progress bar */}
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${(step + 1) * 25}%` }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%', background: '#00ffcc' }}
            />
          </div>
        </div>

        {/* PANEL CI/CD TERMINAL */}
        <div style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', fontSize: '0.65rem', color: '#ccc', overflow: 'hidden' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', flexShrink: 0 }}>
            <Terminal size={12} color="#888" />
            <span style={{ color: '#888', fontSize: '0.6rem' }}>Terminal | CI/CD Pipeline</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflow: 'hidden' }}>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span style={{ color: '#00ffcc' }}>$</span> uv run pytest --cov=core-processing
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{ color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>tests/test_pattern_matching.py</span>
              <span style={{ color: '#00ffcc', flexShrink: 0 }}>...... [100%]</span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} style={{ color: '#ffb86c' }}>
              &gt; coverage-diff.sh: Coverage increased! (+1.2%)
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <GitMerge size={11} color="#bd93f9" />
              <span style={{ color: '#bd93f9' }}>MR #42 approved (Code Review)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,255,204,0.08)', padding: '7px 10px', borderRadius: '6px', border: '1px solid rgba(0,255,204,0.2)', flexShrink: 0 }}
            >
              <CheckCircle2 size={13} color="#00ffcc" />
              <span style={{ color: '#00ffcc' }}>Rundeck [Staging] : Deployment Success</span>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
