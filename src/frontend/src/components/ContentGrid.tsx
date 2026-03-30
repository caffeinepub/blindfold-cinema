import { Skeleton } from "@/components/ui/skeleton";
import type { Content } from "../backend.d";
import type { SampleContent } from "../data/sampleContent";
import { ContentCard } from "./ContentCard";

type ModalItem =
  | { type: "backend"; content: Content }
  | { type: "sample"; content: SampleContent };

interface ContentGridProps {
  backendContent: Content[] | undefined;
  sampleContent: SampleContent[];
  isLoading: boolean;
  activeCategory: string;
  onItemClick: (item: ModalItem) => void;
}

const SKELETON_KEYS = Array.from({ length: 10 }, (_, i) => `skeleton-${i}`);

export function ContentGrid({
  backendContent,
  sampleContent,
  isLoading,
  activeCategory,
  onItemClick,
}: ContentGridProps) {
  const hasBackendData = backendContent && backendContent.length > 0;

  const filteredSample =
    activeCategory === "all"
      ? sampleContent
      : sampleContent.filter((s) => s.category === activeCategory);

  const filteredBackend = backendContent
    ? activeCategory === "all"
      ? backendContent
      : backendContent.filter((c) => c.category === activeCategory)
    : [];

  const displayItems: ModalItem[] = hasBackendData
    ? filteredBackend.map((c) => ({ type: "backend" as const, content: c }))
    : filteredSample.map((s) => ({ type: "sample" as const, content: s }));

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="rounded-[14px] overflow-hidden"
            style={{ aspectRatio: "2/3" }}
            data-ocid="content.loading_state"
          >
            <Skeleton
              className="w-full h-full"
              style={{ background: "oklch(0.12 0.025 290)" }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 rounded-2xl border border-subtle"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
        data-ocid="content.empty_state"
      >
        <p className="text-muted-foreground text-lg font-display">
          No content found
        </p>
        <p className="text-muted-foreground/60 text-sm mt-1">
          Try a different category or search term
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {displayItems.map((item, i) => (
        <ContentCard
          key={
            item.type === "backend" ? String(item.content.id) : item.content.id
          }
          data={item}
          index={i}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}
