import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" data-section="Footer" className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__brand">
          <Link
            className="brand"
            href="/"
            style={{ gap: "12px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand__mark"
              src="/brand/DozalDevs_Symbol_OnLight.svg"
              alt="DozalDevs"
              style={{ width: "26px", height: "26px" }}
            />
            <span className="brand__name">Dozals</span>
          </Link>
          <p className="footer__tag">
            AI employees that respond, click, manage, edit and execute — inside the apps you already
            use.
          </p>
        </div>
        <div className="footer__col">
          <h5>Product</h5>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/use-cases">Use cases</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Book a demo</Link>
        </div>
        <div className="footer__col">
          <h5>Company</h5>
          <Link href="#">About DozalDevs</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Contact</Link>
        </div>
        <div className="footer__col">
          <h5>Trust</h5>
          <Link href="#">Security</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Status</Link>
        </div>
      </div>
      <div className="footer__bar">
        <div className="footer__bar-inner">
          <span>© 2026 DozalDevs</span>
          <span>Arrival, not surveillance</span>
        </div>
      </div>
    </footer>
  );
}