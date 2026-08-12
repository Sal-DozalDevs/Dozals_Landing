import Link from "next/link";
import { Check } from "@/components/site/icons";

export const metadata = {
  title: "Use cases — DozalDevs",
  description:
    "Same Dozal, different desk. See how a Dozal executes real work for fractional CFOs, agency owners, solo practitioners, ops leads, consultants and studio leads.",
};

const USE_CASES = [
  {
    role: "The Fractional CFO",
    ctx: "Multiple clients · one inbox of dread",
    list: [
      "Categorizes last week's expenses across every client ledger",
      "Reconciles unreconciled transactions before they age",
      "Drafts client-facing variance notes and sends for approval",
      "Surfaces missing receipts; nudges the client; logs it",
    ],
    stack: ["quickbooks", "xero", "gmail", "sheets"],
  },
  {
    role: "The Agency Owner",
    ctx: "Five clients · zero project manager",
    list: [
      "Updates every client dashboard with this week's milestones",
      "Chases overdue deliverables without the awkward DM",
      "Drafts the Monday status email; queues it for send",
      "Logs billable hours from Slack messages and Loom links",
    ],
    stack: ["clickup", "notion", "slack", "harvest"],
  },
  {
    role: "The Solo Practitioner",
    ctx: "Billing for the work · not the admin",
    list: [
      "Drafts engagement letters from your templates; fills the blanks",
      "Sends the intake packet; tracks signature; files the PDF",
      "Answers “where are we on this?” in your voice",
      "Calendars every deadline, review, and follow-up",
    ],
    stack: ["clio", "docs", "docusign", "calendly"],
  },
  {
    role: "The Ops Lead",
    ctx: "Carrying the company's loose ends",
    list: [
      "Triages the shared inbox; routes; tags; closes the noise",
      "Onboards a vendor: collects the W-9, creates the record, opens the channel",
      "Builds the weekly ops report from five different sources",
      "Reminds every owner of what they promised last Thursday",
    ],
    stack: ["zendesk", "airtable", "slack", "sheets"],
  },
  {
    role: "The Independent Consultant",
    ctx: "Selling expertise · drowned in delivery",
    list: [
      "Turns call transcripts into formatted deliverables and proposals",
      "Updates the CRM with the contact, the ask, the follow-up date",
      "Sends the follow-up you meant to send two weeks ago",
      "Prepares the monthly retainer reports and sends them out",
    ],
    stack: ["hubspot", "notion", "docs", "fireflies"],
  },
  {
    role: "The Studio Lead",
    ctx: "Creative work · operational overhead",
    list: [
      "Organizes project files; renames; re-files; closes the stale ones",
      "Drafts client review notes and sends them after each round",
      "Logs revisions; flags the third one with the polite pushback",
      "Sends the invoice, then the reminder, then the second reminder",
    ],
    stack: ["frame.io", "notion", "stripe", "gmail"],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <header className="page-hero wrap" id="page-hero" data-section="Use Cases Hero">
        <span className="eyebrow">Use cases</span>
        <h1>Same Dozal. Different desk.</h1>
        <p className="deck">
          A Dozal doesn&apos;t come pre-loaded with one industry&apos;s playbook. It comes pre-loaded
          with <em>your</em> playbook — learned in shadow mode from the way you already work. Here are
          a few of the desks it sits behind.
        </p>
      </header>

      <section className="section" id="gallery" data-section="Gallery">
        <div className="wrap">
          <div className="grid-3">
            {USE_CASES.map((uc) => (
              <div className="uc" key={uc.role}>
                <h3>{uc.role}</h3>
                <p className="ctx">{uc.ctx}</p>
                <ul className="check-list">
                  {uc.list.map((li) => (
                    <li key={li}>
                      <Check />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
                <div className="apps">
                  {uc.stack.map((s) => (
                    <span className="chip-app" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" id="the-point" data-section="The Point">
        <div className="wrap stack">
          <h2>
            Different titles, <span className="word">one shared problem.</span>
          </h2>
          <p>
            The software tells them what to do, and then they still have to do it. A Dozal is the desk
            that does it.
          </p>
          <p style={{ marginTop: 26 }}>
            <Link className="textlink" href="/#start">
              Don&apos;t see your desk? Tell us what you&apos;d hand off →
            </Link>
          </p>
        </div>
      </section>

      <section className="section close" id="cta" data-section="CTA">
        <div className="wrap">
          <h2>Bring the task you dread most.</h2>
          <p className="lede">
            Whatever desk you sit at, there&apos;s a repetitive loop eating your week. Point a Dozal
            at it and watch it close.
          </p>
          <div className="row">
            <Link className="btn btn-cta" href="/#start">
              Get started
            </Link>
            <Link className="btn btn-ghost" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
