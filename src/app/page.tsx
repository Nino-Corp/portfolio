"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from "framer-motion";
import MedicalScanDemo from '@/components/MedicalScanDemo';
import DataArchitectureDemo from '@/components/DataArchitectureDemo';
import RLCarDemo from '@/components/RLCarDemo';
import ECommerceDemo from '@/components/ECommerceDemo';
import PawriseCareDemo from '@/components/PawriseCareDemo';
import HomepediaDemo from '@/components/HomepediaDemo';
import { 
  SiPython, SiPytorch, SiPandas, SiC, SiCplusplus, 
  SiRacket, SiTypescript, SiJavascript, SiReact, 
  SiNextdotjs, SiNodedotjs, SiHtml5, SiCss, SiTailwindcss 
} from 'react-icons/si';
import SocialCards from '@/components/ui/card-fan-carousel';
import SectionNav from '@/components/SectionNav';
import HeroTitle from '@/components/HeroTitle';
import ContactCTA from '@/components/ContactCTA';
import HeroSubtitle from '@/components/HeroSubtitle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AetherParticles from '@/components/AetherParticles';
import { useLang } from '@/lib/i18n';

const CARD_META = [
  { sectionId: "section-01", imgUrl: "/cards/card-01-intro.svg" },
  { sectionId: "section-02", imgUrl: "/cards/card-02-pawrise.svg" },
  { sectionId: "section-03", imgUrl: "/cards/card-03-ia.svg" },
  { sectionId: "section-04", imgUrl: "/cards/card-04-dataeng.svg" },
  { sectionId: "section-05", imgUrl: "/cards/card-05-bigdata.svg" },
  { sectionId: "section-06", imgUrl: "/cards/card-06-fullstack.svg" },
  { sectionId: "section-07", imgUrl: "/cards/card-07-stack.svg" },
];

