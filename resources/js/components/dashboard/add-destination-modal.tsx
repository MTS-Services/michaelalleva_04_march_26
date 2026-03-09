import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import FileUpload from '../file-upload';

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
            <div className="mx-4 w-full max-w-xl rounded-2xl bg-card shadow-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="font-libre-franklin text-base md:text-lg lg:text-xl mb-1 font-bold text-foreground tracking-wide">
                        Add New Destination
                    </h2>
                    <Button onClick={onClose} variant="ghost" size="icon" className="cursor-pointer">
                        <XIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className='w-full h-px bg-foreground mt-2'></div>

                <div className="space-y-4 mt-5">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Destination Name" required>
                            <Input
                                type="text"
                                value={form.name}
                                onChange={(e) => set('name', e.target.value)}
                                placeholder="e.g., Japan"
                            />
                        </Field>
                        <Field label="Slug">
                            <Input
                                type="text"
                                value={form.slug}
                                onChange={(e) => set('slug', e.target.value)}
                                placeholder="e.g., Japan"
                            />
                        </Field>
                    </div>

                    <Field label="Description" required>
                        <Input
                            type="text"
                            value={form.description}
                            onChange={(e) => set('description', e.target.value)}
                            placeholder="e.g., Japan"
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Profile Image" required>
                            {/* <label className={`${inputCls} flex cursor-pointer items-center justify-center`}>
                                <ImagePlus className="h-5 w-5 text-primary" />
                                <input type="file" accept="image/*" className="sr-only" onChange={(e) => setForm(p => ({ ...p, profileImage: e.target.files?.[0] ?? null }))} />
                            </label> */}
                            <FileUpload
                                value={form.profileImage}
                                onChange={(files) => setForm(p => ({ ...p, profileImage: files as File | null }))}
                                existingFiles={[]}
                                onRemoveExisting={() => setForm(p => ({ ...p, profileImage: null }))}
                                multiple={false}
                                accept="image/*"
                            />
                        </Field>
                        <Field label="Cover Image" required>
                            <FileUpload
                                value={form.coverImage}
                                onChange={(files) => setForm(p => ({ ...p, coverImage: files as File | null }))}
                                existingFiles={[]}
                                onRemoveExisting={() => setForm(p => ({ ...p, coverImage: null }))}
                                multiple={false}
                                accept="image/*"
                            />
                        </Field>
                    </div>
                </div>

                <div className="flex gap-3 border-t border-border pt-4">
                    <Button onClick={onClose} variant="outline" size="lg" className='flex-1 cursor-pointer'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} size="lg" className="flex-1 cursor-pointer">
                        Add Destination
                    </Button>
                </div>
            </div>
        </div>
    );
}

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