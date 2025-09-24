
'use client';

import { useEffect } from 'react';
import { useCart } from './CartContext';
import { translations } from '../lib/translations';

interface CartNotificationProps {
  show: boolean;
  productName: string;
  onClose: () => void;
}

export default function CartNotification({ show, productName, onClose }: CartNotificationProps) {
  const { language } = useCart();
  const t = translations[language];

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-20 right-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-check-line text-green-600"></i>
        </div>
        <div>
          <p className="font-medium text-sm">
            {productName} {t.cart.itemAdded}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-green-600 hover:text-green-800 transition-colors cursor-pointer ml-2"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
}
