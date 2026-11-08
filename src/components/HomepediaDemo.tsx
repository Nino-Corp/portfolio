"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { TrendingUp, TrendingDown, MessageSquare, Wind, Activity } from 'lucide-react';

type MetricType = 'price' | 'nlp' | 'climate';

interface RegionData {
  id: string;
  shortCode: string;
  avgPrice: number;
  priceTrend: number;
  sentimentScore: number;
  climateScore: number;
  dvfTransactions: number;
  dpeRating: string;
  sparkRate: number;
  priceHistory: number[];
}

const REGIONS: RegionData[] = [
  {
    id: 'idf', shortCode: '75',
    avgPrice: 9480, priceTrend: 2.1, sentimentScore: 74,
    climateScore: 68, dvfTransactions: 42350, dpeRating: 'D', sparkRate: 4.8,
    priceHistory: [8200, 8400, 8650, 8800, 8950, 8900, 9100, 9200, 9350, 9300, 9420, 9480]
  },
  {
    id: 'ara', shortCode: '69',
    avgPrice: 4320, priceTrend: 3.8, sentimentScore: 86,
    climateScore: 42, dvfTransactions: 31200, dpeRating: 'C', sparkRate: 3.9,
    priceHistory: [3600, 3700, 3750, 3800, 3850, 3900, 3950, 4050, 4100, 4200, 4270, 4320]
  },
  {
    id: 'paca', shortCode: '13',
    avgPrice: 4890, priceTrend: 4.5, sentimentScore: 82,
    climateScore: 84, dvfTransactions: 28400, dpeRating: 'E', sparkRate: 5.1,
    priceHistory: [3900, 4050, 4150, 4200, 4300, 4400, 4500, 4600, 4650, 4750, 4820, 4890]
  },
  {
    id: 'naq', shortCode: '33',
    avgPrice: 3750, priceTrend: 5.2, sentimentScore: 89,
    climateScore: 56, dvfTransactions: 24900, dpeRating: 'C', sparkRate: 4.2,
    priceHistory: [2900, 3000, 3100, 3200, 3300, 3400, 3450, 3500, 3580, 3650, 3700, 3750]
  },
  {
    id: 'occ', shortCode: '31',
    avgPrice: 3240, priceTrend: 4.1, sentimentScore: 84,
    climateScore: 65, dvfTransactions: 21800, dpeRating: 'D', sparkRate: 3.6,
    priceHistory: [2600, 2700, 2800, 2850, 2900, 2950, 3000, 3050, 3100, 3150, 3200, 3240]
  }
];

const METRICS: { id: MetricType; labelKey: 'metricPrice' | 'metricNlp' | 'metricClimate'; icon: React.ElementType; color: string }[] = [
  { id: 'price', labelKey: 'metricPrice', icon: TrendingUp, color: '#5b8cff' },
  { id: 'nlp', labelKey: 'metricNlp', icon: MessageSquare, color: '#bd93f9' },
  { id: 'climate', labelKey: 'metricClimate', icon: Wind, color: '#ffb86c' },
];

function climateColor(score: number) {
  if (score >= 75) return '#ff5f56';
  if (score >= 50) return '#ffb86c';
  return '#5b8cff';
}

function sentimentColor(score: number) {
  if (score >= 80) return '#5b8cff';
  if (score >= 65) return '#ffb86c';
  return '#ff5f56';
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 110, H = 34;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  const areaPts = `0,${H} ${pts} ${W},${H}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPts}
        fill={`url(#sg-${color.replace('#', '')})`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
        style={{ filter: `drop-shadow(0 0 5px ${color}80)` }}
      />
    </svg>
  );
}

