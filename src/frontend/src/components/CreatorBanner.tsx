import { Sparkles, Upload } from "lucide-react";
import { motion } from "motion/react";

interface CreatorBannerProps {
  onUploadClick: () => void;
}

export function CreatorBanner({ onUploadClick }: CreatorBannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden px-8 py-10 md:py-12"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.065 295) 0%, oklch(0.10 0.04 295) 50%, oklch(0.12 0.08 280) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.47 0.22 283 / 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-20 w-48 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.17 82 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-xs font-display font-bold tracking-widest uppercase text-gold">
            Creator Studio
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-3">
          Upload Your Content
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Join Blindfold Cinema as a creator. Share your stories, audiobooks,
          and films with the world.
        </p>
        <button
          type="button"
          onClick={onUploadClick}
          className="flex items-center gap-2 px-7 py-3 rounded-full font-display font-semibold text-sm tracking-wide text-primary-foreground transition-all hover:scale-105 glow-purple"
          style={{ background: "oklch(0.54 0.21 283)" }}
          data-ocid="creator.open_modal_button"
        >
          <Upload className="w-4 h-4" />
          Start Uploading
        </button>
      </div>
    </motion.section>
  );
}
