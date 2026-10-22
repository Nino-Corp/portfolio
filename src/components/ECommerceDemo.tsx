"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function ECommerceDemo() {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden flex flex-col items-center justify-center bg-black p-4 sm:p-6">
      
      {/* Glow en arrière-plan */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(46, 204, 113, 0.15) 0%, transparent 60%)' }} />

      {/* Faux navigateur Mac */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '90%', maxWidth: '750px', height: '100%', maxHeight: '360px', background: '#0a0a0c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', zIndex: 10 }}
      >
        {/* Barre du navigateur */}
        <div style={{ position: 'relative', height: '40px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 20px', borderRadius: '20px', fontSize: '0.75rem', color: '#a1a1a6', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              lesamisducbd.fr
            </div>
          </div>
        </div>

        {/* Contenu du faux site e-commerce stylisé */}
        <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #05140a 0%, #000000 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px', overflow: 'hidden' }}>
          
          {/* Fausse Navbar du site */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 20px' }}>
            <div style={{ fontWeight: 800, color: '#2ecc71', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>LADC.</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ width: '30px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
              <div style={{ width: '30px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
              <div style={{ width: '30px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
            </div>
          </div>

          {/* Hero text */}
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', textAlign: 'center', margin: 0, lineHeight: 1.1 }}
          >
            Le meilleur du CBD,<br/>
            <span style={{ color: '#2ecc71' }}>directement chez vous.</span>
          </motion.h3>

          {/* Faux produits animés */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{ width: '120px', height: '140px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(46, 204, 113, 0.2)', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(46, 204, 113, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#2ecc71' }} />
                </div>
                <div style={{ width: '80%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }} />
                <div style={{ width: '50%', height: '6px', background: 'rgba(46, 204, 113, 0.5)', borderRadius: '3px' }} />
              </motion.div>
            ))}
          </div>

          {/* Overlay flou vers le bas pour l'élégance */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(0deg, #0a0a0c 0%, transparent 100%)' }} />
        </div>
      </motion.div>

      {/* Bouton de redirection minimaliste et épuré */}
      <motion.a
        href="https://lesamisducbd.fr"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.4, ease: "easeOut" } }}
        style={{ 
          marginTop: '30px', 
          zIndex: 10, 
          background: 'rgba(46, 204, 113, 0.05)', 
          border: '1px solid rgba(46, 204, 113, 0.2)',
          color: '#2ecc71', 
          padding: '10px 26px', 
          borderRadius: '50px', 
          fontSize: '0.85rem', 
          fontWeight: 400, 
          letterSpacing: '0.02em',
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          backdropFilter: 'blur(10px)'
        }}
        whileHover={{ 
          background: 'rgba(46, 204, 113, 0.12)',
          borderColor: 'rgba(46, 204, 113, 0.5)',
          color: '#38eb82'
        }}
        whileTap={{ 
          scale: 0.97
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        Visiter le site en ligne
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </motion.a>

    </div>
  );
}
