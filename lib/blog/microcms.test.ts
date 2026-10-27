import { beforeAll, describe, expect, it, vi } from "vitest";

type FakePost = { id: string; slug?: string; updatedAt: string };

let posts: FakePost[] = [];

// microCMS の get を、配列から返す偽物にする（slug の絞り込み・contentId・offset/limit だけ再現）
vi.mock("microcms-js-sdk", () => ({
  createClient: () => ({
    get: async ({
      contentId,
      queries,
    }: {
      contentId?: string;
      queries?: { filters?: string; offset?: number; limit?: number };
    }) => {
      if (contentId) {
        const post = posts.find((p) => p.id === contentId);
        if (!post) throw new Error("fetch API response status: 404");
        return post;
      }
      let list = posts;
      const slug = queries?.filters?.match(/^slug\[equals\](.+)$/)?.[1];
      if (slug) list = list.filter((p) => p.slug === slug);
      const offset = queries?.offset ?? 0;
      const limit = queries?.limit ?? 10;
      return {
        contents: list.slice(offset, offset + limit),
        totalCount: list.length,
        offset,
        limit,
      };
    },
  }),
}));

let microcms: typeof import("./microcms");

beforeAll(async () => {
  vi.stubEnv("NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN", "test-service");
  vi.stubEnv("NEXT_PUBLIC_MICROCMS_API_KEY", "test-key");
  microcms = await import("./microcms");
});

describe("resolveBlogPost（記事 URL の正規化）", () => {
  beforeAll(() => {
    posts = [
      { id: "owner01", slug: "hinoki-aroma", updatedAt: "2026-01-01" },
      // slug が上の記事と重複している（microCMS の入力ミス）
      { id: "dup02", slug: "hinoki-aroma", updatedAt: "2026-01-02" },
      { id: "noslug03", updatedAt: "2026-01-03" },
    ];
  });

  it("slug で来たらそのまま表示する", async () => {
    const r = await microcms.resolveBlogPost("hinoki-aroma");
    expect(r?.post.id).toBe("owner01");
    expect(r?.path).toBe("hinoki-aroma");
    expect(r?.shouldRedirect).toBe(false);
  });

  it("id で来たら slug の URL へ転送する", async () => {
    const r = await microcms.resolveBlogPost("owner01");
    expect(r?.path).toBe("hinoki-aroma");
    expect(r?.shouldRedirect).toBe(true);
  });

  it("slug が重複している 2 件目は id の URL のまま（別の記事へ飛ばさない）", async () => {
    const r = await microcms.resolveBlogPost("dup02");
    expect(r?.post.id).toBe("dup02");
    expect(r?.path).toBe("dup02");
    expect(r?.shouldRedirect).toBe(false);
  });

  it("slug が無い記事は id の URL", async () => {
    const r = await microcms.resolveBlogPost("noslug03");
    expect(r?.path).toBe("noslug03");
    expect(r?.shouldRedirect).toBe(false);
  });

  it("無い記事は null（404）", async () => {
    expect(await microcms.resolveBlogPost("missing")).toBeNull();
  });
});

describe("getAllBlogSitemapEntries（サイトマップの記事 URL）", () => {
  it("100 件を超えても全件をたどり、重複 slug の 2 件目は id の URL で載せる", async () => {
    posts = Array.from({ length: 150 }, (_, i) => ({
      id: `id${i}`,
      slug: `post-${i}`,
      updatedAt: `2026-02-${String((i % 28) + 1).padStart(2, "0")}`,
    }));
    posts.push({ id: "dup-of-0", slug: "post-0", updatedAt: "2026-03-01" });
    posts.push({ id: "no-slug", updatedAt: "2026-03-02" });

    const entries = await microcms.getAllBlogSitemapEntries();
    const paths = entries.map((e) => e.path);

    expect(entries).toHaveLength(152);
    expect(paths).toContain("post-0");
    expect(paths).toContain("post-149");
    expect(paths).toContain("dup-of-0");
    expect(paths).toContain("no-slug");
    expect(new Set(paths).size).toBe(paths.length);
  });
});
