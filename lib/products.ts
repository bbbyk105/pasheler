export interface ProductVariant {
  id: string;
  prices: {
    JPY: number;
    AUD: number;
  };
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
      ja: "富士山 ひのきフレグランスペーパー \n(木型)",
      en: "Mt.Fuji Hinoki Fragrance Paper \n(Tree Shape)",
    },
    description: {
      ja: "100%ひのき抽出液をたっぷり染み込ませた、爽やかで落ち着く香りのフレグランスペーパー。付属のミニボトルのひのきウォーターを吹きかけると、香りがふんわり広がります。",
      en: "Fragrance paper infused with 100% hinoki extract liquid, offering a refreshing and calming scent. Spray with the included mini bottle of hinoki water to revive the fragrance.",
    },
    category: "fragrancePapers",
    image: "/products/fragrance.webp",
    variants: [
      {
        id: "1-standard",
        prices: {
          JPY: 1430,
          AUD: 17,
        },
        stock: 15,
      },
    ],
    ingredients: {
      ja: [
        "富士ひのき蒸留水",
        "国産ひのきアロマオイル",
        "バイオマス不織布（セルロース・PLA）",
      ],
      en: [
        "Fuji Hinoki Distilled Water",
        "Domestic Hinoki Aroma Oil",
        "Biomass Non-woven Fabric (Cellulose, PLA)",
      ],
    },
    howToUse: {
      ja: "バッグに入れて持ち歩いたり、キャンドルのそばに置いたり、マスクにひと吹きしたり、モビールとして吊るしたり、様々な場面で香りをお楽しみください。香りが弱くなったら付属のひのきウォーターを吹きかけてください。",
      en: "Carry in your bag, place near candles, spray on masks, or hang as a mobile. When the scent fades, spray with the included hinoki water to revive it.",
    },
  },
  {
    id: 2,
    name: {
      ja: "富士山 ひのきフレグランスペーパー \n(四角形)",
      en: "Mt.Fuji Hinoki Fragrance Paper \n(Square Shape)",
    },
    description: {
      ja: "100%ひのき抽出液をたっぷり染み込ませた、爽やかで落ち着く香りのフレグランスペーパー。付属のミニボトルのひのきウォーターを吹きかけると、香りがふんわり広がります。",
      en: "Fragrance paper infused with 100% hinoki extract liquid, offering a refreshing and calming scent. Spray with the included mini bottle of hinoki water to revive the fragrance.",
    },
    category: "fragrancePapers",
    image: "/products/fragrance2.webp",
    variants: [
      {
        id: "2-standard",
        prices: {
          JPY: 1430,
          AUD: 17,
        },
        stock: 25,
      },
    ],
    ingredients: {
      ja: [
        "富士ひのき蒸留水",
        "国産ひのきアロマオイル",
        "バイオマス不織布（セルロース・PLA）",
      ],
      en: [
        "Fuji Hinoki Distilled Water",
        "Domestic Hinoki Aroma Oil",
        "Biomass Non-woven Fabric (Cellulose, PLA)",
      ],
    },
    howToUse: {
      ja: "バッグに入れて持ち歩いたり、キャンドルのそばに置いたり、マスクにひと吹きしたり、モビールとして吊るしたり、様々な場面で香りをお楽しみください。香りが弱くなったら付属のひのきウォーターを吹きかけてください。",
      en: "Carry in your bag, place near candles, spray on masks, or hang as a mobile. When the scent fades, spray with the included hinoki water to revive it.",
    },
  },
  {
    id: 3,
    name: {
      ja: "富士山 ひのきアロマウォーター \n(3本セット)",
      en: "Mt.Fuji Hinoki Aroma Water Mini Bottle \n(3-Pack)",
    },
    description: {
      ja: "富士山の麓のひのき抽出液に、国産ひのきアロマをブレンドしたポータブルタイプのひのきウォーター3本セット。携帯用としてフレグランスペーパーと併せて使ったり、空間のリフレッシュミストとしても活用できます。",
      en: "A 3-pack of portable hinoki water blending Fuji hinoki extract with domestic hinoki aroma. Use with fragrance paper or as a refreshing room mist.",
    },
    category: "fragrances",
    image: "/products/fragrance3.webp",
    variants: [
      {
        id: "3-3pack",
        prices: {
          JPY: 1500,
          AUD: 20,
        },
        stock: 20,
      },
    ],
    ingredients: {
      ja: [
        "富士ひのき蒸留水（100%天然）",
        "国産ひのきアロマオイル（天然100%）",
        "ミネラル",
      ],
      en: [
        "Fuji Hinoki Distilled Water (100% Natural)",
        "Domestic Hinoki Aroma Oil (100% Natural)",
        "Minerals",
      ],
    },
    howToUse: {
      ja: "フレグランスペーパーに吹きかけて香りを復活させたり、バッグや寝具、衣類などに軽くスプレーしたり、お部屋や車内のリフレッシュミストとしてお使いください。空間・肌・髪など多用途に活躍します。",
      en: "Spray on fragrance paper to revive the scent, lightly spray on bags, bedding, or clothing, or use as a refreshing mist for rooms and cars. Suitable for space, skin, and hair.",
    },
  },
];
