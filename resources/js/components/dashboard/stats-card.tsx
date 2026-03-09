import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    change?: string;
    changeUp?: boolean;
    className?: string;
}

export function StatsCard({ label, value, change, changeUp = true, className }: StatsCardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-border bg-card p-5 shadow-sm',
                className,
            )}
        >
            <p className="font-libre-franklin text-sm text-muted-foreground">{label}</p>
            <p className="font-oswald mt-2 text-4xl font-semibold text-foreground">{value}</p>
            {change && (
                <div className="mt-3 flex items-center gap-1.5">
                    <span className="font-libre-franklin text-xs text-muted-foreground">
                        Since last week
                    </span>
                    <span
                        className={cn(
                            'font-libre-franklin flex items-center gap-0.5 text-xs font-medium',
                            changeUp ? 'text-primary' : 'text-destructive',
                        )}
                    >
                        {change}
                        <TrendingUp className="h-3 w-3" />
                    </span>
                </div>
            )}
        </div>
    );
}