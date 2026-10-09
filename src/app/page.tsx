"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import MedicalScanDemo from '@/components/MedicalScanDemo';
import DataArchitectureDemo from '@/components/DataArchitectureDemo';
import RLCarDemo from '@/components/RLCarDemo';
import ECommerceDemo from '@/components/ECommerceDemo';
import PawriseCareDemo from '@/components/PawriseCareDemo';
import { 
  SiPython, SiPytorch, SiPandas, SiC, SiCplusplus, 
  SiRacket, SiTypescript, SiJavascript, SiReact, 
  SiNextdotjs, SiNodedotjs, SiHtml5, SiCss, SiTailwindcss 
} from 'react-icons/si';
import SocialCards from '@/components/ui/card-fan-carousel';

const DEMO_CARDS = [
  // 1. Crash & Learn RL (IA, Conduite, Lignes tech)
  { imgUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80", alt: "Crash & Learn RL" },
  // 2. DiagAI Médical (Scanner, Géométrie abstraite)
  { imgUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80", alt: "DiagAI Médical" },
  // 3. Architecture Data (Serveurs, Lignes lumineuses)
  { imgUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", alt: "Architecture Data" },
  // 4. LesAmisDuCBD (Végétal CBD / Minimaliste sombre)
  { imgUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80", alt: "LesAmisDuCBD" },
  // 5. Pawrise Care (Data Science / Animaux)
  { imgUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80", alt: "Pawrise Care" },
  // 6. Placeholder 2 (Circuits technologiques)
  { imgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", alt: "Projet à venir 2" },
  // 7. Placeholder 3 (Matrice de code noir/vert épuré)
  { imgUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", alt: "Projet à venir 3" },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projectDetails = [
    {
      id: 1,
      title: "Crash & Learn RL",
      subtitle: "Apprentissage par Renforcement Profond",
      description: "Exploitation de données dynamiques en temps réel issues de capteurs virtuels (LiDAR). L'enjeu a été de transformer ces données brutes, souvent bruitées par la météo, en états modélisés (State) dans un processus de décision markovien (MDP/POMDP). L'objectif final : entraîner un agent autonome capable d'optimiser une fonction de récompense complexe pour la conduite autonome.",
      skills: ["Reinforcement Learning", "LiDAR", "MDP/POMDP", "Python"]
    },
    {
      id: 2,
      title: "DiagAI Médical",
      subtitle: "Diagnostic par Réseaux de Neurones",
      description: "Projet de Computer Vision appliqué à la santé. J'ai manipulé de vastes jeux de données non structurées (radiographies) nécessitant un lourd travail de prétraitement et de normalisation. Ces données ont servi à entraîner un réseau de neurones profond (Deep Learning) pour résoudre un problème critique de classification binaire, comme la détection de pneumonies avec un haut degré de précision.",
      skills: ["Computer Vision", "Deep Learning", "Data Normalization", "PyTorch"]
    },
    {
      id: 3,
      title: "Linxo (Fintech)",
      subtitle: "Backend & Data Engineering en Microservices",
      description: "Développement backend au sein d'une architecture distribuée exigeante. Mon quotidien couvre un large spectre de missions : conception de nouveaux microservices (FastAPI), optimisation de pipelines d'enrichissement de données, conception de librairies métier, et refactorisation. J'évolue avec des standards de qualité élevés : validation stricte des schémas (Pydantic), couverture de tests exhaustive (Pytest, Tox, scripts custom), automatisation des environnements (uv), et déploiements continus sécurisés sur AWS (Rundeck, GitLab CI/CD).",
      skills: ["Python", "FastAPI", "Pydantic", "Pytest / Tox", "AWS SSO", "Rundeck", "GitLab CI/CD", "uv"]
    },
    {
      id: 4,
      title: "LesAmisDuCBD",
      subtitle: "Développement Web & Fullstack",
      description: "Conception et déploiement de A à Z d'une plateforme web e-commerce complète (LesAmisDuCBD). J'ai pris en charge le développement front-end et back-end, la gestion sécurisée des bases de données, l'intégration des systèmes de paiement, et l'optimisation des performances web (latence, SEO, responsive design).",
      skills: ["React", "TypeScript", "Node.js", "API REST", "E-Commerce", "UI/UX"]
    },
    {
      id: 5,
      title: "Pawrise Care",
      subtitle: "Plateforme Connectée de Santé Animale",
      description: "Solution SaaS complète dédiée au bien-être des animaux de compagnie. Le projet couvre l'ensemble de la chaîne de valeur : l'acquisition des signes vitaux via collier IoT, le traitement des données via un Backend robuste, une application front-end intuitive pour les utilisateurs, et mon moteur d'IA pour détecter de manière proactive les anomalies de santé.",
      skills: ["Python (Scikit-Learn)", "Time-Series Analysis", "React Native", "Node.js API", "IoT Telemetry (MQTT)", "WebSocket"]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main>
      {/* Glow dynamique qui suit la souris, placé globalement sur toute la page */}
      <motion.div 
        className="glow-cursor"
        animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      
      {/* HERO SECTION */}
      <section className="hero-section">
        
        <div className="hero-content flex flex-col items-center gap-6 z-10">
          <div className="text-center" style={{ transform: 'translateY(-5vh)' }}>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              NINO L.
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              Developer Fullstack / Data Engineer / AI Specialist
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full mt-4"
            style={{ pointerEvents: 'auto' }}
          >
            <SocialCards cards={DEMO_CARDS} />
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          ↓ SCROLL TO EXPLORE
        </motion.div>
      </section>

      {/* BENTO BOX SECTIONS (SCROLL SNAP) */}

      {/* SECTION : INTRODUCTION */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '1000px', alignSelf: 'center' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '30px' }}>01 / Introduction</h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#fff' }}>
              De la donnée brute aux systèmes autonomes.
            </h2>
            <div style={{ marginTop: '30px', fontSize: 'clamp(1.1rem, 2vw, 1.2rem)', color: '#a1a1a6', lineHeight: 1.8, fontWeight: 300 }}>
              J'interviens sur l'ensemble du cycle de vie des projets IT, de la modélisation des données jusqu'à la restitution client. Mes champs d'action :

              <ul style={{ marginTop: '20px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>Développement Fullstack & Web :</strong> Conception et déploiement d'applications web modernes de A à Z (ex: plateformes e-commerce), de l'interface utilisateur (React, TypeScript) à l'architecture Backend et base de données (Node.js).
                </li>
                <li>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>Data Engineering & Big Data :</strong> Création de pipelines ETL industrialisés, ingestion de flux IoT en temps réel, et traitement distribué à grande échelle (Hadoop, Apache Spark).
                </li>
                <li>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>DevOps & Qualité :</strong> Déploiement et orchestration d'architectures sur AWS (Rundeck, SSO), restitution (OpenSearch, Streamlit) et fiabilisation systématique des flux de production via tests unitaires (Pytest).
                </li>
                <li>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>Intelligence Artificielle :</strong> Modélisation et entraînement d'algorithmes complexes, allant de la Computer Vision en imagerie médicale (Deep Learning) à la conduite autonome par Apprentissage par Renforcement (Processus Markoviens).
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION : PAWRISE CARE */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>02 / Data Science & Anomaly Detection</h2>
          <div className="bento-grid" style={{ gridTemplateRows: '350px' }}>
            
            <motion.div 
              className="bento-cell col-span-4 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: 0, position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 20, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', right: '20px' }}>
                <h2 className="bento-title" style={{ fontSize: '1.2rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Pawrise Care : Health Dashboard</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a 
                    href="https://pawrise-care.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ pointerEvents: 'auto', background: 'rgba(0, 255, 204, 0.1)', border: '1px solid rgba(0, 255, 204, 0.4)', color: '#00ffcc', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(5px)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                  >
                    Visiter le site ↗
                  </a>
                  <button 
                    onClick={() => setSelectedProject(5)}
                    style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                  >
                    Détails ➔
                  </button>
                </div>
              </div>
              <PawriseCareDemo />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION : INTELLIGENCE ARTIFICIELLE */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>03 / Intelligence Artificielle</h2>
          <div className="bento-grid">

            {/* Tuile 2: Projet 1 */}
            <motion.div 
              className="bento-cell col-span-2 row-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: 0 }} 
            >
              <RLCarDemo />
              <div className="bento-content-bottom" style={{ padding: '30px', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h2 className="bento-title">Crash & Learn RL</h2>
                  <p className="bento-desc">Apprentissage par Renforcement Profond</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(1)}
                  style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                >
                  Détails ➔
                </button>
              </div>
            </motion.div>

            {/* Tuile 3: Projet 2 */}
            <motion.div 
              className="bento-cell col-span-2 row-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ padding: 0 }}
            >
              <MedicalScanDemo />
              <div className="bento-content-bottom" style={{ padding: '30px', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h2 className="bento-title">DiagAI Médical</h2>
                  <p className="bento-desc">Diagnostic par réseaux de neurones</p>
                </div>
                <button 
                  onClick={() => setSelectedProject(2)}
                  style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                >
                  Détails ➔
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION : DATA ENGINEERING */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>04 / Data Engineering & Architecture</h2>
          <div className="bento-grid" style={{ gridTemplateRows: '350px' }}>

            {/* Tuile 4: Projet 3 */}
            <motion.div 
              className="bento-cell col-span-4 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ padding: 0, position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 20, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', right: '20px' }}>
                <h2 className="bento-title" style={{ fontSize: '1.2rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Linxo : Pipeline d'Enrichissement (Fintech)</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a 
                    href="https://www.linxo.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ pointerEvents: 'auto', background: 'rgba(0, 255, 204, 0.1)', border: '1px solid rgba(0, 255, 204, 0.4)', color: '#00ffcc', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(5px)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                  >
                    Visiter le site ↗
                  </a>
                  <button 
                    onClick={() => setSelectedProject(3)}
                    style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                  >
                    Détails ➔
                  </button>
                </div>
              </div>
              <DataArchitectureDemo />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION : WEB & FULLSTACK */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>05 / Développement Fullstack</h2>
          <div className="bento-grid" style={{ gridTemplateRows: '450px' }}>
            
            <motion.div 
              className="bento-cell col-span-4 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ padding: 0, position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 20, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', right: '20px' }}>
                <h2 className="bento-title" style={{ fontSize: '1.2rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>E-Commerce Website (LesAmisDuCBD)</h2>
                <button 
                  onClick={() => setSelectedProject(4)}
                  style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', backdropFilter: 'blur(5px)' }}
                >
                  Détails ➔
                </button>
              </div>
              <ECommerceDemo />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION : STACK & RESEAUX */}
      <section className="snap-section">
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', marginLeft: '10px' }}>06 / Stack & Contact</h2>
          <div className="bento-grid" style={{ gridTemplateRows: '150px' }}>
            
            {/* Tuile 5: Stack (2 colonnes) */}
            <motion.div 
              className="bento-cell col-span-2 row-span-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', padding: '20px' }}
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

            {/* Tuile 6: Github */}
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

            {/* Tuile 7: Contact */}
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

          </div>
        </div>
      </section>

      {/* MODAL DE DETAILS */}
      {selectedProject !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
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
              {projectDetails.find(p => p.id === selectedProject)?.title}
            </h3>
            <div style={{ color: '#00ffcc', fontSize: '1rem', marginBottom: '25px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {projectDetails.find(p => p.id === selectedProject)?.subtitle}
            </div>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#d1d1d6', marginBottom: '30px' }}>
              {projectDetails.find(p => p.id === selectedProject)?.description}
            </p>
            
            <div>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.1em' }}>Compétences Clés</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {projectDetails.find(p => p.id === selectedProject)?.skills.map(skill => (
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
