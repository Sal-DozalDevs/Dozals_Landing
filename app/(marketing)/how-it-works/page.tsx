import Link from "next/link";

export const metadata = {
  title: "How it works — DozalDevs",
  description:
    "Connect your stack, let a Dozal learn in shadow mode, then describe the work in plain language. Guardrails, security and a full record keep you in command.",
};

export default function HowItWorksPage() {
  return (
    <>
      <header className="page-hero wrap" id="page-hero" data-section="How It Works Hero">
        <span className="eyebrow">How it works</span>
        <h1>Connect it. Describe it. It runs.</h1>
        <p className="deck">
          A Dozal doesn&apos;t rip out your tools or ask you to build workflows. It overlays on the
          stack you already run, learns how you work, and then does the work — leaving a trail you can
          inspect at any time.
        </p>
      </header>

      <section className="section" id="onboarding" data-section="Onboarding">
        <div className="wrap">
          <div className="sec-head">
            <h2>Live instantly.</h2>
            <p>No migration project. No implementation consultant. No discovery call needed.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="ring">1</div>
              <div className="day">Day 1–2 · Connect</div>
              <h3>Bring your stack.</h3>
              <p>
                Sign in to the apps you already use — your inbox, your books, your PM tool, your CRM,
                your files. The Dozal authenticates through each one and maps what&apos;s there.
                Nothing moves; nothing gets replaced.
              </p>
            </div>
            <div className="step">
              <div className="ring">2</div>
              <div className="day">Day 3–5 · Shadow</div>
              <h3>It watches you work.</h3>
              <p>
                In shadow mode, your Dozal observes how you actually do things — your patterns, your
                exceptions, the calls you always make yourself. It proposes what it <em>would</em> have
                done so you can correct it before anything runs for real.
              </p>
            </div>
            <div className="step">
              <div className="ring">3</div>
              <div className="day">Day 6–7 · Execute</div>
              <h3>Describe. It does.</h3>
              <p>
                Send the request in plain language — “reconcile last week and reply to the open
                threads.” It opens the right app, takes the right action, leaves the right trail, and
                holds anything sensitive for your one-tap approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band" id="request-example" data-section="Request Example">
        <div className="wrap">
          <div className="sec-head">
            <h2>You describe the outcome. It handles the steps.</h2>
            <p>
              One plain-language request becomes a sequence of real actions across real apps — each
              one logged.
            </p>
          </div>
          <div className="record">
            <div className="rhead">
              <span className="pill p-ok sm">
                <span className="dot"></span> Dozal · executing
              </span>
              <span className="rclock">14:03 · Thu</span>
            </div>
            <p className="rprompt">
              You said: “Onboard the new vendor, Brightline — collect their W-9, create the record,
              and open a channel for the project.”
            </p>
            <div className="rrows">
              <div className="rrow">
                <span className="t">14:01</span>
                <span className="a">Emailed Brightline the W-9 request · tracked for reply</span>
                <span className="pill p-ok sm">
                  <span className="dot"></span> done
                </span>
              </div>
              <div className="rrow">
                <span className="t">14:02</span>
                <span className="a">Created vendor record in Airtable · filled known fields</span>
                <span className="pill p-ok sm">
                  <span className="dot"></span> done
                </span>
              </div>
              <div className="rrow">
                <span className="t">14:02</span>
                <span className="a">Opened #brightline in Slack · invited the 3 owners</span>
                <span className="pill p-ok sm">
                  <span className="dot"></span> done
                </span>
              </div>
              <div className="rrow">
                <span className="t">14:03</span>
                <span className="a">Scheduled the kickoff · holding invite for your approval</span>
                <span className="pill p-wait sm">
                  <span className="dot"></span> live
                </span>
              </div>
            </div>
            <div className="rfoot">
              <span>Working inside</span>
              <span className="chip-app">gmail</span>
              <span className="chip-app">airtable</span>
              <span className="chip-app">slack</span>
              <span className="chip-app">calendly</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="guardrails" data-section="Guardrails">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">You stay in command</span>
            <h2 style={{ marginTop: 12 }}>Autonomy with a hand on the brake.</h2>
          </div>
          <div className="grid-4">
            <div className="card">
              <h3>Shadow mode</h3>
              <p>
                Watches before it acts. You see what it would have done and approve the playbook
                before it ever runs alone.
              </p>
            </div>
            <div className="card">
              <h3>One-tap approvals</h3>
              <p>
                Anything sensitive — sending, paying, signing — queues for you. A tap to release it,
                edit it, or stop it.
              </p>
            </div>
            <div className="card">
              <h3>Spending limits</h3>
              <p>
                Caps per action, caps per day, alerts beyond. It cannot pay, post, or commit past the
                line you drew.
              </p>
            </div>
            <div className="card">
              <h3>The record</h3>
              <p>
                Every action — what it opened, clicked, sent — sits in a replayable record. Tap any
                line. Watch it back.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band" id="security" data-section="Security">
        <div className="wrap">
          <div className="sec-head">
            <h2>Built to be trusted with real access.</h2>
            <p>
              A Dozal only ever holds the access you grant, and every credential and action is handled
              the way you&apos;d expect from software you let into your business.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <span className="eyebrow">Encryption</span>
              <h3 style={{ marginTop: 10 }}>Encrypted in transit &amp; at rest.</h3>
              <p>
                Your data and credentials are encrypted end-to-end. Connections use the app&apos;s own
                OAuth where available — the Dozal never stores a password it doesn&apos;t need.
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">Scoped access</span>
              <h3 style={{ marginTop: 10 }}>Least privilege, per role.</h3>
              <p>
                Grant access app by app, scope by scope. Revoke any connection instantly. A Dozal can
                only touch what you&apos;ve explicitly handed it.
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">Accountability</span>
              <h3 style={{ marginTop: 10 }}>Every action attributable.</h3>
              <p>
                The record shows who asked, what ran, and what changed — so a Dozal&apos;s work is
                never a black box, and never unattributable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section close" id="cta" data-section="CTA">
        <div className="wrap">
          <h2>See it run on your work.</h2>
          <p className="lede">
            Bring one job you&apos;d love to never touch again. We&apos;ll connect it, run shadow
            mode, and show you the Dozal doing it — end to end.
          </p>
          <div className="row">
            <Link className="btn btn-cta" href="/#start">
              Get started
            </Link>
            <Link className="btn btn-ghost" href="/use-cases">
              Browse use cases
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
