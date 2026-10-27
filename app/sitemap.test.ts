import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/blog/microcms", () => ({
  getAllBlogSitemapEntries: vi.fn(async () => [
    { path: "fuji-hinoki-souvenir", updatedAt: "2026-10-01T00:00:00.000Z" },
  ]),
  getCategories: vi.fn(async () => [{ id: "c1", slug: "aroma" }]),
}));

import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/site";

describe("sitemap", () => {
  it("富士ヒノキはトップの章なので、別ページ（/hinoki-fragrance）は載せない", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).not.toContain(`${SITE_URL}/hinoki-fragrance`);
  });

  it("ブログ一覧・カテゴリ・記事を載せる", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(urls).toContain(`${SITE_URL}/blog/category/aroma`);
    expect(urls).toContain(`${SITE_URL}/blog/fuji-hinoki-souvenir`);
  });
});
