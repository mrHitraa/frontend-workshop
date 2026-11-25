import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, card, btnGhost } from "@/components/Shell";
import { receipts, fmt } from "@/lib/data";
export const Route = createFileRoute("/receipts")({
  head: () => ({ meta: [{ title: "Receipts — GovConnect" }, { name: "description", content: "Your payment history and digital receipts." }, { property: "og:title", content: "Receipts — GovConnect" }, { property: "og:description", content: "Your payment history and digital receipts." }] }),
  component: Receipts,
});
function Receipts() {
  const csv = () => {
    const rows = [["Transaction", "Service", "Amount", "Currency", "Date", "Status"], ...receipts.map((r) => [r.id, r.service, (r.amountMinor / 100).toFixed(2), r.currency, r.date, r.status])];
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" })); a.download = "govconnect-statement.csv"; a.click();
  };
  return (
    <Shell title="Receipts">
      <div className="mb-4 flex gap-2"><button className={btnGhost} onClick={csv}>Export CSV</button><button className={btnGhost} onClick={() => window.print()}>Print / PDF</button></div>
      <div className="grid gap-3">{receipts.map((r) => (
        <div key={r.id} className={`${card} flex flex-wrap items-center justify-between gap-3`}>
          <div><p className="font-semibold">{r.service}</p><p className="font-mono text-xs text-muted-foreground">{r.id} · {r.date}</p></div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.status === "completed" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`}>{r.status === "completed" ? "Completed" : "Awaiting provider"}</span>
            <span className="font-display font-bold">{fmt(r.amountMinor, r.currency)}</span>
            <Link to="/verify" search={{ id: r.id }} className="text-sm font-semibold text-primary">Verify</Link>
          </div>
        </div>))}
      </div>
    </Shell>
  );
}
