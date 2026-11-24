import type { ReactNode } from 'react';
import { DeviceGate } from '@/components/admin/device-gate';

/** Moderator pages without the sidebar (login). Desktop only. */
export default function AdminGuestLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-porcelain font-jakarta text-ink antialiased">
            <DeviceGate />
            <div className="admin-desktop-only">{children}</div>
        </div>
    );
}