export default function HomepediaDemo() {
  const { t, localeTag } = useLang();
  const h = t.homepedia;
  const [selected, setSelected] = useState<RegionData>(REGIONS[0]);
  const sel = h.regions[selected.id];
  const [metric, setMetric] = useState<MetricType>('price');
  const [liveRate, setLiveRate] = useState(selected.sparkRate);
  const [rows, setRows] = useState(148_222_894);

  useEffect(() => {
    const iv = setInterval(() => {
      setLiveRate(+(selected.sparkRate + (Math.random() - 0.5) * 0.5).toFixed(2));
      setRows(p => p + Math.floor(Math.random() * 50_000 + 30_000));
    }, 2000);
    return () => clearInterval(iv);
  }, [selected]);

  const activeMetric = METRICS.find(m => m.id === metric)!;

  return (
    <div className="relative w-full h-full min-h-[490px] md:min-h-0 md:absolute md:inset-0 overflow-hidden bg-[#060608] flex flex-col select-none rounded-xl border border-white/[0.05]">

      {/* Ambiance de fond */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 40% at 70% 0%, rgba(91,140,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(189,147,249,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── 1. STATUS BAR ── */}
      <div
        className="relative z-10 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01] shrink-0"
        style={{ padding: '10px 16px', gap: '8px' }}
      >
        <div className="flex items-center min-w-0" style={{ gap: '8px' }}>
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5b8cff] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5b8cff]"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#86868b] truncate">
            {h.cluster}{' '}
            <span className="text-[#5b8cff] font-semibold">{liveRate} GB/s</span>
          </span>
          <span className="hidden lg:block w-px h-3 bg-white/10 shrink-0" />
          <span className="hidden lg:block text-[10px] font-mono text-[#555] truncate">
            {h.sources}
          </span>
        </div>
        <div className="text-[10px] font-mono text-[#555] shrink-0 whitespace-nowrap">
          <span className="text-[#86868b]">{rows.toLocaleString(localeTag)}</span> {h.rows}
        </div>
      </div>

      {/* ── 2. METRIC TABS ── */}
      <div
        className="relative z-10 flex items-center flex-wrap border-b border-white/[0.04] shrink-0"
        style={{ padding: '10px 16px', gap: '8px' }}
      >
        {METRICS.map(m => {
          const active = metric === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetric(m.id)}
              className="flex items-center rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 cursor-pointer border shrink-0"
              style={{
                padding: '6px 12px',
                gap: '6px',
                background: active ? `${m.color}18` : 'rgba(255,255,255,0.02)',
                borderColor: active ? `${m.color}55` : 'rgba(255,255,255,0.07)',
                color: active ? m.color : '#86868b',
              }}
            >
              <m.icon size={12} />
              <span>{h[m.labelKey]}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. CORPS : SÉLECTEUR DE RÉGIONS + PANNEAU DÉTAIL ── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">

        {/* A. SÉLECTEUR MOBILE (Pilules horizontales visibles uniquement < 768px) */}
        <div
          className="flex md:hidden items-center overflow-x-auto border-b border-white/[0.05] shrink-0"
          style={{ padding: '8px 14px', gap: '6px', scrollbarWidth: 'none' }}
        >
          {REGIONS.map(r => {
            const isActive = selected.id === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelected(r)}
                className="rounded-lg text-[11px] font-medium transition-all cursor-pointer border shrink-0 whitespace-nowrap flex items-center"
                style={{
                  padding: '5px 10px',
                  gap: '5px',
                  background: isActive ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.02)',
                  borderColor: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#ffffff' : '#777',
                }}
              >
                <span
                  className="text-[9px] font-mono font-bold"
                  style={{ color: isActive ? activeMetric.color : '#555' }}
                >
                  {r.shortCode}
                </span>
                <span>{h.regions[r.id].shortName}</span>
              </button>
            );
          })}
        </div>

        {/* B. LISTE RÉGIONS DESKTOP (Colonne gauche visible >= 768px) */}
        <div
          className="hidden md:flex md:w-[36%] lg:w-[34%] flex-col overflow-y-auto border-r border-white/[0.05] shrink-0"
          style={{ padding: '12px', gap: '6px' }}
        >
          {REGIONS.map(r => {
            const isActive = selected.id === r.id;
            let val: string;
            let col: string;
            if (metric === 'price') {
              val = `${r.avgPrice.toLocaleString(localeTag)} €`;
              col = '#5b8cff';
            } else if (metric === 'nlp') {
              val = `${r.sentimentScore}%`;
              col = sentimentColor(r.sentimentScore);
            } else {
              val = `${r.climateScore}/100`;
              col = climateColor(r.climateScore);
            }

            return (
              <motion.button
                key={r.id}
                type="button"
                onClick={() => setSelected(r)}
                whileTap={{ scale: 0.985 }}
                className="w-full text-left rounded-xl transition-all duration-150 cursor-pointer border"
                style={{
                  padding: '10px 14px',
                  background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                  borderColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                }}
              >
                <div className="flex items-center justify-between" style={{ gap: '8px' }}>
                  <div className="min-w-0">
                    <div
                      className="text-[9px] font-mono font-semibold"
                      style={{
                        color: isActive ? activeMetric.color : '#555',
                        marginBottom: '2px',
                      }}
                    >
                      {h.dept} {r.shortCode}
                    </div>
                    <div
                      className={`text-xs font-medium truncate ${
                        isActive ? 'text-white' : 'text-[#86868b]'
                      }`}
                    >
                      {h.regions[r.id].name}
                    </div>
                  </div>
                  <div
                    className="text-[11px] font-mono font-semibold shrink-0"
                    style={{ color: isActive ? col : '#555' }}
                  >
                    {val}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* C. PANNEAU DÉTAIL (100% largeur sur Mobile, 66% sur Desktop) */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selected.id}-${metric}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1 flex flex-col justify-between overflow-hidden"
              style={{ padding: '16px 18px', gap: '12px' }}
            >
              {/* En-tête de la région sélectionnée */}
              <div className="flex items-baseline justify-between shrink-0" style={{ gap: '8px' }}>
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight truncate">
                  {sel.name}
                </h3>
                <span className="text-[9px] font-mono text-[#666] uppercase tracking-widest shrink-0">
                  {metric === 'price'
                    ? h.labelPrice
                    : metric === 'nlp'
                    ? h.labelNlp
                    : h.labelClimate}
                </span>
              </div>

              {/* ── CONTENU METRIQUE 1 : PRIX ── */}
              {metric === 'price' && (
                <div className="flex-1 flex flex-col justify-between min-h-0" style={{ gap: '12px' }}>
                  {/* KPI Principal Prix + Sparkline */}
                  <div
                    className="relative rounded-2xl overflow-hidden shrink-0"
                    style={{
                      padding: '14px 18px',
                      background:
                        'linear-gradient(135deg, rgba(91,140,255,0.09) 0%, rgba(91,140,255,0.02) 100%)',
                      border: '1px solid rgba(91,140,255,0.2)',
                    }}
                  >
                    <div className="flex items-center justify-between" style={{ gap: '12px' }}>
                      <div className="min-w-0">
                        <div
                          className="text-[9px] font-mono text-[#5b8cff]/75 uppercase tracking-wider"
                          style={{ marginBottom: '4px' }}
                        >
                          {h.avgPrice}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-white leading-none">
                          {selected.avgPrice.toLocaleString(localeTag)}
                          <span className="text-sm sm:text-base text-[#86868b]" style={{ marginLeft: '6px' }}>
                            €
                          </span>
                        </div>
                        <div className="flex items-center" style={{ gap: '6px', marginTop: '8px' }}>
                          {selected.priceTrend > 0 ? (
                            <TrendingUp size={13} className="text-[#5b8cff] shrink-0" />
                          ) : (
                            <TrendingDown size={13} className="text-red-400 shrink-0" />
                          )}
                          <span
                            className="text-[11px] font-mono font-semibold"
                            style={{ color: selected.priceTrend > 0 ? '#5b8cff' : '#ff5f56' }}
                          >
                            {selected.priceTrend > 0 ? '+' : ''}
                            {selected.priceTrend}% {h.over12m}
                          </span>
                        </div>
                      </div>

                      {/* Courbe Sparkline */}
                      <div className="opacity-90 shrink-0">
                        <Sparkline data={selected.priceHistory} color="#5b8cff" />
                      </div>
                    </div>
                  </div>

                  {/* Cartes secondaires (Transactions & DPE) */}
                  <div className="grid grid-cols-2 shrink-0" style={{ gap: '10px' }}>
                    <div
                      className="rounded-xl border border-white/[0.07] bg-white/[0.025]"
                      style={{ padding: '12px 14px' }}
                    >
                      <div
                        className="text-[9px] font-mono text-[#86868b] uppercase tracking-wider"
                        style={{ marginBottom: '4px' }}
                      >
                        {h.dvf}
                      </div>
                      <div className="text-lg sm:text-xl font-bold font-mono text-white leading-tight">
                        {(selected.dvfTransactions / 1000).toFixed(1)}
                        <span className="text-xs text-[#86868b]" style={{ marginLeft: '2px' }}>
                          k
                        </span>
                      </div>
                      <div className="text-[9.5px] font-mono text-[#666] truncate" style={{ marginTop: '3px' }}>
                        {h.dvfNote}
                      </div>
                    </div>

                    <div
                      className="rounded-xl border border-white/[0.07] bg-white/[0.025]"
                      style={{ padding: '12px 14px' }}
                    >
                      <div
                        className="text-[9px] font-mono text-[#86868b] uppercase tracking-wider"
                        style={{ marginBottom: '4px' }}
                      >
                        {h.dpe}
                      </div>
                      <div
                        className="text-lg sm:text-xl font-bold font-mono leading-tight"
                        style={{
                          color:
                            selected.dpeRating === 'C'
                              ? '#5b8cff'
                              : selected.dpeRating === 'D'
                              ? '#ffb86c'
                              : '#ff5f56',
                        }}
                      >
                        {h.dpeClass} {selected.dpeRating}
                      </div>
                      <div className="text-[9.5px] font-mono text-[#666] truncate" style={{ marginTop: '3px' }}>
                        {h.dpeNote}
                      </div>
                    </div>
                  </div>

                  {/* Bloc Pipeline Spark */}
                  <div
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-center"
                    style={{ padding: '12px 14px' }}
                  >
                    <div
                      className="text-[9px] font-mono text-[#86868b] uppercase tracking-widest"
                      style={{ marginBottom: '4px' }}
                    >
                      {h.sparkSql}
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-[#a1a1a6] leading-relaxed">
                      {h.sparkSqlText}
                    </p>
                  </div>
                </div>
              )}

              {/* ── CONTENU METRIQUE 2 : NLP ── */}
              {metric === 'nlp' && (
                <div className="flex-1 flex flex-col justify-between min-h-0" style={{ gap: '12px' }}>
                  <div
                    className="relative rounded-2xl overflow-hidden shrink-0"
                    style={{
                      padding: '14px 18px',
                      background:
                        'linear-gradient(135deg, rgba(189,147,249,0.1) 0%, rgba(189,147,249,0.02) 100%)',
                      border: '1px solid rgba(189,147,249,0.22)',
                    }}
                  >
                    <div className="flex items-baseline justify-between" style={{ marginBottom: '8px' }}>
                      <div>
                        <div
                          className="text-[9px] font-mono text-[#bd93f9] uppercase tracking-wider"
                          style={{ marginBottom: '4px' }}
                        >
                          {h.polarity}
                        </div>
                        <div
                          className="text-2xl sm:text-3xl font-bold font-mono leading-none"
                          style={{ color: sentimentColor(selected.sentimentScore) }}
                        >
                          {selected.sentimentScore}
                          <span className="text-base text-[#86868b]" style={{ marginLeft: '2px' }}>
                            %
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-mono text-[#86868b] uppercase">{h.mainTheme}</div>
                        <div className="text-xs font-semibold text-white" style={{ marginTop: '2px' }}>
                          {sel.topKeyword}
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selected.sentimentScore}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${sentimentColor(
                            selected.sentimentScore
                          )}, #bd93f9)`,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-between"
                    style={{ padding: '14px 16px', gap: '10px' }}
                  >
                    <div>
                      <div
                        className="text-[9px] font-mono text-[#86868b] uppercase tracking-widest"
                        style={{ marginBottom: '6px' }}
                      >
                        {h.synthesis}
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#d1d1d6] leading-relaxed italic">
                        &ldquo;{sel.sentimentText}&rdquo;
                      </p>
                    </div>
                    <div
                      className="border-t border-white/[0.06] flex items-center"
                      style={{ paddingTop: '10px', gap: '8px' }}
                    >
                      <Activity size={12} className="text-[#bd93f9] shrink-0" />
                      <span className="text-[10px] font-mono text-[#86868b]">
                        {h.reviews}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CONTENU METRIQUE 3 : CLIMAT ── */}
              {metric === 'climate' && (
                <div className="flex-1 flex flex-col justify-between min-h-0" style={{ gap: '12px' }}>
                  <div
                    className="relative rounded-2xl overflow-hidden shrink-0"
                    style={{
                      padding: '14px 18px',
                      background: `linear-gradient(135deg, ${climateColor(
                        selected.climateScore
                      )}18 0%, ${climateColor(selected.climateScore)}04 100%)`,
                      border: `1px solid ${climateColor(selected.climateScore)}38`,
                    }}
                  >
                    <div className="flex items-baseline justify-between" style={{ marginBottom: '8px' }}>
                      <div>
                        <div
                          className="text-[9px] font-mono uppercase tracking-wider"
                          style={{
                            color: climateColor(selected.climateScore),
                            marginBottom: '4px',
                          }}
                        >
                          {h.vulnerability}
                        </div>
                        <div
                          className="text-2xl sm:text-3xl font-bold font-mono leading-none"
                          style={{ color: climateColor(selected.climateScore) }}
                        >
                          {selected.climateScore}
                          <span className="text-sm text-[#86868b]" style={{ marginLeft: '3px' }}>
                            /100
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-xs font-semibold rounded-full border"
                        style={{
                          padding: '3px 10px',
                          color: climateColor(selected.climateScore),
                          borderColor: `${climateColor(selected.climateScore)}40`,
                          background: `${climateColor(selected.climateScore)}12`,
                        }}
                      >
                        {h.risk} {sel.climateLabel}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selected.climateScore}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: climateColor(selected.climateScore) }}
                      />
                    </div>
                  </div>

                  <div
                    className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-between"
                    style={{ padding: '14px 16px', gap: '10px' }}
                  >
                    <div>
                      <div
                        className="text-[9px] font-mono text-[#86868b] uppercase tracking-widest"
                        style={{ marginBottom: '6px' }}
                      >
                        {h.predictive}
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#a1a1a6] leading-relaxed">
                        {h.predictiveText(selected.dpeRating)}
                      </p>
                    </div>
                    <div
                      className="border-t border-white/[0.06] flex items-center"
                      style={{ paddingTop: '10px', gap: '8px' }}
                    >
                      <Wind size={12} className="text-[#ffb86c] shrink-0" />
                      <span className="text-[10px] font-mono text-[#86868b]">
                        {h.climateSources}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer technique */}
          <div
            className="shrink-0 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between"
            style={{ padding: '8px 18px', gap: '8px' }}
          >
            <span className="text-[9px] font-mono text-[#555] truncate">
              {h.footerData}
            </span>
            <span className="text-[9px] font-mono text-[#666] truncate">
              {h.footerFlow}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}