import { test } from "@e2e-dev/web";
import { expect } from "e2e";

/**
 * 日本語の改行位置。
 *
 * ブラウザは日本語を文字ごとにどこでも改行するので、「富士ヒノ／キ」のように言葉の途中で行が変わる。
 * 画面の幅しだいで起きるので、スマホから大きい画面まで幅を変えて確かめる。
 */
test("トップの「富士ヒノキ」は、どの画面の幅でも途中で改行しない", async ({ app, browser }) => {
  await app.open("/");

  const splitAt: number[] = [];
  for (let width = 320; width <= 1920; width += 5) {
    await browser.setViewport({ width, height: 900 });
    const lines = await browser.evaluate(
      () =>
        [...document.querySelectorAll("#hinoki-story span")]
          .find((span) => span.textContent === "「富士ヒノキ」")
          ?.getClientRects().length ?? 0,
    );
    if (lines !== 1) splitAt.push(width);
  }
  expect(splitAt).toEqual([]);
});

/**
 * Safari は word-break: auto-phrase（文節で折る）に対応していない（2026-10 時点、Technology Preview のみ）。
 * テストの Chromium で auto-phrase を切って Safari と同じ折り方にし、トップの大きい見出しが
 * 言葉の途中で折れないか（「変／わる」「生／まれた」など）を確かめる。
 */
const HEADING_WORDS = [
  "富士山",
  "フレグランス",
  "つれてゆく",
  "森林浴",
  "感じたとき",
  "ひと吹き",
  "軽くなる",
  "ヒノキから",
  "生まれた",
  "森のふもと",
  "変わる",
];

test("auto-phrase が効かないブラウザ（Safari）でも、トップの見出しは言葉の途中で折れない", async ({
  app,
  browser,
}) => {
  await app.open("/");
  await browser.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = "body { word-break: normal !important; }";
    document.head.append(style);
    return null;
  });

  const broken: string[] = [];
  for (let width = 320; width <= 1440; width += 4) {
    await browser.setViewport({ width, height: 900 });
    const words = await browser.evaluate((targets: string[]) => {
      const found: string[] = [];
      for (const heading of document.querySelectorAll("main h1, main h2")) {
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? "";
          for (const word of targets) {
            const start = text.indexOf(word);
            if (start < 0) continue;
            const range = document.createRange();
            range.setStart(node, start);
            range.setEnd(node, start + word.length);
            const lines = new Set([...range.getClientRects()].map((rect) => Math.round(rect.top)));
            if (lines.size > 1) found.push(word);
          }
        }
      }
      return found;
    }, HEADING_WORDS);
    for (const word of words) broken.push(`${width}px: ${word}`);
  }
  expect(broken).toEqual([]);
});
