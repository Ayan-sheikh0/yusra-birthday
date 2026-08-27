import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { ArabesqueDivider, FourPointStar } from "./Ornaments.jsx";

export default function MessageSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-blush-soft px-6 py-24 text-center">
      <div className="mx-auto max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl italic text-wine sm:text-4xl"
        >
          A Little Something For You 💌
        </motion.p>

        <ArabesqueDivider tone="gold" className="my-6" />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl border border-gold/20 bg-white/40 p-8 text-left shadow-xl shadow-wine/5 backdrop-blur-lg sm:p-12"
        >
          <FourPointStar
            size={16}
            className="absolute left-5 top-5 text-gold/50"
          />
          <FourPointStar
            size={16}
            className="absolute bottom-5 right-5 text-gold/50"
          />

          {/*
            EDIT YOUR PERSONAL MESSAGE:
            src/config/birthdayConfig.js -> birthdayMessage
          */}
          <p className="whitespace-pre-line font-display text-lg italic leading-relaxed text-wine sm:text-xl">
            {birthdayConfig.birthdayMessage}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
