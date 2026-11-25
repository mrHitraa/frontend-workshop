import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
const nav = [
  { to: "/dashboard", l: "Home" }, { to: "/pay", l: "Pay" }, { to: "/receipts", l: "Receipts" },
  { to: "/offices", l: "Offices" }, { to: "/notifications", l: "Alerts" },
] as const;
export function Shell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-xl font-bold text-primary">Gov<span className="text-accent-strong">Connect</span></Link>
          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>{n.l}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        {title && <h1 className="mb-5 font-display text-2xl font-bold">{title}</h1>}
        {children}
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-card md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="py-3 text-center text-xs text-muted-foreground" activeProps={{ className: "text-primary font-semibold" }}>{n.l}</Link>
        ))}
      </nav>
    </div>
  );
}
export const card = "rounded-2xl border border-border bg-card p-5 shadow-soft";
export const btn = "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40";
export const btnGhost = "inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary";
export const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";
