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
  /** 先頭が一覧・カート等の代表画像。複数指定でクイックビューで切り替え */
  images: string[];
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

/** 一覧・カート・決済用の代表画像 */
export function productPrimaryImage(product: Product): string {
  return product.images[0] ?? "";
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
    images: ["/products/fragrance.webp"],
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
    images: ["/products/fragrance2.webp"],
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
    images: ["/products/fragrance3.webp"],
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
  {
    id: 4,
    name: {
      ja: "富士ヒノキキャンドル",
      en: "Mt. Fuji HINOKI Candle",
    },
    description: {
      ja: "富士山のふもとで育った富士ヒノキの恵をたっぷりと閉じ込めたキャンドルです。富士ヒノキを蒸留する際に抽出される貴重なオイルをたっぷりと使用し、森の奥行きを感じるような深く豊かな香りです。缶のシールは緑色です。\n\n内容量：100ml",
      en: "A candle rich with the blessings of Fuji hinoki grown at the foot of Mt. Fuji. Made with plenty of precious oil extracted during hinoki distillation, it offers a deep, layered scent reminiscent of forest depth. The can label is green.\n\nVolume: 100 ml",
    },
    category: "candles",
    images: [
      "/candle/hinoki-candle.jpg",
      "/candle/hinoki-candle2.jpg",
      "/candle/hinoki-candle3.jpg",
      "/candle/hinoki-candle-top.jpg",
    ],
    variants: [
      {
        id: "4-standard",
        prices: {
          JPY: 2200,
          AUD: 26,
        },
        stock: 20,
      },
    ],
    ingredients: {
      ja: ["植物性のワックス", "富士ヒノキ蒸留抽出油", "コットン芯"],
      en: [
        "Vegetable wax",
        "Fuji hinoki distillation extract oil",
        "Cotton wick",
      ],
    },
    howToUse: {
      ja: "火を灯すと、やわらかく広がるヒノキの香りが空間を包み込み、気持ちをゆるめるような静かな時間へと導いてくれます。慌ただしい日々のバスタイムや、眠る前のひとときに。富士山麓の森を思わせる心地よい香りをどうぞお楽しみください。\n\n※燃えやすい物の近くで使用しないでください\n※使用中はその場を離れないで下さい\n※平で安定した場所で使用して下さい\n※高温多湿、直射日光を避けて保管して下さい\n※香りをより良い状態で楽しむため開封後は1年以内の使用をおすすめいたします",
      en: "When lit, soft hinoki fragrance gently fills the room and helps you unwind into a quiet moment. Enjoy during bath time or before sleep. Please note the following: do not use near flammable materials; never leave a burning candle unattended; place on a flat, stable surface; store away from heat, humidity, and direct sunlight; for best fragrance, we recommend using within one year of opening.",
    },
  },
  {
    id: 5,
    name: {
      ja: "富士ヒノキ × ゆずキャンドル",
      en: "Mt. Fuji HINOKI × YUZU Candle",
    },
    description: {
      ja: "富士山のふもとで育った富士ヒノキのオイルに、ゆずのオイルを合わせたアロマキャンドルです。富士ヒノキを蒸留する際に抽出される貴重なオイルをたっぷりと使用し、ヒノキの深く落ち着いた香りの中にゆずのやわらかく爽やかな香りがふわりと重なり、森の静けさと果実の甘みを感じるホッとする香りです。缶のシールはオレンジ色です。\n\n内容量：100ml",
      en: "An aroma candle blending Fuji hinoki oil with yuzu oil from trees grown at the foot of Mt. Fuji. Rich in precious oil from hinoki distillation, calm hinoki depth meets a soft, fresh yuzu note—a comforting scent of forest stillness and fruity sweetness. The can label is orange.\n\nVolume: 100 ml",
    },
    category: "candles",
    images: [
      "/candle/yuzu1.jpg",
      "/candle/yuzu2.jpg",
      "/candle/yuzu3.jpg",
      "/candle/yuzu4.jpg",
      "/candle/yuzu5.jpg",
    ],
    variants: [
      {
        id: "5-standard",
        prices: {
          JPY: 2200,
          AUD: 26,
        },
        stock: 20,
      },
    ],
    ingredients: {
      ja: [
        "植物性のワックス",
        "富士ヒノキ蒸留抽出油",
        "ゆず精油",
        "コットン芯",
      ],
      en: [
        "Vegetable wax",
        "Fuji hinoki distillation extract oil",
        "Yuzu essential oil",
        "Cotton wick",
      ],
    },
    howToUse: {
      ja: "気分を切り替えたいときやゆったり過ごしたい夕暮れの時間に。富士山麓の自然を感じる香りとして、贈り物としてもおすすめです。\n\n※燃えやすい物の近くで使用しないでください\n※使用中はその場を離れないで下さい\n※平で安定した場所で使用して下さい\n※高温多湿、直射日光を避けて保管して下さい\n※香りをより良い状態で楽しむため開封後は1年以内の使用をおすすめいたします",
      en: "Ideal when you want to reset your mood or relax at dusk. A thoughtful gift that evokes nature at the foot of Mt. Fuji. Please note: do not use near flammable materials; never leave a burning candle unattended; place on a flat, stable surface; store away from heat, humidity, and direct sunlight; for best fragrance, we recommend using within one year of opening.",
    },
  },
];
