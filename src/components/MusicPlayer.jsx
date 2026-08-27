import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";

export default function MusicPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef?.current;

    if (!audio) return;

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  });

  async function toggle() {
    const audio = audioRef?.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Music could not start:", error);
      }
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 1,
        duration: 0.6,
      }}
      whileTap={{
        scale: 0.9,
      }}
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Pause music" : "Play music"}
      className="fixed top-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-wine/90 text-gold-soft shadow-lg shadow-wine-deep/40 backdrop-blur-md sm:h-14 sm:w-14"
    >
      {playing ? (
        <Pause size={18} />
      ) : (
        <Play size={18} className="ml-0.5" />
      )}
    </motion.button>
  );
}