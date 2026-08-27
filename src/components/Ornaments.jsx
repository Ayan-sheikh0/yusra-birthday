import { motion } from "framer-motion";
import { useMemo } from "react";

// ----------------------------------------------------------------------------
// CrescentMoon — a slim, hand-drawn-feeling crescent used across the site.
// ----------------------------------------------------------------------------
export function CrescentMoon({ className = "", size = 40 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <path
        d="M62 12C41 12 24 29 24 50C24 71 41 88 62 88C68.5 88 74.6 86.4 80 83.5C68 80.5 59 69.5 59 56.5C59 43.5 68 32.5 80 29.5C74.6 26.6 68.5 25 62 25V12Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ----------------------------------------------------------------------------
// FourPointStar — the small elegant star used in Islamic geometric motifs.
// ----------------------------------------------------------------------------
export function FourPointStar({ className = "", size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path
        d="M12 0C12 6.5 13 11 12 12C11 13 6.5 12 0 12C6.5 12 11 13 12 14C13 15 12 19.5 12 24C12 19.5 11 15 12 14C13 13 17.5 12 24 12C17.5 12 13 11 12 10C11 9 12 3.5 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ----------------------------------------------------------------------------
// LatticeOverlay — an extremely subtle repeating geometric star lattice,
// inspired by Islamic architectural patterning, used as a quiet background
// texture. Never rendered above ~6% opacity so it stays a whisper, not a motif.
// ----------------------------------------------------------------------------
export function LatticeOverlay({ className = "" }) {
  const id = useMemo(() => `lattice-${Math.random().toString(36).slice(2, 9)}`, []);
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path
            d="M28 2 L54 28 L28 54 L2 28 Z M28 14 L42 28 L28 42 L14 28 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ----------------------------------------------------------------------------
// ArabesqueDivider — the site's signature framing element: a thin gold line
// with a crescent and flanking stars, used to open/close major sections.
// ----------------------------------------------------------------------------
export function ArabesqueDivider({ tone = "gold", className = "" }) {
  const color = tone === "gold" ? "text-gold" : "text-blush";
  return (
    <div className={`flex items-center justify-center gap-3 ${color} ${className}`}>
      <span className="h-px w-10 sm:w-16 bg-current/60" />
      <FourPointStar size={10} className="opacity-70" />
      <CrescentMoon size={18} />
      <FourPointStar size={10} className="opacity-70" />
      <span className="h-px w-10 sm:w-16 bg-current/60" />
    </div>
  );
}

// ----------------------------------------------------------------------------
// FloatingField — ambient floating hearts / sparkles / stars. Kept lightweight
// (CSS + transform only) so it never becomes performance-heavy.
// ----------------------------------------------------------------------------
const GLYPHS = {
  hearts: ["❤", "♡"],
  sparkles: ["✦", "✧", "✨"],
  stars: ["★", "✦"],
  mixed: ["❤", "✦", "✧", "♡"],
};

export function FloatingField({
  count = 14,
  kind = "mixed",
  className = "",
  colorClassName = "text-blush/70",
}) {
  const items = useMemo(() => {
    const glyphs = GLYPHS[kind] || GLYPHS.mixed;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 16,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      drift: Math.random() * 40 - 20,
    }));
  }, [count, kind]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          className={`absolute select-none ${colorClassName}`}
          style={{
            left: `${item.left}%`,
            bottom: "-5%",
            fontSize: item.size,
          }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{
            y: ["0%", "-120vh"],
            x: [0, item.drift],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.glyph}
        </motion.span>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------------
// StarrySky — small twinkling star dots for night-themed sections.
// ----------------------------------------------------------------------------
export function StarrySky({ count = 60, className = "" }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-gold-soft"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
