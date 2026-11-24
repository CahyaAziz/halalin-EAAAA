import { Link, router } from '@inertiajs/react';
import { BadgeCheck, Flag, LogOut, Settings, UserCog } from 'lucide-react';
import { AdminLogo } from '@/components/admin/admin-logo';
import {
    AccessCircleIcon,
    DashboardCirclesIcon,
} from '@/components/admin/icons';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes/admin';
import type { AdminNavItem } from '@/types';

// Only Dashboard is built; the other sections are placeholders for now.
const items: AdminNavItem[] = [
    { label: 'Dashboard', icon: DashboardCirclesIcon, href: dashboard().url },
    { label: 'Manajemen Pengguna', icon: UserCog, href: null },
    { label: 'Verifikasi KYC', icon: BadgeCheck, href: null },
    { label: 'Laporan Pengguna', icon: Flag, href: null },
    { label: 'Hak Akses & Keamanan', icon: AccessCircleIcon, href: null },
    { label: 'Pengaturan', icon: Settings, href: null },
];

const itemClass =
    'flex items-center gap-3.5 rounded-l-xl px-4 py-3 text-[0.95rem] font-medium transition-colors';

export function AdminSidebar() {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <aside className="fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r border-slate-200/70 bg-porcelain">
            <div className="px-7 pt-8 pb-6">
                <AdminLogo />
            </div>

            <div className="mx-5 border-t border-slate-200" />

            <nav
                className="mt-4 flex-1 space-y-1.5 pl-5"
                aria-label="Navigasi moderator"
            >
                {items.map(({ label, icon: Icon, href }) => {
                    if (href === null) {
                        // Not built yet: not a link, so a click can't silently do nothing.
                        return (
                            <span
                                key={label}
                                aria-disabled="true"
                                title="Segera hadir"
                                className={cn(
                                    itemClass,
                                    'cursor-not-allowed text-slate-700',
                                )}
                            >
                                <Icon
                                    className="size-[22px]"
                                    strokeWidth={1.75}
                                />
                                <span>{label}</span>
                            </span>
                        );
                    }

                    const active = isCurrentUrl(href);

                    return (
                        <Link
                            key={label}
                            href={href}
                            prefetch
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                                itemClass,
                                active
                                    ? 'bg-mint text-brand-deep'
                                    : 'text-slate-700 hover:bg-white hover:text-brand',
                            )}
                        >
                            <Icon
                                className={cn(
                                    'size-[22px]',
                                    active && 'text-brand',
                                )}
                                strokeWidth={1.75}
                            />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="px-5 pb-8">
                <Link
                    href={logout()}
                    as="button"
                    onClick={() => router.flushAll()}
                    className="flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-3 text-[0.95rem] font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                    <LogOut className="size-[22px]" strokeWidth={1.75} />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
