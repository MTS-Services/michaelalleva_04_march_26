import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type BookingStatus = 'Confirmed' | 'Paid' | 'Completed' | 'Pending' | 'Refunded' | string;

const STATUS_STYLES: Record<string, string> = {
    Confirmed: 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20',
    Paid: 'border-teal-500 text-teal-600 bg-teal-50 dark:bg-teal-900/20',
    Completed: 'border-slate-500 text-slate-600 bg-slate-50 dark:bg-slate-900/20',
    Pending: 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    Refunded: 'border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20',
};

interface StatusBadgeProps {
    status: BookingStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const style = STATUS_STYLES[status] ?? 'border-border text-muted-foreground';
    return (
        <Badge className={cn(style, className)}>
            {status}
        </Badge>
    );
}