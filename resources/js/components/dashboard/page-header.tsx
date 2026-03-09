interface PageHeaderProps {
    title: string;
    subtitle?: string;
}


export function PageHeader({ title, subtitle }: PageHeaderProps) {
    const W = 240;
    const H = 240;

    const rings: { r: number; opacity: number }[] = [
        { r: 69.23, opacity: 0.55 },  // Ellipse 6424 — innermost
        { r: 94.62, opacity: 0.42 },  // Ellipse 6428 — middle
        { r: 120,   opacity: 0.30 },  // Ellipse 6429 — outermost
    ];

    return (
        <div className="relative overflow-hidden rounded-2xl bg-primary px-10 py-10 text-primary-foreground">
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0"
                width={W}
                height={H}
                viewBox={`0 0 ${W} ${H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="ph-ring-blur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" />
                    </filter>
                </defs>

                {rings.map(({ r, opacity }, i) => (
                    <circle
                        key={i}
                        cx={W}
                        cy={H}
                        r={r}
                        stroke="hsl(173,80%,45%)"
                        strokeWidth="18"
                        strokeOpacity={opacity}
                        fill="none"
                        filter="url(#ph-ring-blur)"
                    />
                ))}
            </svg>

            <h1 className="font-oswald relative text-3xl font-semibold leading-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="font-libre-franklin relative mt-2 text-base opacity-90">
                    {subtitle}
                </p>
            )}
        </div>
    );
}