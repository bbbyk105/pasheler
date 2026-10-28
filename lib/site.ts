/** 正規URL（canonical / OG / 構造化データ / Stripe リダイレクトのフォールバック） */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.yawnnap.shop"
).replace(/\/$/, "");

/** トップの富士ヒノキの章（旧 hinokifragrance.com の LP の欄）。ヘッダーなどからここへ飛ぶ */
export const HINOKI_SECTION_ID = "fuji-hinoki";
export const HINOKI_SECTION_HREF = `/#${HINOKI_SECTION_ID}`;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
