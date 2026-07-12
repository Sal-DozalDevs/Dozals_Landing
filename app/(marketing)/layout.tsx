import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora, Work_Sans } from "next/font/google";
import "../globals.css";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import RevealOnScroll from "@/components/site/reveal";


const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dozals — AI employees that actually do the work",
  description:
    "Dozals are AI employees that respond, click, manage, edit and execute real work inside the apps you already use. They don't hand you a to-do list. They close it.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${lora.variable} ${workSans.variable}`}
    >
      <body suppressHydrationWarning>
        <div className="app">
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <RevealOnScroll />
        </div>

      </body>
    </html>
  );
}
