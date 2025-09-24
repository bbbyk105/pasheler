// utils/currency.ts

export type Currency = "JPY" | "AUD";

// 最新の為替レート（2025年9月24日現在）
export const exchangeRates = {
  JPY_TO_AUD: 0.0103, // 1円 = 0.0103豪ドル（97.30円/1AUDから逆算）
  AUD_TO_JPY: 97.3, // 1豪ドル = 97.30円
};

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

export const convertPrice = (
  price: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  if (fromCurrency === toCurrency) return price;

  if (fromCurrency === "JPY" && toCurrency === "AUD") {
    return price * exchangeRates.JPY_TO_AUD;
  } else if (fromCurrency === "AUD" && toCurrency === "JPY") {
    return price * exchangeRates.AUD_TO_JPY;
  }

  return price;
};

export const getShippingFee = (currency: Currency): number => {
  return currency === "JPY" ? 550 : 5.65; // 550円 ≈ 5.65豪ドル（550 * 0.0103）
};
