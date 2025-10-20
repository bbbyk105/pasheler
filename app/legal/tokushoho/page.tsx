// app/legal/tokushoho/page.tsx

"use client";

import { useCart } from "@/components/CartContext";

export default function TokushohoPage() {
  const { language } = useCart();

  if (language === "en") {
    return <TokushohoEN />;
  }

  return <TokushohoJA />;
}

function TokushohoJA() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1 className="text-3xl font-serif text-stone-800 mb-8">
        特定商取引法に基づく表記
      </h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">販売業者</h2>
          <p className="text-stone-600">パシュラールーム</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            運営責任者
          </h2>
          <p className="text-stone-600">三井佳奈</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">所在地</h2>
          <p className="text-stone-600">静岡県富士市松本42-31</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">電話番号</h2>
          <p className="text-stone-600 mb-2">080-1619-9914</p>
          <p className="text-sm text-stone-500">
            受付時間：平日 9:00〜18:00(日本時間)
            <br />
            ※お問い合わせはメールでのご連絡をお願いいたします。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            メールアドレス
          </h2>
          <p className="text-stone-600">hello@yawnnap.com</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            ウェブサイト
          </h2>
          <p className="text-stone-600">https://mitsuikana.studio.site/</p>
          <p className="text-stone-600">https://yawnnap.shop/</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">販売価格</h2>
          <p className="text-stone-600">各商品ページに記載の通り(税込価格)</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            商品代金以外の必要料金
          </h2>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">送料</h3>

          <div className="bg-stone-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-stone-800 mb-2">国内配送</p>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li>通常送料：350円(税込)</li>
              <li>配送方法：ゆうパケット(ネコポス)</li>
              <li>送料無料条件：10,000円以上のご購入で送料無料</li>
            </ul>
          </div>

          <div className="bg-stone-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-stone-800 mb-2">海外配送(EMS発送)</p>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li>中国、韓国、台湾：1,450円</li>
              <li>アジア(中国、韓国、台湾を除く)：1,900円</li>
              <li>オセアニア、カナダ、メキシコ、中東、ヨーロッパ：3,150円</li>
              <li>米国(グアムおよびその他の米国領土を含む)：3,900円</li>
              <li>中南米：3,600円</li>
            </ul>
          </div>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            その他
          </h3>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>決済手数料(決済方法により異なる場合があります)</li>
            <li>消費税(商品価格に含まれています)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">支払方法</h2>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>クレジットカード</li>
            <li>その他、当サイト上に記載の決済方法</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">支払時期</h2>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>クレジットカード：注文確定時</li>
            <li>その他の決済方法：各決済方法に準ずる</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            商品の引渡時期
          </h2>
          <p className="text-stone-600 mb-2">
            ご注文確定後、3営業日以内に発送いたします。
          </p>
          <p className="text-sm text-stone-500">
            ※在庫状況や配送地域により、お届けまでの日数が異なります。
            <br />
            ※年末年始、ゴールデンウィーク、お盆等の期間は発送が遅れる場合があります。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            返品・交換について
          </h2>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            返品・交換の可否
          </h3>
          <p className="text-stone-600 mb-4">
            お客様のご都合による返品・交換(イメージ違い・香りの好み・ご注文間違いなど)はお受けしておりません。
          </p>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            不良品・誤配送の場合
          </h3>
          <p className="text-stone-600 mb-2">
            以下の場合には速やかに対応させていただきます。
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 mb-4">
            <li>ご注文内容と異なる商品が届いた場合</li>
            <li>商品に破損や汚れなどの初期不良があった場合</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
            <p className="text-stone-700">
              商品到着後<strong className="text-amber-700">7日以内</strong>
              に、お手数ですが「ご注文者名・注文番号・不具合の内容」をご記載のうえ、メール(hello@yawnnap.com)またはお問い合わせフォームよりご連絡ください。
            </p>
          </div>

          <p className="text-stone-600 mb-2">
            確認後、交換または返金の対応をさせていただきます。
          </p>
          <p className="text-sm text-stone-500">
            ※在庫状況により、交換対応ができない場合は返金となる場合がございます。
          </p>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            返品送料
          </h3>
          <p className="text-stone-600">
            不良品・誤配送の場合の返品送料は当店が負担いたします。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            商品の状態について
          </h2>
          <p className="text-stone-600">
            天然素材や手作業による制作のため、多少の個体差・色味の違い・香りの濃淡がある場合がございます。多少の違いは風合いとしてご理解ください。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">配送業者</h2>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>ヤマト運輸</li>
            <li>日本郵便</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            キャンセルについて
          </h2>
          <p className="text-stone-600">
            ご注文確定後のキャンセルは原則としてお受けできません。ご注文前に商品内容、数量、配送先等を十分にご確認ください。
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">その他</h2>
          <ul className="list-disc list-inside text-stone-600 space-y-2">
            <li>
              商品の色や香りは、お使いのモニターや環境により実物と異なって見える場合があります。
            </li>
            <li>在庫切れの場合は、メールにてご連絡させていただきます。</li>
            <li>当店の商品は日本国内法に基づき販売しております。</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-stone-200">
        <p className="text-sm text-stone-500">最終更新日：2025年10月20日</p>
      </div>
    </article>
  );
}

