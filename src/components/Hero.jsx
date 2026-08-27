import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { CrescentMoon, FloatingField, LatticeOverlay, ArabesqueDivider } from "./Ornaments.jsx";

export default function Hero({ onOpenSurprise }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-wine-deep via-wine to-navy px-6 py-24 text-center text-cream">
      <LatticeOverlay className="text-gold opacity-[0.05]" />
      <FloatingField count={16} kind="mixed" colorClassName="text-blush/60" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mb-6 text-gold-soft"
      >
        <CrescentMoon size={46} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="relative z-10 font-display text-4xl italic leading-tight text-cream drop-shadow-sm sm:text-6xl md:text-7xl"
      >
        Happy Birthday,
        <br />
        <span className="text-blush-soft">{birthdayConfig.herFirstName}</span> ❤️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-10 mt-5 max-w-md font-body text-base tracking-wide text-cream/80 sm:text-lg"
      >
        Today is your special day...
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <ArabesqueDivider tone="blush" className="relative z-10 my-8" />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        onClick={onOpenSurprise}
        className="relative z-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-gold px-8 py-3.5 font-body text-base font-medium tracking-wide text-wine-deep shadow-xl shadow-wine-deep/40 transition-transform hover:scale-105 active:scale-95"
      >
        <Mail size={18} />
        Open Your Surprise 💌
      </motion.button>
    </section>
  );
}
