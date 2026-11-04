import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "./ProductPageContent";
import {
  findProductBySlug,
  productDisplayName,
  productPath,
  products,
} from "@/lib/products";
import { productJsonLd, productSummary } from "@/lib/product-jsonld";
import { jsonLdString } from "@/lib/blog/utils";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const SHARE_IMAGE = "/opengraph-image.png";

// 商品は lib/products.ts にあるものだけ。ほかの slug はビルドで作らず 404 にする
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return {};

  const name = productDisplayName(product, "ja");
  const description = productSummary(product, 120);
  const url = absoluteUrl(productPath(product));

  return {
    // 「| Yawn Nap」は app/layout.tsx の title.template が付ける
    title: name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Yawn Nap",
      title: `${name} | Yawn Nap`,
      description,
      locale: "ja_JP",
      // 共有の画像はサイト共通の 1200x630 の PNG（app/layout.tsx と同じ）。商品写真は WebP や
      // 縦横の決まらない JPEG で、読めないアプリがある。openGraph を書くとルートの画像は引き継がれないので、ここでも書く
      images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Yawn Nap`,
      description,
      images: [SHARE_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd(product)) }}
      />
      <ProductPageContent product={product} />
    </>
  );
}
