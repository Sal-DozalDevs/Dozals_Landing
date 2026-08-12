import RevealOnScroll from "@/components/site/reveal";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RevealOnScroll />
    </>
  );
}