"use client";

import { useState } from "react";

export default function DemoForm() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      handoff: (form.elements.namedItem("handoff") as HTMLTextAreaElement).value.trim(),
    };

    if (!payload.name || !payload.email || !payload.handoff) {
      setError("Please fill in your name, email, and what you'd hand off first.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
      setTimeout(() => {
        document
          .getElementById("form-ok")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="frame-light" style={{ padding: "44px 40px", borderRadius: 6 }}>
      {done ? (
        <div id="form-ok" style={{ textAlign: "center", padding: "20px 8px" }}>
          <span className="glint xl" style={{ margin: "0 auto 18px", display: "inline-block" }}></span>
          <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 10 }}>
            Request received.
          </h3>
          <p style={{ color: "var(--text-2)", maxWidth: "36ch", margin: "0 auto" }}>
            Thanks — we&apos;ll email you within one business day to lock in a time. Bring the workflow
            you dread most.
          </p>
        </div>
      ) : (
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="field--row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" autoComplete="organization" placeholder="Company or practice" />
          </div>
          <div className="field">
            <label htmlFor="role">What best describes you?</label>
            <select id="role" name="role">
              <option value="">Choose one…</option>
              <option>Fractional CFO / finance</option>
              <option>Agency owner</option>
              <option>Solo practitioner</option>
              <option>Operations lead</option>
              <option>Independent consultant</option>
              <option>Studio / creative lead</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="handoff">What would you hand off first?</label>
            <textarea
              id="handoff"
              name="handoff"
              placeholder="e.g. reconcile weekly expenses and reply to open client threads"
            />
          </div>
          {error && (
            <p style={{ color: "var(--ember-deep)", fontSize: 14, marginBottom: 12, textAlign: "center" }}>
              {error}
            </p>
          )}
          <button className="btn btn--primary btn--block" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Request my demo"} <span className="glint"></span>
          </button>
          <p className="form__note">We&apos;ll reply within one business day to schedule. No spam, ever.</p>
        </form>
      )}
    </div>
  );
}
