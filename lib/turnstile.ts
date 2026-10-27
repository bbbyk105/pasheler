const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Cloudflare Turnstile のトークンをサーバー側で確認する。
 * 秘密鍵が無い・トークンが無い・Cloudflare に届かないときは false（送信させない）。
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data: { success?: boolean; "error-codes"?: string[] } =
      await res.json();
    if (data.success !== true) {
      console.warn("Turnstile verification failed:", data["error-codes"]);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Turnstile siteverify error:", error);
    return false;
  }
}
