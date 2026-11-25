import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, card, input, btn } from "@/components/Shell";
import { receipts, fmt } from "@/lib/data";
export const Route = createFileRoute("/verify")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => (typeof s["id"] === "string" ? { id: s["id"] } : {}),
  head: () => ({ meta: [{ title: "Verify a receipt — GovConnect" }, { name: "description", content: "Check that a GovConnect receipt is genuine." }, { property: "og:title", content: "Verify a receipt — GovConnect" }, { property: "og:description", content: "Check that a GovConnect receipt is genuine." }] }),
  component: Verify,
});
function Verify() {
  const { id } = Route.useSearch();
  const [code, setCode] = useState(id ?? "");
  const [checked, setChecked] = useState(!!id);
  const r = receipts.find((x) => x.id.toLowerCase() === code.trim().toLowerCase());
  return (
    <Shell title="Verify a receipt">
      <div className={`${card} max-w-lg`}>
        <p className="text-sm text-muted-foreground">Enter the transaction ID or scan the QR code printed on the receipt.</p>
        <div className="mt-4 flex gap-2"><input className={input} placeholder="GC-XXXX-XXXX" value={code} onChange={(e) => { setCode(e.target.value); setChecked(false); }} /><button className={btn} onClick={() => setChecked(true)}>Check</button></div>
        {checked && (r ? (
          <div className="mt-5 rounded-xl bg-secondary p-4 text-sm">
            <p className="font-display text-lg font-bold text-primary">✓ Genuine receipt</p>
            <p className="mt-2">{r.service} · {fmt(r.amountMinor, r.currency)}</p><p className="text-muted-foreground">{r.date} · {r.status}</p>
          </div>
        ) : <p className="mt-5 rounded-xl bg-muted p-4 text-sm">No receipt matches this code.</p>)}
      </div>
    </Shell>
  );
}
