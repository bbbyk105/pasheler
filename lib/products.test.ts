import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "./products";

const publicPath = (src: string) => path.join(process.cwd(), "public", src);

describe("products", () => {
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
