import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
import { destination, selectDate } from '@/routes';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface TravelersCountProps {
    pricePerPerson?: number;
    destinationSlug?: string;
    packageSlug?: string;
}

export default function TravelersCount({
    pricePerPerson = 7000,
    destinationSlug = '',
    packageSlug = '',
}: TravelersCountProps) {
    const [travelers, setTravelers] = useState(1);
    const total = pricePerPerson * travelers;
    const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // If there's a previous page in the history, go back
        if (document.referrer) {
            window.history.back();
        } else {
            // Fallback to a safe URL if they opened this in a new tab
            router.visit(destination().url);
        }
    };

    return (
        <FrontendLayout>

            <div className="flex items-start justify-center px-4 py-15 mt-28">
                <div className="w-full max-w-2xl rounded-2xl border-3 border-card bg-background p-8 shadow-sm">
                    {/* Header */}
                    <div className="mb-8 flex items-center">
                        <Button
                            onClick={goBack}
                            aria-label="Go back"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                        <h1 className="font-oswald flex-1 text-center text-3xl font-semibold text-foreground">
                            How many travelers?
                        </h1>
                        {/* Balance spacer */}
                        <div className="h-10 w-10 shrink-0" />
                    </div>

                    {/* Counter row */}
                    <div className="mb-8 flex items-center justify-center gap-5">
                        <button
                            onClick={() => setTravelers((n) => Math.max(1, n - 1))}
                            disabled={travelers <= 1}
                            className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-all',
                                travelers <= 1
                                    ? 'cursor-not-allowed opacity-40'
                                    : 'cursor-pointer hover:border-primary',
                            )}
                            aria-label="Decrease"
                        >
                            <Minus className="h-4 w-4 text-foreground" />
                        </button>

                        <span className="font-oswald min-w-8 text-center text-2xl font-semibold text-foreground">
                            {travelers}
                        </span>

                        <button
                            onClick={() => setTravelers((n) => Math.min(20, n + 1))}
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90"
                            aria-label="Increase"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Price table */}
                    <div className="overflow-hidden rounded-xl bg-card p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-libre-franklin text-sm text-muted-foreground">
                                Package Price:
                            </span>
                            <span className="font-libre-franklin text-sm text-muted-foreground">
                                ${pricePerPerson.toLocaleString()} x {travelers}
                            </span>
                        </div>
                        <div className='w-full h-px bg-foreground/60'></div>
                        <div className="flex items-center justify-between">
                            <span className="font-libre-franklin font-medium text-foreground">
                                Package Price:
                            </span>
                            <span className="font-oswald text-xl font-semibold text-primary">
                                ${total.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                        <Link
                            href={selectDate({ destination: destinationSlug, package: packageSlug }).url}
                            className="font-libre-franklin inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                        >
                            Continue To Scheduling
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}