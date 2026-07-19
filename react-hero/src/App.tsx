import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Crown, Menu, X } from "lucide-react";

const NAV_LINKS = ["Shop", "Dungeons", "Advice", "Events"];

/** Splits text into characters that fade in one-by-one when scrolled into view. */
function StaggeredFade({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} aria-label={text}>
      {[...text].map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, y: 0, transition: { delay: i * 0.07 } },
          }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-[#010101]">
      {/* full-screen looping background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* crimson grade so the footage reads DungeonKing */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-red-950/20 to-black/70" />

      {/* navigation */}
      <nav className="relative z-20 flex items-center justify-between px-5 py-6 sm:px-8 md:justify-center md:gap-16">
        <a
          href="#"
          className="flex items-center gap-2 text-sm font-light uppercase tracking-[0.25em] text-white md:tracking-[0.3em]"
        >
          <Crown size={18} className="text-red-500" />
          DungeonKing
        </a>
        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-light uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
        <button
          className="text-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mobile-menu-glass fixed left-4 right-4 top-16 z-50 flex flex-col items-center gap-5 rounded-2xl py-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
                className="text-sm font-light uppercase tracking-[0.25em] text-white/90 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* hero content */}
      <main className="relative z-10 flex flex-col items-center pt-12 px-5 text-center sm:px-8 sm:pt-16 md:pt-24">
        <h1 className="font-garamond mb-6 text-4xl font-normal tracking-tight text-white sm:mb-8 sm:text-6xl md:text-8xl lg:text-9xl [line-height:1.08]">
          <StaggeredFade text="ENTER THE" />
          <br />
          <StaggeredFade text="KING'S DUNGEON" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mb-8 max-w-xs text-sm font-light leading-relaxed text-white/70 sm:mb-10 sm:max-w-md sm:text-base md:text-lg"
        >
          Dungeon-grade gear, private playspaces, custom builds —
          <br className="hidden sm:block" /> crafted for those born to rule.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="liquid-glass rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-white/90 sm:px-10 sm:py-4 sm:tracking-[0.2em]"
        >
          Enter the Dungeon
        </motion.button>
      </main>
    </div>
  );
}
