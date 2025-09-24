
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, Currency, CartItem } from '../lib/types';
import { convertPrice, formatPrice } from '../lib/currency';

interface CartContextType {
  items: CartItem[];
  language: Language;
  currency: Currency;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, variantId: string) => void;
  updateQuantity: (id: number, variantId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<Language>('ja');
  const [currency, setCurrency] = useState<Currency>('JPY');

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedCurrency = localStorage.getItem('currency') as Currency;
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.variantId === product.variantId
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.variantId === product.variantId
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, variantId: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.variantId === variantId))
    );
  };

  const updateQuantity = (id: number, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variantId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.variantId === variantId 
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const priceInCurrentCurrency = convertPrice(item.price, 'JPY', currency);
      return total + (priceInCurrentCurrency * item.quantity);
    }, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      language,
      currency,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      clearCart,
      setLanguage,
      setCurrency
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
