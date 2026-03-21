import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "Yawn Nap オンラインショップの販売業者、代金の支払い・時期、返品・キャンセルなどの表記。",
  alternates: { canonical: `${SITE_URL}/legal/tokushoho` },
  robots: { index: true, follow: true },
};

export default function TokushohoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
