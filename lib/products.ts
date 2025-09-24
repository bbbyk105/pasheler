
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
      ja: 'イチジクスクラブマスク',
      en: 'Fig Scrub Mask'
    },
    description: {
      ja: '天然イチジクエキス配合のスクラブマスクで、古い角質を優しく除去し、なめらかな肌に導きます。',
      en: 'A gentle scrub mask with natural fig extract that removes dead skin cells for smooth, radiant skin.'
    },
    category: 'masks',
    image: 'https://readdy.ai/api/search-image?query=Natural%20fig%20scrub%20mask%20jar%20with%20brown%20earthy%20tones%2C%20organic%20ingredients%20visible%2C%20minimal%20clean%20white%20background%2C%20soft%20natural%20lighting%2C%20premium%20skincare%20product%20photography&width=400&height=400&seq=catalog1&orientation=squarish',
    variants: [
      { id: '1-50ml', size: '50ml', price: 2200, stock: 15 },
      { id: '1-100ml', size: '100ml', price: 3800, stock: 8 }
    ],
    ingredients: {
      ja: ['イチジクエキス', 'カオリン', 'シアバター', 'ホホバオイル'],
      en: ['Fig Extract', 'Kaolin', 'Shea Butter', 'Jojoba Oil']
    },
    howToUse: {
      ja: '週に1-2回、清潔な肌に適量を塗り、円を描くようにマッサージしてから洗い流してください。',
      en: 'Apply to clean skin 1-2 times per week, massage in circular motions, then rinse thoroughly.'
    }
  },
  {
    id: 2,
    name: {
      ja: 'ハニーリップバーム',
      en: 'Honey Lip Balm'
    },
    description: {
      ja: '天然ハチミツとシアバターで唇を深く保湿し、柔らかく滑らかな唇に仕上げます。',
      en: 'Deeply moisturizes lips with natural honey and shea butter for soft, smooth lips.'
    },
    category: 'moisturizers',
    image: 'https://readdy.ai/api/search-image?query=Golden%20honey%20lip%20balm%20tube%20with%20warm%20amber%20tones%2C%20natural%20honey%20texture%20elements%2C%20clean%20minimal%20background%2C%20soft%20lighting%2C%20organic%20beauty%20product%20display&width=400&height=400&seq=catalog2&orientation=squarish',
    variants: [
      { id: '2-4g', size: '4g', price: 1200, stock: 25 },
      { id: '2-8g', size: '8g', price: 2000, stock: 12 }
    ],
    ingredients: {
      ja: ['ハチミツ', 'シアバター', 'ミツロウ', 'ココナッツオイル'],
      en: ['Honey', 'Shea Butter', 'Beeswax', 'Coconut Oil']
    },
    howToUse: {
      ja: '必要に応じて唇に優しく塗布してください。',
      en: 'Apply gently to lips as needed.'
    }
  },
  {
    id: 3,
    name: {
      ja: 'ライス日焼け止め',
      en: 'Rice Sunscreen'
    },
    description: {
      ja: 'ライスエキス配合のSPF50+日焼け止め。肌を守りながら明るく健康的な肌色をキープします。',
      en: 'SPF50+ sunscreen with rice extract that protects while maintaining bright, healthy skin tone.'
    },
    category: 'suncare',
    image: 'https://readdy.ai/api/search-image?query=White%20rice%20sunscreen%20tube%20with%20clean%20minimalist%20design%2C%20soft%20beige%20and%20white%20tones%2C%20natural%20rice%20elements%2C%20clean%20background%2C%20premium%20skincare%20photography&width=400&height=400&seq=catalog3&orientation=squarish',
    variants: [
      { id: '3-50ml', size: '50ml', price: 2800, stock: 20 },
      { id: '3-100ml', size: '100ml', price: 4500, stock: 0 }
    ],
    ingredients: {
      ja: ['ライスエキス', '酸化亜鉛', '酸化チタン', 'アロエベラ'],
      en: ['Rice Extract', 'Zinc Oxide', 'Titanium Dioxide', 'Aloe Vera']
    },
    howToUse: {
      ja: '外出の30分前に顔と体に均等に塗布し、2時間ごとに塗り直してください。',
      en: 'Apply evenly to face and body 30 minutes before sun exposure. Reapply every 2 hours.'
    }
  },
  {
    id: 4,
    name: {
      ja: 'ビーツエナジーアンプル',
      en: 'Beet Energy Ampoule'
    },
    description: {
      ja: 'ビーツエキス配合の高濃度美容液で、肌にエネルギーを与え、血色の良い健康的な肌へ。',
      en: 'High-concentration serum with beet extract that energizes skin for a healthy, radiant complexion.'
    },
    category: 'serums',
    image: 'https://readdy.ai/api/search-image?query=Pink%20beet%20energy%20ampoule%20dropper%20bottle%20with%20natural%20pink%20tones%2C%20organic%20beet%20elements%2C%20clean%20white%20background%2C%20elegant%20skincare%20product%20photography&width=400&height=400&seq=catalog4&orientation=squarish',
    variants: [
      { id: '4-30ml', size: '30ml', price: 3200, stock: 18 }
    ],
    ingredients: {
      ja: ['ビーツエキス', 'ナイアシンアミド', 'ヒアルロン酸', 'ビタミンC'],
      en: ['Beet Extract', 'Niacinamide', 'Hyaluronic Acid', 'Vitamin C']
    },
    howToUse: {
      ja: '朝晩のスキンケアで、化粧水の後に2-3滴を顔全体に馴染ませてください。',
      en: 'Apply 2-3 drops to entire face after toner, morning and evening.'
    }
  },
  {
    id: 5,
    name: {
      ja: 'グリーンティークレンザー',
      en: 'Green Tea Cleanser'
    },
    description: {
      ja: '緑茶エキス配合の優しいクレンザーで、毛穴の汚れを取り除きながら肌を鎮静させます。',
      en: 'Gentle cleanser with green tea extract that removes impurities while soothing the skin.'
    },
    category: 'cleansers',
    image: 'https://readdy.ai/api/search-image?query=Green%20tea%20cleanser%20bottle%20with%20natural%20green%20tones%2C%20fresh%20tea%20leaf%20elements%2C%20clean%20white%20background%2C%20organic%20skincare%20product%20photography%20with%20soft%20lighting&width=400&height=400&seq=catalog5&orientation=squarish',
    variants: [
      { id: '5-120ml', size: '120ml', price: 2400, stock: 22 },
      { id: '5-200ml', size: '200ml', price: 3600, stock: 5 }
    ],
    ingredients: {
      ja: ['緑茶エキス', 'グリセリン', 'ココイルグルタミン酸Na', 'カミツレエキス'],
      en: ['Green Tea Extract', 'Glycerin', 'Sodium Cocoyl Glutamate', 'Chamomile Extract']
    },
    howToUse: {
      ja: '朝晩、濡れた手に適量を取り、泡立ててから顔を優しく洗い、ぬるま湯で洗い流してください。',
      en: 'Take appropriate amount on wet hands, lather, gently cleanse face, then rinse with lukewarm water.'
    }
  },
  {
    id: 6,
    name: {
      ja: 'ビタミンC美容液',
      en: 'Vitamin C Serum'
    },
    description: {
      ja: '高濃度ビタミンC配合で、シミ・そばかすを防ぎ、透明感のある明るい肌へ導きます。',
      en: 'High-concentration Vitamin C serum that prevents dark spots and promotes bright, translucent skin.'
    },
    category: 'serums',
    image: 'https://readdy.ai/api/search-image?query=Orange%20vitamin%20C%20serum%20dropper%20bottle%20with%20bright%20citrus%20tones%2C%20fresh%20orange%20elements%2C%20clean%20white%20background%2C%20premium%20skincare%20product%20photography&width=400&height=400&seq=catalog6&orientation=squarish',
    variants: [
      { id: '6-30ml', size: '30ml', price: 4200, stock: 14 }
    ],
    ingredients: {
      ja: ['ビタミンC', 'ビタミンE', 'フェルラ酸', 'ヒアルロン酸'],
      en: ['Vitamin C', 'Vitamin E', 'Ferulic Acid', 'Hyaluronic Acid']
    },
    howToUse: {
      ja: '朝のスキンケアで、化粧水の後に2-3滴を顔全体に馴染ませ、日焼け止めを併用してください。',
      en: 'Apply 2-3 drops to entire face after toner in the morning routine. Use with sunscreen.'
    }
  }
];
