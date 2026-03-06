import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

interface PackageCardProps {
    badge?: string;
    price?: string;
    priceUnit?: string;
    includesTitle?: string;
    features?: string[];
    ctaLabel?: string;
    href?: string;
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
    href = '#',
}: PackageCardProps) {
    return (
        <div className="bg-card p-6 rounded-xl relative w-full min-w-xs">
            <div className="bg-white absolute top-0 right-0 pl-2 pb-2 rounded-bl-xl">
                <Button className="bg-foreground text-white hover:bg-foreground">
                    {badge}
                </Button>
            </div>
            <div>
                <p className="text-foreground text-lg sm:text-xl md:text-2xl mb-5">
                    {price}
                    <span className="text-sm">
                        {priceUnit}
                    </span>
                </p>
                <div className="flex flex-col gap-3">
                    <h4 className="text-foreground text-lg sm:text-xl md:text-2xl">
                        {includesTitle}
                    </h4>

                    {features.map((item, i) => (
                        <div key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <Button
                className="w-full text-base cursor-pointer mt-12"
                size="lg"
            >
                <Link href={href} className="w-full flex items-center justify-center gap-2">
                    {ctaLabel}
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </div>
    )
}
