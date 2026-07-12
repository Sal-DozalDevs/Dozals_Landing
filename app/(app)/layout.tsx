import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — DozalDevs",
  description: "AI Employee Dashboard",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0B0A08] antialiased selection:bg-[#D0342C]/25">
      {children}
    </div>
  );
}