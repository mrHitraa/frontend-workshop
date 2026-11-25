import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, card } from "@/components/Shell";
import { offices } from "@/lib/data";
export const Route = createFileRoute("/offices")({
  head: () => ({ meta: [{ title: "Find an office — GovConnect" }, { name: "description", content: "ZIMRA, ZINARA and council offices near you." }, { property: "og:title", content: "Find an office — GovConnect" }, { property: "og:description", content: "ZIMRA, ZINARA and council offices near you." }] }),
  component: Offices,
});
function Offices() {
  const [f, setF] = useState("All");
  const list = offices.filter((o) => f === "All" || o.type === f);
  return (
    <Shell title="Find an office">
      <div className="mb-4 flex gap-2">{["All", "ZIMRA", "ZINARA", "Council"].map((t) => <button key={t} onClick={() => setF(t)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${f === t ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{t}</button>)}</div>
      <div className="grid gap-3 md:grid-cols-2">{list.map((o) => (
        <a key={o.name} target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/${encodeURIComponent(o.name + " " + o.city + " Zimbabwe")}`} className={`${card} block hover:border-primary`}>
          <span className="text-xs font-semibold text-accent-strong">{o.type}</span><p className="font-semibold">{o.name}</p><p className="text-sm text-muted-foreground">{o.city} · Open in maps →</p>
        </a>))}
      </div>
    </Shell>
  );
}
