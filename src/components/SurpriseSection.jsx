import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Sparkles } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { ArabesqueDivider, FloatingField, StarrySky } from "./Ornaments.jsx";

export default function SurpriseSection() {
  const [opened, setOpened] = useState(false);

  function handleOpen() {
    setOpened(true);
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.55 },
      colors: ["#C9A24B", "#F1C9D3", "#C2555F", "#FBF3EA"],
    });
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-wine-deep px-6 py-24 text-center text-cream">
      <StarrySky count={50} />
      {opened && <FloatingField count={22} kind="mixed" colorClassName="text-blush/70" />}

      <div className="relative z-10 mx-auto max-w-xl">
        <p className="font-display text-3xl italic text-blush-soft sm:text-4xl">
          One Last Surprise 🎁
        </p>
        <ArabesqueDivider tone="gold" className="my-8" />

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="closed"
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-40 w-40 items-center justify-center rounded-3xl border border-gold/30 bg-gradient-to-br from-wine to-rose shadow-2xl shadow-wine-deep/50"
              >
                <Gift size={64} strokeWidth={1.25} className="text-gold-soft" />
              </motion.div>

              <button
                type="button"
                onClick={handleOpen}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-rose px-8 py-3.5 font-body font-medium tracking-wide text-wine-deep shadow-xl shadow-wine-deep/40 transition-transform hover:scale-105 active:scale-95"
              >
                <Sparkles size={18} />
                Open It ✨
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0.6, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 10 }}
                className="text-gold-soft"
              >
                <Sparkles size={44} />
              </motion.div>

              {/* Edit this wording in src/config/birthdayConfig.js */}
              <p className="font-display text-3xl italic text-blush-soft sm:text-4xl">
                {birthdayConfig.surpriseTitle}
              </p>
              <p className="max-w-md font-body text-base leading-relaxed text-cream/85 sm:text-lg">
                {birthdayConfig.surpriseMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
