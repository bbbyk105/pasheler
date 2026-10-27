import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { ContactRequestBody, ContactApiResponse } from "@/types/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";

/** メールの HTML 本文に入れる前に、入力をタグとして解釈されない形にする */
function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // バリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: "すべてのフィールドを入力してください",
        },
        { status: 400 }
      );
    }

    // メールの長さチェック
    if (message.length > 500) {
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: "メッセージは500文字以内で入力してください",
        },
        { status: 400 }
      );
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message: "有効なメールアドレスを入力してください",
        },
        { status: 400 }
      );
    }

    // Cloudflare Turnstile（bot による自動送信を止める）
    const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (!(await verifyTurnstileToken(turnstileToken, remoteIp))) {
      return NextResponse.json<ContactApiResponse>(
        {
          success: false,
          message:
            "送信前の確認ができませんでした。ページを再読み込みして、もう一度お試しください",
        },
        { status: 403 }
      );
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    };

    // Nodemailerトランスポーター設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // メール本文作成
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `【お問い合わせ】${subject}`,
      text: `
お問い合わせがありました

【お名前】
${name}

【メールアドレス】
${email}

【件名】
${subject}

【メッセージ】
${message}

---
送信日時: ${new Date().toLocaleString("ja-JP", {
        timeZone: "Asia/Tokyo",
      })}
      `,
      html: `
        <div style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f4;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #292524; border-bottom: 2px solid #292524; padding-bottom: 10px; margin-bottom: 20px;">
              お問い合わせがありました
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #57534e; font-size: 14px; margin-bottom: 8px;">【お名前】</h3>
              <p style="color: #292524; font-size: 16px; margin: 0; padding: 10px; background-color: #fafaf9; border-radius: 4px;">
                ${safe.name}
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #57534e; font-size: 14px; margin-bottom: 8px;">【メールアドレス】</h3>
              <p style="color: #292524; font-size: 16px; margin: 0; padding: 10px; background-color: #fafaf9; border-radius: 4px;">
                <a href="mailto:${safe.email}" style="color: #292524; text-decoration: none;">${safe.email}</a>
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #57534e; font-size: 14px; margin-bottom: 8px;">【件名】</h3>
              <p style="color: #292524; font-size: 16px; margin: 0; padding: 10px; background-color: #fafaf9; border-radius: 4px;">
                ${safe.subject}
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #57534e; font-size: 14px; margin-bottom: 8px;">【メッセージ】</h3>
              <p style="color: #292524; font-size: 16px; margin: 0; padding: 15px; background-color: #fafaf9; border-radius: 4px; white-space: pre-wrap; line-height: 1.6;">
                ${safe.message}
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e7e5e4; color: #78716c; font-size: 12px;">
              送信日時: ${new Date().toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })}
            </div>
          </div>
        </div>
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return NextResponse.json<ContactApiResponse>(
      {
        success: true,
        message: "お問い合わせを送信しました",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json<ContactApiResponse>(
      {
        success: false,
        message: "メール送信に失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
