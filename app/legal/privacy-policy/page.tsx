// app/legal/privacy-policy/page.tsx

"use client";

import { useCart } from "@/components/CartContext";

export default function PrivacyPolicyPage() {
  const { language } = useCart();

  if (language === "en") {
    return <PrivacyPolicyEN />;
  }

  return <PrivacyPolicyJA />;
}

function PrivacyPolicyJA() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1 className="text-3xl font-serif text-stone-800 mb-8">
        プライバシーポリシー
      </h1>

      <p className="text-stone-600 leading-relaxed mb-6">
        パシュラールーム(以下「当店」といいます)は、お客様の個人情報保護の重要性について認識し、個人情報の保護に関する法律(以下「個人情報保護法」といいます)を遵守すると共に、以下のプライバシーポリシー(以下「本ポリシー」といいます)に従い、適切な取扱い及び保護に努めます。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        1. 個人情報の定義
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        本ポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの(他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます)、もしくは個人識別符号が含まれる情報を意味するものとします。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        2. 個人情報の収集方法
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        当店は、お客様が当サイトのサービスをご利用される際に、以下の個人情報を収集することがあります。
      </p>
      <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6">
        <li>氏名</li>
        <li>メールアドレス</li>
        <li>住所</li>
        <li>電話番号</li>
        <li>配送先情報</li>
        <li>お支払い情報</li>
        <li>お問い合わせ内容</li>
      </ul>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        3. 個人情報の利用目的
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        当店は、お客様から取得した個人情報を、以下の目的のために利用いたします。
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>ご注文いただいた商品の発送、および配送に関する連絡のため</li>
        <li>お問い合わせへの対応のため</li>
        <li>決済処理および与信審査のため</li>
        <li>当店のサービス向上、新商品・サービスの開発のため</li>
        <li>
          キャンペーン・イベント等の案内のため(お客様が希望された場合のみ)
        </li>
        <li>利用規約違反や不正利用の防止のため</li>
        <li>その他、上記利用目的に付随する目的のため</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        4. 個人情報の第三者提供
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        当店は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>お客様の同意がある場合</li>
        <li>法令に基づく場合</li>
        <li>
          人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難である場合
        </li>
        <li>配送業者など、商品の発送に必要な範囲で提供する場合</li>
        <li>決済代行業者など、決済処理に必要な範囲で提供する場合</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        5. 個人情報の安全管理
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        当店は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、個人情報の安全管理が図られるよう、当店の従業員に対し、必要かつ適切な監督を行います。また、個人情報の取扱いを委託する場合は、委託先に対し、必要かつ適切な監督を行います。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        6. Cookie(クッキー)の使用について
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        当店のウェブサイトでは、お客様により良いサービスを提供するため、Cookieを使用することがあります。Cookieとは、ウェブサイトを訪問した際に、お客様のコンピューターやスマートフォンに保存される小さなテキストファイルです。
        <br />
        <br />
        Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることができます。ただし、Cookieを無効にした場合、当サイトの一部機能がご利用いただけなくなる可能性があります。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        7. アクセス解析ツールについて
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        当店のウェブサイトでは、サービスの向上を目的として、Google
        Analyticsなどのアクセス解析ツールを使用しています。これらのツールはCookieを使用して、お客様の当サイトへのアクセス情報を収集します。収集される情報は匿名で、個人を特定するものではありません。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        8. 個人情報の開示・訂正・削除
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        お客様は、当店に対し、個人情報保護法の定めに基づき、以下の請求を行うことができます。
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>個人情報の開示請求</li>
        <li>個人情報の訂正・追加・削除請求</li>
        <li>個人情報の利用停止請求</li>
      </ol>
      <p className="text-stone-600 leading-relaxed mb-6">
        これらの請求を希望される場合は、以下の連絡先までご連絡ください。
      </p>

      <div className="bg-stone-50 p-6 rounded-lg mb-6">
        <p className="font-medium text-stone-800 mb-2">お問い合わせ先</p>
        <p className="text-stone-600">
          パシュラールーム
          <br />
          メール：hello@yawnnap.com
          <br />
          電話：080-1619-9914
        </p>
      </div>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        9. プライバシーポリシーの変更
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        当店は、法令の変更や事業内容の変更等に応じて、本ポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイト上に掲載した時点で効力を生じるものとします。
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        10. お問い合わせ
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        本ポリシーに関するお問い合わせは、以下の窓口までお願いいたします。
      </p>

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

