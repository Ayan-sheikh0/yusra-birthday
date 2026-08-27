import { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig.js";
import { ArabesqueDivider, FourPointStar } from "./Ornaments.jsx";

function PhotoCard({ photo, index }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white/40 shadow-lg shadow-wine/10"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-blush-soft via-cream-deep to-blush">
        {!failed ? (
          // ADD YOUR PHOTO HERE — this <img> will show automatically once
          // you place a real file at public/images/photoN.jpg
          <img
            src={photo.src}
            alt={photo.caption}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-wine/40">
            <ImagePlus size={32} strokeWidth={1.25} />
            <span className="px-4 text-center font-body text-xs tracking-wide">
              Add photo{index + 1}.jpg
            </span>
            <span className="font-body text-[10px] text-wine/25">
              public/images/photo{index + 1}.jpg
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 font-display text-sm italic text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

export default function PhotoGallery() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 text-center">
      <FourPointStar size={20} className="absolute left-8 top-10 text-gold/30" />
      <FourPointStar size={20} className="absolute bottom-10 right-8 text-gold/30" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="font-display text-3xl italic text-wine sm:text-4xl"
      >
        Photo Memories
      </motion.p>
      <ArabesqueDivider tone="gold" className="my-6" />

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {birthdayConfig.photos.map((photo, index) => (
          <PhotoCard photo={photo} index={index} key={photo.src} />
        ))}
      </div>
    </section>
  );
}
