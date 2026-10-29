import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const avatar = await readFile(join(process.cwd(), "public", "avatar.png"));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#fcf8f1", color: "#1d1a16", padding: "64px 72px", flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={avatarSrc} alt="Hitaesh's illustrated avatar" width={62} height={62} style={{ borderRadius: 14, objectFit: "cover" }} />
          <span style={{ fontSize: 24, color: "#786d61" }}>hitaesh.com</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 62, fontWeight: 700, letterSpacing: -3 }}>Hitaesh Saravanarajan</div>
          <div style={{ fontSize: 34 }}>Software Engineer</div>
          <div style={{ fontSize: 25, color: "#786d61" }}>Computer Engineering @ Purdue University</div>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #d2c2ab", paddingTop: 26, fontSize: 23, color: "#4d463d" }}>Backend APIs · Fullstack apps · Cloud · AI & agents</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
