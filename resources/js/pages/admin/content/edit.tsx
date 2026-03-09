import AdminLayout from '@/layouts/admin-layout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ContentEditPageProps {
    contentKey?: string;
    title?: string;
    body?: string;
    saveHref?: string;
}

export default function ContentEdit({
    contentKey = 'tos',
    title = 'Terms of service',
    body = '',
    saveHref = '/admin/content',
}: ContentEditPageProps) {
    const [value, setValue] = useState(body);

    const handleSave = () => {
        router.put(saveHref, { key: contentKey, body: value });
    };

    return (
        <AdminLayout activeSlug="admin-content">
            <div className="space-y-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <h1 className="font-oswald text-xl font-semibold text-foreground">{title}</h1>
                    <button
                        onClick={handleSave}
                        className="font-libre-franklin rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                    >
                        Save
                    </button>
                </div>

                {/* Editor area */}
                <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-sm">
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        rows={20}
                        className="w-full resize-none bg-transparent px-6 py-5 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                        placeholder="Enter content here…"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}