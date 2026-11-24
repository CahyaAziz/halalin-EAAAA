import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { DeviceGate } from '@/components/admin/device-gate';

/** Signed-in moderator pages. Desktop only: phones/tablets get the DeviceGate. */
export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-porcelain font-jakarta text-ink antialiased">
            <DeviceGate />
            <div className="admin-desktop-only">
                <AdminSidebar />
                <div className="pl-[280px]">
                    <main className="mx-auto max-w-[1360px] px-8 py-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
