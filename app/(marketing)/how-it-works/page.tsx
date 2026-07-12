import Link from "next/link";

export const metadata = {
  title: "How it works — Dozals",
  description:
    "Connect your stack, let a Dozal learn in shadow mode, then describe the work in plain language. Guardrails, security and a full audit trail keep you in command.",
};

export default function HowItWorksPage() {
  return (
    <>
      <header className="page-hero wrap" id="page-hero" data-section="How It Works Hero">
        <div className="eyebrow reveal">
          <span className="rule"></span> How it works
        </div>
        <h1 className="page-hero__title reveal">
          Connect it. Describe it. <em>It runs.</em>
        </h1>
        <p className="page-hero__deck reveal">
          A Dozal doesn&apos;t rip out your tools or ask you to build workflows. It overlays on the
          stack you already run, learns how you work, and then does the work — leaving a trail you can
          inspect at any time.
        </p>
      </header>

      <section className="section wrap" id="onboarding" data-section="Onboarding">
        <div className="shead reveal">
          <div className="shead__index">
            § 01<span>Onboarding</span>
          </div>
          <div>
            <h2 className="shead__title">
              Live <em>instantly</em>.
            </h2>
            <p className="shead__lede">
              No migration project. No implementation consultant. No discovery call needed.
            </p>
          </div>
        </div>
        <div className="steps reveal" style={{ marginTop: 56 }}>
          <div className="step">
            <div className="step__marker">
              <span className="glint tw"></span>
            </div>
            <div className="step__day">Day 1–2 · Connect</div>
            <div className="step__title">Bring your stack.</div>
            <p className="step__body">
              Sign in to the apps you already use — your inbox, your books, your PM tool, your CRM, your
              files. The Dozal authenticates through each one and maps what&apos;s there. Nothing moves;
              nothing gets replaced.
            </p>
          </div>
          <div className="step">
            <div className="step__marker">
              <span className="glint tw"></span>
            </div>
            <div className="step__day">Day 3–5 · Shadow</div>
            <div className="step__title">It watches you work.</div>
            <p className="step__body">
              In shadow mode, your Dozal observes how you actually do things — your patterns, your
              exceptions, the calls you always make yourself. It proposes what it <em>would</em> have
              done so you can correct it before anything runs for real.
            </p>
          </div>
          <div className="step">
            <div className="step__marker">
              <span className="glint tw"></span>
            </div>
            <div className="step__day">Day 6–7 · Execute</div>
            <div className="step__title">Describe. It does.</div>
            <p className="step__body">
              Send the request in plain language — “reconcile last week and reply to the open threads.”
              It opens the right app, takes the right action, leaves the right trail, and holds anything
              sensitive for your one-tap approval.
            </p>
          </div>
        </div>
      </section>

      <div className="divider">
        <span className="bar left"></span>
        <span className="glint"></span>
        <span className="bar right"></span>
      </div>

      <section className="section wrap" id="request-example" data-section="Request Example">
        <div className="shead reveal">
          <div className="shead__index">
            § 02<span>A request</span>
          </div>
          <div>
            <h2 className="shead__title">
              You describe the outcome. <em>It handles the steps.</em>
            </h2>
            <p className="shead__lede">
              One plain-language request becomes a sequence of real actions across real apps — each one
              logged.
            </p>
          </div>
        </div>
        <div className="reveal" style={{ marginTop: 48, maxWidth: 820 }}>
          <div className="ledger ledger--dark">
            <div className="ledger__head">
              <span className="ledger__tag">
                <span className="pulse"></span> Dozal · executing
              </span>
              <span className="ledger__clock">14:03 · Thu</span>
            </div>
            <div className="ledger__prompt">
              You said: “Onboard the new vendor, Brightline — collect their W-9, create the record, and
              open a channel for the project.” <span className="arrow">↵</span>
            </div>
            <div className="ledger__rows">
              <div className="lrow">
                <span className="lrow__t">14:01</span>
                <span className="lrow__a">Emailed Brightline the W-9 request · tracked for reply</span>
                <span className="lrow__s done">done</span>
              </div>
              <div className="lrow">
                <span className="lrow__t">14:02</span>
                <span className="lrow__a">Created vendor record in Airtable · filled known fields</span>
                <span className="lrow__s done">done</span>
              </div>
              <div className="lrow">
                <span className="lrow__t">14:02</span>
                <span className="lrow__a">Opened #brightline in Slack · invited the 3 owners</span>
                <span className="lrow__s done">done</span>
              </div>
              <div className="lrow">
                <span className="lrow__t">14:03</span>
                <span className="lrow__a">Scheduled the kickoff · holding invite for your approval</span>
                <span className="lrow__s live">live</span>
              </div>
            </div>
            <div className="ledger__foot">
              <span>Working inside</span>
              <span className="chips">
                <span className="chip-m">gmail</span>
                <span className="chip-m">airtable</span>
                <span className="chip-m">slack</span>
                <span className="chip-m">calendly</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight wrap" id="guardrails" data-section="Guardrails">
        <div className="frame-dark reveal">
          <div className="eyebrow">
            <span className="rule"></span> You stay in command
          </div>
          <h2>
            Autonomy with <em>a hand on the brake.</em>
          </h2>
          <div className="grid-4" style={{ marginTop: 48 }}>
            <div className="gcard">
              <div className="gcard__ico">
                <span className="glint bone"></span>
              </div>
              <div className="gcard__title">Shadow mode</div>
              <p className="gcard__body">
                Watches before it acts. You see what it would have done and approve the playbook before
                it ever runs alone.
              </p>
            </div>
            <div className="gcard">
              <div className="gcard__ico">
                <span className="glint bone"></span>
              </div>
              <div className="gcard__title">One-tap approvals</div>
              <p className="gcard__body">
                Anything sensitive — sending, paying, signing — queues for you. A tap to release it,
                edit it, or stop it.
              </p>
            </div>
            <div className="gcard">
              <div className="gcard__ico">
                <span className="glint bone"></span>
              </div>
              <div className="gcard__title">Spending limits</div>
              <p className="gcard__body">
                Caps per action, caps per day, alerts beyond. It cannot pay, post, or commit past the
                line you drew.
              </p>
            </div>
            <div className="gcard">
              <div className="gcard__ico">
                <span className="glint bone"></span>
              </div>
              <div className="gcard__title">Audit log</div>
              <p className="gcard__body">
                Every action — what it opened, clicked, sent — sits in a replayable log. Tap any line.
                Watch it back.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap" id="security" data-section="Security">
        <div className="shead reveal">
          <div className="shead__index">
            § 03<span>Security</span>
          </div>
          <div>
            <h2 className="shead__title">
              Built to be trusted with <em>real access.</em>
            </h2>
            <p className="shead__lede">
              A Dozal only ever holds the access you grant, and every credential and action is handled
              the way you&apos;d expect from software you let into your business.
            </p>
          </div>
        </div>
        <div className="grid-3" style={{ marginTop: 56 }}>
          <div className="card reveal">
            <div className="card__index">ENCRYPTION</div>
            <div className="card__title">Encrypted in transit &amp; at rest.</div>
            <p className="card__body">
              Your data and credentials are encrypted end-to-end. Connections use the app&apos;s own OAuth
              where available — the Dozal never stores a password it doesn&apos;t need.
            </p>
          </div>
          <div className="card reveal">
            <div className="card__index">SCOPED ACCESS</div>
            <div className="card__title">Least privilege, per role.</div>
            <p className="card__body">
              Grant access app by app, scope by scope. Revoke any connection instantly. A Dozal can only
              touch what you&apos;ve explicitly handed it.
            </p>
          </div>
          <div className="card reveal">
            <div className="card__index">ACCOUNTABILITY</div>
            <div className="card__title">Every action attributable.</div>
            <p className="card__body">
              The audit log records who asked, what ran, and what changed — so a Dozal&apos;s work is
              never a black box, and never unattributable.
            </p>
          </div>
        </div>
      </section>

      <section className="section ctaband wrap" id="cta" data-section="CTA">
        <span className="glint xl tw reveal"></span>
        <h2 className="reveal">
          See it run on <em>your</em> work.
        </h2>
        <p className="sub reveal">
          Bring one workflow you&apos;d love to never touch again. We&apos;ll connect it, run shadow
          mode, and show you the Dozal doing it — end to end.
        </p>
        <div className="row reveal">
          <Link className="btn btn--primary" href="/demo">
            Book a demo <span className="glint"></span>
          </Link>
          <Link className="btn btn--ghost" href="/use-cases">
            Browse use cases
          </Link>
        </div>
      </section>
    </>
  );
}