import { afterEach, describe, expect, it } from "vitest";
import { formatDate, jsonLdString } from "./utils";

const originalTZ = process.env.TZ;

afterEach(() => {
  process.env.TZ = originalTZ;
});

describe("formatDate", () => {
  it("どのタイムゾーンで動いても日本時間の日付を出す（サーバーは UTC、読者は日本）", () => {
    // 日本時間では 10/27 01:00
    const publishedAt = "2026-10-26T16:00:00.000Z";

    process.env.TZ = "UTC";
    expect(formatDate(publishedAt)).toBe("2026年10月27日");

    process.env.TZ = "Asia/Tokyo";
    expect(formatDate(publishedAt)).toBe("2026年10月27日");
  });
});

describe("jsonLdString", () => {
  it("CMS の文字に </script> が入っていても script タグを閉じない", () => {
    const json = jsonLdString({
      headline: "</script><script>alert(1)</script>",
    });

    expect(json).not.toContain("</script>");
    expect(json).not.toContain("<script>");
    // JSON としては元の文字列に戻る
    expect(JSON.parse(json).headline).toBe(
      "</script><script>alert(1)</script>",
    );
  });
});
