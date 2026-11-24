import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const tones = {
    mint: 'bg-mint text-brand',
    kritis: 'bg-red-50 text-red-700 ring-1 ring-red-200',
    tinggi: 'bg-amber-50 text-honor ring-1 ring-amber-200',
    sedang: 'bg-slate-100 text-slate-600',
    neutral: 'bg-slate-100 text-slate-600',
};

type Props = {
    tone?: keyof typeof tones;
    dot?: boolean;
    className?: string;
    children: ReactNode;
};

export function AdminBadge({
    tone = 'mint',
    dot = false,
    className,
    children,
}: Props) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap',
                tones[tone],
                className,
            )}
        >
            {dot && <span className="size-1.5 rounded-full bg-current" />}
            {children}
        </span>
    );
}
