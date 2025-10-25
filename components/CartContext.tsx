"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Language, Currency, CartItem } from "../lib/types";

interface CartContextType {
  items: CartItem[];
  language: Language;
  currency: Currency;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
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
  const [language, setLanguage] = useState<Language>("ja");
  const [currency, setCurrency] = useState<Currency>("JPY");
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ 初回マウント時にlocalStorageから読み込み
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedLanguage = localStorage.getItem("language") as Language;
    const savedCurrency = localStorage.getItem("currency") as Currency;

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedCurrency) setCurrency(savedCurrency);

    setIsInitialized(true);
  }, []);

  // ✅ カートが変更されたらlocalStorageに保存
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // ✅ 言語が変更されたらlocalStorageに保存
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("language", language);
    }
  }, [language, isInitialized]);

  // ✅ 通貨が変更されたらlocalStorageに保存
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("currency", currency);
    }
  }, [currency, isInitialized]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.variantId === product.variantId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.variantId === product.variantId
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, variantId: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.variantId === variantId)
      )
    );
  };

  const updateQuantity = (id: number, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variantId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
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
      return total + item.price * item.quantity;
    }, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
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
        setCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
