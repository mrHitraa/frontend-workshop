import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { btn, input } from "@/components/Shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — GovConnect" },
      { name: "description", content: "Log in to GovConnect to see and pay your bills." },
      { property: "og:title", content: "Log in — GovConnect" },
      { property: "og:description", content: "Log in to GovConnect to see and pay your bills." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft">
        <Link to="/" className="font-display text-xl font-bold text-primary">
          Gov<span className="text-accent-strong">Connect</span>
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in with your National ID or phone number.</p>
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
        >
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="login-id">National ID or phone</label>
            <input id="login-id" className={input} placeholder="e.g. 63-1234567A89 or 0772 000 000" value={id} onChange={(e) => setId(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="login-pin">PIN</label>
            <input id="login-pin" className={input} type="password" placeholder="••••••" value={pin} onChange={(e) => setPin(e.target.value)} required />
          </div>
          <button type="submit" className={btn}>Log in</button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link to="/login" className="font-semibold text-primary hover:underline">Forgot your PIN?</Link>
        </p>
        <p className="mt-5 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          New here? <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
