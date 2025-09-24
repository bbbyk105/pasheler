
'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { formatPrice, convertPrice } from '../lib/currency';
import { translations } from '../lib/translations';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart, language, currency } = useCart();
  const totalPrice = getTotalPrice();
  const t = translations[language];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-xl font-serif text-stone-800">{t.cart.title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Empty Cart */}
          {items.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-16 h-16 flex items-center justify-center bg-stone-100 rounded-full mb-4">
                <i className="ri-shopping-bag-line text-2xl text-stone-600"></i>
              </div>
              <h3 className="text-lg font-serif text-stone-800 mb-2">{t.cart.empty}</h3>
              <p className="text-stone-600 text-center mb-6">{t.cart.emptyMessage}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.common.continueShopping}
              </button>
            </div>
          )}

          {/* Cart Items */}
          {items.length > 0 && (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {items.map((item) => {
                    const priceInCurrentCurrency = convertPrice(item.price, 'JPY', currency);
                    const totalItemPrice = priceInCurrentCurrency * item.quantity;
                    
                    return (
                      <div key={`${item.id}-${item.variantId}`} className="flex gap-4 p-4 bg-stone-50 rounded-lg">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium text-stone-800 text-sm">{item.name}</h3>
                          <p className="text-stone-600 text-xs">{item.size}</p>
                          <p className="text-stone-600 text-sm">{formatPrice(priceInCurrentCurrency, currency)}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-stone-300 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                              >
                                <i className="ri-subtract-line text-xs"></i>
                              </button>
                              <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <i className="ri-add-line text-xs"></i>
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id, item.variantId)}
                              className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <i className="ri-delete-bin-line text-xs"></i>
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-stone-800 text-sm">
                            {formatPrice(totalItemPrice, currency)}
                          </p>
                          {item.stock <= 5 && (
                            <p className="text-xs text-orange-600 mt-1">
                              {language === 'ja' ? `残り${item.stock}個` : `${item.stock} left`}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-stone-200 p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">{t.common.subtotal}</span>
                  <span className="font-medium text-stone-800">{formatPrice(totalPrice, currency)}</span>
                </div>
                
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="block w-full py-3 bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer text-center"
                  >
                    {t.common.checkout}
                  </Link>
                  
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="block w-full py-3 text-center border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {t.common.viewCart}
                  </Link>
                  
                  <button
                    onClick={() => {
                      clearCart();
                      onClose();
                    }}
                    className="w-full text-center text-xs text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
                  >
                    {t.cart.clearCart}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
