import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import { LogoSprite } from "@/components/site/logo";
import { LanguageProvider } from "@/components/site/lang";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <LogoSprite />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
