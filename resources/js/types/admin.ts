import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

/** Props sent by App\Http\Controllers\Admin\DashboardController (dummy data for now). */
export type AdminTone = 'brand' | 'red' | 'honor' | 'slate';

export type AdminStat = {
    label: string;
    value: string;
    note: string | null;
    icon: AdminStatIcon;
    tone: AdminTone;
};

export type AdminStatIcon = 'badge-check' | 'flag' | 'users' | 'heart';

export type KycApplicant = {
    name: string;
    initial: string;
    age: number;
    city: string;
    document: string;
    submitted: string;
    flag: string | null;
};

export type ReportUrgency = 'kritis' | 'tinggi' | 'sedang';

export type UserReport = {
    reporter: string;
    reported: string;
    reason: string;
    urgency: ReportUrgency;
    time: string;
    chat_closed: boolean;
};

export type ModerationCapacity = {
    reviewed: number;
    limit: number;
};

export type ActivityIcon = 'check' | 'x' | 'lock';

export type ModeratorActivity = {
    actor: string;
    action: string;
    target: string;
    time: string;
    icon: ActivityIcon;
    tone: AdminTone;
};

export type AdminDashboardProps = {
    adminName: string;
    stats: AdminStat[];
    kycQueue: KycApplicant[];
    reports: UserReport[];
    capacity: ModerationCapacity;
    activities: ModeratorActivity[];
};

export type AdminLoginProps = {
    demoCredentials: { email: string; password: string } | null;
};

export type AdminNavItem = {
    label: string;
    icon: ComponentType<LucideProps>;
    /** null = section not built yet (rendered as an unavailable item). */
    href: string | null;
};
