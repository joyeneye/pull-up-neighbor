export function StudioLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontWeight: 800,
        letterSpacing: "-0.01em",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          borderRadius: 6,
          background: "#06A459",
          color: "#0f172a",
          fontWeight: 900,
          fontSize: 13,
        }}
      >
        PUN
      </span>
      <span style={{ fontSize: 14 }}>Pull Up Neighbor</span>
    </div>
  );
}
