import { BookOpen, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onBrowseClick: () => void;
  onUploadClick: () => void;
}

export function HeroSection({
  onBrowseClick,
  onUploadClick,
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-cinema-bg.dim_1920x900.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.08 0.008 280 / 0.7) 0%, oklch(0.08 0.008 280 / 0.85) 60%, oklch(0.08 0.008 280) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.47 0.22 283 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-display font-bold tracking-[0.3em] uppercase text-gold mb-4"
        >
          Immersive Stories. No Screen Required.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-none mb-6"
        >
          <span className="text-foreground">BLINDFOLD </span>
          <span className="text-gold">CINEMA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          Your gateway to audio books, stories, and films that transport you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            type="button"
            onClick={onBrowseClick}
            className="flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm tracking-wide text-primary-foreground glow-purple transition-all hover:scale-105"
            style={{
              background: "oklch(0.54 0.21 283)",
              boxShadow: "0 0 32px oklch(0.47 0.22 283 / 0.4)",
            }}
            data-ocid="hero.primary_button"
          >
            <BookOpen className="w-4 h-4" />
            Browse Library
          </button>
          <button
            type="button"
            onClick={onUploadClick}
            className="flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm tracking-wide transition-all hover:scale-105"
            style={{
              background: "oklch(0.82 0.17 82)",
              color: "oklch(0.08 0.008 280)",
              boxShadow: "0 0 24px oklch(0.82 0.17 82 / 0.3)",
            }}
            data-ocid="hero.secondary_button"
          >
            <PlayCircle className="w-4 h-4" />
            Start Creating
          </button>
        </motion.div>
      </div>
    </section>
  );
}
