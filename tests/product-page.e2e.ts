import { test } from "@e2e-dev/web";
import { expect } from "e2e";

/**
 * 商品ごとのページ（/products/{slug}）。
 *
 * 商品は一覧（/catalog）とクイックビューにしか無く、商品名で検索されても着地するページが無かった。
 * 商品ページに名前・説明・使い方・構造化データを置き、一覧やトップのカードからリンクする。
 */
const YUZU = "富士ヒノキ × ゆずキャンドル";
const YUZU_PATH = "/products/fuji-hinoki-yuzu-candle";

test("商品ページは、最初に返す HTML に h1・canonical・商品の構造化データが入っている", async ({ app }) => {
  const response = await fetch(new URL(YUZU_PATH, app.baseUrl));
  expect(response.status).toBe(200);
  const html = await response.text();

  expect(html).toContain(`<link rel="canonical" href="https://www.yawnnap.shop${YUZU_PATH}"/>`);
  expect(html).toMatch(new RegExp(`<h1[^>]*>${YUZU}</h1>`));

  const nodes = Array.from(
    html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ).flatMap(([, json]) => {
    const data = JSON.parse(json);
    return data["@graph"] ?? [data];
  });
  const product = nodes.find((node) => node["@type"] === "Product");
  expect(product?.name).toBe(YUZU);
  expect(product?.offers.url).toBe(`https://www.yawnnap.shop${YUZU_PATH}`);
  expect(nodes.map((node) => node["@type"])).toContain("BreadcrumbList");

  // 共有したときの画像は、サイト共通の 1200x630 の PNG（商品写真は WebP で、読めないアプリがある）
  expect(html).toMatch(/<meta property="og:image" content="[^"]*\/opengraph-image[^"]*"/);
  // 写真の列は最大でおよそ 560px。画面の半分（50vw）で指定すると、広い画面で大きすぎる画像を読む
  expect(html).toContain('sizes="(max-width: 768px) 100vw, 576px"');
});

test("トップのカードは、写真の左下（カテゴリの札のところ）を押しても商品ページへ移る", async ({
  app,
  screen,
  browser,
}) => {
  await app.open("/");
  // 写真のリンクは読み上げから外している（aria-hidden）ので、役割では探せない
  const photo = browser.locator('a[aria-hidden="true"][href="/products/fuji-hinoki-candle"]');
  await photo.scrollIntoView();
  const box = await photo.boundingBox();
  expect(box).not.toBeNull();
  await screen.tapAt({ x: box!.x + 28, y: box!.y + box!.height - 28 });
  await expect(browser).toHaveURL("/products/fuji-hinoki-candle");
});

test("商品ページにはパンくずがあり、カートに入れられる", async ({ app, screen }) => {
  await app.open(YUZU_PATH);
  await expect(screen.getByRole("heading", YUZU, { level: 1 })).toBeVisible();

  const breadcrumb = screen.getByRole("navigation", "パンくずリスト");
  await expect(breadcrumb.getByRole("link", "ホーム")).toHaveAttribute("href", "/");
  await expect(breadcrumb.getByRole("link", "商品一覧")).toHaveAttribute("href", "/catalog");

  await screen.getByRole("button", "カートに追加").tap();
  await expect(screen.getByRole("button", "カート（1個の商品）")).toBeVisible();
});

test("商品一覧の商品名から、商品ページへ移れる", async ({ app, screen, browser }) => {
  await app.open("/catalog");
  await screen.getByRole("link", YUZU).tap();
  await expect(browser).toHaveURL(YUZU_PATH);
  await expect(screen.getByRole("heading", YUZU, { level: 1 })).toBeVisible();
});

test("トップの商品カードも、商品ページへリンクしている", async ({ app, screen }) => {
  await app.open("/");
  await expect(screen.getByRole("link", "富士ヒノキキャンドル")).toHaveAttribute(
    "href",
    "/products/fuji-hinoki-candle",
  );
  await expect(screen.getByRole("link", "富士山 ひのきフレグランスペーパー (木型)")).toHaveAttribute(
    "href",
    "/products/hinoki-fragrance-paper-tree",
  );
});

test("存在しない商品の URL は 404", async ({ app }) => {
  const response = await fetch(new URL("/products/no-such-product", app.baseUrl));
  expect(response.status).toBe(404);
});
