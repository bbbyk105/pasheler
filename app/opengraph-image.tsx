// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const title = "Yawn Nap – Hinoki Fragrance Paper";
  const subtitle = "富士山檜の香りを日常に。Fragrance paper made in Japan.";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 36, marginTop: 16 }}>{subtitle}</div>
      </div>
    ),
    size
  );
}
