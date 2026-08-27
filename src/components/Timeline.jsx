import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { ArabesqueDivider, CrescentMoon } from "./Ornaments.jsx";

export default function Timeline() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-soft to-cream px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl italic text-wine sm:text-4xl"
        >
          Our Little Timeline
        </motion.p>
        <ArabesqueDivider tone="gold" className="my-6" />
      </div>

      <div className="relative mx-auto mt-6 max-w-xl">
        {/* connecting line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-rose/40 to-gold/60 sm:left-1/2 sm:-translate-x-1/2" />

        <ol className="space-y-10">
          {birthdayConfig.timeline.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-12 sm:pl-0"
            >
              <div className="flex flex-col items-start sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
                <div className={`hidden sm:block ${index % 2 === 0 ? "text-right" : ""}`}>
                  {index % 2 === 0 && <TimelineCard item={item} />}
                </div>

                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-cream text-gold shadow-md sm:static">
                  <CrescentMoon size={14} />
                </span>

                <div className="sm:hidden">
                  <TimelineCard item={item} />
                </div>

                <div className={`hidden sm:block ${index % 2 !== 0 ? "" : ""}`}>
                  {index % 2 !== 0 && <TimelineCard item={item} />}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineCard({ item }) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-white/50 p-5 text-left shadow-md shadow-wine/5 backdrop-blur-sm">
      <p className="font-display text-lg italic text-wine sm:text-xl">{item.title}</p>
      <p className="mt-0.5 font-body text-xs uppercase tracking-widest text-rose/70">
        {item.date}
      </p>
      <p className="mt-2 font-body text-sm text-wine/70">{item.description}</p>
    </div>
  );
}
