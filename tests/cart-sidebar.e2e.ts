import { test } from "@e2e-dev/web";
import { expect } from "e2e";

/**
 * カートの引き出し（components/CartSidebar.tsx）。
 *
 * 閉じているあいだは画面の右の外に置いてあるだけだと、影が画面の右端に帯になって出て、
 * キーボードや読み上げでも中に入れてしまう。閉じているあいだは見えなくする（visibility: hidden。DOM には残る）。
 */
test("閉じているカートは見えず、開け閉めできる", async ({ app, screen }) => {
  await app.open("/catalog");
  // 引き出しの「ショッピングカート」は全ページに入るので見出しタグにしていない（tests/seo-markup.e2e.ts）。
  // 代わりに名前の付いた aside（complementary）にして、読み上げでも見つけられるようにしている
  const cart = screen.getByRole("complementary", "ショッピングカート");
  await expect(cart).toBeHidden();

  await screen.getByRole("button", "カート（0個の商品）").tap();
  await expect(cart).toBeVisible();

  await screen.getByRole("button", "カートを閉じる").tap();
  await expect(cart).toBeHidden();
});
