/** 正規URL（canonical / OG / 構造化データ / Stripe リダイレクトのフォールバック） */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.yawnnap.shop"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
