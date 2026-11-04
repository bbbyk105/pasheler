import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { findProductBySlug, productDisplayName, productPath, products } from "./products";

const publicPath = (src: string) => path.join(process.cwd(), "public", src);

describe("products", () => {
  it("商品ページの URL（slug）は、商品ごとに違う英小文字・数字・ハイフンだけ", () => {
    const slugs = products.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(products.length);
    expect(slugs.filter((slug) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))).toEqual([]);
  });

  it("商品ページの URL は /products/{slug}", () => {
    expect(productPath(products[0])).toBe(`/products/${products[0].slug}`);
    expect(findProductBySlug(products[0].slug)).toBe(products[0]);
    expect(findProductBySlug("no-such-product")).toBeUndefined();
  });

  it("表示名は、画面で折り返すための改行と空白を 1 つの空白にまとめる", () => {
    // 名前は「富士山 ひのきフレグランスペーパー \n(木型)」
    expect(productDisplayName(products[0], "ja")).toBe("富士山 ひのきフレグランスペーパー (木型)");
  });

  it("どの商品の写真も public/ にある（無いとクイックビューで写真が割れる）", () => {
    const missing = products
      .flatMap((product) => product.images)
      .filter((src) => !existsSync(publicPath(src)));
    expect(missing).toEqual([]);
  });

  it("別の商品と中身が同じ写真を使っていない（ファイル名を変えた別商品の写真が紛れ込まないように）", () => {
    const owners = new Map<string, string>();
    const shared: string[] = [];
    for (const product of products) {
      for (const src of product.images) {
        const hash = createHash("sha256").update(readFileSync(publicPath(src))).digest("hex");
        const owner = owners.get(hash);
        if (owner && owner !== product.name.ja) {
          shared.push(`${product.name.ja} の ${src} は ${owner} の写真と同じ`);
        }
        owners.set(hash, owner ?? product.name.ja);
      }
    }
    expect(shared).toEqual([]);
  });
});
