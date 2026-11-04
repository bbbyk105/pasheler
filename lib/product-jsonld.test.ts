import { describe, expect, it } from "vitest";
import { catalogJsonLd, productJsonLd } from "./product-jsonld";
import { products, type Product } from "./products";
import { SITE_URL } from "./site";

type Offer = { url: string; price: number; availability: string };
type ProductNode = { "@type": "Product"; name: string; offers: Offer };
type Node = { "@type": string; [key: string]: unknown };

const nodeOf = (data: { "@graph": Node[] }, type: string) =>
  data["@graph"].find((node) => node["@type"] === type);

const productOf = (product: Product) =>
  nodeOf(productJsonLd(product) as { "@graph": Node[] }, "Product") as unknown as ProductNode;

const base = products[0];
const variant = (id: string, JPY: number, stock: number) => ({
  id,
  prices: { JPY, AUD: 0 },
  stock,
});

describe("商品ページの構造化データ", () => {
  it("商品名は、画面で折り返すための改行と空白を 1 つの空白にまとめる", () => {
    expect(productOf(base).name).toBe("富士山 ひのきフレグランスペーパー (木型)");
  });

  it("offers.url は商品ページ自身の URL", () => {
    expect(productOf(base).offers.url).toBe(`${SITE_URL}/products/${base.slug}`);
  });

  it("価格と在庫は画面と同じ。いちばん安いバリアントの価格で、どれか 1 つでも在庫があれば在庫あり", () => {
    const offers = productOf({
      ...base,
      variants: [variant("a", 3000, 0), variant("b", 2000, 5)],
    }).offers;

    expect(offers.price).toBe(2000);
    expect(offers.availability).toBe("https://schema.org/InStock");
  });

  it("いちばん安いバリアントが在庫切れなら、価格は在庫のあるバリアントのもの（価格と在庫が別のバリアントを指さない）", () => {
    const offers = productOf({
      ...base,
      variants: [variant("a", 2000, 0), variant("b", 3000, 5)],
    }).offers;

    expect(offers.price).toBe(3000);
    expect(offers.availability).toBe("https://schema.org/InStock");
  });

  it("すべてのバリアントが在庫 0 のときだけ在庫切れ", () => {
    const offers = productOf({
      ...base,
      variants: [variant("a", 3000, 0), variant("b", 2000, 0)],
    }).offers;

    expect(offers.availability).toBe("https://schema.org/OutOfStock");
  });

  it("パンくずは ホーム > 商品一覧 > 商品", () => {
    const breadcrumb = nodeOf(productJsonLd(base) as { "@graph": Node[] }, "BreadcrumbList") as unknown as {
      itemListElement: { name: string; item: string }[];
    };
    expect(breadcrumb.itemListElement.map((element) => element.item)).toEqual([
      SITE_URL,
      `${SITE_URL}/catalog`,
      `${SITE_URL}/products/${base.slug}`,
    ]);
  });
});

describe("商品一覧の構造化データ", () => {
  it("商品の一覧は、各商品ページの URL を並べる（商品の詳しい情報は商品ページ側に置く）", () => {
    const list = nodeOf(catalogJsonLd(products) as { "@graph": Node[] }, "ItemList") as unknown as {
      itemListElement: { position: number; url: string }[];
    };
    expect(list.itemListElement).toEqual(
      products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/products/${product.slug}`,
      })),
    );
  });
});
