import { BookingProgress } from '@/components/booking-progress';
import BookingRules from '@/components/booking-rules';
import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
import { guestInfo } from '@/routes';
import { Link } from '@inertiajs/react';
import {
    addDays,
    addMonths,
    addWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isAfter,
    isBefore,
    isSameDay,
    isSameMonth,
    isWithinInterval,
    startOfMonth,
    startOfToday,
    startOfWeek,
} from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DateRange {
    start: Date | undefined;
    end: Date | undefined;
}

interface SelectDatePageProps {
    /** ISO strings of available departure dates (start dates only) */
    availableDates?: string[];
    nextStep?: string;
    prevStep?: string;
}

/** Every 7th day starting 14 days from today */
function generateDefaultAvailable(): string[] {
    const today = startOfToday();
    const start = addDays(today, 14);
    const dates: string[] = [];
    for (let i = 0; i < 8; i++) {
        dates.push(format(addWeeks(start, i), 'yyyy-MM-dd'));
    }
    return dates;
}

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// ─── helpers ────────────────────────────────────────────────────────────────

function isInRange(day: Date, range: DateRange, hovered: Date | undefined): boolean {
    const end = range.end ?? hovered;
    if (!range.start || !end) return false;
    const [lo, hi] = isAfter(end, range.start)
        ? [range.start, end]
        : [end, range.start];
    return isWithinInterval(day, { start: lo, end: hi });
}

function isRangeStart(day: Date, range: DateRange, hovered: Date | undefined): boolean {
    const end = range.end ?? hovered;
    if (!range.start) return false;
    if (!end || isSameDay(range.start, end)) return isSameDay(day, range.start);
    const [lo] = isAfter(end, range.start)
        ? [range.start, end]
        : [end, range.start];
    return isSameDay(day, lo);
}

function isRangeEnd(day: Date, range: DateRange, hovered: Date | undefined): boolean {
    const end = range.end ?? hovered;
    if (!range.start || !end || isSameDay(range.start, end)) return false;
    const [, hi] = isAfter(end, range.start)
        ? [range.start, end]
        : [end, range.start];
    return isSameDay(day, hi);
}

// ─── MonthCalendar ───────────────────────────────────────────────────────────

