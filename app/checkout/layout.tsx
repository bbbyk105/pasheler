import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ご注文手続き",
  description: "お支払い・配送情報のご入力。",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/checkout` },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
