"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Language, Currency, CartItem } from "../lib/types";
import { products } from "../lib/products";

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

  // ✅ 商品データから価格情報を取得する関数
  const getPricesForItem = (productId: number, variantId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return null;

    return variant.prices;
  };

  // ✅ 初回マウント時にlocalStorageから読み込み
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedLanguage = localStorage.getItem("language") as Language;
    const savedCurrency = localStorage.getItem("currency") as Currency;

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        // ✅ 商品データから最新の価格情報を取得して復元
        const restoredCart = parsedCart
          .map((item: any) => {
            const prices = getPricesForItem(item.id, item.variantId);

            if (!prices) {
              console.warn("Product not found, removing from cart:", item);
              return null; // 商品が見つからない場合はスキップ
            }

            return {
              ...item,
              prices, // 商品データから取得した最新の価格
              price: prices[savedCurrency || "JPY"], // 保存されていた通貨での価格
            };
          })
          .filter(Boolean); // null を除外

        setItems(restoredCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedCurrency) setCurrency(savedCurrency);

    setIsInitialized(true);
  }, []);

  // ✅ カートが変更されたらlocalStorageに保存（簡略版）
  useEffect(() => {
    if (isInitialized) {
      // pricesは保存しない（商品データから取得するため）
      const cartToSave = items.map((item) => ({
        id: item.id,
        variantId: item.variantId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        stock: item.stock,
      }));
      localStorage.setItem("cart", JSON.stringify(cartToSave));
    }
  }, [items, isInitialized]);

  // ✅ 言語が変更されたらlocalStorageに保存
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("language", language);
    }
  }, [language, isInitialized]);

  // ✅ 通貨が変更されたら、カート内の価格を更新
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("currency", currency);

      // 商品データから最新の価格を取得して更新
      setItems((prevItems) =>
        prevItems.map((item) => {
          const prices = getPricesForItem(item.id, item.variantId);

          if (!prices) {
            console.error("Cannot find prices for item:", item);
            return item;
          }

          return {
            ...item,
            prices,
            price: prices[currency],
          };
        })
      );
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
