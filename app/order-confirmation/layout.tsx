import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ご注文ありがとうございます",
  description: "ご注文確認ページ。",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/order-confirmation` },
};

export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
