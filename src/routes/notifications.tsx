import { createFileRoute } from "@tanstack/react-router";
import { Shell, card } from "@/components/Shell";
import { notifications } from "@/lib/data";
export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Alerts — GovConnect" }, { name: "description", content: "Payment confirmations, reminders and notices." }, { property: "og:title", content: "Alerts — GovConnect" }, { property: "og:description", content: "Payment confirmations, reminders and notices." }] }),
  component: () => (
    <Shell title="Alerts">
      <div className="grid gap-3">{notifications.map((n) => (
        <div key={n.t} className={`${card} flex gap-4`}>
          <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${n.kind === "success" ? "bg-primary" : n.kind === "reminder" ? "bg-accent-strong" : "bg-muted-foreground"}`} />
          <div><p className="font-semibold">{n.t}</p><p className="text-sm text-muted-foreground">{n.d}</p></div>
        </div>))}
      </div>
    </Shell>
  ),
});
