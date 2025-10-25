export type Language = "ja" | "en";
export type Currency = "JPY" | "AUD";

export interface CartItem {
  id: number;
  variantId: string;
  name: string;
  price: number; // 現在の通貨での価格
  prices: { JPY: number; AUD: number }; // ✅ 全通貨の価格を保存
  image: string;
  quantity: number;
  stock: number;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  fee: number;
  description: string;
}
