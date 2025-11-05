import { useState } from "react";
import "./KawaHeader.css";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "MODELS", href: "#" },
  { label: "RACING", href: "#" },  // shown as active in the screenshot
  { label: "SERVICE", href: "#" },
];

export default function KawaHeader() {
  const [query, setQuery] = useState("Kawasaki Ninja H2 R");
  const [mobileOpen, setMobileOpen] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up to your real search
    alert(`Search: ${query}`);
  };

  return (
    <header className="kawa-header" aria-label="Global navigation">
      <div className="kawa-inner">
        {/* Brand */}
        <a className="kawa-brand" href="#" aria-label="Kawasaki Home">
          {/* Simple logo mark (no dependency) */}
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="currentColor" />
            <path d="M6.5 16.5L11 12L6.5 7.5h3L14 11V7.5h3V16.5h-3V13l-4.5 3.5h-3Z" fill="#0b0b0b"/>
          </svg>
          <span>Kawasaki</span>
        </a>

        {/* Desktop nav */}
        <nav className="kawa-nav" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`kawa-link ${n.label === "RACING" ? "is-active" : ""}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Search */}
        <form className="kawa-search" role="search" onSubmit={onSearch}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search"
          />
          <button type="submit" aria-label="Search">
            {/* magnifier */}
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21 21l-4.2-4.2m1.2-5A7 7 0 1 1 5 5a7 7 0 0 1 13.2 6.8Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        {/* Burger */}
        <button
          className="kawa-burger"
          aria-label="Open menu"
          onClick={() => setMobileOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`kawa-drawer ${mobileOpen ? "open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.label} href={n.href} className="kawa-drawer-link">
            {n.label}
          </a>
        ))}
      </div>
    </header>
  );
}
