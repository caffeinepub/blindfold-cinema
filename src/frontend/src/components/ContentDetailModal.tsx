import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BookOpen, Clock, Film, Mic, Star, X } from "lucide-react";
import type { Content } from "../backend.d";
import type { SampleContent } from "../data/sampleContent";

type ModalContent =
  | { type: "backend"; content: Content }
  | { type: "sample"; content: SampleContent }
  | null;

interface ContentDetailModalProps {
  data: ModalContent;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  audiobook: "Audiobook",
  story: "Story",
  movie: "Movie",
};

const GRADIENT_CLASSES = [
  "gradient-poster-1",
  "gradient-poster-2",
  "gradient-poster-3",
  "gradient-poster-4",
  "gradient-poster-5",
  "gradient-poster-6",
];

export function ContentDetailModal({ data, onClose }: ContentDetailModalProps) {
  if (!data) return null;

  const isBackend = data.type === "backend";
  const title = data.content.title;
  const category = data.content.category;
  const duration = data.content.duration;
  const rating = data.content.rating;
  const description = data.content.description;

  const mediaUrl = isBackend ? data.content.fileKey?.getDirectURL() : null;
  const thumbnailUrl =
    isBackend && data.content.thumbnailKey
      ? data.content.thumbnailKey.getDirectURL()
      : null;
  const gradientClass = !thumbnailUrl
    ? isBackend
      ? GRADIENT_CLASSES[Number(data.content.id) % GRADIENT_CLASSES.length]
      : (data.content as SampleContent).gradientClass
    : "";

  const isVideo = isBackend && category === "movie";
  const isAudio =
    isBackend && (category === "audiobook" || category === "story");

  return (
    <Dialog open={!!data} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden border-subtle"
        style={{
          background: "oklch(0.10 0.04 295)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        data-ocid="content.modal"
      >
        <div className={`relative w-full h-52 ${gradientClass}`}>
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.10 0.04 295) 0%, transparent 60%)",
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
            style={{ background: "rgba(0,0,0,0.5)" }}
            data-ocid="content.close_button"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4">
            <span
              className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase"
              style={{
                background: "oklch(0.54 0.21 283 / 0.8)",
                color: "white",
              }}
            >
              {CATEGORY_LABELS[category] ?? category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-display font-extrabold text-2xl uppercase text-foreground tracking-wide mb-2">
            {title}
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star
                className="w-4 h-4 fill-current"
                style={{ color: "oklch(0.82 0.17 82)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.82 0.17 82)" }}
              >
                {typeof rating === "number" ? rating.toFixed(1) : rating}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{duration}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {description}
          </p>

          {isVideo && mediaUrl && (
            <div className="rounded-xl overflow-hidden mb-4">
              {/* biome-ignore lint/a11y/useMediaCaption: user-uploaded content, captions not available */}
              <video
                src={mediaUrl}
                controls
                className="w-full rounded-xl"
                style={{ background: "black" }}
                data-ocid="content.editor"
              />
            </div>
          )}

          {isAudio && mediaUrl && (
            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: "oklch(0.08 0.008 280)" }}
              data-ocid="content.editor"
            >
              {/* biome-ignore lint/a11y/useMediaCaption: user-uploaded content, captions not available */}
              <audio src={mediaUrl} controls className="w-full" />
            </div>
          )}

          {!isBackend && (
            <div
              className="rounded-xl p-4 mb-4 flex items-center justify-center gap-3 text-muted-foreground text-sm"
              style={{
                background: "oklch(0.08 0.008 280)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {category === "movie" ? (
                <Film className="w-5 h-5" />
              ) : category === "audiobook" ? (
                <BookOpen className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
              <span>
                Sample content — upload real media to enable playback.
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
