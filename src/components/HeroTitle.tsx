"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const SPRING = { stiffness: 120, damping: 20, mass: 0.6 };

export default function HeroTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  // Specular highlight position (% of the title box) + subtle 3D tilt
  const hx = useSpring(useMotionValue(30), SPRING);
  const hy = useSpring(useMotionValue(20), SPRING);
  const rotX = useSpring(useMotionValue(0), SPRING);
  const rotY = useSpring(useMotionValue(0), SPRING);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      hx.set(px * 100);
      hy.set(py * 100);
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rotY.set(nx * 6);
      rotX.set(-ny * 4);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [hx, hy, rotX, rotY]);

  const highlight = useMotionTemplate`radial-gradient(circle at ${hx}% ${hy}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 38%)`;

  return (
    <motion.h1
      ref={ref}
      className="hero-title"
      data-text={text}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        backgroundImage: useMotionTemplate`${highlight}, linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 45%, rgba(110,110,116,0.4) 100%)`,
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 900,
      }}
    >
      {text}
    </motion.h1>
  );
}