export default function Home() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const { t } = useLang();
  const projectDetails = t.projectDetails;
  const selected = projectDetails.find((p) => p.id === selectedProject);
  const demoCards = useMemo(
    () => CARD_META.map((meta, i) => ({ ...meta, ...t.cards.items[i] })),
    [t]
  );

  // Glow cursor: moved straight on the DOM node (rAF-throttled) so mouse moves never re-render the page.
  useEffect(() => {
    const el = glowRef.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const flush = () => {
      raf = 0;
      el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
    };
    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main>
      {/* Glow dynamique */}
      <div ref={glowRef} className="glow-cursor" aria-hidden="true" />
      <AetherParticles />

      {/* Fil d'ariane vertical Apple ultra-moderne */}
      <SectionNav />
      <LanguageSwitcher />
      
      {/* HERO SECTION */}
      <section className="hero-section" id="section-hero">
        <div className="hero-content flex flex-col items-center gap-6 z-10">
          <div className="text-center" style={{ transform: 'translateY(-5vh)' }}>
            <HeroTitle text="NINO L." />
            <HeroSubtitle />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full mt-4"
            style={{ pointerEvents: 'auto' }}
          >
            <SocialCards cards={demoCards} />
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator cursor-pointer hover:text-white transition-colors"
          onClick={() => {
            document.getElementById('section-01')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {t.hero.scroll}
        </motion.div>
      </section>

      {/* SECTION 01 : INTRODUCTION */}
      <section className="snap-section" id="section-01">
        <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '30px' }}>{t.sections.s01}</h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#fff' }}>
              {t.intro.title}
            </h2>
            <div style={{ marginTop: '30px', fontSize: 'clamp(1.1rem, 2vw, 1.2rem)', color: '#a1a1a6', lineHeight: 1.8, fontWeight: 300 }}>
              {t.intro.lead}

              <ul style={{ marginTop: '20px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {t.intro.pillars.map((pillar) => (
                  <li key={pillar.label}>
                    <strong style={{ color: '#fff', fontWeight: 500 }}>{pillar.label}</strong> {pillar.text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 02 : PAWRISE CARE */}
      <section className="snap-section" id="section-02">
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>{t.sections.s02}</h2>
          <div className="bento-grid">
            
            {/* ROW-SPAN-2 POUR NE PAS ÉCRASER LA CARTE */}
            <motion.div 
              className="bento-cell ecommerce-card col-span-4 row-span-2 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: '24px', position: 'relative', backgroundColor: '#050505', overflow: 'hidden' }}
            >
              <div 
                className="z-20 pointer-events-none flex flex-col sm:flex-row sm:justify-between items-start sm:items-center shrink-0"
                style={{ marginBottom: '16px', gap: '12px' }}
              >
                <h2 
                  className="bento-title text-base sm:text-lg lg:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  style={{ margin: 0 }}
                >
                  {t.project.pawriseTitle}
                </h2>
                <div className="flex items-center" style={{ gap: '10px' }}>
                  <a 
                    href="https://pawrise-care.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-[#5b8cff]/10 hover:bg-[#5b8cff]/20 border border-[#5b8cff]/40 text-[#5b8cff] rounded-full text-xs cursor-pointer backdrop-blur-md no-underline flex items-center transition-all active:scale-95 font-medium"
                    style={{ padding: '6px 14px', gap: '4px' }}
                  >
                    {t.project.visitSite}
                  </a>
                  <button 
                    onClick={() => setSelectedProject(5)}
                    className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full text-xs cursor-pointer backdrop-blur-md transition-all active:scale-95 font-medium"
                    style={{ padding: '6px 14px', gap: '4px' }}
                  >
                    {t.common.details}
                  </button>
                </div>
              </div>
              <div className="flex-1 relative w-full rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/[0.05]">
                <PawriseCareDemo />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 03 : INTELLIGENCE ARTIFICIELLE */}
      <section className="snap-section" id="section-03">
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '2px' }}>{t.sections.s03}</h2>

          {/* Layout flex : row sur desktop, col sur mobile */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', flexWrap: 'wrap' }}>

            {/* Carte 1 : Crash & Learn RL */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bento-cell"
              style={{ flex: '1 1 300px', minHeight: '450px', padding: 0, position: 'relative', overflow: 'hidden' }}
            >
              <RLCarDemo />
              <div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Crash &amp; Learn RL</h3>
                    <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#a1a1a6' }}>{t.project.rlSubtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(1)}
                    className="hover:bg-white/20 active:scale-95 transition-all"
                    style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(10px)', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {t.common.details}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Carte 2 : DiagAI Médical */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bento-cell"
              style={{ flex: '1 1 300px', minHeight: '450px', padding: 0, position: 'relative', overflow: 'hidden' }}
            >
              <MedicalScanDemo />
              <div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                  pointerEvents: 'none',
                  zIndex: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{t.projectDetails[1].title}</h3>
                    <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#a1a1a6' }}>{t.project.medSubtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(2)}
                    className="hover:bg-white/20 active:scale-95 transition-all"
                    style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(10px)', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    {t.common.details}
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 04 : DATA ENGINEERING */}
      <section className="snap-section" id="section-04">
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '2px' }}>{t.sections.s04}</h2>

          <div className="bento-grid">
            <motion.div
              className="bento-cell col-span-4 row-span-2 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: '24px', position: 'relative', backgroundColor: '#050505', overflow: 'hidden' }}
            >
              <div 
                className="z-20 pointer-events-none flex flex-col sm:flex-row sm:justify-between items-start sm:items-center shrink-0"
                style={{ marginBottom: '16px', gap: '12px' }}
              >
                <h3 
                  className="bento-title text-base sm:text-lg lg:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  style={{ margin: 0 }}
                >
                  {t.project.linxoTitle}
                </h3>
                <div className="flex items-center" style={{ gap: '10px' }}>
                  <a
                    href="https://www.linxo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-[#5b8cff]/10 hover:bg-[#5b8cff]/20 border border-[#5b8cff]/40 text-[#5b8cff] rounded-full text-xs cursor-pointer backdrop-blur-md no-underline flex items-center transition-all active:scale-95 font-medium"
                    style={{ padding: '6px 14px', gap: '4px' }}
                  >
                    {t.project.visit}
                  </a>
                  <button
                    onClick={() => setSelectedProject(3)}
                    className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-full text-xs font-medium cursor-pointer backdrop-blur-md flex items-center transition-all active:scale-95"
                    style={{ padding: '6px 14px', gap: '4px' }}
                  >
                    {t.common.details}
                  </button>
                </div>
              </div>

              <div className="flex-1 relative w-full rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/[0.05]">
                <DataArchitectureDemo />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 05 : BIG DATA & DATAOPS (HOMEPEDIA) */}
      <section className="snap-section" id="section-05">
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '2px' }}>
            {t.sections.s05}
          </h2>

          <div className="bento-grid">
            <motion.div
              className="bento-cell col-span-4 row-span-2 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: '24px', position: 'relative', backgroundColor: '#050505', overflow: 'hidden' }}
            >
              <div 
                className="z-20 pointer-events-none flex flex-row justify-between items-center shrink-0"
                style={{ marginBottom: '12px', gap: '12px' }}
              >
                <div>
                  <h3
                    className="bento-title text-base sm:text-lg lg:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                    style={{ margin: 0 }}
                  >
                    {t.project.homepediaTitle}
                  </h3>
                  <p className="hidden sm:block" style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#86868b' }}>
                    {t.project.homepediaSubtitle}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedProject(6)}
                    className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-full text-xs font-medium cursor-pointer backdrop-blur-md flex items-center transition-all active:scale-95"
                    style={{ padding: '6px 14px', gap: '4px' }}
                  >
                    {t.common.details}
                  </button>
                </div>
              </div>

              <div className="flex-1 relative w-full rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/[0.05]">
                <HomepediaDemo />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 06 : WEB & FULLSTACK */}
      <section className="snap-section" id="section-06">
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>{t.sections.s06}</h2>
          <div className="bento-grid">
            
            <motion.div 
              className="bento-cell col-span-4 row-span-2 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: '24px', position: 'relative', backgroundColor: '#050505', overflow: 'hidden' }}
            >
              <div 
                className="z-20 pointer-events-none flex flex-col sm:flex-row sm:justify-between items-start sm:items-center shrink-0"
                style={{ marginBottom: '16px', gap: '12px' }}
              >
                <h2 
                  className="bento-title text-base sm:text-lg lg:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  style={{ margin: 0 }}
                >
                  {t.project.ecommerceTitle}
                </h2>
                <div className="flex items-center">
                  <button 
                    onClick={() => setSelectedProject(4)}
                    className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-full text-xs font-medium cursor-pointer backdrop-blur-md flex items-center transition-all active:scale-95"
                    style={{ padding: '6px 14px', gap: '4px' }}
                  >
                    {t.common.details}
                  </button>
                </div>
              </div>
              
              <div className="ecommerce-stage flex-1 relative w-full rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/[0.05]">
                <ECommerceDemo />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 07 : STACK & RESEAUX */}
      <section className="snap-section" id="section-07">
        <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>{t.sections.s07}</h2>
          <div className="bento-grid">
            
            {/* Tuile Stack */}
            <motion.div 
              className="bento-cell col-span-2 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center', flexWrap: 'wrap', gap: '15px', padding: '20px', justifyContent: 'center' }}
            >
              {[
                { name: 'Python', icon: SiPython, color: '#3776AB' },
                { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
                { name: 'Pandas', icon: SiPandas, color: '#150458' },
                { name: 'C', icon: SiC, color: '#A8B9CC' },
                { name: 'C++', icon: SiCplusplus, color: '#00599C' },
                { name: 'Racket', icon: SiRacket, color: '#9F1D20' },
                { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
                { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
                { name: 'React', icon: SiReact, color: '#61DAFB' },
                { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
                { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
                { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
                { name: 'CSS3', icon: SiCss, color: '#1572B6' },
                { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' }
              ].map((tech) => (
                <motion.div 
                  key={tech.name} 
                  title={tech.name}
                  whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  style={{
                    width: '45px', height: '45px', 
                    borderRadius: '10px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer'
                  }}
                >
                  <tech.icon size={22} color={tech.color} />
                </motion.div>
              ))}
            </motion.div>

            {/* Tuile Github */}
            <motion.a
              href="https://github.com/Nino-Corp"
              target="_blank"
              className="bento-cell col-span-1 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffffff', color: '#000000', textDecoration: 'none' }}
              whileHover={{ scale: 0.95 }}
            >
              <h2 className="bento-title" style={{ margin: 0, color: '#000' }}>GitHub ↗</h2>
            </motion.a>

            {/* Tuile Contact */}
            <motion.a
              href="https://www.linkedin.com/in/nino-litim-91a622220/"
              target="_blank"
              className="bento-cell col-span-1 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a66c2', color: '#ffffff', textDecoration: 'none', border: 'none' }}
              whileHover={{ scale: 0.95 }}
            >
              <h2 className="bento-title" style={{ margin: 0 }}>LinkedIn ↗</h2>
            </motion.a>

            {/* CTA Contact */}
            <ContactCTA />

          </div>
        </div>
      </section>

      {/* MODAL DE DETAILS */}
      {selectedProject !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '20px', justifyContent: 'center' }}>
          {/* Overlay flou */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', cursor: 'pointer' }}
          />
          
          {/* Boîte Modale */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ position: 'relative', width: '100%', maxWidth: '700px', background: 'rgba(20,20,22,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', color: 'white', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              ✕
            </button>
            
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '5px', letterSpacing: '-0.02em' }}>
              {selected?.title}
            </h3>
            <div style={{ color: '#5b8cff', fontSize: '1rem', marginBottom: '25px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {selected?.subtitle}
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#d1d1d6', marginBottom: '30px' }}>
              {selected?.description}
            </p>
            
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.1em' }}>{t.project.keySkills}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {selected?.skills.map(skill => (
                  <span key={skill} style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </main>
  );
}