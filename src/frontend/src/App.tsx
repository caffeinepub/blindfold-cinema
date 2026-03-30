import { Toaster } from "@/components/ui/sonner";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Content } from "./backend.d";
import { ContentDetailModal } from "./components/ContentDetailModal";
import { ContentGrid } from "./components/ContentGrid";
import { CreatorBanner } from "./components/CreatorBanner";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { UploadModal } from "./components/UploadModal";
import { sampleContent } from "./data/sampleContent";
import type { SampleContent } from "./data/sampleContent";
import { useAllContent } from "./hooks/useQueries";

type ModalItem =
  | { type: "backend"; content: Content }
  | { type: "sample"; content: SampleContent }
  | null;

const CATEGORY_CHIPS = [
  { id: "all", label: "All" },
  { id: "movie", label: "Movies" },
  { id: "audiobook", label: "Audio Books" },
  { id: "story", label: "Stories" },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<ModalItem>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const libraryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: allContent, isLoading } = useAllContent();

  const filteredContent = (() => {
    if (!allContent) return undefined;
    let items = allContent;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }
    if (activeCategory !== "all") {
      items = items.filter((c) => c.category === activeCategory);
    }
    return items;
  })();

  const handleBrowseClick = () => {
    libraryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onUploadClick={() => setUploadOpen(true)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main>
        <HeroSection
          onBrowseClick={handleBrowseClick}
          onUploadClick={() => setUploadOpen(true)}
        />

        <section ref={libraryRef} className="max-w-[1200px] mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            <h2 className="font-display font-extrabold text-3xl text-foreground uppercase tracking-tight">
              Content Library
            </h2>

            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORY_CHIPS.map((chip) => (
                <button
                  type="button"
                  key={chip.id}
                  onClick={() => setActiveCategory(chip.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-display font-bold tracking-wide uppercase transition-all ${
                    activeCategory === chip.id
                      ? "text-primary-foreground glow-purple"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    background:
                      activeCategory === chip.id
                        ? "oklch(0.54 0.21 283)"
                        : "oklch(0.12 0.025 290)",
                    border:
                      activeCategory === chip.id
                        ? "1px solid oklch(0.54 0.21 283 / 0.5)"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                  data-ocid={`library.${chip.id}.tab`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </motion.div>

          <ContentGrid
            backendContent={filteredContent}
            sampleContent={sampleContent}
            isLoading={isLoading}
            activeCategory={activeCategory}
            onItemClick={(item) => setSelectedItem(item)}
          />
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-12">
          <CreatorBanner onUploadClick={() => setUploadOpen(true)} />
        </section>
      </main>

      <Footer />

      <ContentDetailModal
        data={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />

      <Toaster richColors theme="dark" />
    </div>
  );
}
