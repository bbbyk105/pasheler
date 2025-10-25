import { Currency } from "./types";

// 為替レート（固定）
export const EXCHANGE_RATE = 100; // 1 AUD = 100 JPY

// 送料無料の閾値
export const FREE_SHIPPING_THRESHOLD = {
  JPY: {
    domestic: 10000, // 日本国内: 10,000円以上
    international: 30000, // 海外: 30,000円以上
  },
  AUD: {
    domestic: 100, // 日本国内: 100 AUD以上（通常使われない）
    international: 300, // 海外: 300 AUD以上
  },
};

// 配送地域の定義
export type ShippingRegion =
  | "japan"
  | "china-korea-taiwan"
  | "asia"
  | "oceania"
  | "americas"
  | "europe"
  | "latin-america";

// 国別の送料（JPY建て）
export const SHIPPING_FEES_JPY: Record<ShippingRegion, number> = {
  japan: 350,
  "china-korea-taiwan": 1450,
  asia: 1900,
  oceania: 3150,
  americas: 3900,
  europe: 3150,
  "latin-america": 3600,
};

// 国のリスト
export interface Country {
  code: string;
  name: {
    ja: string;
    en: string;
  };
  region: ShippingRegion;
}

export const COUNTRIES: Country[] = [
  // 日本
  { code: "JP", name: { ja: "日本", en: "Japan" }, region: "japan" },

  // 中国・韓国・台湾
  {
    code: "CN",
    name: { ja: "中国", en: "China" },
    region: "china-korea-taiwan",
  },
  {
    code: "KR",
    name: { ja: "韓国", en: "South Korea" },
    region: "china-korea-taiwan",
  },
  {
    code: "TW",
    name: { ja: "台湾", en: "Taiwan" },
    region: "china-korea-taiwan",
  },

  // アジア
  { code: "SG", name: { ja: "シンガポール", en: "Singapore" }, region: "asia" },
  { code: "TH", name: { ja: "タイ", en: "Thailand" }, region: "asia" },
  { code: "VN", name: { ja: "ベトナム", en: "Vietnam" }, region: "asia" },
  { code: "MY", name: { ja: "マレーシア", en: "Malaysia" }, region: "asia" },
  { code: "PH", name: { ja: "フィリピン", en: "Philippines" }, region: "asia" },
  { code: "ID", name: { ja: "インドネシア", en: "Indonesia" }, region: "asia" },
  { code: "IN", name: { ja: "インド", en: "India" }, region: "asia" },

  // オセアニア
  {
    code: "AU",
    name: { ja: "オーストラリア", en: "Australia" },
    region: "oceania",
  },
  {
    code: "NZ",
    name: { ja: "ニュージーランド", en: "New Zealand" },
    region: "oceania",
  },

  // アメリカ
  {
    code: "US",
    name: { ja: "アメリカ合衆国", en: "United States" },
    region: "americas",
  },
  { code: "CA", name: { ja: "カナダ", en: "Canada" }, region: "oceania" },
  { code: "MX", name: { ja: "メキシコ", en: "Mexico" }, region: "oceania" },

  // ヨーロッパ
  {
    code: "GB",
    name: { ja: "イギリス", en: "United Kingdom" },
    region: "europe",
  },
  { code: "FR", name: { ja: "フランス", en: "France" }, region: "europe" },
  { code: "DE", name: { ja: "ドイツ", en: "Germany" }, region: "europe" },
  { code: "IT", name: { ja: "イタリア", en: "Italy" }, region: "europe" },
  { code: "ES", name: { ja: "スペイン", en: "Spain" }, region: "europe" },
  { code: "NL", name: { ja: "オランダ", en: "Netherlands" }, region: "europe" },

  // 中南米
  {
    code: "BR",
    name: { ja: "ブラジル", en: "Brazil" },
    region: "latin-america",
  },
  {
    code: "AR",
    name: { ja: "アルゼンチン", en: "Argentina" },
    region: "latin-america",
  },
  { code: "CL", name: { ja: "チリ", en: "Chile" }, region: "latin-america" },
];

/**
 * 国コードから地域を取得
 */
export const getRegionByCountryCode = (countryCode: string): ShippingRegion => {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  return country?.region || "asia"; // デフォルトはアジア
};

/**
 * 送料を計算（通貨に応じた金額を返す）
 */
interface CalculateShippingFeeParams {
  countryCode: string;
  subtotal: number;
  currency: Currency;
  deliveryMethod: "delivery" | "pickup";
}

export const calculateShippingFee = ({
  countryCode,
  subtotal,
  currency,
  deliveryMethod,
}: CalculateShippingFeeParams): number => {
  // 対面受け取りの場合は送料無料
  if (deliveryMethod === "pickup") {
    return 0;
  }

  const region = getRegionByCountryCode(countryCode);
  const baseFeeJPY = SHIPPING_FEES_JPY[region];

  // 送料無料の判定
  if (region === "japan") {
    // 日本国内: 10,000円以上で送料無料
    if (
      currency === "JPY" &&
      subtotal >= FREE_SHIPPING_THRESHOLD.JPY.domestic
    ) {
      return 0;
    }
    if (
      currency === "AUD" &&
      subtotal >= FREE_SHIPPING_THRESHOLD.AUD.domestic
    ) {
      return 0;
    }
  } else {
    // 海外: 30,000円（300 AUD）以上で送料無料
    if (
      currency === "JPY" &&
      subtotal >= FREE_SHIPPING_THRESHOLD.JPY.international
    ) {
      return 0;
    }
    if (
      currency === "AUD" &&
      subtotal >= FREE_SHIPPING_THRESHOLD.AUD.international
    ) {
      return 0;
    }
  }

  // 通貨に応じて送料を返す
  if (currency === "JPY") {
    return baseFeeJPY;
  } else {
    // AUDの場合は為替レートで変換
    return Math.round((baseFeeJPY / EXCHANGE_RATE) * 100) / 100; // 小数点2桁
  }
};

/**
 * 送料の説明文を取得
 */
export const getShippingDescription = (
  countryCode: string,
  currency: Currency,
  language: "ja" | "en"
): string => {
  const region = getRegionByCountryCode(countryCode);
  const country = COUNTRIES.find((c) => c.code === countryCode);
  const countryName = country?.name[language] || "";

  const baseFeeJPY = SHIPPING_FEES_JPY[region];
  const feeInCurrency =
    currency === "JPY"
      ? baseFeeJPY
      : Math.round((baseFeeJPY / EXCHANGE_RATE) * 100) / 100;

  const currencySymbol = currency === "JPY" ? "¥" : "A$";
  const feeText =
    currency === "JPY"
      ? `${currencySymbol}${feeInCurrency.toLocaleString()}`
      : `${currencySymbol}${feeInCurrency.toFixed(2)}`;

  if (language === "ja") {
    if (region === "japan") {
      return `${countryName}への配送料: ${feeText}（10,000円以上で送料無料）`;
    } else {
      return `${countryName}への配送料: ${feeText}（30,000円以上で送料無料）`;
    }
  } else {
    if (region === "japan") {
      return `Shipping to ${countryName}: ${feeText} (Free over 10,000 JPY)`;
    } else {
      return `Shipping to ${countryName}: ${feeText} (Free over 300 AUD)`;
    }
  }
};
