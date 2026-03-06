import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { CircleAlert, LucideProps } from "lucide-react";
import { ComponentType } from "react";

export default function BookingRules({
    title,
    rules,
    isSection = false,
    icon = CircleAlert,
}: {
    title?: string;
    rules: string[];
    isSection?: boolean;
    icon?: ComponentType<LucideProps>;
}) {
    return (
        <div className={cn("bg-yellow-50 p-5 dark:border-yellow-900/40 dark:bg-yellow-900/10",
            isSection ? "mb-15" : 'border border-yellow-200 rounded-2xl')}>
            <div className={cn("flex items-start gap-3",
                isSection && "container mx-auto max-w-7xl px-4 md:px-6 lg:px-8"
            )}>
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white")}>
                    <span className="font-bold">
                        <Icon iconNode={icon} className="size-4"/>
                    </span>
                </div>
                <div>
                    <h4 className={cn("mb-2 text-lg sm:text-xl lg:text-2xl font-semibold text-foreground", isSection && "text-foreground")}>
                        {title}
                    </h4>
                    <ul className={cn("space-y-1 text-sm text-muted-foreground", isSection && "text-muted-foreground")}>
                        {rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground")} />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
