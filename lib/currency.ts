export type Currency = "JPY" | "AUD";

export const currencySymbols = {
  JPY: "¥",
  AUD: "A$",
};

export const formatPrice = (price: number, currency: Currency): string => {
  const symbol = currencySymbols[currency];

  if (currency === "JPY") {
    return `${symbol}${Math.round(price).toLocaleString("ja-JP")}`;
  } else {
    return `${symbol}${price.toFixed(2)}`;
  }
};

// 固定送料
export const shippingFees = {
  JPY: 550,
  AUD: 6,
};

export const getShippingFee = (currency: Currency): number => {
  return shippingFees[currency];
};
