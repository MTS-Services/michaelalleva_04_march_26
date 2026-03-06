
import { BookingProgress } from '@/components/booking-progress';
import { MonthCalendar } from '@/components/month-calendar';
import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    addMonths,
    format,
    addDays,
    addWeeks,
    startOfToday,
} from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useState } from 'react';

interface SelectDateProps {
    /** ISO strings of available departure dates */
    availableDates?: string[];
    nextStep?: string;
    prevStep?: string;
}

/** Generate every 7th day starting 14 days from today for demo */
function generateDefaultAvailable(): string[] {
    const today = startOfToday();
    const start = addDays(today, 14);
    const dates: string[] = [];
    for (let i = 0; i < 8; i++) {
        dates.push(format(addWeeks(start, i), 'yyyy-MM-dd'));
    }
    return dates;
}


export default function SelectDate({
    availableDates: availableDateStrings,
    nextStep = '#',
    prevStep = '#',
}: SelectDateProps) {
    const today = startOfToday();
    const [baseMonth, setBaseMonth] = useState(today);
    const [selected, setSelected] = useState<Date | undefined>(undefined);

    const leftMonth = baseMonth;
    const rightMonth = addMonths(baseMonth, 1);

    const availableDates = (availableDateStrings ?? generateDefaultAvailable()).map(
        (s) => new Date(s),
    );

    return (
        <FrontendLayout>
            <div className='mt-46'></div>
            <BookingProgress currentStep={1} />

            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Main calendar card */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="font-oswald mb-6 text-xl font-semibold text-foreground">
                            Select Date & Time
                        </h2>

                        {/* Dual-month calendar */}
                        <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
                            <MonthCalendar
                                month={leftMonth}
                                availableDates={availableDates}
                                selected={selected}
                                onSelect={setSelected}
                                showPrev={true}
                                showNext={false}
                                onPrev={() => setBaseMonth((m) => addMonths(m, -1))}
                            />
                            <MonthCalendar
                                month={rightMonth}
                                availableDates={availableDates}
                                selected={selected}
                                onSelect={setSelected}
                                showPrev={false}
                                showNext={true}
                                onNext={() => setBaseMonth((m) => addMonths(m, 1))}
                            />
                        </div>

                        {/* Selected date display */}
                        <div className="mt-6 rounded-xl border border-border bg-card px-5 py-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                <div>
                                    <p className="font-libre-franklin text-xs font-semibold text-foreground">
                                        Selected Date
                                    </p>
                                    <p className="font-libre-franklin mt-0.5 text-sm text-muted-foreground">
                                        {selected
                                            ? format(selected, 'EEEE, MMMM d, yyyy')
                                            : 'No date selected'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="mt-5 flex gap-3">
                            <Link href={prevStep} className='flex-1'>
                                <Button
                                    variant="outline"
                                    className='w-full cursor-pointer'
                                >
                                    <ArrowLeft className="size-5" />
                                    Back
                                </Button>
                            </Link>
                            <Link href={selected ? nextStep : '#'} className='flex-1'>
                                <Button
                                    disabled={!selected}
                                    className='w-full cursor-pointer'
                                >
                                    Continue To Guest Details
                                    <ArrowRight className="size-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Booking Rules info box */}
                    <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-900/40 dark:bg-yellow-900/10">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white">
                            <span className="text-xs font-bold">!</span>
                        </div>
                        <div>
                            <p className="font-oswald mb-2 font-semibold text-foreground">
                                Booking Rules
                            </p>
                            <ul className="space-y-1 font-libre-franklin text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                                    Departures available every 7 days starting 14 days from today
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                                    Limited to 5 bookings per departure date
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                                    Greyed out dates are fully booked
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}