function PrivacyPolicyEN() {
  return (
    <article className="prose prose-stone max-w-none">
      <h1 className="text-3xl font-serif text-stone-800 mb-8">
        Privacy Policy
      </h1>

      <p className="text-stone-600 leading-relaxed mb-6">
        Pachelar Room (hereinafter referred to as &ldquo;we&rdquo; or &ldquo;our
        store&rdquo;) recognizes the importance of protecting your personal
        information and complies with applicable privacy laws. We are committed
        to handling and protecting your personal information appropriately in
        accordance with this Privacy Policy.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        1. Definition of Personal Information
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        In this policy, &ldquo;personal information&rdquo; means information
        about a living individual that can identify a specific individual by
        name, date of birth, or other descriptions contained in such information
        (including information that can be easily collated with other
        information and thereby identify a specific individual), or information
        that contains a personal identification code.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        2. Collection of Personal Information
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        We may collect the following personal information when you use our
        website services:
      </p>
      <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6">
        <li>Full name</li>
        <li>Email address</li>
        <li>Postal address</li>
        <li>Phone number</li>
        <li>Shipping information</li>
        <li>Payment information</li>
        <li>Inquiry content</li>
      </ul>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        3. Purpose of Use of Personal Information
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        We use the personal information collected from you for the following
        purposes:
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>To ship ordered products and communicate regarding delivery</li>
        <li>To respond to inquiries</li>
        <li>To process payments and conduct credit assessments</li>
        <li>To improve our services and develop new products and services</li>
        <li>
          To send campaign and event information (only if requested by you)
        </li>
        <li>
          To prevent violations of our terms of use and fraudulent activities
        </li>
        <li>For other purposes incidental to the above</li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        4. Provision of Personal Information to Third Parties
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        We will not provide your personal information to third parties except in
        the following cases:
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>When we have your consent</li>
        <li>When required by law</li>
        <li>
          When necessary to protect life, body, or property and it is difficult
          to obtain your consent
        </li>
        <li>
          When providing information to delivery companies within the scope
          necessary for product shipment
        </li>
        <li>
          When providing information to payment processors within the scope
          necessary for payment processing
        </li>
      </ol>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        5. Security Management of Personal Information
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        We implement necessary and appropriate supervision of our employees to
        ensure the security management of personal information against risks
        such as loss, destruction, falsification, and leakage. When outsourcing
        the handling of personal information, we conduct necessary and
        appropriate supervision of the contractors.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        6. Use of Cookies
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        Our website may use cookies to provide better services. Cookies are
        small text files stored on your computer or smartphone when you visit a
        website.
        <br />
        <br />
        If you do not wish to use cookies, you can disable them in your browser
        settings. However, disabling cookies may limit your ability to use some
        features of our website.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        7. Access Analysis Tools
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        Our website uses access analysis tools such as Google Analytics for
        service improvement purposes. These tools collect access information to
        our site using cookies. The information collected is anonymous and does
        not identify individuals.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        8. Disclosure, Correction, and Deletion of Personal Information
      </h2>
      <p className="text-stone-600 leading-relaxed mb-4">
        You may request the following in accordance with applicable privacy
        laws:
      </p>
      <ol className="list-decimal list-inside text-stone-600 space-y-2 mb-6">
        <li>Disclosure of personal information</li>
        <li>Correction, addition, or deletion of personal information</li>
        <li>Suspension of use of personal information</li>
      </ol>
      <p className="text-stone-600 leading-relaxed mb-6">
        To make these requests, please contact us:
      </p>

      <div className="bg-stone-50 p-6 rounded-lg mb-6">
        <p className="font-medium text-stone-800 mb-2">Contact Information</p>
        <p className="text-stone-600">
          Pachelar Room
          <br />
          Email: hello@yawnnap.com
          <br />
          Phone: +81-80-1619-9914
        </p>
      </div>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        9. Changes to Privacy Policy
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        We may change this policy in response to changes in laws or business
        operations. The revised Privacy Policy will take effect when posted on
        our website.
      </p>

      <h2 className="text-xl font-medium text-stone-800 mt-8 mb-4">
        10. Inquiries
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6">
        For inquiries regarding this policy, please contact:
      </p>

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
