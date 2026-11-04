import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllBlogSitemapEntries, getCategories } from "@/lib/blog/microcms";
import { productPath, products } from "@/lib/products";

/** サイトマップの最大URL数（Google推奨は50,000） */
const SITEMAP_URL_LIMIT = 50000;

// ビルド時に固定されると新しい記事が載らないため、1時間ごとに再生成する
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ブログ記事（全件）。ブログ一覧は最新記事が並ぶので、最終更新 = 記事の最終更新
  const blogEntries = await getAllBlogSitemapEntries();
  const latestPostUpdatedAt = blogEntries
    .map((entry) => entry.updatedAt)
    .sort()
    .at(-1);

  // 固定ページには lastmod を付けない。生成のたびに「今」を入れると実際の更新日と合わず、
  // Google がこのサイトの lastmod（記事の正しい更新日も）を当てにしなくなる。
  // トップも同じ（新着記事は 3 件だけで商品も載るので、いちばん新しい記事の更新日とは合わない）
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/catalog`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostUpdatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/legal/terms`,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/legal/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/legal/tokushoho`,
      changeFrequency: "yearly",
      priority: 0.45,
    },
  ];

  // 商品ページ（lib/products.ts の全商品）
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}${productPath(product)}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

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
    .slice(
      0,
      SITEMAP_URL_LIMIT - routes.length - productPages.length - categoryPages.length,
    )
    .map((entry) => ({
      url: `${SITE_URL}/blog/${entry.path}`,
      lastModified: entry.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...routes, ...productPages, ...categoryPages, ...blogPages];
}
