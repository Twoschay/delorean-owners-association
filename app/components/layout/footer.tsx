import Link from "next/link";

const FOOTER_LINKS = {
  Organization: [
    { href: "/about", label: "About DOA" },
    { href: "/join", label: "Join Us" },
    { href: "/magazine", label: "Magazine" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  Chapters: [
    { href: "/about#chapters", label: "Northeast" },
    { href: "/about#chapters", label: "Southeast" },
    { href: "/about#chapters", label: "Midwest" },
    { href: "/about#chapters", label: "Southwest" },
    { href: "/about#chapters", label: "Pacific" },
    { href: "/about#chapters", label: "UK / Ireland" },
    { href: "/about#chapters", label: "Europe" },
    { href: "/about#chapters", label: "Australia" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/contact", label: "Corrections" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-obsidian">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-amber/10 border border-amber/30 flex items-center justify-center">
                <span className="font-display text-amber text-lg leading-none">DMC</span>
              </div>
              <div>
                <div className="font-display text-sm text-amber leading-none tracking-widest">
                  DELOREAN
                </div>
                <div className="font-display text-xs text-steel leading-none tracking-widest">
                  OWNERS ASSOCIATION
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The world&apos;s premier DeLorean community since 1983. Connecting owners, preserving history, and celebrating the most iconic automobile ever made.
            </p>
            {/* Social placeholders */}
            <div className="flex gap-2">
              {["FB", "X", "IG", "YT"].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 rounded bg-white/5 border border-border flex items-center justify-center text-muted-foreground text-xs font-mono hover:border-amber/30 hover:text-amber cursor-pointer transition-colors"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display text-sm text-steel tracking-widest mb-4 uppercase">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-steel transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 1983–2026 DeLorean Owners Association. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ by the DOA community. Not affiliated with DeLorean Motor Company.
          </p>
        </div>
      </div>
    </footer>
  );
}
