"use client";

import { translations } from "../lib/translations";
import { Language } from "../lib/types";

interface PickupConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  language: Language;
}

export default function PickupConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  language,
}: PickupConfirmModalProps) {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-600 text-xl">⚠️</span>
          </div>
          <h2 className="text-xl font-serif text-stone-800">
            {t.checkout.pickupWarningTitle}
          </h2>
        </div>

        {/* Message */}
        <p className="text-stone-600 mb-6 whitespace-pre-line leading-relaxed">
          {t.checkout.pickupWarningMessage}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors"
          >
            {t.checkout.backToDelivery}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors"
          >
            {t.checkout.confirmPickup}
          </button>
        </div>
      </div>
    </div>
  );
}
