"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import PhraseText from "./PhraseText";
import { translations } from "../lib/translations";

/** 404 の案内（見出し・説明・トップなどへのリンク）。言語の切り替えに合わせるのでクライアント側（app/not-found.tsx から使う） */
export default function NotFoundMessage() {
  const { language } = useCart();
  const t = translations[language].notFound;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-sm tracking-[0.3em] text-stone-400 mb-4">404</p>
      <h1 className="text-3xl font-serif text-stone-800 mb-4">{t.title}</h1>
      <p className="text-stone-600 leading-relaxed mb-10 break-keep">
        <PhraseText text={t.message} />
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap"
        >
          {t.home}
        </Link>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap"
        >
          {t.catalog}
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap"
        >
          {t.blog}
        </Link>
      </div>
    </div>
  );
}
