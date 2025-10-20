// app/legal/terms/page.tsx

"use client";

import { useCart } from "@/components/CartContext";

export default function TermsPage() {
  const { language } = useCart();

  if (language === "en") {
    return <TermsEN />;
  }

  return <TermsJA />;
}

function TermsJA() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1 className="text-3xl font-serif text-stone-800 mb-8">利用規約</h1>

      <p className="text-stone-600 leading-relaxed mb-6">
        本規約は、パシュラールーム(以下「当店」といいます)が運営するオンラインショップ(以下「当サイト」といいます)をご利用いただく際の条件を定めるものです。当サイトをご利用いただくお客様(以下「利用者」といいます)は、本規約に同意したものとみなします。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第1条(適用)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          本規約は、利用者と当店との間の当サイトの利用に関する一切の関係に適用されます。
        </li>
        <li>
          当店は、当サイト上に個別規約を定めることがあります。個別規約は本規約の一部を構成するものとし、本規約と個別規約が矛盾する場合は、個別規約が優先されるものとします。
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第2条(会員登録)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        当サイトでは、会員登録なしでもご購入いただけますが、会員登録をすることで、より便利にご利用いただけます。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第3条(注文と契約の成立)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          利用者は、当店が定める方法により、商品の注文を行うものとします。
        </li>
        <li>
          注文は、利用者が当店に対して購入の申込みを行い、当店がこれを承諾した時点で売買契約が成立します。
        </li>
        <li>当店は、以下の場合には注文を承諾しないことがあります。</li>
        <ul className="list-disc list-inside ml-6 text-stone-600 space-y-2 mt-2">
          <li>注文内容に誤りがある場合</li>
          <li>在庫がない場合</li>
          <li>過去に利用規約違反があった場合</li>
          <li>その他、当店が不適切と判断した場合</li>
        </ul>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第4条(価格と支払い)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          商品の価格は、当サイト上に表示されている価格とします。表示価格には消費税が含まれています。
        </li>
        <li>送料、その他の手数料は別途かかります。</li>
        <li>支払方法は、当サイト上に記載の方法によるものとします。</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第5条(配送)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>商品の配送は、当店が指定する配送業者により行います。</li>
        <li>配送先は、日本国内および当店が指定する海外地域に限ります。</li>
        <li>
          配送日時の指定がある場合は、可能な限り対応いたしますが、配送業者の事情等により遅延する場合があります。
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第6条(返品・交換)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          お客様のご都合による返品・交換(イメージ違い・香りの好み・ご注文間違いなど)はお受けしておりません。
        </li>
        <li>ただし、以下の場合には速やかに対応させていただきます。</li>
        <ul className="list-disc list-inside ml-6 text-stone-600 space-y-2 mt-2">
          <li>ご注文内容と異なる商品が届いた場合</li>
          <li>商品に破損や汚れなどの初期不良があった場合</li>
        </ul>
        <li>
          返品・交換を希望される場合は、商品到着後7日以内に、ご注文者名・注文番号・不具合の内容をご記載のうえ、メール(hello@yawnnap.com)またはお問い合わせフォームよりご連絡ください。
        </li>
        <li>
          在庫状況により、交換対応ができない場合は返金となる場合がございます。
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第7条(商品の状態について)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        天然素材や手作業による制作のため、多少の個体差・色味の違い・香りの濃淡がある場合がございます。多少の違いは風合いとしてご理解ください。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第8条(禁止事項)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        利用者は、以下の行為を行ってはならないものとします。
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>法令または公序良俗に違反する行為</li>
        <li>犯罪行為に関連する行為</li>
        <li>
          当店のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
        </li>
        <li>当店のサービスの運営を妨害するおそれのある行為</li>
        <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
        <li>他の利用者に成りすます行為</li>
        <li>
          当店のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
        </li>
        <li>その他、当店が不適切と判断する行為</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第9条(免責事項)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          当店は、商品の品質には万全を期しておりますが、天然素材を使用しているため、色味や香りに個体差が生じる場合があります。
        </li>
        <li>
          当店は、当サイトに掲載されている情報の正確性について万全を期しておりますが、その内容の正確性、完全性を保証するものではありません。
        </li>
        <li>
          当店は、利用者が当サイトを利用したことにより生じた損害について、一切の責任を負いません。
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第10条(著作権・知的財産権)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          当サイトに掲載されているすべてのコンテンツ(文章、画像、動画等)の著作権は、当店または正当な権利者に帰属します。
        </li>
        <li>
          利用者は、当店の事前の書面による許可なく、これらのコンテンツを複製、転載、配布、公衆送信等することはできません。
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第11条(規約の変更)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        当店は、利用者の承諾を得ることなく、本規約を変更することができます。変更後の規約は、当サイト上に掲載した時点で効力を生じるものとします。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        第12条(準拠法・管轄裁判所)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
        <li>
          当サイトに関して紛争が生じた場合には、当店の所在地を管轄する裁判所を専属的合意管轄裁判所とします。
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        お問い合わせ
      </h2>
      <div className="bg-stone-50 p-6 rounded-lg mb-8">
        <p className="text-stone-600">
          <strong>パシュラールーム</strong>
          <br />
          代表者：三井佳奈
          <br />
          メールアドレス：hello@yawnnap.com
          <br />
          電話番号：080-1619-9914
        </p>
      </div>

      <p className="text-sm text-stone-500">
        制定日：2025年10月20日
        <br />
        最終更新日：2025年10月20日
      </p>
    </article>
  );
}

