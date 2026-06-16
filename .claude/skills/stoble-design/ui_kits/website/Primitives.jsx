// Stoble — shared UI building blocks for the website kit.
// Lowercase across the board; serif for headings, sans for furniture.

const { useState } = React;

// ─────────────────────────────────────────────────────────────
// Wordmark — uses the real PNG. Pass tone="navy" | "white" | "lightgray".
// ─────────────────────────────────────────────────────────────
function Wordmark({ tone = "navy", height = 32 }) {
  const src = `../../assets/wordmark-${tone}.png`;
  return <img src={src} alt="stoble" style={{ height, display: "block" }} />;
}

function Symbol({ tone = "navy", size = 28 }) {
  const src = `../../assets/symbol-s-${tone}.png`;
  return <img src={src} alt="" style={{ height: size, width: "auto", display: "block" }} />;
}

// ─────────────────────────────────────────────────────────────
// Button — pill, three styles.
// ─────────────────────────────────────────────────────────────
function Button({ variant = "primary", size = "md", children, arrow = false, onClick, type = "button" }) {
  const cls = `sto-btn sto-btn-${variant} sto-btn-${size}`;
  return (
    <button className={cls} onClick={onClick} type={type}>
      <span>{children}</span>
      {arrow && <span className="sto-btn-arrow">→</span>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Eyebrow — uppercase Garnett label above section heads.
// ─────────────────────────────────────────────────────────────
function Eyebrow({ children, color }) {
  return <div className="sto-eyebrow" style={color ? { color } : undefined}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────
// Tagline image — Better Together lockups.
// ─────────────────────────────────────────────────────────────
function BetterTogether({ variant = "wave", tone = "navy", height = 56 }) {
  // Only wave is shipped in white. For other variants on dark surfaces,
  // load the navy file and invert it via CSS — preserves visual variety.
  const needsInvert = (tone === "white" && variant !== "wave");
  const src = needsInvert
    ? `../../assets/bt-${variant}-navy.png`
    : `../../assets/bt-${variant}-${tone}.png`;
  const style = { height, display: "block" };
  if (needsInvert) style.filter = "brightness(0) invert(1)";
  return <img src={src} alt="better together" style={style} />;
}

// ─────────────────────────────────────────────────────────────
// CoffeeBag — a faux packaging label used as product imagery.
// Color flood = roast color; centered cream label with text.
// ─────────────────────────────────────────────────────────────
function CoffeeBag({ roast, name, sub, size = "lg" }) {
  const roastColors = {
    flagship: { bg: "#8096A3", tint: "#C9D0D2" },
    dark: { bg: "#556C72", tint: "#DDCBC3" },
    decaf: { bg: "#8BA099", tint: "#C0C8CB" },
    africa: { bg: "#B8A57A", tint: "#E4DED0" },
    south: { bg: "#A56F5C", tint: "#F7F0ED" },
    central: { bg: "#DEBBA8", tint: "#D5DCDA" },
  };
  const c = roastColors[roast] || roastColors.flagship;
  const labelName = { flagship: "flagship", dark: "dark", decaf: "decaf", africa: "africa", south: "south america", central: "central america" }[roast];
  return (
    <div className={`sto-bag sto-bag-${size}`} style={{ background: c.bg }}>
      <div className="sto-bag-strip" style={{ color: c.tint }}>
        <span>stoble</span>
        <span>12 oz / 340 g</span>
      </div>
      <div className="sto-bag-label">
        <div className="sto-bag-roast" style={{ color: c.bg }}>{labelName}</div>
        <div className="sto-bag-name">{name}</div>
        <div className="sto-bag-sub">{sub}</div>
        <div className="sto-bag-notes" style={{ color: c.bg, opacity: 0.7 }}>
          <span>notes</span>
          <span>↓</span>
        </div>
      </div>
      <div className="sto-bag-foot" style={{ color: c.tint }}>better together.</div>
    </div>
  );
}

Object.assign(window, { Wordmark, Symbol, Button, Eyebrow, BetterTogether, CoffeeBag });
