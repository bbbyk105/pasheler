export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  category: string;
  image: string;
  variants: ProductVariant[];
  ingredients: {
    ja: string[];
    en: string[];
  };
  howToUse: {
    ja: string;
    en: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: {
      ja: "ヒノキフレグランスペーパー (木型)",
      en: "Hinoki Fragrance Paper (Tree Shape)",
    },
    description: {
      ja: "天然イチジクエキス配合のスクラブマスクで、古い角質を優しく除去し、なめらかな肌に導きます。",
      en: "A gentle scrub mask with natural fig extract that removes dead skin cells for smooth, radiant skin.",
    },
    category: "masks",
    image: "/products/fragrance.webp",
    variants: [{ id: "1-50ml", size: "50ml", price: 1650, stock: 15 }],
    ingredients: {
      ja: ["イチジクエキス", "カオリン", "シアバター", "ホホバオイル"],
      en: ["Fig Extract", "Kaolin", "Shea Butter", "Jojoba Oil"],
    },
    howToUse: {
      ja: "週に1-2回、清潔な肌に適量を塗り、円を描くようにマッサージしてから洗い流してください。",
      en: "Apply to clean skin 1-2 times per week, massage in circular motions, then rinse thoroughly.",
    },
  },
  {
    id: 2,
    name: {
      ja: "ヒノキフレグランスペーパー (四角形)",
      en: "Hinoki Fragrance Paper",
    },
    description: {
      ja: "天然ハチミツとシアバターで唇を深く保湿し、柔らかく滑らかな唇に仕上げます。",
      en: "Deeply moisturizes lips with natural honey and shea butter for soft, smooth lips.",
    },
    category: "moisturizers",
    image: "/products/fragrance2.webp",
    variants: [{ id: "2-4g", size: "4g", price: 1650, stock: 25 }],
    ingredients: {
      ja: ["ハチミツ", "シアバター", "ミツロウ", "ココナッツオイル"],
      en: ["Honey", "Shea Butter", "Beeswax", "Coconut Oil"],
    },
    howToUse: {
      ja: "必要に応じて唇に優しく塗布してください。",
      en: "Apply gently to lips as needed.",
    },
  },
  {
    id: 3,
    name: {
      ja: "ヒノキアロマウォーター",
      en: "Hinoki aroma water",
    },
    description: {
      ja: "ライスエキス配合のSPF50+日焼け止め。肌を守りながら明るく健康的な肌色をキープします。",
      en: "SPF50+ sunscreen with rice extract that protects while maintaining bright, healthy skin tone.",
    },
    category: "suncare",
    image: "/products/fragrance3.webp",
    variants: [{ id: "3-50ml", size: "50ml", price: 2913, stock: 20 }],
    ingredients: {
      ja: ["ライスエキス", "酸化亜鉛", "酸化チタン", "アロエベラ"],
      en: ["Rice Extract", "Zinc Oxide", "Titanium Dioxide", "Aloe Vera"],
    },
    howToUse: {
      ja: "外出の30分前に顔と体に均等に塗布し、2時間ごとに塗り直してください。",
      en: "Apply evenly to face and body 30 minutes before sun exposure. Reapply every 2 hours.",
    },
  },
];
