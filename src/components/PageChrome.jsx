import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { pages, getPageIndex } from "../config/pages.js";

function BottomPager() {
  const location = useLocation();
  const navigate = useNavigate();
  const index = getPageIndex(location.pathname);
  const next = pages[index + 1];

  if (!next) return null;

  return (
    <div className="flex items-center justify-end border-t border-gold/15 bg-wine-deep px-4 py-4 sm:px-6">
      <button
        type="button"
        onClick={() => navigate(next.path)}
        className="flex items-center gap-1 rounded-full bg-gradient-to-r from-rose to-gold px-5 py-2.5 font-body text-sm font-medium text-wine-deep shadow-lg shadow-wine-deep/30 transition-transform hover:scale-105 active:scale-95"
      >
        {next.label}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// Wraps every page with the bottom Next pager, and a fade/slide
// transition when the route changes. No top nav bar — Next-only flow.
export default function PageChrome({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomPager />
    </div>
  );
}
