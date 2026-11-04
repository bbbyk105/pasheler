import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundMessage from "@/components/NotFoundMessage";

export const metadata: Metadata = {
  title: "ページが見つかりませんでした",
  // Next.js が noindex を足すが、ルートの layout の「index, follow」も一緒に出て食い違うので、ここでそろえる
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-24 px-6">
        <NotFoundMessage />
      </main>
      <Footer />
    </div>
  );
}
