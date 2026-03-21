import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ショッピングカート",
  description: "Yawn Nap のショッピングカート。",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/cart` },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
