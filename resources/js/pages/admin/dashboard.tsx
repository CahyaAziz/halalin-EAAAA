import { Head } from '@inertiajs/react';
import {
    Bell,
    Check,
    ChevronRight,
    Clock,
    Flag,
    Inbox,
    Lock,
    Search,
    ShieldCheck,
    TriangleAlert,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import { AdminBadge } from '@/components/admin/admin-badge';
import { StatCard } from '@/components/admin/stat-card';
import { cn } from '@/lib/utils';
import type { AdminDashboardProps, AdminTone, ReportUrgency } from '@/types';

/** Front-end only: actions are not wired to a backend yet. */
function notAvailableYet() {
    toast('Fitur belum tersedia', {
        description: 'Panel masih dalam mode demo tanpa database.',
    });
}

const activityIcons = { check: Check, x: X, lock: Lock };

const activityTones: Record<AdminTone, string> = {
    brand: 'bg-mint text-brand',
    red: 'bg-red-50 text-red-600',
    honor: 'bg-amber-50 text-honor',
    slate: 'bg-slate-100 text-slate-500',
};

const urgencyTones: Record<ReportUrgency, string> = {
    kritis: 'bg-red-50 text-red-600',
    tinggi: 'bg-amber-50 text-honor',
    sedang: 'bg-slate-100 text-slate-500',
};

const urgencyLabels: Record<ReportUrgency, string> = {
    kritis: 'Kritis',
    tinggi: 'Tinggi',
    sedang: 'Sedang',
};

function EmptyState({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex flex-col items-center px-6 py-12 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-mint text-brand">
                <Inbox className="size-6" strokeWidth={1.75} />
            </span>
            <p className="mt-3 font-semibold text-slate-800">{title}</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default function AdminDashboard({
    adminName,
    stats,
    kycQueue,
    reports,
    capacity,
    activities,
}: AdminDashboardProps) {
    const capacityPct = Math.round(
        (capacity.reviewed / Math.max(capacity.limit, 1)) * 100,
    );
    const today = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    return (
        <>
            <Head title="Dashboard Moderator" />

            {/* Header */}
            <header className="flex items-center gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-500">{today}</p>
                    <h1 className="mt-0.5 font-display text-[1.75rem] font-semibold text-brand-deep">
                        Assalamu'alaikum, {adminName}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <form
                        role="search"
                        onSubmit={(e) => {
                            e.preventDefault();
                            notAvailableYet();
                        }}
                        className="relative"
                    >
                        <label htmlFor="admin-search" className="sr-only">
                            Cari pengguna atau laporan
                        </label>
                        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-slate-400" />
                        <input
                            id="admin-search"
                            type="search"
                            placeholder="Cari pengguna, laporan…"
                            className="w-72 rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-mint focus:outline-none"
                        />
                    </form>
                    <button
                        type="button"
                        onClick={notAvailableYet}
                        aria-label="Notifikasi"
                        className="relative grid size-10 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-brand"
                    >
                        <Bell className="size-5" strokeWidth={1.75} />
                        <span className="absolute top-2 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1.5 pr-3 pl-1.5">
                        <span className="grid size-8 place-items-center rounded-lg bg-brand text-sm font-bold text-white">
                            {adminName.charAt(0).toUpperCase()}
                        </span>
                        <div className="leading-tight">
                            <p className="text-sm font-semibold text-brand-deep">
                                {adminName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                                Moderator
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stat cards */}
            <section
                className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4"
                aria-label="Ringkasan"
            >
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </section>

            <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                {/* KYC queue (FR-03, FR-17) */}
                <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
                        <div>
                            <h2 className="text-lg font-bold text-brand-deep">
                                Antrean Verifikasi KYC
                            </h2>
                            <p className="text-sm text-slate-500">
                                Pendaftar baru menunggu pemeriksaan manual
                                identitas &amp; usia.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={notAvailableYet}
                            className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-sm font-semibold text-brand hover:text-brand-deep"
                        >
                            Lihat semua <ChevronRight className="size-4" />
                        </button>
                    </div>

                    {kycQueue.length === 0 ? (
                        <EmptyState
                            title="Tidak ada pendaftar menunggu"
                            description="Semua pengajuan verifikasi sudah diperiksa. Pengajuan baru akan muncul di sini."
                        />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[560px] text-left text-sm">
                                <thead className="bg-porcelain text-xs font-semibold tracking-wide text-slate-500 uppercase">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Pendaftar
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Dokumen
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right"
                                        >
                                            Tindakan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {kycQueue.map((applicant) => (
                                        <tr
                                            key={applicant.name}
                                            className="hover:bg-porcelain/60"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mint font-bold text-brand">
                                                        {applicant.initial}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold whitespace-nowrap text-slate-800">
                                                            {applicant.name},{' '}
                                                            {applicant.age}
                                                        </p>
                                                        <p className="inline-flex items-center gap-1 text-xs whitespace-nowrap text-slate-500">
                                                            {applicant.city} ·{' '}
                                                            <Clock className="size-3.5" />{' '}
                                                            {
                                                                applicant.submitted
                                                            }
                                                        </p>
                                                        {applicant.flag && (
                                                            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-honor">
                                                                <TriangleAlert className="size-3.5 shrink-0" />
                                                                {applicant.flag}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <AdminBadge tone="neutral">
                                                    {applicant.document}
                                                </AdminBadge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            notAvailableYet
                                                        }
                                                        aria-label={`Tolak ${applicant.name}`}
                                                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <X className="size-3.5" />{' '}
                                                        Tolak
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            notAvailableYet
                                                        }
                                                        aria-label={`Setujui ${applicant.name}`}
                                                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-deep"
                                                    >
                                                        <Check className="size-3.5" />{' '}
                                                        Setuju
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <div className="space-y-6">
                    {/* Capacity (NFR-06) */}
                    <section className="rounded-2xl bg-gradient-to-br from-brand to-brand-deep p-6 text-white shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">
                                Kapasitas Moderasi Hari Ini
                            </h2>
                            <ShieldCheck className="size-5 text-mint" />
                        </div>
                        <p className="mt-4 text-3xl font-bold">
                            {capacity.reviewed}
                            <span className="text-base font-medium text-white/60">
                                {' '}
                                / {capacity.limit} berkas
                            </span>
                        </p>
                        <div
                            className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"
                            role="progressbar"
                            aria-valuenow={capacityPct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Kapasitas terpakai"
                        >
                            <div
                                className="h-full rounded-full bg-mint"
                                style={{
                                    width: `${Math.min(capacityPct, 100)}%`,
                                }}
                            />
                        </div>
                        <p className="mt-3 text-xs text-white/70">
                            {capacityPct >= 100
                                ? 'Kuota harian tercapai. Pendaftaran baru ditutup sampai besok.'
                                : 'Pendaftaran baru otomatis ditutup ("Antrean penuh, coba lagi besok") saat kuota harian tercapai.'}
                        </p>
                    </section>

                    {/* Urgent reports (FR-15, FR-18) */}
                    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                        <div className="border-b border-slate-100 px-6 py-5">
                            <h2 className="text-lg font-bold text-brand-deep">
                                Laporan Prioritas
                            </h2>
                            <p className="text-sm text-slate-500">
                                Diurutkan berdasarkan tingkat urgensi.
                            </p>
                        </div>

                        {reports.length === 0 ? (
                            <EmptyState
                                title="Tidak ada laporan terbuka"
                                description="Laporan pengguna yang masuk akan muncul di sini sesuai tingkat urgensinya."
                            />
                        ) : (
                            <>
                                <ul className="divide-y divide-slate-100">
                                    {reports.map((report) => (
                                        <li
                                            key={`${report.reporter}-${report.reported}`}
                                            className="flex gap-3 px-6 py-4"
                                        >
                                            <span
                                                className={cn(
                                                    'mt-1 grid size-8 shrink-0 place-items-center rounded-lg',
                                                    urgencyTones[
                                                        report.urgency
                                                    ],
                                                )}
                                            >
                                                <Flag className="size-4" />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="truncate text-sm font-semibold text-slate-800">
                                                        {report.reason}
                                                    </p>
                                                    <AdminBadge
                                                        tone={report.urgency}
                                                        dot
                                                    >
                                                        {
                                                            urgencyLabels[
                                                                report.urgency
                                                            ]
                                                        }
                                                    </AdminBadge>
                                                </div>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {report.reporter} melaporkan{' '}
                                                    <span className="font-medium text-slate-700">
                                                        {report.reported}
                                                    </span>{' '}
                                                    · {report.time}
                                                </p>
                                                {report.chat_closed && (
                                                    <p className="mt-1 text-[11px] text-slate-400">
                                                        Obrolan sudah ditutup
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-slate-100 px-6 py-3">
                                    <button
                                        type="button"
                                        onClick={notAvailableYet}
                                        className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-brand hover:text-brand-deep"
                                    >
                                        Tangani laporan{' '}
                                        <ChevronRight className="size-4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </div>

            {/* Activity log (NFR-03) */}
            <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-brand-deep">
                    Aktivitas Terbaru
                </h2>
                <p className="text-sm text-slate-500">
                    Jejak audit tindakan moderator dan sistem.
                </p>

                {activities.length === 0 ? (
                    <EmptyState
                        title="Belum ada aktivitas hari ini"
                        description="Tindakan moderator dan sistem akan tercatat di sini."
                    />
                ) : (
                    <ol className="mt-5 grid grid-cols-2 gap-3">
                        {activities.map((activity) => {
                            const Icon = activityIcons[activity.icon];

                            return (
                                <li
                                    key={`${activity.time}-${activity.target}`}
                                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-porcelain/60 px-4 py-3"
                                >
                                    <span
                                        className={cn(
                                            'grid size-9 shrink-0 place-items-center rounded-lg',
                                            activityTones[activity.tone],
                                        )}
                                    >
                                        <Icon className="size-4" />
                                    </span>
                                    <p className="min-w-0 flex-1 text-sm text-slate-600">
                                        <span className="font-semibold text-slate-800">
                                            {activity.actor}
                                        </span>{' '}
                                        {activity.action}{' '}
                                        <span className="font-medium text-slate-800">
                                            {activity.target}
                                        </span>
                                    </p>
                                    <time className="text-xs text-slate-400">
                                        {activity.time}
                                    </time>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </section>
        </>
    );
}
