import { X, ImagePlus } from 'lucide-react';
import { useState } from 'react';

interface AddDestinationModalProps {
    onClose: () => void;
    onSubmit?: (data: DestinationFormData) => void;
}

interface DestinationFormData {
    name: string;
    slug: string;
    description: string;
    profileImage: File | null;
    coverImage: File | null;
}

export function AddDestinationModal({ onClose, onSubmit }: AddDestinationModalProps) {
    const [form, setForm] = useState<DestinationFormData>({
        name: '',
        slug: '',
        description: '',
        profileImage: null,
        coverImage: null,
    });

    const set = (field: keyof DestinationFormData, value: string) =>
        setForm((p) => ({ ...p, [field]: value }));

    const handleSubmit = () => {
        onSubmit?.(form);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="mx-4 w-full max-w-lg rounded-2xl bg-card shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-5">
                    <h2 className="font-oswald text-lg font-semibold text-foreground">
                        Add New Destination
                    </h2>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:bg-muted">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="space-y-4 p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Destination Name" required>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => set('name', e.target.value)}
                                placeholder="e.g., Japan"
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Slug">
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => set('slug', e.target.value)}
                                placeholder="e.g., Japan"
                                className={inputCls}
                            />
                        </Field>
                    </div>

                    <Field label="Description" required>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => set('description', e.target.value)}
                            placeholder="e.g., Japan"
                            className={inputCls}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Profile Image" required>
                            <label className={`${inputCls} flex cursor-pointer items-center justify-center`}>
                                <ImagePlus className="h-5 w-5 text-primary" />
                                <input type="file" accept="image/*" className="sr-only" onChange={(e) => setForm(p => ({ ...p, profileImage: e.target.files?.[0] ?? null }))} />
                            </label>
                        </Field>
                        <Field label="Cover Image" required>
                            <label className={`${inputCls} flex cursor-pointer items-center justify-center`}>
                                <ImagePlus className="h-5 w-5 text-primary" />
                                <input type="file" accept="image/*" className="sr-only" onChange={(e) => setForm(p => ({ ...p, coverImage: e.target.files?.[0] ?? null }))} />
                            </label>
                        </Field>
                    </div>
                </div>

                <div className="flex gap-3 border-t border-border px-6 pb-6 pt-4">
                    <button onClick={onClose} className="font-libre-franklin flex-1 rounded-xl bg-secondary py-3 text-sm font-medium text-secondary-foreground transition hover:bg-muted">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="font-libre-franklin flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                        Add Destination
                    </button>
                </div>
            </div>
        </div>
    );
}

const inputCls =
    'w-full rounded-xl border border-primary/40 bg-background px-4 py-3 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div>
            <label className="font-libre-franklin mb-1.5 block text-sm font-medium text-foreground">
                {label}{required && <span className="ml-1 text-primary">*</span>}
            </label>
            {children}
        </div>
    );
}