import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

import { birthdayConfig } from "../config/birthdayConfig.js";

import {
  CrescentMoon,
  FloatingField,
  StarrySky,
  ArabesqueDivider,
} from "./Ornaments.jsx";

const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const DAYS = Array.from(
  { length: 31 },
  (_, i) => String(i + 1).padStart(2, "0")
);

const CURRENT_YEAR = new Date().getFullYear();

const YEARS = Array.from(
  { length: 60 },
  (_, i) => String(CURRENT_YEAR - i)
);

export default function BirthdayGate({ onUnlock }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [shake, setShake] = useState(false);

  const composedValue = useMemo(() => {
    if (!day || !month || !year) {
      return null;
    }

    return `${year}-${month}-${day}`;
  }, [day, month, year]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!composedValue) {
      setError(true);
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);

      return;
    }

    if (composedValue === birthdayConfig.birthdayDate) {
      setError(false);
      setUnlocking(true);

      // Music is started by App.jsx.
      // This component only unlocks the website.

      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      setError(true);
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  }

  const selectClass =
    "w-full appearance-none rounded-xl border border-gold/30 bg-white/10 px-3 py-3 text-center font-body text-sm text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/40 sm:text-base [&>option]:text-wine-deep";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-navy-deep via-navy to-wine-deep text-cream">
      <StarrySky count={70} />

      <FloatingField
        count={10}
        kind="sparkles"
        colorClassName="text-gold-soft/60"
      />

      <AnimatePresence mode="wait">
        {!unlocking ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-4 w-full max-w-md rounded-3xl border border-gold/20 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold-soft"
            >
              <CrescentMoon size={30} />
            </motion.div>

            <p className="font-display text-2xl italic text-blush-soft sm:text-3xl">
              Before your surprise begins...
            </p>

            <p className="mt-1 text-sm tracking-widest text-gold-soft/80">
              ✨
            </p>

            <ArabesqueDivider tone="gold" className="my-6" />

            <p className="mb-5 font-body text-base text-cream/90 sm:text-lg">
              Enter your birthday{" "}
              <span className="text-rose">❤</span>
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={
                  shake
                    ? {
                        x: [0, -8, 8, -6, 6, 0],
                      }
                    : {
                        x: 0,
                      }
                }
                transition={{ duration: 0.45 }}
                className="grid w-full grid-cols-3 gap-2"
              >
                {/* DAY */}
                <select
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                    setError(false);
                  }}
                  aria-label="Day"
                  className={selectClass}
                >
                  <option value="" disabled>
                    Day
                  </option>

                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                {/* MONTH */}
                <select
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setError(false);
                  }}
                  aria-label="Month"
                  className={selectClass}
                >
                  <option value="" disabled>
                    Month
                  </option>

                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>

                {/* YEAR */}
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setError(false);
                  }}
                  aria-label="Year"
                  className={selectClass}
                >
                  <option value="" disabled>
                    Year
                  </option>

                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </motion.div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose to-wine px-6 py-3 font-body font-medium tracking-wide text-cream shadow-lg shadow-wine/30 transition-transform active:scale-95 hover:brightness-110"
              >
                <Lock
                  size={18}
                  className="transition-transform group-hover:rotate-[-8deg]"
                />

                Unlock My Surprise 🔐
              </button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-sm text-blush-soft"
                >
                  Hmm... that's not the secret date 🙈 Try again!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="unlocking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center gap-4 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
              }}
              className="text-gold-soft"
            >
              <Sparkles size={44} />
            </motion.div>

            <p className="font-display text-3xl italic text-blush-soft sm:text-4xl">
              It's you ❤️
            </p>

            <FloatingField
              count={20}
              kind="mixed"
              colorClassName="text-rose/80"
              className="!fixed"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}