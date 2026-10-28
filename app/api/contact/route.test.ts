import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const sendMail = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({ sendMail }),
  },
}));

const { POST } = await import("./route");

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function contactRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.5, 10.0.0.1",
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "山田 太郎",
  email: "taro@example.com",
  subject: "商品について",
  message: "フレグランスペーパーの在庫はありますか？",
  turnstileToken: "token-from-widget",
};

function mockSiteverify(result: Record<string, unknown>) {
  const fetchMock = vi.fn(async () => Response.json(result));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  sendMail.mockReset();
  sendMail.mockResolvedValue({});
  vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
  it("Turnstile の確認が通ればメールを送る", async () => {
    const fetchMock = mockSiteverify({ success: true });

    const res = await POST(contactRequest(validBody));

    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe(SITEVERIFY_URL);
    const sent = new URLSearchParams(init.body as string);
    expect(sent.get("secret")).toBe("test-secret");
    expect(sent.get("response")).toBe("token-from-widget");
    expect(sent.get("remoteip")).toBe("203.0.113.5");
  });

  it("Turnstile のトークンが無ければ送らない", async () => {
    const fetchMock = mockSiteverify({ success: true });

    const res = await POST(
      contactRequest({ ...validBody, turnstileToken: undefined }),
    );

    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("Cloudflare が bot と判定したら送らない", async () => {
    mockSiteverify({ success: false, "error-codes": ["invalid-input-response"] });

    const res = await POST(contactRequest(validBody));

    expect(res.status).toBe(403);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("秘密鍵が設定されていなければ送らない（設定漏れで素通りさせない）", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const fetchMock = mockSiteverify({ success: true });

    const res = await POST(contactRequest(validBody));

    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("Cloudflare に届かないときは送らない", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );

    const res = await POST(contactRequest(validBody));

    expect(res.status).toBe(403);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("入力に含まれる HTML はメール本文でタグとして解釈されない", async () => {
    mockSiteverify({ success: true });

    const res = await POST(
      contactRequest({
        ...validBody,
        name: '<a href="https://evil.example">公式サポート</a>',
        subject: "<b>至急</b>",
        message: `<img src=x onerror="alert(1)">"&'`,
      }),
    );

    expect(res.status).toBe(200);
    const { html } = sendMail.mock.calls[0][0] as { html: string };
    expect(html).not.toContain('<a href="https://evil.example">');
    expect(html).not.toContain("<b>至急</b>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain(
      "&lt;a href=&quot;https://evil.example&quot;&gt;公式サポート&lt;/a&gt;",
    );
    expect(html).toContain("&lt;b&gt;至急&lt;/b&gt;");
    expect(html).toContain(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&quot;&amp;&#39;",
    );
  });
});
