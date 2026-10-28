import { Fragment } from "react";

/**
 * 見出しの文字列を、「|」の位置でだけ改行できるようにする（<wbr> に置き換える）。
 *
 * Safari は word-break: auto-phrase（文節で折る）に対応していないので、そのままだと
 * 「変／わる」のように言葉の途中で折れる。親の見出しに break-keep（word-break: keep-all）を付け、
 * 「|」と句読点・かっこの前後以外では折らないようにして使う。「|」の無い文字列（英語など）はそのまま出る。
 */
export default function PhraseText({ text }: { text: string }) {
  return text.split("|").map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}
