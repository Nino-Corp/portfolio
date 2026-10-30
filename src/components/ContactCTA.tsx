"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EMAIL = 'ninoprime@hotmail.com';
const PHONE_DISPLAY = '06 83 71 72 57';
const PHONE_TEL = '+33683717257';
// Genève et Paris partagent le même fuseau (CET/CEST)
const TIME_ZONE = 'Europe/Paris';

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

type Toast = { ok: boolean; text: string } | null;

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback si l'API Clipboard est indisponible (contexte non sécurisé, permissions)
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
  </svg>
);

const ROWS = [
  { label: 'Mail', value: EMAIL, href: `mailto:${EMAIL}`, color: '#0a84ff', Icon: MailIcon, copyLabel: 'Copier l’adresse', openLabel: 'Écrire un mail' },
  { label: 'Téléphone', value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`, color: '#30d158', Icon: PhoneIcon, copyLabel: 'Copier le numéro', openLabel: 'Appeler' },
];

type Row = (typeof ROWS)[number];

const sheetButton: React.CSSProperties = {
  display: 'block', width: '100%', textAlign: 'center', padding: '15px 16px',
  background: 'none', border: 'none', color: '#0a84ff', fontSize: '1.05rem',
  cursor: 'pointer', textDecoration: 'none',
};

export default function ContactCTA() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Row | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now ? now.toLocaleTimeString('fr-FR', { timeZone: TIME_ZONE, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
  const tz = now
    ? (new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, timeZoneName: 'short' }).formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? '')
    : '';

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const handleCopy = async (value: string) => {
    setActive(null);
    const ok = await copyToClipboard(value);
    setToast({ ok, text: ok ? 'Copié' : `Copie impossible : ${value}` });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2000);
  };

  return (
    <motion.div
      layout
      className="bento-cell contact-cta col-span-4 row-span-1"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.4, layout: { type: 'spring', stiffness: 300, damping: 34 } }}
      style={{ justifyContent: 'center' }}
    >
      <motion.div layout="position" className="contact-head">
        <div>
          <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#f5f5f7' }}>Contact</h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.95rem', color: '#a1a1a6' }}>Par mail ou par téléphone.</p>
        </div>
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          whileTap={{ scale: 0.96 }}
          className="contact-btn"
          style={{
            background: open ? 'rgba(255,255,255,0.12)' : '#f5f5f7',
            color: open ? '#f5f5f7' : '#000',
            border: 'none', borderRadius: '980px', padding: '10px 20px',
            fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', flexShrink: 0,
            transition: 'background 0.25s, color 0.25s',
          }}
        >
          {open ? 'Fermer' : 'Me contacter'}
        </motion.button>
      </motion.div>

      <motion.div
        layout="position"
        role="status"
        className="contact-pill"
        style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px', alignSelf: 'flex-start',
          padding: '6px 12px 6px 10px', borderRadius: '980px',
          background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.25)',
        }}
      >
        <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-[#30d158] bg-[#30d158]/15 shadow-[0_0_10px_rgba(48,209,88,0.5)]">
          <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#30d158] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
        </span>
        <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#30d158' }}>
          Ouvert aux opportunités
        </span>
        <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          CDD / CDI / Intérim / Stage
        </span>
      </motion.div>

      <motion.div
        layout="position"
        className="contact-pill"
        style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px', alignSelf: 'flex-start',
          padding: '6px 12px 6px 10px', borderRadius: '980px',
          background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.25)',
        }}
      >
        <PinIcon />
        <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0a84ff' }}>
          Canton de Genève &amp; Paris
        </span>
        <span suppressHydrationWarning style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', minWidth: '9.5ch' }}>
          {time ? `${time} ${tz}` : ' '}
        </span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', overflow: 'hidden' }}>
              {ROWS.map((row, i) => (
                <button
                  key={row.label}
                  type="button"
                  onClick={() => setActive(row)}
                  className="contact-row"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                    padding: '11px 14px', background: 'none', border: 'none', cursor: 'pointer',
                    borderTop: i ? '0.5px solid rgba(255,255,255,0.12)' : 'none',
                    color: '#f5f5f7', textAlign: 'left',
                  }}
                >
                  <span style={{
                    width: '30px', height: '30px', borderRadius: '8px', background: row.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <row.Icon />
                  </span>
                  <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{row.label}</span>
                  <span className="contact-row-value" style={{ fontSize: '0.95rem', color: '#a1a1a6', marginLeft: 'auto', overflowWrap: 'anywhere', textAlign: 'right', minWidth: 0 }}>
                    {row.value}
                  </span>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" stroke="#636366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="m1.5 1.5 5 5-5 5" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {active && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 150, display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: '16px 16px max(16px, env(safe-area-inset-bottom))',
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={active.label}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <div style={{
                  background: 'rgba(44,44,48,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                  borderRadius: '16px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.12)',
                }}>
                  <div style={{ padding: '16px', textAlign: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.12)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#a1a1a6' }}>{active.label}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f5f5f7', marginTop: '2px', overflowWrap: 'anywhere' }}>{active.value}</div>
                  </div>
                  <a href={active.href} onClick={() => setActive(null)} style={{ ...sheetButton, borderBottom: '0.5px solid rgba(255,255,255,0.12)', fontWeight: 600 }}>
                    {active.openLabel}
                  </a>
                  <button type="button" onClick={() => handleCopy(active.value)} style={sheetButton}>
                    {active.copyLabel}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  style={{ ...sheetButton, background: 'rgba(44,44,48,0.85)', borderRadius: '16px', fontWeight: 600 }}
                >
                  Annuler
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              style={{
                position: 'fixed', left: '50%', x: '-50%', bottom: 'max(40px, calc(env(safe-area-inset-bottom) + 24px))', zIndex: 200,
                maxWidth: 'calc(100vw - 32px)', textAlign: 'center', overflowWrap: 'anywhere',
                background: 'rgba(40,40,44,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                color: toast.ok ? '#f5f5f7' : '#ff453a', border: '0.5px solid rgba(255,255,255,0.15)',
                borderRadius: '980px', padding: '10px 20px', fontSize: '0.9rem', fontWeight: 500,
              }}
            >
              {toast.ok ? '✓ ' : ''}{toast.text}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
