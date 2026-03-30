import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Menu, Search, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onUploadClick: () => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "Browse" },
  { id: "movie", label: "Movies" },
  { id: "audiobook", label: "Audiobooks" },
  { id: "story", label: "Stories" },
];

export function Navbar({
  searchQuery,
  onSearchChange,
  onUploadClick,
  activeCategory,
  onCategoryChange,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-subtle bg-background/95 backdrop-blur-md"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-6">
        <div
          className="flex items-center gap-2.5 shrink-0"
          data-ocid="nav.link"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.77 0.16 76 / 0.15)",
              border: "1.5px solid oklch(0.77 0.16 76 / 0.5)",
            }}
          >
            <Eye className="w-4 h-4 text-gold" />
          </div>
          <span className="font-display font-bold text-sm tracking-widest uppercase">
            <span className="text-gold">BLINDFOLD</span>
            <span className="text-foreground"> CINEMA</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-2">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "text-foreground bg-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`nav.${cat.id}.tab`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 max-w-xs ml-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles..."
            className="pl-9 rounded-full h-9 bg-muted/40 border-subtle text-sm"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            data-ocid="nav.search_input"
          />
        </div>

        <Button
          onClick={onUploadClick}
          className="hidden md:flex rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 text-sm font-medium glow-purple"
          data-ocid="nav.upload_button"
        >
          <Upload className="w-3.5 h-3.5 mr-1.5" />
          Upload
        </Button>

        <button
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t overflow-hidden"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "text-foreground bg-primary/20"
                      : "text-muted-foreground"
                  }`}
                  data-ocid={`nav.mobile.${cat.id}.tab`}
                >
                  {cat.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  onUploadClick();
                  setMobileOpen(false);
                }}
                className="rounded-full bg-primary text-primary-foreground mt-2"
                data-ocid="nav.mobile.upload_button"
              >
                <Upload className="w-4 h-4 mr-2" /> Upload
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
