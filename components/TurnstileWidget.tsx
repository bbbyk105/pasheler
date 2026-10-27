"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileRenderOptions = {
  sitekey: string;
  language?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  siteKey: string;
  language: "ja" | "en";
  onVerify: (token: string) => void;
  /** トークンの期限切れ（送信ボタンを止めるため） */
  onExpire: () => void;
  /** 鍵の設定漏れ・読み込み失敗（広告ブロックなど）。親がメールでの連絡を案内する */
  onError: () => void;
};

/**
 * Cloudflare Turnstile の確認欄。トークンは1回しか使えないので、
 * 送信のたびに親が key を変えて作り直す。
 */
export default function TurnstileWidget({
  siteKey,
  language,
  onVerify,
  onExpire,
  onError,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const callbacks = useRef({ onVerify, onExpire, onError });

  useEffect(() => {
    callbacks.current = { onVerify, onExpire, onError };
  }, [onVerify, onExpire, onError]);

  useEffect(() => {
    if (!siteKey) {
      console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
      callbacks.current.onError();
      return;
    }

    const container = containerRef.current;
    if (!ready || !container || !window.turnstile) return;

    let widgetId: string;
    try {
      widgetId = window.turnstile.render(container, {
        sitekey: siteKey,
        language,
        theme: "light",
        size: "flexible",
        callback: (token) => callbacks.current.onVerify(token),
        "expired-callback": () => callbacks.current.onExpire(),
        "error-callback": () => callbacks.current.onError(),
      });
    } catch (error) {
      console.error("Turnstile render error:", error);
      callbacks.current.onError();
      return;
    }

    return () => window.turnstile?.remove(widgetId);
  }, [ready, siteKey, language]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => callbacks.current.onError()}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}
