import { BookOpen, Clock, Film, Mic, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Content } from "../backend.d";
import type { SampleContent } from "../data/sampleContent";

type CardData =
  | { type: "backend"; content: Content }
  | { type: "sample"; content: SampleContent };

interface ContentCardProps {
  data: CardData;
  index: number;
  onClick: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  audiobook: "AUDIOBOOK",
  story: "STORY",
  movie: "MOVIE",
};

const GRADIENT_CLASSES = [
  "gradient-poster-1",
  "gradient-poster-2",
  "gradient-poster-3",
  "gradient-poster-4",
  "gradient-poster-5",
  "gradient-poster-6",
];

function CategoryIcon({ category }: { category: string }) {
  if (category === "audiobook")
    return <BookOpen className="w-8 h-8 text-foreground/30" />;
  if (category === "story")
    return <Mic className="w-8 h-8 text-foreground/30" />;
  return <Film className="w-8 h-8 text-foreground/30" />;
}

export function ContentCard({ data, index, onClick }: ContentCardProps) {
  const isBackend = data.type === "backend";
  const title = isBackend ? data.content.title : data.content.title;
  const category = isBackend ? data.content.category : data.content.category;
  const duration = isBackend ? data.content.duration : data.content.duration;
  const rating = isBackend ? data.content.rating : data.content.rating;
  const gradientClass = isBackend
    ? GRADIENT_CLASSES[index % GRADIENT_CLASSES.length]
    : data.content.gradientClass;
  const hasThumbnail = isBackend && data.content.thumbnailKey;
  const thumbnailUrl = hasThumbnail
    ? data.content.thumbnailKey!.getDirectURL()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative cursor-pointer rounded-[14px] overflow-hidden border border-subtle card-hover"
      style={{ borderColor: "rgba(255,255,255,0.08)", aspectRatio: "2/3" }}
      onClick={onClick}
      data-ocid={`content.item.${index + 1}`}
    >
      {/* Poster area */}
      <div className={`absolute inset-0 ${!thumbnailUrl ? gradientClass : ""}`}>
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {!thumbnailUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CategoryIcon category={category} />
          </div>
        )}
      </div>

      {/* Gradient overlay (bottom) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.08 0.008 280) 0%, oklch(0.08 0.008 280 / 0.6) 40%, transparent 70%)",
        }}
      />

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.54 0.21 283 / 0.9)",
            boxShadow: "0 0 24px oklch(0.47 0.22 283 / 0.5)",
          }}
        >
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-display font-bold text-foreground text-sm uppercase leading-tight tracking-wide line-clamp-2 mb-2">
          {title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-medium tracking-widest">
            {CATEGORY_LABELS[category] ?? category.toUpperCase()}
          </span>
          <div className="flex items-center gap-1">
            <Star
              className="w-3 h-3 fill-current"
              style={{ color: "oklch(0.82 0.17 82)" }}
            />
            <span
              className="text-[11px] font-medium"
              style={{ color: "oklch(0.82 0.17 82)" }}
            >
              {typeof rating === "number" ? rating.toFixed(1) : rating}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{duration}</span>
        </div>
      </div>
    </motion.div>
  );
}
