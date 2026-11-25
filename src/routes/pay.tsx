import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, card, input, btn, btnGhost } from "@/components/Shell";
import { services, myBills, svc, fmt, totalsByCurrency, methods, type Bill } from "@/lib/data";
export const Route = createFileRoute("/pay")({
  validateSearch: (s: Record<string, unknown>): { service?: string } => (typeof s["service"] === "string" ? { service: s["service"] } : {}),
  head: () => ({ meta: [{ title: "Pay bills — GovConnect" }, { name: "description", content: "Look up and pay bills with a full fee breakdown." }, { property: "og:title", content: "Pay bills — GovConnect" }, { property: "og:description", content: "Look up and pay bills with a full fee breakdown." }] }),
  component: Pay,
});
function Pay() {
  const { service } = Route.useSearch();
  const [tab, setTab] = useState<"mine" | "other">(service ? "other" : "mine");
  const [sel, setSel] = useState<string[]>([]);
  const [other, setOther] = useState<Bill | null>(null);
  const [svcId, setSvcId] = useState(service ?? "zesa");
  const [ref, setRef] = useState("");
  const [method, setMethod] = useState(methods[0]!);
  const [step, setStep] = useState<"select" | "review" | "done">("select");
  const chosen = [...myBills.filter((b) => sel.includes(b.id)), ...(other && sel.includes(other.id) ? [other] : [])];
  const totals = totalsByCurrency(chosen);
  const lookup = () => {
    if (!ref.trim()) return;
    const b: Bill = { id: "o1", serviceId: svcId, ref: ref.trim(), amountMinor: 1875, currency: "USD", due: "2026-12-01" };
    setOther(b); setSel((s) => [...new Set([...s, b.id])]);
  };
  if (step === "done") return (
    <Shell><div className={`${card} mx-auto max-w-md text-center`}>
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary font-display text-2xl text-primary">✓</div>
      <h1 className="mt-4 font-display text-2xl font-bold">Payment submitted</h1>
      <p className="mt-2 text-sm text-muted-foreground">Approve the prompt on your {method} phone. Your receipt appears once the provider confirms.</p>
      <p className="mt-4 font-mono text-sm">GC-9H4N-31WE</p>
      <div className="mt-6 flex justify-center gap-3"><Link to="/receipts" className={btn}>View receipts</Link><Link to="/dashboard" className={btnGhost}>Home</Link></div>
    </div></Shell>
  );
  return (
    <Shell title={step === "review" ? "Review & pay" : "Pay bills"}>
      {step === "select" ? (<>
        <div className="mb-5 inline-flex rounded-full bg-muted p-1">
          {(["mine", "other"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-card shadow-soft" : "text-muted-foreground"}`}>{t === "mine" ? "My bills" : "Pay for someone else"}</button>)}
        </div>
        {tab === "mine" ? (
          <div className="grid gap-3">{myBills.map((b) => (
            <label key={b.id} className={`${card} flex cursor-pointer items-center gap-4 p-4 ${sel.includes(b.id) ? "border-primary" : ""}`}>
              <input type="checkbox" className="h-5 w-5 accent-primary" checked={sel.includes(b.id)} onChange={() => setSel((s) => s.includes(b.id) ? s.filter((x) => x !== b.id) : [...s, b.id])} />
              <div className="flex-1"><p className="font-semibold">{svc(b.serviceId).name}</p><p className="text-xs text-muted-foreground">{b.ref} · due {b.due}</p></div>
              <span className="font-display font-bold">{fmt(b.amountMinor, b.currency)}</span>
            </label>))}
          </div>
        ) : (
          <div className={card}>
            <div className="grid gap-3 md:grid-cols-[1fr_1.4fr_auto]">
              <select className={input} value={svcId} onChange={(e) => { setSvcId(e.target.value); setOther(null); }}>{services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
              <input className={input} placeholder={svc(svcId).lookup} value={ref} onChange={(e) => setRef(e.target.value)} />
              <button className={btn} onClick={lookup}>Look up</button>
            </div>
            {other && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary p-4">
                <div><p className="font-semibold">T*** M***</p><p className="text-xs text-muted-foreground">{svc(other.serviceId).name} · {other.ref}</p></div>
                <span className="font-display font-bold">{fmt(other.amountMinor, other.currency)}</span>
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">For privacy you'll only see the amount due and a masked name — no history or personal details.</p>
          </div>
        )}
      </>) : (
        <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
          <div className={card}>
            <h2 className="font-display font-bold">Fee breakdown</h2>
            {chosen.map((b) => <Row key={b.id} l={svc(b.serviceId).name} v={fmt(b.amountMinor, b.currency)} />)}
            <Row l="Service fee" v="To be confirmed" muted /><Row l="Gateway fee" v="To be confirmed" muted />
            <div className="mt-3 border-t border-border pt-3">{Object.entries(totals).map(([c, v]) => <Row key={c} l={`Total (${c})`} v={fmt(v!, c as "USD")} bold />)}</div>
          </div>
          <div className={card}>
            <h2 className="font-display font-bold">Pay with</h2>
            <div className="mt-3 grid gap-2">{methods.map((m) => (
              <button key={m} onClick={() => setMethod(m)} className={`rounded-xl border px-4 py-3 text-left text-sm font-medium ${method === m ? "border-primary bg-secondary" : "border-border"}`}>{m}</button>))}
            </div>
          </div>
        </div>
      )}
      <div className="sticky bottom-20 mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:bottom-4">
        <div className="text-sm">{chosen.length} bill{chosen.length !== 1 && "s"} · {Object.entries(totals).map(([c, v]) => fmt(v!, c as "USD")).join(" + ") || "nothing selected"}</div>
        <div className="flex gap-2">
          {step === "review" && <button className={btnGhost} onClick={() => setStep("select")}>Back</button>}
          <button className={btn} disabled={!chosen.length} onClick={() => setStep(step === "select" ? "review" : "done")}>{step === "select" ? "Continue" : "Confirm payment"}</button>
        </div>
      </div>
    </Shell>
  );
}
function Row({ l, v, muted, bold }: { l: string; v: string; muted?: boolean; bold?: boolean }) {
  return <div className={`mt-2 flex justify-between text-sm ${muted ? "text-muted-foreground" : ""} ${bold ? "font-display text-base font-bold" : ""}`}><span>{l}</span><span>{v}</span></div>;
}