function TermsEN() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1 className="text-3xl font-serif text-stone-800 mb-8">
        Terms of Service
      </h1>

      <p className="text-stone-600 leading-relaxed mb-6">
        These Terms of Service (the &ldquo;Terms&rdquo;) govern your use of the
        online shop (the &ldquo;Site&rdquo;) operated by Pachelar Room
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our store&rdquo;). By
        using the Site, you (&ldquo;User&rdquo; or &ldquo;you&rdquo;) agree to
        be bound by these Terms.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 1 (Application)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          These Terms shall apply to all relationships between Users and our
          store regarding the use of the Site.
        </li>
        <li>
          We may establish separate terms and conditions on the Site. Such
          separate terms shall constitute part of these Terms and shall take
          precedence over these Terms in case of conflict.
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 2 (Membership Registration)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        You can make purchases on our Site without membership registration, but
        registering as a member provides more convenient services.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 3 (Orders and Contract Formation)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          Users shall place orders for products using the methods specified by
          our store.
        </li>
        <li>
          A sales contract is formed when the User submits a purchase
          application to our store and we accept it.
        </li>
        <li>We may not accept orders in the following cases:</li>
        <ul className="list-disc list-inside ml-6 text-stone-600 space-y-2 mt-2">
          <li>When there are errors in the order details</li>
          <li>When products are out of stock</li>
          <li>When there is a history of violations of these Terms</li>
          <li>When we deem the order inappropriate for any other reason</li>
        </ul>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 4 (Prices and Payment)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          Product prices are as displayed on the Site and include consumption
          tax.
        </li>
        <li>Shipping fees and other charges are separate.</li>
        <li>Payment methods are as described on the Site.</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 5 (Delivery)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          Products will be delivered by the delivery company designated by our
          store.
        </li>
        <li>
          Delivery is limited to addresses within Japan and overseas regions
          designated by our store.
        </li>
        <li>
          While we will make every effort to accommodate requested delivery
          dates and times, delays may occur due to delivery company
          circumstances.
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 6 (Returns and Exchanges)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          We do not accept returns or exchanges due to customer convenience
          (such as differences from expectations, fragrance preferences, or
          ordering mistakes).
        </li>
        <li>However, we will promptly respond in the following cases:</li>
        <ul className="list-disc list-inside ml-6 text-stone-600 space-y-2 mt-2">
          <li>When a product different from the order is delivered</li>
          <li>When there are initial defects such as damage or stains</li>
        </ul>
        <li>
          For returns or exchanges, please contact us via email
          (hello@yawnnap.com) or inquiry form within 7 days of product arrival,
          stating your name, order number, and details of the issue.
        </li>
        <li>
          Depending on stock availability, we may provide a refund instead of an
          exchange.
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 7 (Product Condition)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        Due to the use of natural materials and handmade production, there may
        be slight variations in individual products, color tones, and fragrance
        intensity. Please understand that such minor differences are part of the
        product&apos;s character.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 8 (Prohibited Actions)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        Users shall not engage in the following actions:
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>Actions that violate laws or public order and morals</li>
        <li>Actions related to criminal activities</li>
        <li>
          Actions that destroy or interfere with our store&apos;s servers or
          network functions
        </li>
        <li>Actions that may interfere with the operation of our services</li>
        <li>
          Actions that collect or accumulate personal information about other
          Users
        </li>
        <li>Actions that impersonate other Users</li>
        <li>
          Actions that directly or indirectly provide benefits to antisocial
          forces in connection with our services
        </li>
        <li>Other actions that we deem inappropriate</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 9 (Disclaimer)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          While we strive for product quality, natural materials may result in
          variations in color and fragrance.
        </li>
        <li>
          While we strive for accuracy of information on the Site, we do not
          guarantee the accuracy or completeness of such information.
        </li>
        <li>
          We shall not be liable for any damages arising from your use of the
          Site.
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 10 (Copyright and Intellectual Property Rights)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>
          Copyright for all content on the Site (text, images, videos, etc.)
          belongs to our store or the legitimate rights holders.
        </li>
        <li>
          Users may not reproduce, reprint, distribute, or publicly transmit
          such content without our prior written permission.
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 11 (Changes to Terms)
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        We may change these Terms without User consent. Revised Terms shall take
        effect when posted on the Site.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        Article 12 (Governing Law and Jurisdiction)
      </h2>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>These Terms shall be governed by Japanese law.</li>
        <li>
          In case of disputes arising from the Site, the court with jurisdiction
          over our store&apos;s location shall have exclusive jurisdiction.
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">Contact</h2>
      <div className="bg-stone-50 p-6 rounded-lg mb-8">
        <p className="text-stone-600">
          <strong>Pachelar Room</strong>
          <br />
          Representative: Kana Mitsui
          <br />
          Email: hello@yawnnap.com
          <br />
          Phone: +81-80-1619-9914
        </p>
      </div>

      <p className="text-sm text-stone-500">
        Established: October 20, 2025
        <br />
        Last Updated: October 20, 2025
      </p>
    </article>
  );
}
