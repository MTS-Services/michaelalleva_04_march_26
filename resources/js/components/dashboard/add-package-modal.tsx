import { cn } from '@/lib/utils';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

/* ── Types ─────────────────────────────────────────────────────────────── */

export interface PackageFormData {
    name: string;
    duration: string;
    price: string;
    weeklyCapacity: string;
    details: string[];
    active: boolean;
}

interface PackageModalProps {
    /** When provided the modal opens in Edit mode pre-filled with these values */
    initialData?: PackageFormData & { id?: number };
    destinationName?: string;
    onClose: () => void;
    onSubmit?: (data: PackageFormData) => void;
}

/* ── Component ─────────────────────────────────────────────────────────── */

export function AddPackageModal({
    initialData,
    destinationName = '',
    onClose,
    onSubmit,
}: PackageModalProps) {
    const isEdit = Boolean(initialData?.id !== undefined && initialData !== undefined && 'id' in (initialData ?? {}));

    const [form, setForm] = useState<PackageFormData>(
        initialData
            ? {
                name: initialData.name,
                duration: initialData.duration,
                price: initialData.price,
                weeklyCapacity: initialData.weeklyCapacity,
                // Ensure at least one detail row
                details: initialData.details.length > 0 ? initialData.details : [''],
                active: initialData.active,
            }
            : {
                name: '',
                duration: '5',
                price: '7000',
                weeklyCapacity: '5',
                details: [''],
                active: true,
            },
    );

    /* ── helpers ──────────────────────────────────────────────────────── */
    const set = <K extends keyof PackageFormData>(k: K, v: PackageFormData[K]) =>
        setForm((prev) => ({ ...prev, [k]: v }));

    const setDetail = (i: number, v: string) =>
        set('details', form.details.map((d, idx) => (idx === i ? v : d)));

    const addDetail = () =>
        set('details', [...form.details, '']);

    /** Remove a detail row by index — always keep at least 1 row */
    const removeDetail = (i: number) => {
        if (form.details.length <= 1) return;
        set('details', form.details.filter((_, idx) => idx !== i));
    };

    const handleSubmit = () => {
        onSubmit?.(form);
        onClose();
    };

    /* ── render ───────────────────────────────────────────────────────── */
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-lg rounded-2xl bg-card shadow-2xl flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-5 flex-shrink-0">
                    <div>
                        <h2 className="font-oswald text-lg font-semibold text-foreground">
                            {isEdit ? 'Edit Package' : 'Add New Package'}
                        </h2>
                        {destinationName && (
                            <p className="font-libre-franklin mt-0.5 text-xs text-muted-foreground">
                                Destination: {destinationName}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 space-y-4 p-6">
                    {/* Package name */}
                    <Field label="Package Name" required>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => set('name', e.target.value)}
                            placeholder="e.g., Luxury Safari"
                            className={inputCls}
                        />
                    </Field>

                    {/* Duration + Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Duration (nights)" required>
                            <input
                                type="number"
                                min={1}
                                value={form.duration}
                                onChange={(e) => set('duration', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Price / Person ($)" required>
                            <input
                                type="number"
                                min={0}
                                value={form.price}
                                onChange={(e) => set('price', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                    </div>

                    {/* Weekly capacity */}
                    <Field label="Weekly Capacity">
                        <input
                            type="number"
                            min={1}
                            value={form.weeklyCapacity}
                            onChange={(e) => set('weeklyCapacity', e.target.value)}
                            className={inputCls}
                        />
                    </Field>

                    {/* ── Package Details dynamic list ──────────────────── */}
                    <Field label="Package Details" required>
                        <div className="space-y-2">
                            {form.details.map((d, i) => {
                                const isLast = i === form.details.length - 1;
                                return (
                                    <div key={i} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={d}
                                            onChange={(e) => setDetail(i, e.target.value)}
                                            placeholder={`Detail ${i + 1} — e.g., Airport transfers included`}
                                            className={cn(inputCls, 'flex-1')}
                                        />

                                        {isLast ? (
                                            /*
                                             * LAST row → "+" button to add a new detail.
                                             * If there's only 1 row this is the only button shown.
                                             */
                                            <button
                                                type="button"
                                                onClick={addDetail}
                                                aria-label="Add detail"
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-primary/40 text-primary transition hover:bg-primary hover:text-primary-foreground"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        ) : (
                                            /*
                                             * Any row that is NOT the last → "×" button to remove it.
                                             * The last row always shows "+" so the user always has
                                             * a way to add more rows.
                                             */
                                            <button
                                                type="button"
                                                onClick={() => removeDetail(i)}
                                                aria-label="Remove detail"
                                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition hover:border-destructive hover:text-destructive"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <p className="font-libre-franklin mt-1.5 text-xs text-muted-foreground">
                            Use <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">+</kbd> to add a line · <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">×</kbd> to remove one
                        </p>
                    </Field>

                    {/* Active toggle */}
                    <label className="flex cursor-pointer items-center gap-3">
                        <button
                            type="button"
                            role="switch"
                            aria-checked={form.active}
                            onClick={() => set('active', !form.active)}
                            className={cn(
                                'relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30',
                                form.active ? 'bg-primary' : 'bg-muted',
                            )}
                        >
                            <span
                                className={cn(
                                    'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                                    form.active ? 'translate-x-5' : 'translate-x-0.5',
                                )}
                            />
                        </button>
                        <span className="font-libre-franklin text-sm text-foreground">
                            Active{' '}
                            <span className="text-muted-foreground">(visible to users)</span>
                        </span>
                    </label>
                </div>

                {/* Footer */}
                <div className="flex gap-3 border-t border-border px-6 pb-6 pt-4 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="font-libre-franklin flex-1 rounded-xl bg-secondary py-3 text-sm font-medium text-secondary-foreground transition hover:bg-muted"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="font-libre-franklin flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                    >
                        {isEdit ? 'Save Changes' : 'Add Package'}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Shared styles ─────────────────────────────────────────────────────── */

const inputCls =
    'w-full rounded-xl border border-primary/40 bg-background px-4 py-3 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all';

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="font-libre-franklin mb-1.5 block text-sm font-medium text-foreground">
                {label}
                {required && <span className="ml-1 text-primary">*</span>}
            </label>
            {children}
        </div>
    );
}