import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, card, input } from "@/components/Shell";
import { categories, services, myBills, svc, fmt, totalsByCurrency } from "@/lib/data";
export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — GovConnect" }, { name: "description", content: "Your bills, services and reminders." }, { property: "og:title", content: "Dashboard — GovConnect" }, { property: "og:description", content: "Your bills, services and reminders." }] }),
  component: Dashboard,
});
function Dashboard() {
  const [q, setQ] = useState("");
  const found = services.filter((s) => (s.name + s.provider).toLowerCase().includes(q.toLowerCase()));
  const totals = totalsByCurrency(myBills);
  return (
    <Shell>
      <div className="rounded-3xl bg-hero p-6 text-primary-foreground">
        <p className="text-sm opacity-80">Good morning, Tendai</p>
        <p className="mt-1 font-display text-lg">You owe</p>
        <div className="mt-1 flex flex-wrap gap-6">
          {Object.entries(totals).map(([c, v]) => <span key={c} className="font-display text-3xl font-extrabold">{fmt(v!, c as "USD")}</span>)}
        </div>
        <p className="mt-1 text-xs opacity-75">USD and ZiG are shown separately and never combined.</p>
        <Link to="/pay" className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">Pay bills</Link>
      </div>
      <input className={`${input} mt-6`} placeholder="Search services — e.g. ZESA, passport" value={q} onChange={(e) => setQ(e.target.value)} />
      {q ? (
        <div className="mt-4 grid gap-2">{found.map((s) => <ServiceRow key={s.id} id={s.id} />)}{!found.length && <p className="text-sm text-muted-foreground">No service found.</p>}</div>
      ) : (
        <>
          <h2 className="mt-8 font-display text-lg font-bold">Due soon</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {myBills.map((b) => (
              <div key={b.id} className={`${card} flex items-center justify-between`}>
                <div><p className="font-semibold">{svc(b.serviceId).name}</p><p className="text-xs text-muted-foreground">{b.ref} · due {b.due}</p></div>
                <span className="font-display font-bold">{fmt(b.amountMinor, b.currency)}</span>
              </div>
            ))}
          </div>
          {categories.map((c) => (
            <section key={c} className="mt-8">
              <h2 className="font-display text-lg font-bold">{c}</h2>
              <div className="mt-3 grid gap-2 md:grid-cols-3">{services.filter((s) => s.category === c).map((s) => <ServiceRow key={s.id} id={s.id} />)}</div>
            </section>
          ))}
        </>
      )}
      <p className="mt-10 text-center text-xs text-muted-foreground">Sample services shown. Only services with signed agreements appear in the live app.</p>
    </Shell>
  );
}
function ServiceRow({ id }: { id: string }) {
  const s = svc(id);
  return (
    <Link to="/pay" search={{ service: s.id }} className={`${card} block p-4 transition hover:border-primary`}>
      <p className="font-semibold">{s.name}</p><p className="text-xs text-muted-foreground">{s.provider} · by {s.lookup.toLowerCase()}</p>
    </Link>
  );
}
