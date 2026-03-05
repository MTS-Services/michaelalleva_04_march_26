
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
    title?: string | null;
    description?: string | null;
    imageSrc?: string | null;
    imageAlt?: string | null;
    ctaHref?: string | null;
    ctaLabel?: string | null;
    ctaVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export default function ArticleCard({ title, description, imageSrc, imageAlt, ctaHref, ctaLabel, ctaVariant = 'default' }: ArticleCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm py-0 rounded-2xl border-none gap-4">
            <img
                src={imageSrc ?? ''}
                alt={imageAlt ?? ''}
                className="relative aspect-384/379 w-full object-cover rounded-t-2xl"
            />
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-oswald font-normal">{title}</CardTitle>
                <CardDescription className="text-foreground text-base sm:text-lg md:text-xxl font-normal">
                    {description}
                </CardDescription>
            </CardHeader>
            {ctaHref && (
                <CardFooter>
                    <Button className={cn("w-full text-sm sm:text-base",
                        ctaVariant === 'link' && 'justify-start hover:no-underline'
                    )} variant={ctaVariant} asChild>
                        <Link href={ctaHref}>
                            {ctaLabel}
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}


