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
    <div className="absolute inset-0 overflow-hidden bg-[#050505] flex flex-col pb-[25px] px-[15px] sm:px-[25px]">
      
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.02) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 h-full z-10 relative">
        
        {/* LEFT PANEL : Microservices & Data Pipeline */}
        <div className="flex flex-col justify-center relative w-full overflow-hidden">
          <div className="text-[0.6rem] sm:text-[0.7rem] text-[#888] tracking-widest mb-2 sm:mb-4">PIPELINE MICROSERVICES (ORCHESTRATOR)</div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
            {/* Raw Input */}
            <div className="bg-white/5 border border-dashed border-white/20 p-2 sm:p-3 rounded-lg text-[0.55rem] sm:text-[0.65rem] text-[#888] font-mono break-all w-full sm:w-auto shrink-0">
              <div>[Raw Data Flow]</div>
              <div className="text-white mt-1">{rawTx}</div>
            </div>

            <ArrowRight size={16} color={step >= 1 ? '#00ffcc' : '#444'} className="rotate-90 sm:rotate-0 my-1 sm:my-0 flex-shrink-0" />

            {/* Pydantic Validation */}
            <motion.div 
              animate={{ borderColor: step === 1 ? '#00ffcc' : 'rgba(255,255,255,0.1)', backgroundColor: step === 1 ? 'rgba(0,255,204,0.05)' : '#0a0a0c' }}
              className="border-2 p-2 sm:p-3 rounded-lg flex flex-col items-center w-full sm:w-auto shrink-0"
            >
              <ShieldCheck size={20} color={step >= 1 ? '#00ffcc' : '#888'} />
              <div className="text-[0.55rem] sm:text-[0.6rem] text-white mt-1 font-bold">Pydantic / FastAPI</div>
            </motion.div>

            <ArrowRight size={16} color={step >= 2 ? '#00ffcc' : '#444'} className="rotate-90 sm:rotate-0 my-1 sm:my-0 flex-shrink-0" />

            {/* Insights Library (Pattern Matching) */}
            <motion.div 
              animate={{ borderColor: step === 2 ? '#00ffcc' : 'rgba(255,255,255,0.1)', backgroundColor: step === 2 ? 'rgba(0,255,204,0.05)' : '#0a0a0c' }}
              className="border-2 p-2 sm:p-3 rounded-lg flex flex-col items-center min-w-[80px] sm:min-w-[100px] w-full sm:w-auto shrink-0"
            >
              <Server size={20} color={step >= 2 ? '#00ffcc' : '#888'} />
              <div className="text-[0.55rem] sm:text-[0.6rem] text-white mt-1 font-bold">core-processing-lib</div>
              <div className="text-[0.45rem] sm:text-[0.5rem] text-[#00ffcc]">Pattern Matching</div>
            </motion.div>

            <ArrowRight size={16} color={step >= 3 ? '#00ffcc' : '#444'} className="rotate-90 sm:rotate-0 my-1 sm:my-0 flex-shrink-0" />
            
            {/* Output */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: step === 3 ? 1 : 0.4 }}
              className="bg-[#00ffcc]/10 border border-[#00ffcc] p-2 sm:p-3 rounded-lg text-[0.55rem] sm:text-[0.65rem] text-[#00ffcc] font-mono break-all w-full sm:w-auto shrink-0"
            >
              <div>[Enriched Tx]</div>
              <div className="text-white mt-1">{enrichedTx}</div>
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
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="break-all sm:break-normal">
              <span style={{ color: '#00ffcc' }}>$</span> uv run pytest --cov=core-processing
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row sm:justify-between">
              <span className="truncate">tests/test_pattern_matching.py</span>
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
