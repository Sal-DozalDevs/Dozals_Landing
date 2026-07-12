import DemoForm from "@/components/site/demo-form";

export const metadata = {
  title: "Book a demo — Dozals",
  description:
    "Bring one workflow you'd love to never touch again. We'll connect it, run shadow mode, and show a Dozal doing it end to end. Founding rate from $25/mo.",
};

export default function DemoPage() {
  return (
    <>
      <header className="hero wrap" id="demo-hero" data-section="Demo Hero">
        <div className="hero__grid">
          <div className="hero__left">
            <div className="eyebrow reveal">
              <span className="rule"></span> Book a demo
            </div>
            <h1 className="page-hero__title reveal" style={{ fontSize: "clamp(38px,5.4vw,64px)" }}>
              See it run on <em>your</em> work.
            </h1>
            <p className="hero__deck reveal">
              Fifteen minutes. Bring one workflow you&apos;d love to never touch again — we&apos;ll
              connect it live and show a Dozal doing it end to end. No slide deck.
            </p>

            <ol className="steps-num reveal" style={{ marginTop: 40 }}>
              <li>
                <span className="n">1</span>
                <div>
                  <h4>Discovery — 10 min</h4>
                  <p>Tell us the loop that eats your week. We listen and take notes in your language.</p>
                </div>
              </li>
              <li>
                <span className="n">2</span>
                <div>
                  <h4>Live demo — 15 min</h4>
                  <p>
                    We connect a real app and show the Dozal executing your workflow — reconciling,
                    replying, filing, following up.
                  </p>
                </div>
              </li>
              <li>
                <span className="n">3</span>
                <div>
                  <h4>Fit &amp; founding rate — 5 min</h4>
                  <p>
                    If it&apos;s a fit, you start at the $25/mo founding rate, locked in. Month-to-month,
                    cancel anytime.
                  </p>
                </div>
              </li>
            </ol>

            <div className="hero__trust reveal" style={{ marginTop: 36 }}>
              <span className="glint" style={{ "--gw": "11px" } as React.CSSProperties}></span> Live instantly
              <span className="dot"></span> From $25/mo
              <span className="dot"></span> You stay in control
            </div>
          </div>

          <div className="hero__right reveal">
            <DemoForm />
          </div>
        </div>
      </header>

      <div className="divider">
        <span className="bar left"></span>
        <span className="glint"></span>
        <span className="bar right"></span>
      </div>

      <section className="section--tight wrap" id="reassurance" data-section="Reassurance">
        <div className="grid-3 stagger">
          <div className="card reveal">
            <div className="card__index">LOW RISK</div>
            <div className="card__title">Nothing to rip out.</div>
            <p className="card__body">
              A Dozal overlays on the tools you already use. The demo connects to a real app — no
              migration, no setup project.
            </p>
          </div>
          <div className="card reveal">
            <div className="card__index">FOUNDING RATE</div>
            <div className="card__title">$25/mo, locked in.</div>
            <p className="card__body">
              Early partners keep the founding rate for the life of the account, even after list prices
              rise. Month-to-month.
            </p>
          </div>
          <div className="card reveal">
            <div className="card__index">IN CONTROL</div>
            <div className="card__title">You approve the touchy stuff.</div>
            <p className="card__body">
              Shadow mode first, one-tap approvals on anything sensitive, and a full audit trail of every
              action it takes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}