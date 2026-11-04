import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/blog/microcms", () => ({
  getAllBlogSitemapEntries: vi.fn(async () => [
    { path: "fuji-hinoki-souvenir", updatedAt: "2026-10-01T00:00:00.000Z" },
  ]),
  getCategories: vi.fn(async () => [{ id: "c1", slug: "aroma" }]),
}));

import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/site";
import { products } from "@/lib/products";

describe("sitemap", () => {
  it("商品ページを全商品分載せる", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    for (const product of products) {
      expect(urls).toContain(`${SITE_URL}/products/${product.slug}`);
    }
  });

  it("富士ヒノキはトップの章なので、別ページ（/hinoki-fragrance）は載せない", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).not.toContain(`${SITE_URL}/hinoki-fragrance`);
  });

  it("固定ページには lastmod を付けない（生成のたびに「今」になると、Google が lastmod を当てにしなくなる）", async () => {
    const entries = new Map((await sitemap()).map((entry) => [entry.url, entry]));
    const entry = (path: string) => {
      const found = entries.get(`${SITE_URL}${path}`);
      expect(found, `${path} が sitemap に無い`).toBeDefined();
      return found;
    };

    // トップも付けない。新着記事は 3 件だけで商品も載るので、いちばん新しい記事の更新日とは合わない
    for (const path of [
      "/",
      "/catalog",
      "/contact",
      "/legal/terms",
      "/legal/privacy-policy",
      "/legal/tokushoho",
    ]) {
      expect(entry(path)?.lastModified, path).toBeUndefined();
    }
    // ブログ一覧は、いちばん新しい記事の更新日
    expect(entry("/blog")?.lastModified).toBe("2026-10-01T00:00:00.000Z");
  });

  it("ブログ一覧・カテゴリ・記事を載せる", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(urls).toContain(`${SITE_URL}/blog/category/aroma`);
    expect(urls).toContain(`${SITE_URL}/blog/fuji-hinoki-souvenir`);
  });
});
