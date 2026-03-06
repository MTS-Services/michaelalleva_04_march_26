import { cn } from '@/lib/utils';

export interface BookingStep {
    id: number;
    label: string;
}

export const BOOKING_STEPS: BookingStep[] = [
    { id: 1, label: 'Select Date' },
    { id: 2, label: 'Guest Details' },
    { id: 3, label: 'Verification' },
];

interface BookingProgressProps {
    currentStep: number;
}

export function BookingProgress({ currentStep }: BookingProgressProps) {
    return (
        <div className="w-full border-b border-border bg-card px-4 py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-center gap-0">
                    {BOOKING_STEPS.map((step, idx) => {
                        const isActive = step.id === currentStep;
                        const isLast = idx === BOOKING_STEPS.length - 1;

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className={cn(
                                            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all',
                                            isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'border border-muted bg-card text-muted-foreground',
                                        )}
                                    >
                                        <span className="font-oswald">{step.id}</span>
                                    </div>
                                    <span
                                        className={cn(
                                            'font-libre-franklin text-sm font-medium whitespace-nowrap',
                                            isActive ? 'text-primary' : 'text-muted-foreground',
                                        )}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {!isLast && (
                                    <div className="mx-6 h-px w-20 bg-muted sm:w-36 md:w-52" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}