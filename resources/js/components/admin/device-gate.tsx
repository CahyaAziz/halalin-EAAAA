import { Monitor, ShieldCheck } from 'lucide-react';
import { AdminLogo } from '@/components/admin/admin-logo';

/**
 * Shown instead of the panel on phones and tablets.
 * Visibility is controlled by .admin-device-gate / .admin-desktop-only in app.css.
 */
export function DeviceGate() {
    return (
        <div
            className="admin-device-gate min-h-dvh flex-col items-center justify-center bg-porcelain px-6 py-12 text-center font-jakarta text-ink"
            role="alert"
        >
            <AdminLogo />

            <div className="mt-12 grid size-20 place-items-center rounded-3xl bg-mint text-brand">
                <Monitor className="size-10" strokeWidth={1.75} />
            </div>

            <h1 className="mt-6 max-w-sm font-display text-2xl leading-snug font-semibold text-brand-deep">
                Gunakan desktop/PC untuk mengakses admin panel
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
                Panel Moderator Zawjan hanya tersedia di perangkat desktop
                dengan layar minimal 1024&nbsp;piksel, agar pemeriksaan dokumen
                KYC dan laporan pengguna dapat dilakukan dengan teliti.
            </p>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
                <ShieldCheck className="size-4 text-brand" />
                Akses ponsel &amp; tablet dinonaktifkan untuk menjaga keamanan
                data pengguna
            </p>
        </div>
    );
}
