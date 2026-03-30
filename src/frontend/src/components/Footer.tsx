import { Eye, Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "blindfold-cinema";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="w-full mt-16"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.10 0.04 295) 0%, oklch(0.08 0.02 290) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
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
            <p className="text-xs text-muted-foreground/70 tracking-wide">
              by Archit Tola
            </p>
            <p className="text-xs text-muted-foreground/50 mt-3 leading-relaxed max-w-[200px]">
              Premium immersive audio books, stories, and films.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Browse
            </h4>
            <ul className="space-y-2">
              {["Movies", "Audio Books", "Stories"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
                    data-ocid="footer.link"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {["About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
                    data-ocid="footer.link"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Follow
            </h4>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  data-ocid="footer.link"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/50"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p>© {year} Blindfold Cinema. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-muted-foreground/40">Created by Archit Tola</p>
        </div>
      </div>
    </footer>
  );
}
