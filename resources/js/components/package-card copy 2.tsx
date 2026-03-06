import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

// ─── Constants (Figma-exact) ──────────────────────────────────────────────────
const CARD_W = 384;
const CARD_H = 468;
const NOTCH_X = 234;  // where the badge notch begins on the top edge
const NOTCH_Y = 56;   // height of the badge notch
const R = 16;   // shared border-radius

/**
 * SVG card body with a concave notch cut out at the top-right corner.
 * Matches Figma's "Exclude" boolean operation exactly.
 */
function CardBodySVG({ cardColor = "#E8F0EF" }) {
    const w = CARD_W, h = CARD_H, nx = NOTCH_X, ny = NOTCH_Y, r = R;

    const d = [
        `M ${r} 0`,
        `L ${nx} 0`,
        `A ${r} ${r} 0 0 0 ${nx} ${r}`,   // concave arc (sweep 0 = counter-clockwise)
        `L ${nx} ${ny - r}`,
        `A ${r} ${r} 0 0 1 ${nx + r} ${ny}`,
        `L ${w - r} ${ny}`,
        `A ${r} ${r} 0 0 1 ${w} ${ny + r}`,
        `L ${w} ${h - r}`,
        `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
        `L ${r} ${h}`,
        `A ${r} ${r} 0 0 1 0 ${h - r}`,
        `L 0 ${r}`,
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
            <path d={d} fill={cardColor} />
        </svg>
    );
}

/**
 * TravelPackageCard — fully reusable, all content & colors passed as props.
 *
 * @prop {string}   badge          - Top-right badge label  e.g. "5 Nights"
 * @prop {string}   price          - Price string           e.g. "$7,000"
 * @prop {string}   priceUnit      - Per-unit label         e.g. "/Per person"
 * @prop {string}   includesTitle  - Section heading        e.g. "Package Includes:"
 * @prop {string[]} features       - List of included items
 * @prop {string}   ctaLabel       - Button text            e.g. "Choose Plan"
 * @prop {Function} onCtaClick     - Button click handler
 * @prop {string}   badgeColor     - Badge bg color         default #021211
 * @prop {string}   badgeTextColor - Badge text color       default #F6FEFD
 * @prop {string}   cardColor      - Card body bg color     default #E8F0EF
 * @prop {string}   ctaColor       - CTA button color       default #14B8A6
 * @prop {string}   ctaTextColor   - CTA text color         default #F6FEFD
 */
interface PackageCardProps {
    badge?: string;
    price?: string;
    priceUnit?: string;
    includesTitle?: string;
    features?: string[];
    ctaLabel?: string;
    onCtaClick?: () => void;
    badgeColor?: string;
    badgeTextColor?: string;
    cardColor?: string;
    ctaColor?: string;
    ctaTextColor?: string;
}
export default function PackageCard({
    badge = "5 Nights",
    price = "$7,000",
    priceUnit = "/Per person",
    includesTitle = "Package Includes:",
    features = [
        "Pyramids of Giza Tour",
        "Nil River Cruise",
        "Egyptian Museum Visit",
        "Luxury Hotel Stay",
        "All Meals Included",
    ],
    ctaLabel = "Choose Plan",
    onCtaClick,
    badgeColor = "#021211",
    badgeTextColor = "#F6FEFD",
    cardColor = "#E8F0EF",
    ctaColor = "#14B8A6",
    ctaTextColor = "#F6FEFD",
}: PackageCardProps) {
    return (
        <>
            <div style={{ position: "relative", width: CARD_W, height: CARD_H }}>

                {/* Card body SVG (concave notch shape) */}
                <CardBodySVG cardColor={cardColor} />

                {/* Badge */}
                <div style={{
                    position: "absolute",
                    left: 242,
                    top: 0,
                    width: 142,
                    height: 48,
                    background: badgeColor,
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
                        color: badgeTextColor,
                    }}>
                        {badge}
                    </span>
                </div>

                {/* Content */}
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
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                        {/* Price */}
                        <p style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontWeight: 400,
                            fontSize: 24,
                            lineHeight: "150%",
                            color: "#021211",
                            margin: 0,
                        }}>
                            {price}
                            <span style={{
                                fontFamily: "'Libre Franklin', sans-serif",
                                fontSize: 14,
                                color: "#354240",
                                marginLeft: 4,
                            }}>
                                {priceUnit}
                            </span>
                        </p>

                        {/* Features */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <p style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontWeight: 400,
                                fontSize: 24,
                                lineHeight: "150%",
                                color: "#021211",
                                margin: 0,
                            }}>
                                {includesTitle}
                            </p>

                            {features.map((item, i) => (
                                <div key={i} style={{
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

                    {/* CTA */}
                    <Button
                        onClick={onCtaClick}
                        style={{
                            width: "100%",
                            height: 48,
                            background: ctaColor,
                            color: ctaTextColor,
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
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        {ctaLabel}
                        <ArrowRight size={20} color={ctaTextColor} />
                    </Button>
                </div>
            </div>
        </>
    );
}

// TravelPackageCard.propTypes = {
//     badge: PropTypes.string,
//     price: PropTypes.string,
//     priceUnit: PropTypes.string,
//     includesTitle: PropTypes.string,
//     features: PropTypes.arrayOf(PropTypes.string),
//     ctaLabel: PropTypes.string,
//     onCtaClick: PropTypes.func,
//     badgeColor: PropTypes.string,
//     badgeTextColor: PropTypes.string,
//     cardColor: PropTypes.string,
//     ctaColor: PropTypes.string,
//     ctaTextColor: PropTypes.string,
// };
