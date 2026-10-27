import { Metadata } from "next";
import { getBlogPosts, getCategories } from "@/lib/blog/microcms";
import { jsonLdString } from "@/lib/blog/utils";
import { generateBlogListJsonLd } from "@/lib/blog/seo";
import BlogList from "@/components/blog/BlogList";
import { BLOG_PER_PAGE } from "@/lib/blog/constants";
import { SITE_URL } from "@/lib/site";

const BLOG_KEYWORDS = [
  "富士山",
  "ひのき",
  "アロマ",
  "ひのきフレグランス",
  "日本土産",
  "リラックス",
  "富士山 観光",
  "富士山 お土産",
  "ひのき 香り",
  "ひのき アロマ",
  "アロマ 効果",
  "アロマ リラックス",
  "フレグランスペーパー",
  "日本土産 おすすめ",
  "日本土産 人気",
  "リラックス グッズ",
  "森林浴",
  "ヒノキチオール",
  "ポケットサイズ アロマ",
  "ウェルネス",
  "自然 香り",
  "和の香り",
  "日本製 アロマ",
  "YawnNap",
  "富士ヒノキ",
];

export const metadata: Metadata = {
  title: "ブログ | 富士山・ひのき・アロマ・リラックス情報",
  description:
    "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。富士山観光、ひのきの香り、アロマ効果、リラックス方法、日本土産情報などをお届けします。",
  keywords: BLOG_KEYWORDS.join(", "),
  openGraph: {
    title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Yawn Nap",
    description:
      "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。富士山観光、ひのきの香り、アロマ効果、リラックス方法、日本土産情報をお届けします。",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "Yawn Nap",
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | 富士山・ひのき・アロマ・リラックス情報 | Yawn Nap",
    description: "富士山麓の自然、ヒノキの魅力、森林浴の効果について綴ります。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export const revalidate = 60; // ISR: 60秒ごとに再検証

export default async function BlogPage() {
  const { posts, totalCount } = await getBlogPosts({
    limit: BLOG_PER_PAGE,
    offset: 0,
  });
  const categories = await getCategories();

  const jsonLd = generateBlogListJsonLd(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      {/* <main> は app/blog/layout.tsx 側で出力している */}
      <div className="min-h-screen bg-white">
        <BlogList
          initialPosts={posts}
          totalCount={totalCount}
          categories={categories}
          currentPage={1}
        />
      </div>
    </>
  );
}
