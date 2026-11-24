import { cn } from '@/lib/utils';

type Props = {
    subtitle?: string | null;
    light?: boolean;
    className?: string;
};

/** Zawjan wordmark: two hearts forming a smile inside a rounded square. */
export function AdminLogo({
    subtitle = 'Panel Moderator',
    light = false,
    className,
}: Props) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <div className="flex items-center gap-2">
                <span
                    className={cn(
                        'grid size-9 place-items-center rounded-xl',
                        light ? 'bg-white text-brand' : 'bg-brand text-white',
                    )}
                >
                    <svg
                        className="size-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M8.2 5.5a2.6 2.6 0 0 1 3.3 3.95L8.2 12.6 4.9 9.45A2.6 2.6 0 0 1 8.2 5.5Zm7.6 0a2.6 2.6 0 0 1 3.3 3.95l-3.3 3.15-3.3-3.15a2.6 2.6 0 0 1 3.3-3.95Z" />
                        <path
                            d="M6.5 15.2c1.4 2 3.4 3.1 5.5 3.1s4.1-1.1 5.5-3.1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
                <span
                    className={cn(
                        'text-[1.35rem] font-bold tracking-tight',
                        light ? 'text-white' : 'text-brand-deep',
                    )}
                >
                    Zawjan
                </span>
            </div>
            {subtitle && (
                <>
                    <span
                        className={cn(
                            'h-9 w-px',
                            light ? 'bg-white/30' : 'bg-slate-200',
                        )}
                    />
                    <span
                        className={cn(
                            'max-w-[5.5rem] text-sm leading-tight font-medium',
                            light ? 'text-mint' : 'text-brand',
                        )}
                    >
                        {subtitle}
                    </span>
                </>
            )}
        </div>
    );
}
