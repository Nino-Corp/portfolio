"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineSeparator,
  TimelineHeader,
  TimelineTitle,
  TimelineDate,
} from "@/components/ui/timeline";

export interface NavSection {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "section-hero", number: "00", shortLabel: "Accueil", title: "Nino L." },
  { id: "section-01", number: "01", shortLabel: "Introduction", title: "Parcours & Vision" },
  { id: "section-02", number: "02", shortLabel: "Pawrise Care", title: "Data Science & IoT" },
  { id: "section-03", number: "03", shortLabel: "IA & Deep RL", title: "Deep RL & Vision" },
  { id: "section-04", number: "04", shortLabel: "Data Eng.", title: "Pipelines Linxo" },
  { id: "section-05", number: "05", shortLabel: "Big Data", title: "Homepedia Spark" },
  { id: "section-06", number: "06", shortLabel: "Fullstack", title: "E-Commerce CBD" },
  { id: "section-07", number: "07", shortLabel: "Contact", title: "Stack & Réseaux" },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("section-hero");
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - windowHeight;

      let currentId = NAV_SECTIONS[0].id;
      const viewportMid = scrollY + windowHeight * 0.38;

      if (maxScroll > 0 && scrollY >= maxScroll - 60) {
        currentId = NAV_SECTIONS[NAV_SECTIONS.length - 1].id;
      } else {
        for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(NAV_SECTIONS[i].id);
          if (el) {
            const top = el.offsetTop;
            if (viewportMid >= top) {
              currentId = NAV_SECTIONS[i].id;
              break;
            }
          }
        }
      }

      if (!isScrollingRef.current) {
        setActiveSection(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveSection(id);
    isScrollingRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 850);
  };

  const activeIndex = NAV_SECTIONS.findIndex((s) => s.id === activeSection);
  const currentStep = activeIndex >= 0 ? activeIndex : 0;

  return (
    <nav
      aria-label="Fil d'ariane vertical"
      className="hidden lg:flex fixed right-4 xl:right-7 2xl:right-11 top-1/2 -translate-y-1/2 z-50 flex-col select-none pointer-events-auto w-[155px]"
    >
      <div className="relative w-full">
        <Timeline value={currentStep} orientation="vertical" className="w-full">
          {NAV_SECTIONS.map((section, index) => {
            const isActive = activeIndex === index;
            const isCompleted = index < activeIndex;

            return (
              <TimelineItem
                key={section.id}
                step={index}
                onClick={() => scrollToSection(section.id)}
                className="cursor-pointer group select-none transition-all duration-200 pb-7 last:pb-0 ms-8"
              >
                <TimelineIndicator
                  className={`size-4 -left-5 transition-all duration-300 ${
                    isActive
                      ? "scale-125 border-[#00ffcc] bg-[#00ffcc]/15 shadow-[0_0_16px_#00ffcc]"
                      : isCompleted
                      ? "border-[#00ffcc] bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.35)]"
                      : "border-white/20 bg-white/[0.03] group-hover:border-white/50 group-hover:scale-110"
                  }`}
                >
                  {isCompleted ? (
                    <span className="w-1 h-1 rounded-full bg-black" />
                  ) : isActive ? (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_4px_#ffffff]" />
                    </span>
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-white/40 transition-colors" />
                  )}
                </TimelineIndicator>

                <TimelineSeparator className="-left-5 top-4 h-[calc(100%-1rem)] w-[1.5px]" />

                <TimelineHeader className="flex items-center gap-3 -mt-1 pl-1 pr-2">
                  <TimelineDate className="mb-0 text-[10.5px] font-mono font-bold tracking-wider transition-colors duration-200">
                    <span
                      className={
                        isActive
                          ? "text-[#00ffcc]"
                          : isCompleted
                          ? "text-[#00ffcc]/70"
                          : "text-white/25 group-hover:text-white/60"
                      }
                    >
                      {section.number}
                    </span>
                  </TimelineDate>

                  <TimelineTitle
                    className={`text-[11.5px] tracking-wide whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "text-white font-semibold"
                        : isCompleted
                        ? "text-white/60 group-hover:text-white font-normal"
                        : "text-white/30 group-hover:text-white/90 font-normal"
                    }`}
                  >
                    {section.shortLabel}
                  </TimelineTitle>
                </TimelineHeader>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </nav>
  );
}
