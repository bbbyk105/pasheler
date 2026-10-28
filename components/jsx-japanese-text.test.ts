import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

/**
 * JSX の地の文を複数行に分けて書くと、行のつなぎ目に半角スペースが 1 つ入る（JSX の仕様）。
 * 日本語の文中では「で、 ゆっくり」のような空きになって見えるので、日本語どうしのあいだに
 * 半角スペースが入る書き方をしていないかを、ソースから調べる。
 */

const ROOT = process.cwd();
const DIRS = ["app", "components"];

// かな・漢字と、日本語の約物
const JA = String.raw`[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー、。「」『』（）！？・…〜]`;
const SPACE_BETWEEN_JA = new RegExp(`${JA} +(?=${JA})`, "gu");

function tsxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return tsxFiles(full);
    return entry.name.endsWith(".tsx") ? [full] : [];
  });
}

/** JSX の地の文が画面に出るときの文字列（行頭と行末の空白を落とし、空行を除いて半角スペースでつなぐ） */
function renderedJsxText(raw: string): string {
  const lines = raw.split(/\r\n|\n|\r/);
  if (lines.length === 1) return raw;
  return lines
    .map((line, i) => {
      let text = line;
      if (i > 0) text = text.replace(/^[ \t]+/, "");
      if (i < lines.length - 1) text = text.replace(/[ \t]+$/, "");
      return text;
    })
    .filter((text) => text.length > 0)
    .join(" ");
}

function spacesBetweenJapanese(file: string): string[] {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: string[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node)) {
      const text = renderedJsxText(node.getFullText());
      const { line } = source.getLineAndCharacterOfPosition(node.getStart());
      for (const match of text.matchAll(SPACE_BETWEEN_JA)) {
        const around = text.slice(Math.max(0, match.index - 4), match.index + match[0].length + 4);
        found.push(`${path.relative(ROOT, file)}:${line + 1} 「${around}」`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

describe("JSX の日本語の地の文", () => {
  it("日本語どうしのあいだに半角スペースが入らない", () => {
    const found = DIRS.flatMap((dir) => tsxFiles(path.join(ROOT, dir))).flatMap(spacesBetweenJapanese);
    expect(found).toEqual([]);
  });
});
