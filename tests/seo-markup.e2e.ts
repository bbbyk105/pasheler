import { test } from "@e2e-dev/web";
import { expect } from "e2e";

/**
 * 検索エンジンが読む HTML の形（SEO の 112 項目チェック、2026-11-02）。
 *
 * - 見出しタグは main の中だけで使う。ヘッダー・フッター・カートの引き出し・法務ページの横のメニューに
 *   見出しタグがあると、h1 より前に h2・h3 が並ぶ
 * - 構造化データ（JSON-LD）は、最初に返す HTML に入れる。next/script の <Script> で出すと、
 *   サーバーの HTML には入らず、読み込み後に JS で差し込まれる
 */

for (const path of [
  "/",
  "/catalog",
  "/products/fuji-hinoki-candle",
  "/blog",
  "/contact",
  "/legal/terms",
  "/no-such-page",
]) {
  test(`${path} は見出しタグを main の中だけで使う`, async ({ app, screen, browser }) => {
    await app.open(path);
    await expect(screen.getByRole("heading", { level: 1 })).toBeVisible();

    const outsideMain = await browser.evaluate(() =>
      Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .filter((heading) => !heading.closest("main"))
        .map((heading) => `${heading.tagName} ${heading.textContent?.trim()}`),
    );
    expect(outsideMain).toEqual([]);
  });
}

test("トップの h1 は日本語の「富士山ひのきフレグランス」", async ({ app, screen }) => {
  await app.open("/");
  const h1 = screen.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText("富士山ひのきフレグランス");
  // 大きな英字は h1 と同じことを言う飾りなので、読み上げでは飛ばす
  await expect(screen.getByText("MT. FUJI FRAGRANCE")).toHaveAttribute("aria-hidden", "true");
});

// ブログ一覧・お問い合わせも同じ。大きな英字は飾りで、h1 は日本語
for (const [path, h1, english] of [
  ["/blog", "ブログ", "BLOGS"],
  ["/contact", "お問い合わせ", "Contact"],
] as const) {
  test(`${path} の h1 は日本語の「${h1}」で、英字の「${english}」は飾り`, async ({ app, screen }) => {
    await app.open(path);
    const heading = screen.getByRole("heading", { level: 1 });
    await expect(heading).toHaveCount(1);
    await expect(heading).toHaveText(h1);
    // メニューにも同じ英字のリンクがあるので、main の中で探す
    await expect(screen.getByRole("main").getByText(english)).toHaveAttribute("aria-hidden", "true");
  });
}

test("フッターと法務ページの横のメニューは、ナビに名前が付いている（見出しタグをやめた代わり）", async ({
  app,
  screen,
}) => {
  await app.open("/");
  await expect(screen.getByRole("navigation", "ショップ")).toBeVisible();
  await expect(screen.getByRole("navigation", "法的情報")).toBeVisible();

  await app.open("/legal/terms");
  await expect(screen.getByRole("navigation", "法務情報")).toBeVisible();
});

const metaOf = (html: string, attribute: "property" | "name", key: string) =>
  html.match(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`))?.[1];

test("OGP を書いていないページは、ルートの layout からトップの og:url・タイトル・説明を引き継がない", async ({
  app,
}) => {
  const home = await (await fetch(new URL("/", app.baseUrl))).text();
  expect(metaOf(home, "property", "og:url")).toBe("https://www.yawnnap.shop");

  for (const path of ["/legal/terms", "/no-such-page"]) {
    const html = await (await fetch(new URL(path, app.baseUrl))).text();
    expect(metaOf(html, "property", "og:url"), path).not.toBe("https://www.yawnnap.shop");
    for (const [attribute, key] of [
      ["property", "og:title"],
      ["property", "og:description"],
      ["name", "twitter:title"],
      ["name", "twitter:description"],
    ] as const) {
      const value = metaOf(html, attribute, key);
      expect(value === undefined || !value.startsWith("Yawn Nap | Hinoki"), `${path} ${key}: ${value}`).toBe(true);
      expect(value, `${path} ${key}`).not.toBe(metaOf(home, attribute, key));
    }
  }
});

test("商品一覧の構造化データ（パンくず・商品ページの一覧）は、最初に返す HTML に入っている", async ({ app }) => {
  const html = await (await fetch(new URL("/catalog", app.baseUrl))).text();
  const nodes = Array.from(
    html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ).flatMap(([, json]) => {
    const data = JSON.parse(json);
    return data["@graph"] ?? [data];
  });

  expect(nodes.map((node) => node["@type"])).toContain("BreadcrumbList");
  const list = nodes.find((node) => node["@type"] === "ItemList");
  expect(list?.itemListElement.map((element: { url: string }) => element.url)).toContain(
    "https://www.yawnnap.shop/products/fuji-hinoki-candle",
  );
});

// 写真のリンクは商品名のリンクと同じ行き先なので、読み上げからは外している（aria-hidden）。
// alt は検索エンジンが読む HTML で確かめる
test("商品一覧の画像の alt は商品名だけ（キャンドルを「フレグランスペーパー」と書かない）", async ({ app }) => {
  const html = await (await fetch(new URL("/catalog", app.baseUrl))).text();
  expect(html).toContain('alt="富士ヒノキキャンドル"');
  expect(html).not.toContain("（フレグランスペーパー）");
});

test("存在しないページは 404 を返し、日本語の案内とトップへのリンクを出す", async ({ app, screen, browser }) => {
  const response = await fetch(new URL("/no-such-page", app.baseUrl));
  expect(response.status).toBe(404);
  const html = await response.text();
  // canonical を書いていないページが、ルートの layout からトップの canonical を引き継がない
  expect(html).not.toContain('rel="canonical"');
  // robots は noindex だけ。ルートの layout の「index, follow」と食い違わない
  const robots = Array.from(html.matchAll(/<meta name="robots" content="([^"]*)"/g), ([, content]) => content);
  expect(robots.length).toBeGreaterThan(0);
  expect(robots.filter((content) => !content.includes("noindex"))).toEqual([]);

  await app.open("/no-such-page");
  await expect(browser).toHaveTitle("ページが見つかりませんでした | Yawn Nap");
  const h1 = screen.getByRole("heading", { level: 1 });
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText("ページが見つかりませんでした");
  await screen.getByRole("link", "トップページへ").tap();
  await expect(browser).toHaveURL("/");
});

/**
 * ページの中で notFound() を呼ぶ 404（ブログの記事・ページ番号）。
 * Next.js 16.4 では、このときの最初の HTML は本文が空（<html id="__next_error__">）で、
 * 案内は JS が読み込まれてから出る。404 と noindex は最初から返るので、検索には載らない
 */
for (const path of ["/blog/no-such-post", "/blog/page/999"]) {
  test(`${path}（ブログの中の存在しないページ）は 404 を返し、画面に 404 の案内を出す`, async ({ app, screen }) => {
    const response = await fetch(new URL(path, app.baseUrl));
    expect(response.status).toBe(404);

    await app.open(path);
    await expect(screen.getByRole("heading", { level: 1 })).toHaveText("ページが見つかりませんでした");
  });
}
