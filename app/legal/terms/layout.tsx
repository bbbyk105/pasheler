import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "Yawn Nap オンラインショップの利用規約。サービス利用条件、免責事項などを定めています。",
  alternates: { canonical: `${SITE_URL}/legal/terms` },
  robots: { index: true, follow: true },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