function MonthCalendar({
    month,
    availableDates,
    range,
    hovered,
    onSelect,
    onHover,
    onPrev,
    onNext,
    showPrev,
    showNext,
}: {
    month: Date;
    availableDates: Date[];
    range: DateRange;
    hovered: Date | undefined;
    onSelect: (d: Date) => void;
    onHover: (d: Date | undefined) => void;
    onPrev?: () => void;
    onNext?: () => void;
    showPrev: boolean;
    showNext: boolean;
}) {
    const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
    const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

    return (
        <div className="flex-1 min-w-0">
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

            {/* Weekday labels */}
            <div className="mb-1 grid grid-cols-7">
                {WEEK_DAYS.map((d) => (
                    <div key={d} className="py-1 text-center">
                        <span className="font-libre-franklin text-xs font-medium text-muted-foreground">
                            {d}
                        </span>
                    </div>
                ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7">
                {days.map((day, i) => {
                    const inMonth = isSameMonth(day, month);
                    const isAvailable = availableDates.some((d) => isSameDay(d, day));

                    // Range states
                    const inRng = inMonth && isInRange(day, range, hovered);
                    const isStart = inMonth && isRangeStart(day, range, hovered);
                    const isEnd = inMonth && isRangeEnd(day, range, hovered);
                    const isSingle =
                        inMonth &&
                        range.start &&
                        isSameDay(day, range.start) &&
                        !range.end &&
                        !hovered;

                    // Column index for rounded pill edges
                    const colIdx = i % 7; // 0 = SUN, 6 = SAT

                    return (
                        <div
                            key={i}
                            className={cn(
                                'relative flex h-10 items-center justify-center',
                                // Range fill strip (full-width bg, no rounding)
                                inRng && !isStart && !isEnd && 'bg-primary/15',
                                // Half-strip on the right side for start
                                isStart && !isEnd && 'bg-gradient-to-r from-transparent via-primary/15 to-primary/15',
                                // Half-strip on the left side for end
                                isEnd && !isStart && 'bg-gradient-to-l from-transparent via-primary/15 to-primary/15',
                                // Rounded left edge of strip for start at week boundary
                                isStart && colIdx === 0 && 'rounded-l-full',
                                // Rounded right edge of strip for end at week boundary
                                isEnd && colIdx === 6 && 'rounded-r-full',
                                // Strip rounding at week wrap
                                inRng && !isStart && colIdx === 0 && 'rounded-l-full',
                                inRng && !isEnd && colIdx === 6 && 'rounded-r-full',
                            )}
                        >
                            {inMonth ? (
                                <button
                                    onClick={() => isAvailable && onSelect(day)}
                                    onMouseEnter={() => range.start && !range.end && onHover(day)}
                                    onMouseLeave={() => onHover(undefined)}
                                    disabled={!isAvailable}
                                    className={cn(
                                        'relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all',
                                        // Selected endpoints
                                        (isStart || isEnd || isSingle)
                                            ? 'bg-primary font-semibold text-primary-foreground shadow-sm'
                                            : isAvailable
                                                ? 'border border-border bg-background font-medium text-foreground hover:border-primary hover:bg-primary/5'
                                                : 'cursor-default text-muted-foreground opacity-40',
                                    )}
                                    aria-label={format(day, 'MMM d yyyy')}
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

// ─── Page ────────────────────────────────────────────────────────────────────

interface SelectDateProps {
    /** ISO strings of available departure dates (start dates only) */
    availableDates?: string[];
    destinationSlug?: string;
    packageSlug?: string;
    prevStep?: string;
}


export default function SelectDate({
    availableDates: availableDateStrings,
    destinationSlug,
    packageSlug,
    prevStep = '#',
}: SelectDateProps) {
    const today = startOfToday();
    const [baseMonth, setBaseMonth] = useState(today);
    const [range, setRange] = useState<DateRange>({ start: undefined, end: undefined });
    const [hovered, setHovered] = useState<Date | undefined>(undefined);

    const leftMonth = baseMonth;
    const rightMonth = addMonths(baseMonth, 1);

    const availableDates = (availableDateStrings ?? generateDefaultAvailable()).map(
        (s) => new Date(s),
    );

    const handleSelect = (day: Date) => {
        setRange((prev) => {
            // No start yet → set start
            if (!prev.start) return { start: day, end: undefined };
            // Start set, no end → set end (allow either direction)
            if (!prev.end) {
                if (isSameDay(day, prev.start)) return { start: undefined, end: undefined };
                return { start: prev.start, end: day };
            }
            // Range complete → start fresh
            return { start: day, end: undefined };
        });
        setHovered(undefined);
    };

    const canContinue = !!(range.start && range.end);

    // Normalise for display
    const displayStart =
        range.start && range.end
            ? isBefore(range.start, range.end)
                ? range.start
                : range.end
            : range.start;
    const displayEnd =
        range.start && range.end
            ? isAfter(range.end, range.start)
                ? range.end
                : range.start
            : undefined;

    return (
        <FrontendLayout>
            <div className='mt-34 sm:mt-36 lg:mt-40 xl:mt-44'></div>
            <BookingProgress currentStep={1} />

            <section className="container max-w-7xl py-15 space-y-6 px-4 md:px-6 lg:px-8">
                {/* Calendar card */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="font-oswald mb-6 text-xl font-semibold text-foreground">
                        Select Date &amp; Time
                    </h2>

                    {/* Dual-month grid */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <MonthCalendar
                            month={leftMonth}
                            availableDates={availableDates}
                            range={range}
                            hovered={hovered}
                            onSelect={handleSelect}
                            onHover={setHovered}
                            showPrev
                            showNext={false}
                            onPrev={() => setBaseMonth((m) => addMonths(m, -1))}
                        />
                        <MonthCalendar
                            month={rightMonth}
                            availableDates={availableDates}
                            range={range}
                            hovered={hovered}
                            onSelect={handleSelect}
                            onHover={setHovered}
                            showPrev={false}
                            showNext
                            onNext={() => setBaseMonth((m) => addMonths(m, 1))}
                        />
                    </div>

                    {/* Selected range display */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                        <div className="flex items-start gap-3 px-5 py-4">
                            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-6">
                                <div>
                                    <p className="font-libre-franklin text-xs font-semibold text-foreground">
                                        Departure
                                    </p>
                                    <p className="font-libre-franklin mt-0.5 text-sm text-muted-foreground">
                                        {displayStart
                                            ? format(displayStart, 'EEEE, MMMM d, yyyy')
                                            : 'Select start date'}
                                    </p>
                                </div>
                                <div className="hidden h-4 w-px bg-border sm:block" />
                                <div>
                                    <p className="font-libre-franklin text-xs font-semibold text-foreground">
                                        Return
                                    </p>
                                    <p className="font-libre-franklin mt-0.5 text-sm text-muted-foreground">
                                        {displayEnd
                                            ? format(displayEnd, 'EEEE, MMMM d, yyyy')
                                            : range.start
                                                ? 'Select end date'
                                                : '—'}
                                    </p>
                                </div>
                                {canContinue && (
                                    <>
                                        <div className="hidden h-4 w-px bg-border sm:block" />
                                        <div>
                                            <p className="font-libre-franklin text-xs font-semibold text-foreground">
                                                Duration
                                            </p>
                                            <p className="font-libre-franklin mt-0.5 text-sm text-primary">
                                                {Math.abs(
                                                    Math.round(
                                                        (range.end!.getTime() -
                                                            range.start!.getTime()) /
                                                        (1000 * 60 * 60 * 24),
                                                    ),
                                                )}{' '}
                                                nights
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hint */}
                    {!canContinue && (
                        <p className="font-libre-franklin mt-3 text-center text-xs text-muted-foreground">
                            {!range.start
                                ? 'Click an available date to set your departure'
                                : 'Now click any date to set your return'}
                        </p>
                    )}

                    {/* Navigation */}
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link href={prevStep} className='flex-1'>
                            <Button
                                variant="outline"
                                className='w-full cursor-pointer'
                            >
                                <ArrowLeft className="size-5" />
                                Back
                            </Button>
                        </Link>
                        <Link href={canContinue ? guestInfo({ destination: destinationSlug || '', package: packageSlug || '' }).url : '#'} disabled={!canContinue} className='flex-1 disabled:opacity-50 disabled:cursor-not-allowed'>
                            <Button className='w-full cursor-pointer'>
                                Continue To Guest Details
                                <ArrowRight className="size-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Booking Rules */}
                <BookingRules
                    title="Booking Rules"
                    rules={[
                        'Departures available every 7 days starting 14 days from today',
                        'Limited to 5 bookings per departure date',
                        'Greyed out dates are fully booked',
                    ]}
                />
            </section>
        </FrontendLayout>
    );
}