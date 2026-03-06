import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// ─── Exact values from Figma ─────────────────────────────────────────────────
// Card outer group:       384 × 468
// Exclude (card body):    384 × 468, bg #E8F0EF, border-radius 16px
// Rectangle 3 (notch):   150 × 56, left 234, top 0   ← subtracted by Exclude
// Badge (Button):         142 × 48, left 242, top 0,  bg #021211, br 12px
// Content frame:          336 × 392, left 24, top 76
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 384;
const CARD_H = 468;
const NOTCH_X = 234;   // left edge of the badge notch
const NOTCH_Y = 56;    // bottom edge of the badge notch
const R = 16;    // shared corner radius (card + notch corners)

/**
 * Draws the card body as an SVG path that matches Figma's "Exclude" boolean:
 *   full card rounded-rect  MINUS  Rectangle-3 at top-right
 *
 * Traced clockwise:
 *   TL convex → top edge → concave arc at notch TL corner →
 *   notch left edge → notch BL convex → notch bottom → notch BR convex →
 *   card right edge → BR convex → bottom edge → BL convex → card left edge
 */
function CardBodySVG() {
    const w = CARD_W, h = CARD_H, nx = NOTCH_X, ny = NOTCH_Y, r = R;

    const d = [
        // ── Top-left convex corner ────────────────────────────────────────────
        `M ${r} 0`,
        // ── Top edge → stop before notch ─────────────────────────────────────
        `L ${nx} 0`,
        // ── Notch TL: CONCAVE arc (sweep-flag 0 = counter-clockwise) ─────────
        //    from (nx, 0) curving inward to (nx, r)
        //    arc centre sits at (nx + r, r) which is INSIDE the notch area
        `A ${r} ${r} 0 0 0 ${nx} ${r}`,
        // ── Notch left edge ───────────────────────────────────────────────────
        `L ${nx} ${ny - r}`,
        // ── Notch BL: CONVEX arc (sweep-flag 1) from going-down to going-right
        `A ${r} ${r} 0 0 1 ${nx + r} ${ny}`,
        // ── Notch bottom edge ─────────────────────────────────────────────────
        `L ${w - r} ${ny}`,
        // ── Notch BR / card TR: CONVEX arc going-right to going-down ─────────
        `A ${r} ${r} 0 0 1 ${w} ${ny + r}`,
        // ── Card right edge ───────────────────────────────────────────────────
        `L ${w} ${h - r}`,
        // ── Card BR: convex ───────────────────────────────────────────────────
        `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
        // ── Card bottom edge ──────────────────────────────────────────────────
        `L ${r} ${h}`,
        // ── Card BL: convex ───────────────────────────────────────────────────
        `A ${r} ${r} 0 0 1 0 ${h - r}`,
        // ── Card left edge ────────────────────────────────────────────────────
        `L 0 ${r}`,
        // ── Card TL: convex ───────────────────────────────────────────────────
        `A ${r} ${r} 0 0 1 ${r} 0`,
        "Z",
    ].join(" ");

    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={d} fill="#E8F0EF" />
        </svg>
    );
}

export default function EgyptPackageCard() {
    return (
        <>
            {/* Google Fonts: Oswald + Libre Franklin */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500&family=Oswald:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

            {/* Page background */}
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(160deg, #e6f4f1 0%, #daeee9 60%, #d4ece7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 20px",
            }}>

                {/* ── Outer container: exactly 384 × 468 ── */}
                <div style={{ position: "relative", width: CARD_W, height: CARD_H }}>

                    {/* SVG card body (Figma's "Exclude" shape) */}
                    <CardBodySVG />

                    {/* ── Badge: left 242, top 0, w 142, h 48 ── */}
                    <div style={{
                        position: "absolute",
                        left: 242,
                        top: 0,
                        width: 142,
                        height: 48,
                        background: "#021211",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                    }}>
                        <span style={{
                            fontFamily: "'Libre Franklin', sans-serif",
                            fontWeight: 400,
                            fontSize: 16,
                            lineHeight: "150%",
                            color: "#F6FEFD",
                        }}>
                            5 Nights
                        </span>
                    </div>

                    {/* ── Content frame: left 24, top 76, w 336 ── */}
                    <div style={{
                        position: "absolute",
                        left: 24,
                        top: 76,
                        width: 336,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 40,
                        paddingBottom: 24,
                        zIndex: 5,
                    }}>

                        {/* Top section: price + list */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                            {/* Price */}
                            <p style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontWeight: 400,
                                fontSize: 24,
                                lineHeight: "150%",
                                color: "#021211",
                            }}>
                                $7,000<span style={{
                                    fontFamily: "'Libre Franklin', sans-serif",
                                    fontSize: 14,
                                    color: "#354240",
                                    marginLeft: 4,
                                }}>/Per person</span>
                            </p>

                            {/* Package includes */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <p style={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 400,
                                    fontSize: 24,
                                    lineHeight: "150%",
                                    color: "#021211",
                                }}>
                                    Package Includes:
                                </p>

                                {[
                                    "Pyramids of Giza Tour",
                                    "Nil River Cruise",
                                    "Egyptian Museum Visit",
                                    "Luxury Hotel Stay",
                                    "All Meals Included",
                                ].map((item) => (
                                    <div key={item} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        fontFamily: "'Libre Franklin', sans-serif",
                                        fontWeight: 400,
                                        fontSize: 16,
                                        lineHeight: "150%",
                                        color: "#354240",
                                    }}>
                                        <span style={{
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            background: "#354240",
                                            flexShrink: 0,
                                        }} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Button style={{
                            width: "100%",
                            height: 48,
                            background: "#14B8A6",
                            color: "#F6FEFD",
                            borderRadius: 8,
                            fontFamily: "'Libre Franklin', sans-serif",
                            fontWeight: 400,
                            fontSize: 16,
                            lineHeight: "150%",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            textTransform: "capitalize",
                            cursor: "pointer",
                            transition: "opacity 0.15s",
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                        >
                            Choose Plan
                            <ArrowRight size={20} color="#F6FEFD" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}