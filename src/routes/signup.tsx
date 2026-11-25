import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { btn, input } from "@/components/Shell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — GovConnect" },
      { name: "description", content: "Create a GovConnect account to find and pay your bills." },
      { property: "og:title", content: "Create account — GovConnect" },
      { property: "og:description", content: "Create a GovConnect account to find and pay your bills." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft">
        <Link to="/" className="font-display text-xl font-bold text-primary">
          Gov<span className="text-accent-strong">Connect</span>
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your bills are linked to your verified identity.</p>
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
        >
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="su-name">Full name</label>
            <input id="su-name" className={input} placeholder="e.g. Tendai Moyo" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="su-id">National ID number</label>
            <input id="su-id" className={input} placeholder="e.g. 63-1234567A89" value={id} onChange={(e) => setId(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="su-phone">Phone number</label>
            <input id="su-phone" className={input} type="tel" placeholder="e.g. 0772 000 000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="su-pin">Choose a PIN</label>
            <input id="su-pin" className={input} type="password" placeholder="6-digit PIN" value={pin} onChange={(e) => setPin(e.target.value)} required />
          </div>
          <button type="submit" className={btn}>Create account</button>
        </form>
        <p className="mt-5 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
