import { BadgeCheck, Flag, Heart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdminStat } from '@/types';

const icons = {
    'badge-check': BadgeCheck,
    flag: Flag,
    users: Users,
    heart: Heart,
};

const tones = {
    brand: 'bg-mint text-brand',
    red: 'bg-red-50 text-red-600',
    honor: 'bg-amber-50 text-honor',
    slate: 'bg-slate-100 text-slate-500',
};

export function StatCard({ label, value, note, icon, tone }: AdminStat) {
    const Icon = icons[icon];

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <span
                    className={cn(
                        'grid size-10 place-items-center rounded-xl',
                        tones[tone],
                    )}
                >
                    <Icon className="size-5" strokeWidth={1.75} />
                </span>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-deep">
                {value}
            </p>
            {note && <p className="mt-1 text-xs text-slate-500">{note}</p>}
        </div>
    );
}
