export type Language = "ja" | "en";
export type Currency = "JPY" | "AUD";

export interface CartItem {
  id: number;
  variantId: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface DeliveryMethod {
  id: "delivery" | "pickup";
  name: string;
  fee: number;
  description?: string;
}
