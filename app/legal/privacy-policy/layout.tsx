import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "Yawn Nap の個人情報の取り扱いについて。お客様の情報を適切に保護します。",
  alternates: { canonical: `${SITE_URL}/legal/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
