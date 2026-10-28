import { describe, test } from "@e2e-dev/web";
import { expect } from "e2e";

/**
 * 商品のクイックビュー（components/ProductQuickView.tsx）。
 *
 * 一覧（/catalog）の目のボタンから開く。マウスでは乗せたときだけボタンが出るので、乗せてから押す。
 */

const YUZU = "富士ヒノキ × ゆずキャンドル";

describe("商品のクイックビュー", () => {
  test("写真がすべて表示される", async ({ app, screen, browser }) => {
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    await expect(screen.getByRole("heading", YUZU, { level: 2 })).toBeVisible();

    const thumbnails = screen.getByRole("tablist", "商品画像の切り替え").getByRole("tab");
    const count = await thumbnails.count();
    expect(count).toBeGreaterThan(1);
    // 切り替えの小さい写真が、どれも読み込めている（ファイルが無いと naturalWidth が 0 のまま）
    await expect
      .poll(() =>
        browser.evaluate(
          () =>
            [...document.querySelectorAll<HTMLImageElement>('[role="tablist"] img')].filter(
              (img) => img.complete && img.naturalWidth > 0,
            ).length,
        ),
      )
      .toBe(count);
  });

  test("商品説明の改行が、そのまま改行として出る", async ({ app, screen, browser }) => {
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    await expect(screen.getByRole("heading", YUZU, { level: 2 })).toBeVisible();

    // lib/products.ts の説明は「…オレンジ色です。\n\n内容量：100ml」。innerText は表示どおりの改行を返す
    const description = await browser.evaluate(
      () =>
        [...document.querySelectorAll("p")].find(
          (p) => p.textContent?.includes("ゆずのオイル") && p.textContent.includes("内容量"),
        )?.innerText ?? null,
    );
    expect(description).toContain("\n内容量：100ml");
  });

  test("スマホの幅でも横にはみ出さず、閉じるボタンが画面の中にあって閉じられる", async ({
    app,
    screen,
    browser,
  }) => {
    await browser.setViewport({ width: 390, height: 844 });
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    const heading = screen.getByRole("heading", YUZU, { level: 2 });
    await expect(heading).toBeVisible();

    // 幅いっぱいのボタンの右端が画面の中にあれば、中身が横にはみ出していない
    const addToCartBox = await screen.getByRole("button", "カートに追加").boundingBox();
    expect(addToCartBox).not.toBeNull();
    expect(addToCartBox!.x + addToCartBox!.width).toBeLessThanOrEqual(390);

    const close = screen.getByRole("button", "閉じる");
    const closeBox = await close.boundingBox();
    expect(closeBox).not.toBeNull();
    expect(closeBox!.x + closeBox!.width).toBeLessThanOrEqual(390);
    expect(closeBox!.y).toBeGreaterThanOrEqual(0);
    expect(closeBox!.y + closeBox!.height).toBeLessThanOrEqual(844);

    await close.tap();
    await expect(heading).toBeHidden();
  });

  test("外側を押すと閉じる", async ({ app, screen }) => {
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    const heading = screen.getByRole("heading", YUZU, { level: 2 });
    await expect(heading).toBeVisible();

    // 画面の左端はモーダルの外（モーダルは中央寄せで max-w-4xl）
    await screen.tapAt({ x: 8, y: 300 });
    await expect(heading).toBeHidden();
  });

  test("開くとモーダルの中にフォーカスが移り、閉じると開いたボタンに戻る", async ({
    app,
    screen,
    browser,
  }) => {
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    await expect(screen.getByRole("button", "閉じる")).toBeFocused();

    await browser.keyboard.press("Escape");
    await expect(screen.getByRole("heading", YUZU, { level: 2 })).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("Tab で動かしても、フォーカスがモーダルの外（後ろのページ）へ出ない", async ({
    app,
    screen,
    browser,
  }) => {
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    const close = screen.getByRole("button", "閉じる");
    await expect(close).toBeFocused();

    // 最初（閉じる）から戻ると最後（カートに追加）へ、最後から進むと最初へ回る
    await browser.keyboard.press("Shift+Tab");
    await expect(screen.getByRole("button", "カートに追加")).toBeFocused();
    await browser.keyboard.press("Tab");
    await expect(close).toBeFocused();
  });

  test("Esc で閉じる", async ({ app, screen, browser }) => {
    await app.open("/catalog");
    const open = screen.getByRole("button", `${YUZU}のクイックビュー`);
    await open.hover();
    await open.tap();
    const heading = screen.getByRole("heading", YUZU, { level: 2 });
    await expect(heading).toBeVisible();

    await browser.keyboard.press("Escape");
    await expect(heading).toBeHidden();
  });
});
