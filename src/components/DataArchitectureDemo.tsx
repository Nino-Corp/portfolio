"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Server, GitMerge, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DataArchitectureDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const rawTx = '{ "label": "AMZN Mktp US", "amt": -15.99 }';
  const validTx = '{ "label": "AMZN Mktp US", "amt": -15.99, "currency": "EUR" }';
  const enrichedTx = '{ "merchant": "Amazon", "type": "E_COMMERCE", "amt": -15.99 }';

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505', display: 'flex', flexDirection: 'column', paddingTop: '70px', paddingLeft: '25px', paddingRight: '25px', paddingBottom: '25px', overflow: 'hidden' }}>
      
      {/* Background Matrix/Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 255, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.02) 1px, transparent 1px)', backgroundSize: '30px 30px', zIndex: 0 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', height: '100%', zIndex: 10 }}>
        
        {/* LEFT PANEL : Microservices & Data Pipeline */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', marginBottom: '10px' }}>PIPELINE MICROSERVICES (ORCHESTRATOR)</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Raw Input */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>
              <div>[Raw Data Flow]</div>
              <div style={{ color: '#fff', marginTop: '5px' }}>{rawTx}</div>
            </div>

            <ArrowRight size={16} color={step >= 1 ? '#00ffcc' : '#444'} />

            {/* Pydantic Validation */}
            <motion.div 
              animate={{ borderColor: step === 1 ? '#00ffcc' : 'rgba(255,255,255,0.1)', backgroundColor: step === 1 ? 'rgba(0,255,204,0.05)' : '#0a0a0c' }}
              style={{ border: '2px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <ShieldCheck size={20} color={step >= 1 ? '#00ffcc' : '#888'} />
              <div style={{ fontSize: '0.6rem', color: 'white', marginTop: '5px', fontWeight: 'bold' }}>Pydantic / FastAPI</div>
            </motion.div>

            <ArrowRight size={16} color={step >= 2 ? '#00ffcc' : '#444'} />

            {/* Insights Library (Pattern Matching) */}
            <motion.div 
              animate={{ borderColor: step === 2 ? '#00ffcc' : 'rgba(255,255,255,0.1)', backgroundColor: step === 2 ? 'rgba(0,255,204,0.05)' : '#0a0a0c' }}
              style={{ border: '2px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}
            >
              <Server size={20} color={step >= 2 ? '#00ffcc' : '#888'} />
              <div style={{ fontSize: '0.6rem', color: 'white', marginTop: '5px', fontWeight: 'bold' }}>core-processing-lib</div>
              <div style={{ fontSize: '0.5rem', color: '#00ffcc' }}>Pattern Matching</div>
            </motion.div>

            <ArrowRight size={16} color={step >= 3 ? '#00ffcc' : '#444'} />
            
            {/* Output */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: step === 3 ? 1 : 0.4 }}
              style={{ background: 'rgba(0,255,204,0.1)', border: '1px solid #00ffcc', padding: '10px', borderRadius: '8px', fontSize: '0.65rem', color: '#00ffcc', fontFamily: 'monospace' }}
            >
              <div>[Enriched Tx]</div>
              <div style={{ color: '#fff', marginTop: '5px' }}>{enrichedTx}</div>
            </motion.div>

          </div>

          {/* Progress Indicator */}
          <div style={{ marginTop: '20px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${(step + 1) * 25}%` }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%', background: '#00ffcc' }}
            />
          </div>
        </div>


        {/* RIGHT PANEL : CI/CD Terminal (Pytest, Rundeck, GitLab) */}
        <div style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', fontFamily: 'monospace', fontSize: '0.7rem', color: '#ccc', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
            <Terminal size={14} color="#888" />
            <span style={{ color: '#888' }}>Terminal | CI/CD Pipeline</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span style={{ color: '#00ffcc' }}>$</span> uv run pytest --cov=core-processing
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>tests/test_pattern_matching.py</span>
              <span style={{ color: '#00ffcc' }}>.......... [100%]</span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} style={{ color: '#ffb86c' }}>
              &gt; coverage-diff.sh: Coverage increased! (+1.2%)
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
              <GitMerge size={12} color="#bd93f9" />
              <span style={{ color: '#bd93f9' }}>Merge Request #42 approved (Code Review)</span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,255,204,0.1)', padding: '8px', borderRadius: '5px', border: '1px solid rgba(0,255,204,0.2)' }}>
              <CheckCircle2 size={14} color="#00ffcc" />
              <span style={{ color: '#00ffcc' }}>Rundeck Job [Staging] : Deployment Success</span>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}
