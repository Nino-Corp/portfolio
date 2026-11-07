"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const INTERVAL_MS = 2400;

export default function HeroSubtitle() {
  const { t } = useLang();
  const ROLES = t.hero.roles;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % ROLES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.p
      className="hero-subtitle"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      {ROLES.map((role, i) => (
        <React.Fragment key={i}>
          <motion.span
            className="inline-block"
            animate={{
              color: i === active ? "#ffffff" : "#6e6e73",
              opacity: i === active ? 1 : 0.6,
              y: i === active ? -2 : 0,
              filter: i === active ? "blur(0px)" : "blur(0.6px)",
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {role}
          </motion.span>
          {i < ROLES.length - 1 && <span aria-hidden="true" className="hero-subtitle-sep mx-3 text-[#3a3a3c]">/</span>}
        </React.Fragment>
      ))}
    </motion.p>
  );
}
