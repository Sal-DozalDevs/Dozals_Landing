import Link from "next/link";
import { Check } from "@/components/site/icons";

export const metadata = {
  title: "Pricing — DozalDevs",
  description:
    "Simple pricing that starts at a $10/mo founding rate, locked in for early partners. Starter, Pro, and Team plans.",
};

const PLANS = [
  {
    badge: "Founding rate",
    name: "Starter",
    tag: "1 organization, up to 20 dozals.",
    amt: "$10",
    per: "/ month",
    note: "Locked in for early partners",
    items: [
      "1 organization, up to 20 dozals",
      "Connect the apps you already use",
      "One-tap approvals",
      "The full record & replay",
      "Email support",
    ],
    cta: { label: "Get started", href: "/#start", primary: false },
    feature: false,
  },
  {
    badge: "Most popular",
    name: "Pro",
    tag: "Multiple jobs, higher limits, priority everything.",
    amt: "$79",
    per: "/ month",
    note: "Everything in Starter, plus —",
    items: [
      "3 organizations, 30 dozals per org",
      "Shadow-mode onboarding",
      "Multi-app, end-to-end execution",
      "Advanced guardrails & spending limits",
      "Priority support",
      "Call with our team",
    ],
    cta: { label: "Get started", href: "/#start", primary: true },
    feature: true,
  },
  {
    badge: "Custom",
    name: "Team",
    tag: "For firms running Dozals across a whole operation.",
    amt: "Let's talk",
    per: "",
    note: "Tailored to your stack",
    items: [
      "Unlimited jobs & seats",
      "Custom connections",
      "SSO & role-based access",
      "Security review & SLA",
      "Dedicated success manager",
      "Volume pricing",
    ],
    cta: { label: "Talk to us", href: "/#start", primary: false },
    feature: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <header className="page-hero wrap" id="page-hero" data-section="Pricing Hero">
        <span className="eyebrow">Pricing</span>
        <h1>Start at $10. Lock it in.</h1>
        <p className="deck">
          We&apos;re early, and we&apos;d rather build a base of partners than a big price tag. Early
          accounts get a founding rate that stays put — even when list prices rise later.
        </p>
      </header>

      <section className="section" id="plans" data-section="Plans">
        <div className="wrap">
          <div className="plans">
            {PLANS.map((p) => (
              <div className={`plan${p.feature ? " plan--feature" : ""}`} key={p.name}>
                <span className="badge">{p.badge}</span>
                <h3>{p.name}</h3>
                <p className="tag">{p.tag}</p>
                <div className="price">
                  <span className="amt">{p.amt}</span>
                  {p.per && <span className="per">{p.per}</span>}
                </div>
                <p className="note">{p.note}</p>
                <ul className="check-list">
                  {p.items.map((li) => (
                    <li key={li}>
                      <Check />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
                <div className="cta">
                  <Link
                    className={`btn ${p.cta.primary ? "btn-cta" : "btn-ghost"} full`}
                    href={p.cta.href}
                  >
                    {p.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="fineprint">
            Prices in USD. Cancel anytime — month-to-month, no lock-in. Founding rate honored for the
            life of the account.
          </p>
        </div>
      </section>

      <section className="section band" id="faq" data-section="FAQ">
        <div className="wrap">
          <div className="sec-head">
            <h2>Questions, answered plainly.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>
                What exactly is a “Dozal”? <span className="pm">+</span>
              </summary>
              <p>
                A Dozal works inside the apps you already use and takes real actions — sending
                replies, updating records, reconciling, filing, following up — rather than just
                suggesting what you should do. You describe the outcome; it does the steps.
              </p>
            </details>
            <details>
              <summary>
                Why is it only $10 to start? <span className="pm">+</span>
              </summary>
              <p>
                We&apos;re early and would rather build a base of design partners than maximize
                revenue on day one. Early accounts get a founding rate that we honor for the life of
                the account, even after list prices rise.
              </p>
            </details>
            <details>
              <summary>
                What counts as a “job”? <span className="pm">+</span>
              </summary>
              <p>
                A job is a repeatable task you hand off — for example, “reconcile expenses and reply
                to open client threads,” or “onboard a new vendor.” Starter covers one; Pro covers up
                to five; Team is unlimited.
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
                app-by-app and revocable at any time, and every action is written to a replayable
                record. See{" "}
                <Link className="textlink" href="/how-it-works">
                  how it works
                </Link>
                .
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
      </section>

      <section className="section close" id="cta" data-section="CTA">
        <div className="wrap">
          <h2>Lock in the founding rate.</h2>
          <p className="lede">
            Bring one real, recurring job, and if it&apos;s a fit you start at $10/mo — held for the
            life of the account.
          </p>
          <div className="row">
            <Link className="btn btn-cta" href="/#start">
              Get started
            </Link>
            <Link className="btn btn-ghost" href="/how-it-works">
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
