import Link from "next/link";
import HeroTransition from "@/components/site/hero-transition";

export default function Home() {
  return (
    <>
      {/* ═══ HERO (scroll-morph) → DASHBOARD crossfade ═══ */}
      <HeroTransition>
        <div className="divider">
          <span className="bar left"></span>
          <span className="glint"></span>
          <span className="bar right"></span>
        </div>

        {/* ═══ DASHBOARD PREVIEW ═══ */}
        <section className="section wrap" id="dashboard" data-section="Dashboard Preview">
          <div className="shead reveal">
            <div className="shead__index">
              § 01<span>The console</span>
            </div>
            <div>
              <h2 className="shead__title">
                See the work <em>actually getting done.</em>
              </h2>
              <p className="shead__lede">
                Every app it touched, every action it took, queued for your one-tap sign-off. Your
                Dozal&apos;s console is a replayable ledger — never a new tab to babysit.
              </p>
            </div>
          </div>

          <img
            src="/assets/Dashboard%20Mock.png"
            alt="Dozals console dashboard"
            className="console reveal"
            data-label="Console (Dashboard mock)" data-file="app/page.tsx:37"
            style={{ marginTop: 56, width: "100%", height: "auto", display: "block", border: "1px solid var(--border-strong)", borderRadius: 10, boxShadow: "var(--shadow-frame)" }}
          />

          <p className="reveal" style={{ marginTop: 36 }}>
            <a className="textlink" href="/Dashboard/dashboard.html" target="_blank" rel="noopener noreferrer">
              Explore the full console →
            </a>
          </p>
        </section>
      </HeroTransition>

      {/* ═══ CASE STUDY ═══ */}
      <section className="section wrap" id="case-study" data-section="Case Study">
        <div className="shead reveal">
          <div className="shead__index">
            § 02<span>The proof</span>
          </div>
          <div>
            <h2 className="shead__title">
              10× productivity gain. 1,972 tasks completed <em>in 6 weeks.</em>
            </h2>
            <p className="shead__lede">
              In just 6 weeks, our platform completed 1,972 tasks, saved 340+ hours of manual
              labor, and proved that the future of work doesn&apos;t require a hiring process.
            </p>
          </div>
        </div>

        {/* Hero band */}
        <div className="cs-hero reveal" data-label="Case Study · Hero ROI" data-file="app/page.tsx">
          <div className="cs-hero__roi">
            <span className="x">10</span>
            <em>×</em>
          </div>
          <div>
            <p className="cs-hero__lead">
              We improved a whole <em>department&apos;s productivity by 10×</em> —
              and completed <em>1,972 tasks</em> with our Dozals.
            </p>
            <div className="cs-hero__chips">
              <span className="chip-m">1,972 TASKS</span>
              <span className="chip-m">340+ HOURS SAVED</span>
              <span className="chip-m">6-WEEK WINDOW</span>
              <span className="chip-m">24/7/365</span>
            </div>
          </div>
        </div>

        {/* Speed advantage */}
        <div className="reveal" style={{ marginTop: 40 }}>
          <div className="cs-versus" data-label="Case Study · Speed" data-file="app/page.tsx">
            <div>
              <div className="cs-versus__tag">Human baseline</div>
              <div className="cs-versus__num">
                30–90<span style={{ fontSize: "0.4em", color: "var(--text-3)" }}> min</span>
              </div>
              <p className="cs-versus__sub">Per task — with context-switching, breaks, and weekends lost to the queue.</p>
            </div>
            <div>
              <div className="cs-versus__tag">AI completion</div>
              <div className="cs-versus__num ember">
                240<span style={{ fontSize: "0.4em", color: "var(--text-3)" }}> sec</span>
              </div>
              <p className="cs-versus__sub">
                By the time a competitor finishes a couple jobs, your Dozals just finished{" "}
                <em>35</em>. And it scales instantly for peak spikes — our 158-task record day
                cleared without breaking a sweat.
              </p>
            </div>
          </div>
        </div>

        {/* A real life Dozal Employee */}
        <div className="cs-role reveal" style={{ marginTop: 56, padding: "60px 48px" }} data-label="Case Study · A real life Dozal Employee" data-file="app/page.tsx">
          <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <div className="cs-role__ey">
                <span className="eyebrow"><span className="rule"></span> A real life Dozal Employee</span>
              </div>
              <h3 className="cs-role__title">
                The <em>Cleaning Schedule Coordinator</em> — one agent, 255 schedules.
              </h3>
              <div className="cs-role__row">
                <div>
                  <span className="num ember">255</span>
                  <div className="k">Schedules generated &amp; posted</div>
                </div>
                <div>
                  <span className="num">1,972</span>
                  <div className="k">Total jobs completed platform-wide</div>
                </div>
                <div>
                  <span className="num ember">240<span style={{ fontSize: "0.4em" }}>s</span></span>
                  <div className="k">Average completion time</div>
                </div>
              </div>
              <p className="cs-role__quote">
                One agent. <em>255 cleaning schedules generated and posted.</em> It pays
                for the entire platform before your team even finishes their morning sync.
              </p>
            </div>
            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                alt="Cleaning crew entering a new house"
                style={{ width: "100%", height: "auto", borderRadius: 10, display: "block", boxShadow: "var(--shadow-frame)" }}
              />
            </div>
          </div>
        </div>

        {/* Inline CTA */}
        <div className="reveal" style={{ marginTop: 56, textAlign: "center" }} data-label="Case Study · CTA" data-file="app/page.tsx">
          <h3 className="serif" style={{ fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "20ch", margin: "0 auto" }}>
            Ready to hire your <em style={{ fontStyle: "italic", color: "var(--ember-deep)" }}>first AI employee?</em>
          </h3>
          <p style={{ margin: "16px auto 28px", maxWidth: "54ch", color: "var(--text-2)", fontSize: 16 }}>
            Go from a plain-English description to a fully productive, 24/7 AI worker in minutes.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a className="btn btn--primary" href="https://app.dozaldevs.com/dashboard" target="_blank" rel="noopener noreferrer">
              Build my AI employee <span className="glint"></span>
            </a>
            <a className="btn btn--ghost" href="https://app.dozaldevs.com/dashboard" target="_blank" rel="noopener noreferrer">
              See the platform in action
            </a>
          </div>
        </div>
      </section>

      {/* ═══ THE REAL PROBLEM ═══ */}
      <section className="section--tight wrap" id="the-real-problem" data-section="The Real Problem">
        <div className="reveal" style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=500&q=80"
              alt="Cluttered desk with paperwork and laptop"
              style={{ width: "100%", height: "auto", borderRadius: 10, display: "block", boxShadow: "var(--shadow-frame)" }}
            />
          </div>
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div className="frame-light">
              <div className="eyebrow">
                <span className="rule"></span> The real problem
              </div>
              <p className="manifesto">
                You didn&apos;t buy a tool to <span className="strike">track</span> the work.{" "}
                <span className="em">
                  You bought it to finish the work.
                </span>
              </p>
              <p style={{ marginTop: 24, fontSize: 17, color: "var(--text-2)", maxWidth: "60ch", lineHeight: 1.6 }}>
                Asana, Monday, Notion, ClickUp — every project management tool you&apos;ve ever paid for
                is a beautifully designed to-do list. They organize the queue. They remind you about
                the queue. They color-code the queue. But when Friday hits, the queue is still there —
                because none of them ever picked up a single task and actually did it.
              </p>
              <p style={{ marginTop: 16, fontSize: 17, color: "var(--text-2)", maxWidth: "60ch", lineHeight: 1.6 }}>
                Worse, they added a tax you never agreed to: the hours spent grooming backlogs,
                updating statuses, and writing tickets are hours you didn&apos;t spend closing them.
                The tool that was supposed to save you time now demands your time just to stay fed.
              </p>
              <div className="quote-attr" style={{ marginTop: 28 }}>
                <span className="glint"></span>{" "}
                <span style={{ fontSize: 13, color: "var(--text-3)", letterSpacing: ".5px" }}>
                  Tracking isn&apos;t doing. · The DozalDevs difference
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MECHANISM ═══ */}
      <section className="section wrap" id="mechanism" data-section="Mechanism">
        <div className="shead reveal">
          <div className="shead__index">
            § 02<span>The mechanism</span>
          </div>
          <div>
            <h2 className="shead__title">
              Connect it. Describe it. <em>It runs.</em>
            </h2>
            <p className="shead__lede">
              No migration, no new tab to babysit. Live instantly.
            </p>
          </div>
        </div>
        <div className="steps reveal" style={{ marginTop: 56 }}>
          <div className="step" data-label="Step 01 · Connect" data-file="app/page.tsx">
            <div className="step__marker">
              <span className="glint tw"></span>
            </div>
            <div className="step__day">Day 1–2 · Connect</div>
            <div className="step__title">Bring your stack.</div>
            <p className="step__body">
              Sign in to the apps you already use — inbox, books, PM tool, CRM. The Dozal puts a hand on
              each one and waits.
            </p>
          </div>
          <div className="step" data-label="Step 02 · Shadow" data-file="app/page.tsx">
            <div className="step__marker">
              <span className="glint tw"></span>
            </div>
            <div className="step__day">Day 3–5 · Shadow</div>
            <div className="step__title">It watches you work.</div>
            <p className="step__body">
              In shadow mode it learns your patterns, your exceptions, your “I&apos;ll handle this one.”
              It builds your playbook, not a template.
            </p>
          </div>
          <div className="step" data-label="Step 03 · Execute" data-file="app/page.tsx">
            <div className="step__marker">
              <span className="glint tw"></span>
            </div>
            <div className="step__day">Day 6–7 · Execute</div>
            <div className="step__title">Describe. It does.</div>
            <p className="step__body">
              Send the request in plain language. It takes the action, leaves the trail, and queues
              anything touchy for one-tap approval.
            </p>
          </div>
        </div>
        <p className="reveal" style={{ marginTop: 36 }}>
          <Link className="textlink" href="/how-it-works">
            See how it works, in detail →
          </Link>
        </p>
      </section>

      <div className="divider" data-label="Divider 02" data-file="app/page.tsx">
        <span className="bar left"></span>
        <span className="glint"></span>
        <span className="bar right"></span>
      </div>

      {/* ═══ QUOTE ═══ */}
      <section className="section--tight wrap" id="quote" data-section="Quote">
        <div className="reveal" style={{ display: "flex", gap: 48, alignItems: "stretch", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div className="frame-light">
              <p className="quote">
                “The day my Dozal queued its first ten <em>already-done </em> actions for me to glance at, I
                realized I&apos;d spent years confusing ‘productivity’ with actually finishing things.”
              </p>
              <div className="quote-attr">
                <span className="avatar">M</span>
                <div>
                  <div className="who">M. Riordan</div>
                  <div className="role">Fractional CFO · 11 client ledgers · Dozal live since March</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <img
              src="https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
              alt="Woman in black t-shirt using computer and smiling"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10, display: "block", boxShadow: "var(--shadow-frame)" }}
            />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section ctaband wrap" id="cta" data-section="CTA">
        <span className="glint xl tw reveal"></span>
        <h2 className="reveal">
          Stop reviewing what to do. Start approving what&apos;s <em>already done</em>.
        </h2>
        <p className="sub reveal">
          Tell us what you&apos;d hand off first. We&apos;ll connect your stack and have your
          Dozal working inside your apps instantly. No discovery call needed.
        </p>
        <div className="row reveal">
          <Link className="btn btn--primary" href="/demo">
            Book a demo <span className="glint"></span>
          </Link>
          <Link className="btn btn--ghost" href="/pricing">
            See pricing
          </Link>
        </div>
        <div className="foot reveal">
          <span className="item">
            <span className="glint"></span> Live instantly
          </span>
          <span className="item">
            <span className="glint"></span> From $25/mo
          </span>
          <span className="item">
            <span className="glint"></span> Cancel anytime
          </span>
        </div>
      </section>
    </>
  );
}