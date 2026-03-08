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
            <div className="container mx-auto max-w-4xl">
                {/* Using justify-between and relative positioning ensures 
                    the circles stay in their mathematical thirds.
                */}
                <div className="relative flex items-center justify-between w-full">
                    
                    {/* Background Line: Ensures the connecting bar is perfectly straight and centered */}
                    <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-muted z-0" />

                    {BOOKING_STEPS.map((step, idx) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center">
                                <div className="flex items-center bg-card px-2 sm:px-3">
                                    <div className="flex items-center gap-2 sm:gap-2.5">
                                        {/* Circle */}
                                        <div
                                            className={cn(
                                                'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all',
                                                isActive || isCompleted
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'border border-muted bg-card text-muted-foreground',
                                            )}
                                        >
                                            <span className="font-oswald">{step.id}</span>
                                        </div>

                                        {/* Label: 
                                            On mobile, we only show the label for the active step.
                                            We use absolute positioning for the text or hide inactive ones 
                                            to prevent the text width from pushing the circles.
                                        */}
                                        <span
                                            className={cn(
                                                'font-libre-franklin text-sm font-medium whitespace-nowrap transition-opacity',
                                                isActive 
                                                    ? 'text-primary block' 
                                                    : 'text-muted-foreground hidden md:block',
                                            )}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}