function TokushohoEN() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1 className="text-3xl font-serif text-stone-800 mb-8">
        Specified Commercial Transactions Act
      </h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Business Operator
          </h2>
          <p className="text-stone-600">Pachelar Room</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Representative
          </h2>
          <p className="text-stone-600">Kana Mitsui</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">Address</h2>
          <p className="text-stone-600">
            42-31 Matsumoto, Fuji-shi, Shizuoka, Japan
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Phone Number
          </h2>
          <p className="text-stone-600 mb-2">+81-80-1619-9914</p>
          <p className="text-sm text-stone-500">
            Business Hours: Weekdays 9:00 AM - 6:00 PM (Japan Standard Time)
            <br />
            *Please contact us via email for inquiries.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Email Address
          </h2>
          <p className="text-stone-600">hello@yawnnap.com</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">Website</h2>
          <p className="text-stone-600">https://studio.site</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Product Prices
          </h2>
          <p className="text-stone-600">
            As stated on each product page (tax included)
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Additional Fees
          </h2>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            Shipping Fees
          </h3>

          <div className="bg-stone-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-stone-800 mb-2">
              Domestic Shipping (Japan)
            </p>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li>Standard shipping: ¥350 (tax included)</li>
              <li>Shipping method: Yu-Packet (Neko Pos)</li>
              <li>Free shipping: Orders over ¥10,000</li>
            </ul>
          </div>

          <div className="bg-stone-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-stone-800 mb-2">
              International Shipping (EMS)
            </p>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li>China, South Korea, Taiwan: ¥1,450</li>
              <li>Asia (excluding China, South Korea, Taiwan): ¥1,900</li>
              <li>Oceania, Canada, Mexico, Middle East, Europe: ¥3,150</li>
              <li>USA (including Guam and other US territories): ¥3,900</li>
              <li>Central and South America: ¥3,600</li>
            </ul>
          </div>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            Other Fees
          </h3>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>
              Payment processing fees (may vary depending on payment method)
            </li>
            <li>Consumption tax (included in product prices)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Payment Methods
          </h2>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>Credit card</li>
            <li>Other payment methods as listed on the Site</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Payment Timing
          </h2>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>Credit card: At order confirmation</li>
            <li>Other payment methods: According to each payment method</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Delivery Time
          </h2>
          <p className="text-stone-600 mb-2">
            Items will be shipped within 3 business days after order
            confirmation.
          </p>
          <p className="text-sm text-stone-500">
            *Delivery time may vary depending on stock availability and delivery
            location.
            <br />
            *Shipping may be delayed during New Year holidays, Golden Week,
            Obon, and other holiday periods.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Returns and Exchanges
          </h2>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            Return/Exchange Policy
          </h3>
          <p className="text-stone-600 mb-4">
            We do not accept returns or exchanges due to customer convenience
            (such as differences from expectations, fragrance preferences, or
            ordering mistakes).
          </p>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            Defective Products or Incorrect Shipments
          </h3>
          <p className="text-stone-600 mb-2">
            We will promptly respond in the following cases:
          </p>
          <ul className="list-disc list-inside text-stone-600 space-y-1 mb-4">
            <li>When a product different from the order is delivered</li>
            <li>When there are initial defects such as damage or stains</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
            <p className="text-stone-700">
              Please contact us via email (hello@yawnnap.com) or inquiry form{" "}
              <strong className="text-amber-700">within 7 days</strong> of
              product arrival, stating your name, order number, and details of
              the issue.
            </p>
          </div>

          <p className="text-stone-600 mb-2">
            After confirmation, we will arrange for an exchange or refund.
          </p>
          <p className="text-sm text-stone-500">
            *Depending on stock availability, we may provide a refund instead of
            an exchange.
          </p>

          <h3 className="text-lg font-medium text-stone-700 mt-4 mb-2">
            Return Shipping Costs
          </h3>
          <p className="text-stone-600">
            We will bear the return shipping costs for defective products or
            incorrect shipments.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Product Condition
          </h2>
          <p className="text-stone-600">
            Due to the use of natural materials and handmade production, there
            may be slight variations in individual products, color tones, and
            fragrance intensity. Please understand that such minor differences
            are part of the product&apos;s character.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Shipping Companies
          </h2>
          <ul className="list-disc list-inside text-stone-600 space-y-1">
            <li>Yamato Transport</li>
            <li>Japan Post</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Cancellations
          </h2>
          <p className="text-stone-600">
            In principle, we cannot accept cancellations after order
            confirmation. Please carefully verify product details, quantities,
            and shipping addresses before placing your order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-stone-800 mb-3">
            Other Information
          </h2>
          <ul className="list-disc list-inside text-stone-600 space-y-2">
            <li>
              Product colors and fragrances may appear different from actual
              products depending on your monitor and environment.
            </li>
            <li>If items are out of stock, we will notify you via email.</li>
            <li>
              Our products are sold in accordance with Japanese domestic law.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-stone-200">
        <p className="text-sm text-stone-500">Last Updated: October 20, 2025</p>
      </div>
    </article>
  );
}
