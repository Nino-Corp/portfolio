"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Server, Terminal, CheckCircle2, GitMerge, FileJson, Database } from 'lucide-react';

export default function DataArchitectureDemo() {
  const [step, setStep] = useState(0);
  const [terminalCycle, setTerminalCycle] = useState(0);

  // Animation de la pipeline (boucle toutes les 2.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Relance l'animation du terminal toutes les 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalCycle((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { label: 'Raw', icon: FileJson },
    { label: 'Pydantic', icon: ShieldCheck },
    { label: 'Core Lib', icon: Server },
    { label: 'Enriched', icon: Database },
  ];

  return (
    <div
      className="relative w-full h-full md:absolute md:inset-0 overflow-hidden bg-[#050505] flex flex-col justify-center select-none"
      style={{ padding: '6px 2px' }}
    >
      {/* Grille de fond subtile */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Halo lumineux central */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 204, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Layout Principal : Empilé sur mobile, Côte à côte sur Desktop */}
      <div
        className="z-10 relative flex flex-col md:flex-row items-stretch w-full h-full"
        style={{ gap: '16px' }}
      >
        {/* =========================================================
            BULLE 1 : PIPELINE MICROSERVICES
           ========================================================= */}
        <div
          className="flex-1 flex flex-col justify-between bg-white/[0.025] border border-white/[0.08] rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] shrink-0"
          style={{ padding: '20px 18px', gap: '18px' }}
        >
          {/* En-tête de la bulle */}
          <div className="flex items-center justify-between shrink-0">
            <span className="text-[10px] sm:text-[11px] font-medium text-[#86868b] tracking-[0.16em] uppercase">
              Pipeline Data
            </span>
            <span
              className="text-[9px] font-mono text-[#00ffcc] bg-[#00ffcc]/10 border border-[#00ffcc]/30 rounded-full"
              style={{ padding: '2px 8px' }}
            >
              STEP 0{step + 1}/04
            </span>
          </div>

          {/* Schéma des 4 nœuds avec marges latérales garanties */}
          <div
            className="relative flex justify-between items-start w-full shrink-0"
            style={{ padding: '4px 6px', maxWidth: '360px', margin: '0 auto' }}
          >
            {/* Ligne de liaison grise (arrêtée au centre du 1er et 4e nœud) */}
            <div
              style={{
                position: 'absolute',
                top: '23px',
                left: '25px',
                right: '25px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />

            {/* Ligne de progression active (#00ffcc) */}
            <div
              style={{
                position: 'absolute',
                top: '23px',
                left: '25px',
                right: '25px',
                height: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <motion.div
                className="h-full bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />
            </div>

            {/* Les 4 Nœuds */}
            {nodes.map((node, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center"
                style={{ gap: '8px', width: '52px' }}
              >
                <motion.div
                  animate={{
                    borderColor: step >= i ? '#00ffcc' : 'rgba(255,255,255,0.12)',
                    backgroundColor:
                      step === i
                        ? 'rgba(0,255,204,0.16)'
                        : step > i
                        ? 'rgba(0,255,204,0.06)'
                        : '#121215',
                    scale: step === i ? 1.08 : 1,
                  }}
                  className="w-[38px] h-[38px] rounded-xl border-[1.5px] flex items-center justify-center backdrop-blur-md transition-colors shadow-lg"
                >
                  <node.icon
                    size={17}
                    className={step >= i ? 'text-[#00ffcc]' : 'text-white/35'}
                  />
                </motion.div>
                <span
                  className={`text-[9.5px] sm:text-[10px] font-semibold tracking-wide text-center whitespace-nowrap transition-colors ${
                    step >= i ? 'text-white' : 'text-[#86868b]'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            ))}
          </div>

          {/* Moniteur de flux JSON (Paddings inline verrouillés) */}
          <div
            className="relative w-full bg-[#07070a] rounded-xl border border-white/10 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] shrink-0"
            style={{ minHeight: '74px', padding: '12px 14px 12px 18px' }}
          >
            {/* Liseré lumineux gauche */}
            <div className="absolute top-0 left-0 w-[3px] h-full bg-[#00ffcc]/70" />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-center font-mono text-[10px] sm:text-[11px] h-full"
                style={{ gap: '4px' }}
              >
                {step === 0 && (
                  <>
                    <span className="text-white/45 text-[9px]">{'// INGRESS RAW PAYLOAD'}</span>
                    <span className="text-white leading-snug break-words">
                      {'{ "label": "AMZN Mktp US", "amt": -15.99 }'}
                    </span>
                  </>
                )}
                {step === 1 && (
                  <>
                    <span className="text-[#ffb86c] text-[9px]">{'// VALIDATING SCHEMA (PYDANTIC)'}</span>
                    <span className="text-white/85 leading-snug break-words">
                      Strict parsing &amp; type coercion OK.
                    </span>
                  </>
                )}
                {step === 2 && (
                  <>
                    <span className="text-[#bd93f9] text-[9px]">{'// CORE-LIB PATTERN MATCHING'}</span>
                    <span className="text-white/85 leading-snug break-words">
                      Regex &quot;AMZN&quot; ➔ &quot;Amazon&quot; [E_COMMERCE]
                    </span>
                  </>
                )}
                {step === 3 && (
                  <>
                    <span className="text-[#00ffcc]/70 text-[9px]">{'// EGRESS ENRICHED PAYLOAD'}</span>
                    <span className="text-[#00ffcc] leading-snug break-words font-semibold">
                      {'{ "merchant": "Amazon", "type": "E_COMMERCE" }'}
                    </span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================================
            BULLE 2 : TERMINAL CI/CD (Style macOS)
           ========================================================= */}
        <div className="flex-1 rounded-2xl bg-[#0a0a0e]/95 border border-white/[0.08] shadow-2xl flex flex-col overflow-hidden backdrop-blur-md shrink-0">
          {/* Barre de titre macOS avec padding inline */}
          <div
            className="bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between shrink-0"
            style={{ height: '38px', padding: '0 16px' }}
          >
            <div className="flex items-center shrink-0" style={{ gap: '6px' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div
              className="text-[10px] text-[#86868b] font-medium tracking-wider flex items-center"
              style={{ gap: '6px' }}
            >
              <Terminal size={11} />
              <span>bash — CI/CD Runner</span>
            </div>
            <div style={{ width: '32px' }} />
          </div>

          {/* Contenu du Terminal avec padding inline généreux */}
          <div
            key={terminalCycle}
            className="flex flex-col justify-between font-mono text-[10px] sm:text-[11px] text-[#d1d1d6] flex-1"
            style={{ padding: '16px 18px', gap: '14px' }}
          >
            <div className="flex flex-col" style={{ gap: '9px' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center w-full"
                style={{ gap: '8px' }}
              >
                <span className="text-[#00ffcc] shrink-0">$</span>
                <span className="truncate min-w-0">uv run pytest --cov=core</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex justify-between items-center w-full"
                style={{ gap: '10px' }}
              >
                <span className="text-[#86868b] truncate min-w-0">test_patterns.py</span>
                <span className="text-[#00ffcc] shrink-0 whitespace-nowrap">PASSED [100%]</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="text-[#ffb86c] truncate min-w-0 w-full"
              >
                &gt; coverage-diff: Increased (+1.2%)
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="flex items-center w-full"
                style={{ gap: '8px' }}
              >
                <GitMerge size={12} className="text-[#bd93f9] shrink-0" />
                <span className="text-[#bd93f9] truncate min-w-0">MR #42 approved (Review)</span>
              </motion.div>
            </div>

            {/* Badge Rundeck avec padding inline */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2 }}
              className="flex items-center bg-[#00ffcc]/10 rounded-xl border border-[#00ffcc]/30 shrink-0 w-full shadow-[0_0_15px_rgba(0,255,204,0.08)]"
              style={{ padding: '9px 12px', gap: '8px' }}
            >
              <CheckCircle2 size={15} className="text-[#00ffcc] shrink-0" />
              <span className="text-[#00ffcc] font-semibold tracking-wide truncate min-w-0">
                Rundeck [Staging] : Deploy Success
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}