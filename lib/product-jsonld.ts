import { SITE_URL, absoluteUrl } from "./site";
import {
  cheapestVariant,
  productDisplayName,
  productPath,
  type Product,
} from "./products";

const CATALOG_URL = `${SITE_URL}/catalog`;

function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** 説明を 1 行にまとめ、長ければ切る（構造化データ・meta description 用） */
export function productSummary(product: Product, maxLength: number): string {
  const text = product.description.ja.replace(/\s+/g, " ").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

/** 商品ページ（/products/{slug}）の構造化データ（パンくず・商品） */
export function productJsonLd(product: Product) {
  const url = absoluteUrl(productPath(product));
  const name = productDisplayName(product, "ja");
  // 在庫はどれか 1 つでもあれば在庫あり。価格は、在庫のあるバリアントのうちいちばん安いもの
  // （在庫切れのバリアントの価格を「在庫あり」と並べない。全部在庫切れなら、いちばん安いもの）
  const inStockVariants = product.variants.filter((v) => v.stock > 0);
  const inStock = inStockVariants.length > 0;
  const variant = cheapestVariant(
    inStock ? { ...product, variants: inStockVariants } : product,
    "JPY"
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([
        { name: "ホーム", url: SITE_URL },
        { name: "商品一覧", url: CATALOG_URL },
        { name, url },
      ]),
      {
        "@type": "Product",
        name,
        description: productSummary(product, 500),
        image: product.images.map((src) => absoluteUrl(src)),
        sku: String(product.id),
        brand: { "@type": "Brand", name: "Yawn Nap" },
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "JPY",
          price: variant?.prices.JPY ?? 0,
          availability: inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    ],
  };
}

/** 商品一覧（/catalog）の構造化データ（パンくず・商品ページの一覧）。商品の詳しい情報は各商品ページに置く */
export function catalogJsonLd(items: Product[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb([
        { name: "ホーム", url: SITE_URL },
        { name: "商品一覧", url: CATALOG_URL },
      ]),
      {
        "@type": "ItemList",
        name: "Yawn Nap 商品一覧",
        numberOfItems: items.length,
        itemListElement: items.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(productPath(product)),
        })),
      },
    ],
  };
}
