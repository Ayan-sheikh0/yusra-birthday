import { useRef, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import BirthdayGate from "./components/BirthdayGate.jsx";
import PageChrome from "./components/PageChrome.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

import HomePage from "./pages/HomePage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import TimelinePage from "./pages/TimelinePage.jsx";
import QuestionPage from "./pages/QuestionPage.jsx";
import SurprisePage from "./pages/SurprisePage.jsx";

import { birthdayConfig } from "./config/birthdayConfig.js";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef(null);

  const handleUnlock = async () => {
    const audio = audioRef.current;

    if (audio) {
      try {
        audio.volume = 0.7;
        audio.currentTime = 0;

        await audio.play();

        console.log("🎵 Birthday music started");
      } catch (error) {
        console.log("Music could not start:", error);
      }
    }

    setUnlocked(true);
  };

  return (
    <>
      {/* GLOBAL AUDIO
          This remains mounted after BirthdayGate disappears */}
      <audio
        ref={audioRef}
        src={birthdayConfig.music}
        loop
        preload="auto"
      />

      {!unlocked ? (
        <div className="min-h-screen w-full overflow-x-hidden bg-cream">
          <BirthdayGate onUnlock={handleUnlock} />
        </div>
      ) : (
        <HashRouter>
          <div className="min-h-screen w-full overflow-x-hidden bg-cream">
            <PageChrome>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/message" element={<MessagePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/question" element={<QuestionPage />} />
                <Route path="/surprise" element={<SurprisePage />} />
              </Routes>
            </PageChrome>

            {/* Music controls */}
            <MusicPlayer audioRef={audioRef} />
          </div>
        </HashRouter>
      )}
    </>
  );
}