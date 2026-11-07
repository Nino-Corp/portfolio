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
      className="fixed top-4 right-4 xl:top-6 xl:right-7 z-[60] flex items-center select-none rounded-md border border-white/12 bg-black/70 backdrop-blur-sm"
      style={{ padding: "2px" }}
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
            className={`relative rounded-[4px] cursor-pointer border-none bg-transparent text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-150 ${
              active ? "text-black" : "text-white/50 hover:text-white"
            }`}
            style={{ padding: "5px 10px" }}
          >
            {active && (
              <motion.span
                layoutId="lang-active"
                className="absolute inset-0 rounded-[4px] bg-[#f2f2f0]"
                transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
              />
            )}
            <span className="relative">{l}</span>
          </button>
        );
      })}
    </div>
  );
}
