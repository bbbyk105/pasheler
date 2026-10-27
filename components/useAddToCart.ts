"use client";

import { useCallback, useState } from "react";
import { useCart } from "./CartContext";
import { productPrimaryImage, type Product } from "../lib/products";

/** 商品をカートに入れて「追加しました」の通知を出す（商品カード・クイックビュー共通） */
export function useAddToCart() {
  const { addToCart, language, currency } = useCart();
  const [notification, setNotification] = useState({
    show: false,
    productName: "",
  });

  const handleAddToCart = (
    product: Product,
    variantId: string,
    quantity: number = 1
  ) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant || variant.stock === 0) return;

    // quantityの回数分ループしてカートに追加
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        variantId: variant.id,
        name: product.name[language],
        price: variant.prices[currency],
        prices: variant.prices,
        image: productPrimaryImage(product),
        stock: variant.stock,
      });
    }

    setNotification({ show: true, productName: product.name[language] });
  };

  const closeNotification = useCallback(() => {
    setNotification({ show: false, productName: "" });
  }, []);

  return { handleAddToCart, notification, closeNotification };
}
