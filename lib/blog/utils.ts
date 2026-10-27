import type { BlogCardPost, BlogPost } from "./types";

/** 記事URLのパス部分（slug 未入力の記事は id） */
export function getBlogPostPath(post: Pick<BlogPost, "id" | "slug">): string {
  return post.slug || post.id;
}

/** クライアントコンポーネントへ渡す前に本文などを落とす（RSCペイロード削減） */
export function toBlogCardPost(post: BlogPost): BlogCardPost {
  const { id, slug, title, excerpt, thumbnail, category, publishedAt } = post;
  return { id, slug, title, excerpt, thumbnail, category, publishedAt };
}

// 日付フォーマット（サーバーは UTC で動くので、日本時間に固定してサーバーとブラウザで日付をそろえる）
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  });
}

/** <script type="application/ld+json"> に入れる JSON。CMS の文字の "<" で script タグが閉じないようにする */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
