import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import { ArabesqueDivider, FloatingField } from "./Ornaments.jsx";

const NO_TEXTS = [
  "NO 🙈",
  "Nope 🙈",
  "Too slow 😂",
  "Try again!",
  "Nice try 😜",
  "Can't catch me ❤️",
  "Are you sure? 🥺",
];

const YES_BUTTON_SIZE = { w: 160, h: 56 };
const NO_BUTTON_SIZE = { w: 140, h: 56 };
const PADDING = 12;

export default function PlayfulQuestion() {
  const zoneRef = useRef(null);
  const [noPos, setNoPos] = useState(null); // null = default centered position
  const [attempt, setAttempt] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const runAway = useCallback(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const rect = zone.getBoundingClientRect();
    const maxX = Math.max(rect.width - NO_BUTTON_SIZE.w - PADDING * 2, 0);
    const maxY = Math.max(rect.height - NO_BUTTON_SIZE.h - PADDING * 2, 0);

    const nextX = PADDING + Math.random() * maxX;
    const nextY = PADDING + Math.random() * maxY;

    setNoPos({ x: nextX, y: nextY });
    setAttempt((a) => Math.min(a + 1, NO_TEXTS.length - 1));
  }, []);

  function handleYes() {
    setAccepted(true);
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#C2555F", "#C9A24B", "#F1C9D3", "#5A1930"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#C9A24B", "#F1C9D3"],
      });
    }, 300);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wine to-wine-deep px-6 py-24 text-center text-cream">
      <FloatingField count={10} kind="hearts" colorClassName="text-rose/40" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 font-display text-3xl italic text-blush-soft sm:text-4xl"
      >
        Will you accept my birthday surprise? ❤️
      </motion.p>

      <ArabesqueDivider tone="blush" className="relative z-10 my-8" />

      <div
        ref={zoneRef}
        className="relative z-10 mx-auto h-72 w-full max-w-xl select-none touch-none sm:h-64"
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0"
            >
              {/* YES button — always centered, always usable */}
              <motion.button
                type="button"
                onClick={handleYes}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: YES_BUTTON_SIZE.w }}
                className="absolute left-1/2 top-1/2 z-20 -translate-x-[calc(50%+80px)] -translate-y-1/2 rounded-full bg-gradient-to-r from-rose to-gold px-6 py-3.5 font-body font-semibold tracking-wide text-wine-deep shadow-xl shadow-wine-deep/40"
              >
                YES ❤️
              </motion.button>

              {/* NO button — flees on hover/click/touch, always stays in-bounds */}
              <motion.button
                type="button"
                onMouseEnter={runAway}
                onTouchStart={(e) => {
                  e.preventDefault();
                  runAway();
                }}
                onClick={runAway}
                animate={
                  noPos
                    ? { left: noPos.x, top: noPos.y, x: 0, y: 0 }
                    : {}
                }
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={
                  noPos
                    ? { width: NO_BUTTON_SIZE.w, position: "absolute" }
                    : {
                        width: NO_BUTTON_SIZE.w,
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(calc(-50% + 80px), -50%)",
                      }
                }
                className="z-10 rounded-full border border-cream/30 bg-white/10 px-6 py-3.5 font-body font-medium tracking-wide text-cream/90 backdrop-blur-sm"
              >
                {NO_TEXTS[attempt]}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <Heart className="text-rose" size={40} fill="currentColor" />
              <p className="font-display text-3xl italic text-blush-soft sm:text-4xl">
                Yay! I knew it! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
