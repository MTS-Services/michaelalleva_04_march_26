import { cn } from '@/lib/utils';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addWeeks,
    startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function MonthCalendar({
    month,
    availableDates,
    selected,
    onSelect,
    onPrev,
    onNext,
    showPrev,
    showNext,
}: {
    month: Date;
    availableDates: Date[];
    selected: Date | undefined;
    onSelect: (d: Date) => void;
    onPrev?: () => void;
    onNext?: () => void;
    showPrev: boolean;
    showNext: boolean;
}) {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="flex-1">
            {/* Month header */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={onPrev}
                    className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-muted',
                        !showPrev && 'invisible',
                    )}
                    aria-label="Previous month"
                >
                    <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <span className="font-libre-franklin text-sm font-medium text-foreground">
                    {format(month, 'MMMM yyyy')}
                </span>
                <button
                    onClick={onNext}
                    className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-muted',
                        !showNext && 'invisible',
                    )}
                    aria-label="Next month"
                >
                    <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
            </div>

            {/* Weekday headers */}
            <div className="mb-2 grid grid-cols-7">
                {WEEK_DAYS.map((d) => (
                    <div key={d} className="py-1 text-center">
                        <span className="font-libre-franklin text-xs font-medium text-muted-foreground">
                            {d}
                        </span>
                    </div>
                ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
                {days.map((day, i) => {
                    const inMonth = isSameMonth(day, month);
                    const isAvailable = availableDates.some((d) => isSameDay(d, day));
                    const isSelected = selected ? isSameDay(day, selected) : false;

                    return (
                        <div key={i} className="flex items-center justify-center py-1.5">
                            {inMonth ? (
                                <button
                                    onClick={() => isAvailable && onSelect(day)}
                                    disabled={!isAvailable}
                                    className={cn(
                                        'flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all',
                                        isSelected
                                            ? 'bg-primary font-semibold text-primary-foreground'
                                            : isAvailable
                                                ? 'border border-border bg-card font-medium text-foreground hover:border-primary hover:bg-primary/5'
                                                : 'cursor-default text-muted-foreground opacity-40',
                                    )}
                                >
                                    {format(day, 'd').padStart(2, '0')}
                                </button>
                            ) : (
                                <span className="h-9 w-9" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}