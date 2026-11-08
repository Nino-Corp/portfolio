"use client";

import React, { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { useLang } from "@/lib/i18n";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  sectionId?: string;
  title?: string;
  subtitle?: string;
  sectionNumber?: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
  /** Distance of the cards from the center (px). Defaults to a value derived from the card width. */
  radius?: number;
  /** Idle auto-rotation speed (degrees per frame). */
  autoRotateSpeed?: number;
}

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

/** Card width (px) per viewport width; height follows the 7:10 ratio of the SVG cards. */
function getCardWidth(viewport: number) {
  if (viewport < 480) return Math.max(100, Math.min(130, Math.round(viewport * 0.31)));
  if (viewport < 768) return 180;
  // Desktop: cards grow with the viewport so the ring keeps covering ~60% of the page width
  return Math.max(220, Math.min(340, Math.round(viewport * 0.16)));
}

function scrollToCard(card: CardItem) {
  const targetId = card.sectionId || (card.linkUrl?.startsWith("#") ? card.linkUrl.slice(1) : undefined);
  if (targetId) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (card.linkUrl?.startsWith("http")) {
    window.open(card.linkUrl, "_blank", "noopener,noreferrer");
  }
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius, autoRotateSpeed = 0.15, ...props }, ref) => {
    const { t } = useLang();
    const ringRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [cardWidth, setCardWidth] = useState(220);

    // Responsive card size (rAF-throttled resize)
    useEffect(() => {
      let raf = 0;
      const sync = () => {
        raf = 0;
        setCardWidth(getCardWidth(window.innerWidth));
      };
      sync();
      const onResize = () => {
        if (!raf) raf = requestAnimationFrame(sync);
      };
      window.addEventListener("resize", onResize, { passive: true });
      return () => {
        window.removeEventListener("resize", onResize);
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);

    const count = items.length;
    const cardHeight = Math.round((cardWidth * 10) / 7);
    const ringRadius = radius ?? Math.round(cardWidth * (cardWidth >= 200 ? 1.75 : 1.35));
    const anglePerItem = count ? 360 / count : 0;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const setRefs = (el: HTMLDivElement | null) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };
    const movedRef = useRef(false);

    // Rotation, inertia and input live in refs and are written straight to the DOM: no React re-render per frame.
    useEffect(() => {
      const ring = ringRef.current;
      const container = containerRef.current;
      if (!ring || !container || !count) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const DEG_PER_PX = 0.32;
      const DRAG_THRESHOLD = 6;

      let rotation = 0;
      let velocity = 0; // deg per frame
      let lastInteraction = -Infinity;
      let dragging = false;
      let captured = false;
      let startX = 0;
      let lastX = 0;
      let pointerId = -1;
      let raf = 0;
      let visible = true;
      let lastOpacityRotation = Infinity;

      const apply = () => {
        ring.style.transform = `translateZ(${-ringRadius}px) rotateY(${rotation}deg)`;
        if (Math.abs(rotation - lastOpacityRotation) < 0.5) return;
        lastOpacityRotation = rotation;
        const total = ((rotation % 360) + 360) % 360;
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const relative = (i * anglePerItem + total) % 360;
          const normalized = relative > 180 ? 360 - relative : relative;
          el.style.opacity = String(Math.max(0.35, 1 - normalized / 200));
        });
      };

      // Wheel / trackpad: horizontal (or vertical) delta spins the ring; the page does not scroll while hovering it.
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const step = delta * 0.12;
        rotation += step;
        velocity = Math.max(-6, Math.min(6, step * 0.5));
        lastInteraction = performance.now();
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        dragging = true;
        captured = false;
        movedRef.current = false;
        pointerId = e.pointerId;
        startX = lastX = e.clientX;
        velocity = 0;
        lastInteraction = performance.now();
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging || e.pointerId !== pointerId) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        if (!captured && Math.abs(e.clientX - startX) > DRAG_THRESHOLD) {
          captured = true;
          movedRef.current = true;
          container.setPointerCapture(pointerId);
          container.style.cursor = "grabbing";
        }
        if (captured) {
          rotation += dx * DEG_PER_PX;
          velocity = dx * DEG_PER_PX;
          lastInteraction = performance.now();
        }
      };
      const endDrag = (e: PointerEvent) => {
        if (!dragging || e.pointerId !== pointerId) return;
        dragging = false;
        if (captured && container.hasPointerCapture(pointerId)) container.releasePointerCapture(pointerId);
        container.style.cursor = "";
        lastInteraction = performance.now();
      };

      const tick = () => {
        if (visible) {
          if (!dragging) {
            if (Math.abs(velocity) > 0.01) {
              rotation += velocity;
              velocity *= 0.94; // inertia
            } else if (!reduceMotion && performance.now() - lastInteraction > 1800) {
              rotation += autoRotateSpeed;
            }
          }
          apply();
        }
        raf = requestAnimationFrame(tick);
      };

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      observer.observe(container);

      // Touch direction lock: once the gesture is mainly horizontal, block the native vertical pan
      // so spinning the ring never scrolls the page. Vertical gestures stay native (page scroll).
      let tStartX = 0;
      let tStartY = 0;
      let tLock: "x" | "y" | null = null;
      const onTouchStart = (e: TouchEvent) => {
        const p = e.touches[0];
        tStartX = p.clientX;
        tStartY = p.clientY;
        tLock = null;
      };
      const onTouchMove = (e: TouchEvent) => {
        const p = e.touches[0];
        if (!tLock) {
          const dx = Math.abs(p.clientX - tStartX);
          const dy = Math.abs(p.clientY - tStartY);
          if (dx < 4 && dy < 4) return;
          tLock = dx > dy ? "x" : "y";
        }
        if (tLock === "x" && e.cancelable) e.preventDefault();
      };

      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, { passive: false });
      container.addEventListener("wheel", onWheel, { passive: false });
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", endDrag);
      container.addEventListener("pointercancel", endDrag);
      apply();
      raf = requestAnimationFrame(tick);

      return () => {
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onTouchMove);
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerup", endDrag);
        container.removeEventListener("pointercancel", endDrag);
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
    }, [count, anglePerItem, ringRadius, autoRotateSpeed]);

    if (!count) return null;

    return (
      <div
        ref={setRefs}
        onClickCapture={(e) => {
          if (movedRef.current) {
            e.stopPropagation();
            e.preventDefault();
            movedRef.current = false;
          }
        }}
        role="region"
        aria-label={t.cards.ariaGallery}
        className={cn("relative w-full flex items-center justify-center cursor-grab select-none", className)}
        style={{ perspective: `${cardWidth * 8}px`, height: cardHeight + 60, touchAction: "pan-y", overscrollBehavior: "contain" }}
        {...props}
      >
        <div
          ref={ringRef}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {items.map((item, i) => (
            <div
              key={item.imgUrl}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              role="button"
              tabIndex={0}
              aria-label={`${t.cards.ariaGoTo} ${item.title || item.alt || i + 1}`}
              onClick={() => scrollToCard(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollToCard(item);
                }
              }}
              className="group absolute cursor-pointer select-none outline-none"
              style={{
                width: cardWidth,
                height: cardHeight,
                left: "50%",
                top: "50%",
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
                transform: `rotateY(${i * anglePerItem}deg) translateZ(${ringRadius}px)`,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-black shadow-2xl transition-colors duration-300 group-hover:border-[#5b8cff]/50 group-focus-visible:border-[#5b8cff]">
                <img
                  src={item.imgUrl}
                  alt={item.alt || item.title || `Section ${i + 1}`}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 pt-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-left pointer-events-none"
                  style={{ padding: `${cardWidth * 0.06}px`, paddingTop: 40 }}
                >
                  <h4
                    className="font-bold text-white leading-tight break-words text-balance"
                    style={{ fontSize: Math.max(10, cardWidth * 0.075) }}
                  >
                    {item.title || item.alt}
                  </h4>
                  {item.subtitle && (
                    <p
                      className="mt-1 font-medium text-[#5b8cff] leading-tight break-words text-balance"
                      style={{ fontSize: Math.max(9, cardWidth * 0.055) }}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };

interface SocialCardsProps {
  cards: CardItem[];
}

/** Hero gallery: keeps the previous `SocialCards` API, now backed by the circular 3D gallery. */
export default function SocialCards({ cards }: SocialCardsProps) {
  return (
    <section className="w-full relative z-20 py-2 lg:py-6">
      <CircularGallery items={cards} />
    </section>
  );
}
