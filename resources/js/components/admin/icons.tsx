import type { LucideProps } from 'lucide-react';

/**
 * Two icons from the sidebar mockup that Lucide has no match for.
 * Same 24x24 stroke conventions as Lucide so they sit beside its icons.
 */
function base({ strokeWidth = 1.75, ...props }: LucideProps) {
    return {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
        ...props,
    };
}

export function DashboardCirclesIcon(props: LucideProps) {
    return (
        <svg {...base(props)}>
            <circle cx="7" cy="7" r="3" />
            <circle cx="17" cy="7" r="3" />
            <circle cx="7" cy="17" r="3" />
            <circle cx="17" cy="17" r="3" />
        </svg>
    );
}

export function AccessCircleIcon(props: LucideProps) {
    return (
        <svg {...base(props)}>
            <circle cx="12" cy="12" r="10" />
            <path d="m8 17 4-10 4 10M9.5 13.5h5" />
        </svg>
    );
}
