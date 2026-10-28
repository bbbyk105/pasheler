import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Playfair_Display,
  Space_Grotesk,
} from "next/font/google";

// 富士ヒノキの LP・ブログ（旧 hinokifragrance.com）のフォント。
// tailwind.config.js の font-ja-display / font-en-display / font-en-accent と
// app/globals.css の .hinoki-scope がこの CSS 変数を使う
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const hinokiFontVariables = [
  notoSansJP.variable,
  notoSerifJP.variable,
  playfair.variable,
  spaceGrotesk.variable,
].join(" ");
