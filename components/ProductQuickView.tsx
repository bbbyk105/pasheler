"use client";

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useCart } from "./CartContext";
import { Product } from "../lib/products";
import ProductDetail from "./ProductDetail";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variantId: string, quantity: number) => void;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  const { language } = useCart();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // モーダルが画面に出ているか
  const isShown = isOpen && !!product && product.variants.length > 0;

  // モーダル表示時にスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Esc で閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 開いたらフォーカスをモーダルの中（閉じるボタン）へ移し、閉じたら開いたボタンへ戻す
  useEffect(() => {
    if (!isShown) return;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();
    return () => opener?.focus();
  }, [isShown]);

  if (!product || !isShown) return null;

  // Tab をモーダルの中で回す（最後から進むと最初へ、最初から戻ると最後へ）。後ろのページへフォーカスを出さない
  const handleDialogKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    // 背景（モーダルの外側）を押すと閉じる
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じないように
        onKeyDown={handleDialogKeyDown}
      >
        {/* 閉じるボタンはスクロールする中身の外に置き、いつも右上に見えるようにする */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={language === "ja" ? "閉じる" : "Close"}
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-xl" aria-hidden></i>
        </button>

        <div className="overflow-y-auto overscroll-contain">
          {/* 商品が替わったら、選んだ種類・数量・写真を最初に戻す */}
          <ProductDetail
            key={product.id}
            product={product}
            layout="modal"
            titleId={titleId}
            onAddToCart={onAddToCart}
            onAdded={onClose}
          />
        </div>
      </div>
    </div>
  );
}
