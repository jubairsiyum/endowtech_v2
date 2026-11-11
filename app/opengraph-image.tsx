import { ImageResponse } from "next/og";

export const alt = "Endow Tech — Enterprise Software & Digital Product Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0A0A0B",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        position: "relative",
        fontFamily: "sans-serif",
        color: "#ffffff",
        border: "1px solid #262626",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.35) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: "#DC2626",
            boxShadow: "0 0 12px #DC2626",
          }}
        />
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#EF4444",
          }}
        >
          Endow Tech // Engineering Division
        </span>
      </div>

      {/* Hero Title & Subtitle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          zIndex: 1,
          maxWidth: "960px",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
          }}
        >
          Enterprise Software &amp; Digital Product Studio
        </div>
        <div
          style={{
            fontSize: "26px",
            lineHeight: 1.4,
            color: "#9CA3AF",
          }}
        >
          Powering admissions systems, AI-driven evaluation portals, and
          scalable cloud applications across Seoul &amp; Dhaka.
        </div>
      </div>

      {/* Footer Metrics */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #27272A",
          paddingTop: "28px",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}
            >
              $12M+
            </span>
            <span style={{ fontSize: "15px", color: "#71717A" }}>
              Applications Processed
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}
            >
              99.98%
            </span>
            <span style={{ fontSize: "15px", color: "#71717A" }}>
              Portal SLA
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}
            >
              10k+
            </span>
            <span style={{ fontSize: "15px", color: "#71717A" }}>
              Active Students
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#A1A1AA",
          }}
        >
          endowtech.dev
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
