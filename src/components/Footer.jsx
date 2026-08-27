import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { CrescentMoon, StarrySky, ArabesqueDivider } from "./Ornaments.jsx";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-wine-deep via-navy to-navy-deep px-6 py-28 text-center text-cream">
      <StarrySky count={90} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-lg"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 text-gold-soft"
        >
          <CrescentMoon size={40} />
        </motion.div>

        <p className="font-display text-3xl italic text-blush-soft sm:text-4xl">
          Happy Birthday, {birthdayConfig.herFirstName} ❤️
        </p>
        <p className="mt-3 font-body text-base text-cream/75 sm:text-lg">
          Here's to another beautiful year.
        </p>

        <ArabesqueDivider tone="gold" className="my-8" />

        <p className="font-display text-lg italic text-cream/60">
          With lots of love...
        </p>
      </motion.div>
    </footer>
  );
}
