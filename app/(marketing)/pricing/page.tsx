import Link from "next/link";

export const metadata = {
  title: "Pricing — Dozals",
  description:
    "Simple pricing that starts at a $25/mo founding rate, locked in for early partners. Starter, Pro, and Team plans — every path ends in a live demo.",
};

export default function PricingPage() {
  return (
    <>
      <header className="page-hero wrap" id="page-hero" data-section="Pricing Hero">
        <div className="eyebrow reveal">
          <span className="rule"></span> Pricing
        </div>
        <h1 className="page-hero__title reveal">
          Start at <em>$25</em>. Lock it in.
        </h1>
        <p className="page-hero__deck reveal">
          We&apos;re early, and we&apos;d rather build a base of partners than a big price tag. Early
          accounts get a founding rate that stays put — even when list prices rise later.
        </p>
      </header>

      <section className="section--tight wrap" id="plans" data-section="Plans">
        <div className="plans stagger">
          <div className="plan reveal">
            <span className="plan__badge ember">Founding rate</span>
            <div className="plan__name">Starter</div>
            <div className="plan__tag">One Dozal for the loop that eats your week.</div>
            <div className="plan__price">
              <span className="amt">$25</span>
              <span className="per">/ month</span>
            </div>
            <div className="plan__note">Locked in for early partners</div>
            <ul className="plan__list">
              <li>One Dozal, one core workflow</li>
              <li>Connect the apps you already use</li>
              <li>Shadow-mode onboarding</li>
              <li>One-tap approvals</li>
              <li>Full audit log &amp; replay</li>
              <li>Email support</li>
            </ul>
            <div className="plan__cta">
              <Link className="btn btn--ghost btn--block" href="/demo">
                Book a demo
              </Link>
            </div>
          </div>

          <div className="plan plan--feature reveal">
            <span className="plan__badge ember">Most popular</span>
            <div className="plan__name">Pro</div>
            <div className="plan__tag">Multiple workflows, higher limits, priority everything.</div>
            <div className="plan__price">
              <span className="amt">$79</span>
              <span className="per">/ month</span>
            </div>
            <div className="plan__note">Everything in Starter, plus —</div>
            <ul className="plan__list">
              <li>Up to five workflows</li>
              <li>Higher action limits</li>
              <li>Multi-app, end-to-end execution</li>
              <li>Advanced guardrails &amp; spending limits</li>
              <li>Priority support</li>
              <li>Onboarding call with our team</li>
            </ul>
            <div className="plan__cta">
              <Link className="btn btn--primary btn--block" href="/demo">
                Book a demo <span className="glint"></span>
              </Link>
            </div>
          </div>

          <div className="plan reveal">
            <span className="plan__badge ember">Custom</span>
            <div className="plan__name">Team</div>
            <div className="plan__tag">For firms running Dozals across a whole operation.</div>
            <div className="plan__price">
              <span className="amt">Let&apos;s talk</span>
            </div>
            <div className="plan__note">Tailored to your stack</div>
            <ul className="plan__list">
              <li>Unlimited workflows &amp; seats</li>
              <li>Custom integrations</li>
              <li>SSO &amp; role-based access</li>
              <li>Security review &amp; SLA</li>
              <li>Dedicated success manager</li>
              <li>Volume pricing</li>
            </ul>
            <div className="plan__cta">
              <Link className="btn btn--ghost btn--block" href="/demo">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
        <p className="reveal" style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: "var(--text-3)" }}>
          Prices in USD. Cancel anytime — month-to-month, no lock-in. Founding rate honored for the life
          of the account.
        </p>
      </section>

      <div className="divider">
        <span className="bar left"></span>
        <span className="glint"></span>
        <span className="bar right"></span>
      </div>

      <section className="section wrap" id="faq" data-section="FAQ">
        <div className="shead reveal">
          <div className="shead__index">
            FAQ<span>The details</span>
          </div>
          <div>
            <h2 className="shead__title">
              Questions, <em>answered plainly.</em>
            </h2>
            <div className="faq" style={{ marginTop: 32 }}>
              <details>
                <summary>
                  What exactly is a “Dozal”? <span className="pm">+</span>
                </summary>
                <p>
                  A Dozal is an AI employee: it works inside the apps you already use and takes real
                  actions — sending replies, updating records, reconciling, filing, following up —
                  rather than just suggesting what you should do. You describe the outcome; it does the
                  steps.
                </p>
              </details>
              <details>
                <summary>
                  Why is it only $25 to start? <span className="pm">+</span>
                </summary>
                <p>
                  We&apos;re early and would rather build a base of design partners than maximize revenue
                  on day one. Early accounts get a founding rate that we honor for the life of the
                  account, even after list prices rise.
                </p>
              </details>
              <details>
                <summary>
                  What counts as a “workflow”? <span className="pm">+</span>
                </summary>
                <p>
                  A workflow is a repeatable task you hand off — for example, “reconcile expenses and
                  reply to open client threads,” or “onboard a new vendor.” Starter covers one; Pro covers
                  up to five; Team is unlimited.
                </p>
              </details>
              <details>
                <summary>
                  Do I have to replace my current tools? <span className="pm">+</span>
                </summary>
                <p>
                  No. A Dozal overlays on the stack you already run. There&apos;s no migration — it
                  connects to your existing inbox, books, CRM and PM tools and works inside them.
                </p>
              </details>
              <details>
                <summary>
                  Is my data safe? <span className="pm">+</span>
                </summary>
                <p>
                  Yes. Data and credentials are encrypted in transit and at rest, access is scoped
                  app-by-app and revocable at any time, and every action is recorded in a replayable audit
                  log. See <Link className="textlink" href="/how-it-works">how it works</Link>.
                </p>
              </details>
              <details>
                <summary>
                  Can I cancel? <span className="pm">+</span>
                </summary>
                <p>Anytime. Plans are month-to-month with no lock-in.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="section ctaband wrap" id="cta" data-section="CTA">
        <span className="glint xl tw reveal"></span>
        <h2 className="reveal">
          Lock in the <em>founding rate</em>.
        </h2>
        <p className="sub reveal">
          Book a demo, bring one workflow, and if it&apos;s a fit you start at $25/mo — held for the life
          of the account.
        </p>
        <div className="row reveal">
          <Link className="btn btn--primary" href="/demo">
            Book a demo <span className="glint"></span>
          </Link>
          <Link className="btn btn--ghost" href="/how-it-works">
            See how it works
          </Link>
        </div>
      </section>
    </>
  );
}