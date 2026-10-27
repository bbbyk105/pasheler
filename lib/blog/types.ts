// microCMS Blog型定義
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category?: Category;
  publishedAt: string;
  updatedAt: string;
  /** microCMS で未入力の記事があるため optional（その場合は id をURLに使う） */
  slug?: string;
}

/** 一覧カード表示に必要なフィールドだけ（本文をクライアントへ送らないため） */
export type BlogCardPost = Pick<
  BlogPost,
  "id" | "slug" | "title" | "excerpt" | "thumbnail" | "category" | "publishedAt"
>;

export interface Category {
  id: string;
  name: string;
  /** microCMS のカテゴリAPIに slug フィールドが無い場合は undefined。カテゴリページへのリンクは slug がある時だけ出す */
  slug?: string;
}
