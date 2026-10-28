/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 富士ヒノキの LP・ブログ（旧 hinokifragrance.com）で使う色とフォント
      colors: {
        hinoki: {
          gold: "#c4a962",
          light: "#e8dcc8",
          brown: "#8b7355",
        },
        "neon-green": "#7fff00",
        "forest-deep": "#1a3a2e",
      },
      fontFamily: {
        "ja-display": ["var(--font-noto-serif-jp)", "serif"],
        "en-display": ["var(--font-playfair)", "serif"],
        "en-accent": ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
