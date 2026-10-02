"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Packet {
  id: number;
  y: number;
}

export default function BigDataPipelineDemo() {
  const [throughput, setThroughput] = useState(1.2);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [packetCount, setPacketCount] = useState(0);

  // Simulation du changement de débit
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(+(Math.random() * (4.5 - 1.2) + 1.2).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Génération de particules de données
  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket = { id: Date.now(), y: Math.random() * 100 };
      setPackets(prev => [...prev.slice(-15), newPacket]); // Garder max 15 particules
      setPacketCount(c => c + 1);
    }, 150); // Génère une particule toutes les 150ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#050505', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', paddingBottom: '70px' }}>
      
      {/* Background subtil */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
        <Image src="/big-data-particles.jpg" alt="bg" fill style={{ objectFit: 'cover' }} />
      </div>

      {/* Dashboard Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>Ingestion Rate</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00ffcc', fontFamily: 'monospace' }}>
            {throughput} GB/s
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>Total Packets</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>
            {packetCount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Pipeline Visualisation */}
      <div style={{ flex: 1, position: 'relative', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        
        {/* Lignes de flux */}
        <div style={{ position: 'absolute', left: '10%', right: '10%', height: '2px', background: 'rgba(255,255,255,0.1)', top: '50%' }} />

        {/* Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📥</div>
          <span style={{ fontSize: '0.6rem', color: '#aaa' }}>Kafka</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'rgba(0,255,204,0.1)', border: '1px solid #00ffcc', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(0,255,204,0.2)' }}>⚡</div>
          <span style={{ fontSize: '0.6rem', color: '#aaa' }}>Spark Streaming</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💾</div>
          <span style={{ fontSize: '0.6rem', color: '#aaa' }}>S3 / Delta</span>
        </div>

        {/* Particules Animées */}
        <AnimatePresence>
          {packets.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 20, y: `calc(50% + ${p.y - 50}px)`, opacity: 0, scale: 0 }}
              animate={{ x: '100%', opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{
                position: 'absolute',
                left: 0,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#00ffcc',
                boxShadow: '0 0 10px #00ffcc'
              }}
            />
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
}
