"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { LOCALES, LOCALE_NAMES } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.langSwitcher.label}
      className="fixed top-4 right-4 xl:top-6 xl:right-7 z-[60] flex items-center select-none rounded-full border border-white/10 bg-[rgba(20,20,22,0.65)] backdrop-blur-xl"
      style={{ padding: "3px", gap: "2px" }}
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            lang={l}
            title={LOCALE_NAMES[l]}
            className="relative rounded-full font-mono text-[11px] font-semibold tracking-[0.12em] uppercase cursor-pointer border-none bg-transparent transition-colors duration-200"
            style={{ padding: "6px 11px", color: active ? "#000" : "rgba(255,255,255,0.55)" }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-[#00ffcc] shadow-[0_0_14px_rgba(0,255,204,0.45)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{l}</span>
          </button>
        );
      })}
    </div>
  );
}
