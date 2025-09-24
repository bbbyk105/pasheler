export type Currency = "JPY" | "USD";

export const exchangeRates = {
  JPY_TO_USD: 0.0067,
  USD_TO_JPY: 149.25,
};

export const currencySymbols = {
  JPY: "¥",
  USD: "$",
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

  if (fromCurrency === "JPY" && toCurrency === "USD") {
    return price * exchangeRates.JPY_TO_USD;
  } else if (fromCurrency === "USD" && toCurrency === "JPY") {
    return price * exchangeRates.USD_TO_JPY;
  }

  return price;
};

export const getShippingFee = (currency: Currency): number => {
  return currency === "JPY" ? 550 : 5.5;
};
