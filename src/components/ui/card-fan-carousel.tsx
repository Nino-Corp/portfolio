"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  sectionId?: string;
  title?: string;
  subtitle?: string;
  sectionNumber?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -12, scale: 1.0, x: -27, y: 1.35, zIndex: 7 },
  { rot: -8,  scale: 1.0, x: -18, y: 0.60, zIndex: 6 },
  { rot: -4,  scale: 1.0, x: -9,  y: 0.15, zIndex: 5 },
  { rot: 0,   scale: 1.0, x: 0,   y: 0.00, zIndex: 4 },
  { rot: 4,   scale: 1.0, x: 9,   y: 0.15, zIndex: 3 },
  { rot: 8,   scale: 1.0, x: 18,  y: 0.60, zIndex: 2 },
  { rot: 12,  scale: 1.0, x: 27,  y: 1.35, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  // Ideal layout heights (in px at 16px root) matching the CSS breakpoints
  let idealPx: number;
  if (width < 480) idealPx = 22 * 16;       // 352px
  else if (width < 640) idealPx = 26 * 16;  // 416px
  else if (width < 768) idealPx = 28 * 16;  // 448px
  else if (width < 1024) idealPx = 34 * 16; // 544px
  else idealPx = 38 * 16;                    // 608px

  const available = window.innerHeight * 0.7; // 70vh budget
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 12,
    scale: 1.0,
    x: distance * 27,
    y: absDistance * absDistance * 1.35,
    zIndex: totalCards - slot,
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[16px] text-black/40 dark:text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-black/25 dark:hover:border-white/25 hover:text-black/70 dark:hover:text-white/80 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-black/[0.04] dark:before:border-white/[0.04] before:pointer-events-none";

export default function SocialCards({ cards }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (!needsPagination) {
      cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, needsPagination, cards]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 30 : -30, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -30 : 30, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    // Hover interactions
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: NodeJS.Timeout | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);
      const isResting = hoveredSlot === null;

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (!isResting) {
          const distance = Math.abs(slot - hoveredSlot!);
          delay = distance * 0.012;

          if (slot === hoveredSlot) {
            targetY -= 2.6 * hM;
            targetScale = 1.06;
            targetRot = base.rot * 0.35;
          } else {
            // Symmetrical logarithmic separation: exact same push on both sides
            const push = (4.5 + Math.log(distance) * 2.2) * mult;
            const rotDelta = Math.max(0, 3 - distance) * 1.0;

            if (slot < hoveredSlot!) {
              targetX -= push;
              targetRot -= rotDelta;
            } else {
              targetX += push;
              targetRot += rotDelta;
            }
          }
        }

        // Active hovered card instantly takes zIndex 50 to hover on top.
        // Returning/non-hovered cards immediately take their natural base.zIndex.
        // This eliminates z-index popping and ensures a smooth, continuous glide back into the deck.
        gsap.set(el, { zIndex: hoveredSlot === slot ? 50 : base.zIndex });

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: isResting ? 0.55 : 0.36,
          delay: isResting ? 0 : delay,
          ease: isResting ? "power3.out" : "power2.out",
          overwrite: "auto",
        });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        if (activeSlot !== slot) { activeSlot = slot; updateHoverLayout(slot); }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot = null; updateHoverLayout(null); }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => { if (!isAnimating.current) updateHoverLayout(activeSlot); };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) return null;

  const handleCardClick = useCallback((card: CardItem, index: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardEl = e.currentTarget;
    const innerEl = cardEl.querySelector<HTMLElement>(".fan-card-inner");
    const glowEl = cardEl.querySelector<HTMLElement>(".fan-card-glow");
    const rippleEl = cardEl.querySelector<HTMLElement>(".fan-card-ripple");

    // Tactile press & spring rebound animation (fluid & modern)
    if (innerEl) {
      gsap.killTweensOf(innerEl);
      gsap.timeline()
        .to(innerEl, {
          scale: 0.91,
          duration: 0.11,
          ease: "power2.inOut",
        })
        .to(innerEl, {
          scale: 1.05,
          duration: 0.22,
          ease: "back.out(2.5)",
        })
        .to(innerEl, {
          scale: 1.0,
          duration: 0.18,
          ease: "power2.out",
        });
    }

    // Glow pulse animation
    if (glowEl) {
      gsap.killTweensOf(glowEl);
      gsap.timeline()
        .fromTo(glowEl, 
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" }
        )
        .to(glowEl, {
          opacity: 0,
          scale: 1.04,
          duration: 0.38,
          ease: "power2.in",
        });
    }

    // Ripple light wave
    if (rippleEl) {
      gsap.killTweensOf(rippleEl);
      gsap.timeline()
        .fromTo(rippleEl,
          { opacity: 0.5, scale: 0.8 },
          { opacity: 0, scale: 1.25, duration: 0.35, ease: "power2.out" }
        );
    }

    // Smooth scroll to target section
    const targetId = card.sectionId || (card.linkUrl?.startsWith("#") ? card.linkUrl.slice(1) : undefined);
    if (targetId) {
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 160);
    } else if (card.linkUrl && card.linkUrl.startsWith("http")) {
      setTimeout(() => {
        window.open(card.linkUrl, "_blank", "noopener,noreferrer");
      }, 200);
    }
  }, []);

  const chevron = (direction: "left" | "right") => {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;
    return <Icon className="relative z-[2] w-4 h-4 md:w-5 md:h-5 text-current" strokeWidth={2.5} />;
  };

  return (
    <section className="flex flex-col items-center w-full py-4 lg:py-8 px-4 md:px-8 relative z-20">
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div ref={containerRef} className="fan-layout flex relative justify-center items-center w-full max-w-[80rem] h-[300px] md:h-[400px]">
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`Aller à la section ${card.title || card.alt || index + 1}`}
                onClick={(e) => handleCardClick(card, index, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(card, index, e as any);
                  }
                }}
                className="fan-card block cursor-pointer select-none group outline-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <div className="fan-card-inner relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-white/10 group-hover:border-[#00ffcc]/40 transition-colors duration-300">
                  <img
                    src={card.imgUrl}
                    loading="lazy"
                    alt={card.alt || card.title || `Section ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient sombre pour lisibilité du titre */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-85" />

                  {/* Halo lumineux au clic (Glow Pulse) */}
                  <div className="fan-card-glow absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none z-30 opacity-0 border-2 border-[#00ffcc] shadow-[0_0_30px_rgba(0,255,204,0.7)]" />

                  {/* Onde de choc / Ripple au clic */}
                  <div className="fan-card-ripple absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none z-30 opacity-0 bg-white/20" />

                  {/* Titre et Sous-titre de la Card (aligné à droite pour être 100% visible lors du chevauchement) */}
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 left-6 z-30 pointer-events-none flex flex-col gap-0.5 text-right">
                    <h4 className="text-xs sm:text-sm font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] leading-tight">
                      {card.title || card.alt}
                    </h4>
                    {card.subtitle && (
                      <p className="text-[10px] sm:text-[11px] text-[#00ffcc] font-medium tracking-wide drop-shadow leading-tight">
                        {card.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Flèche d'action discrète en haut à droite */}
                  <div className="absolute top-2.5 right-2.5 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 w-6 h-6 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#00ffcc] shadow-lg">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-black/70 dark:bg-white/80 scale-[1.3]" : "bg-black/15 dark:bg-white/15"}`} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
