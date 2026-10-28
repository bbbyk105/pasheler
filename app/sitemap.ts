import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllBlogSitemapEntries, getCategories } from "@/lib/blog/microcms";

/** サイトマップの最大URL数（Google推奨は50,000） */
const SITEMAP_URL_LIMIT = 50000;

// ビルド時に固定されると新しい記事が載らないため、1時間ごとに再生成する
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // ブログ記事（全件）。ブログ一覧は最新記事が並ぶので、最終更新 = 記事の最終更新
  const blogEntries = await getAllBlogSitemapEntries();
  const latestPostUpdatedAt = blogEntries
    .map((entry) => entry.updatedAt)
    .sort()
    .at(-1);

  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/catalog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostUpdatedAt ?? lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/legal/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/legal/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/legal/tokushoho`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.45,
    },
  ];

  // カテゴリ一覧（1ページ目のみ）。slug 未設定のカテゴリはページが存在しないので載せない
  const categories = await getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${SITE_URL}/blog/category/${c.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));

  const blogPages: MetadataRoute.Sitemap = blogEntries
    .slice(0, SITEMAP_URL_LIMIT - routes.length - categoryPages.length)
    .map((entry) => ({
      url: `${SITE_URL}/blog/${entry.path}`,
      lastModified: entry.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...routes, ...categoryPages, ...blogPages];
}
