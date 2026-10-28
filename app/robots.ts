import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/ は止めない（CSS・JS・画像が取れず、Google がページを正しく描画できなくなる）
        disallow: [
          "/api/",
          "/private/",
          "/cart",
          "/checkout",
          "/order-confirmation",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
