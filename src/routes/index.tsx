import { createFileRoute, Link } from "@tanstack/react-router";
import { btn, btnGhost } from "@/components/Shell";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GovConnect — One dashboard for every bill" },
    { name: "description", content: "Pay ZESA, ZINARA, ZIMRA, council, school and insurance bills in one place with instant digital receipts." },
    { property: "og:title", content: "GovConnect — One dashboard for every bill" },
    { property: "og:description", content: "Find, check and pay government and utility bills with digital receipts and reminders." },
  ] }),
  component: Landing,
});
function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-5xl px-5 pb-20 pt-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold">Gov<span className="text-accent">Connect</span></span>
            <Link to="/login" className="text-sm font-semibold underline-offset-4 hover:underline">Log in</Link>
          </div>
          <h1 className="mt-16 max-w-2xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            Every bill. <span className="text-accent">One place.</span> No queues.
          </h1>
          <p className="mt-5 max-w-xl text-lg opacity-90">Electricity, water, vehicle licences, tax, school fees and insurance — check what you owe and pay in seconds with EcoCash, OneMoney, ZIPIT or card.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">Get started</Link>
            <Link to="/verify" className="inline-flex items-center rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold">Verify a receipt</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto -mt-10 grid max-w-5xl gap-4 px-5 md:grid-cols-3">
        {[["See your bills", "Bills linked to your verified identity, all on one dashboard."],["Pay for others safely", "Pay a family member's bill — you see only the amount and a masked name."],["Proof you can trust", "Every payment gets a receipt with a QR code anyone can verify."]].map(([t,d]) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-5xl px-5 py-16 text-center">
        <p className="text-sm text-muted-foreground">Full fee breakdown shown before every payment. No hidden charges.</p>
        <div className="mt-6 flex justify-center gap-3"><Link to="/pay" className={btn}>Pay a bill</Link><Link to="/offices" className={btnGhost}>Find an office</Link></div>
      </section>
    </div>
  );
}
