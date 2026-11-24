import { Form, Head } from '@inertiajs/react';
import {
    BadgeCheck,
    ChevronRight,
    Eye,
    EyeOff,
    FileText,
    Flag,
    Lock,
    Mail,
    ShieldCheck,
    TriangleAlert,
} from 'lucide-react';
import { useState } from 'react';
import { AdminLogo } from '@/components/admin/admin-logo';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { attempt } from '@/routes/admin/login';
import type { AdminLoginProps } from '@/types';

const highlights = [
    {
        icon: BadgeCheck,
        title: 'Verifikasi KYC manual',
        description:
            'Setiap akun diperiksa oleh manusia sebelum dapat mencari calon.',
    },
    {
        icon: Flag,
        title: 'Penanganan laporan prioritas',
        description: 'Laporan diurutkan berdasarkan tingkat urgensi.',
    },
    {
        icon: FileText,
        title: 'Jejak audit lengkap',
        description: 'Setiap tindakan moderator tercatat dan dapat ditelusuri.',
    },
];

const inputBase =
    'w-full rounded-xl border bg-white py-3 text-sm shadow-xs transition placeholder:text-slate-400 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50';
const inputOk = 'border-slate-200 focus:border-brand focus:ring-mint';
const inputError = 'border-red-300 focus:border-red-400 focus:ring-red-100';

export default function AdminLogin({ demoCredentials }: AdminLoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Masuk Moderator" />

            <div className="grid min-h-screen grid-cols-[1.05fr_1fr]">
                {/* Brand panel */}
                <section className="relative flex flex-col overflow-hidden bg-gradient-to-br from-brand-deep via-brand-deep to-[#0b2a3a] p-12 text-white">
                    <div className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-brand/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-40 -left-24 size-[380px] rounded-full bg-brand/20 blur-3xl" />

                    <AdminLogo light className="relative" />

                    <div className="relative my-auto max-w-lg">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-mint uppercase">
                            <ShieldCheck className="size-4" /> Akses Khusus
                            Moderator
                        </span>
                        <h1 className="mt-6 font-display text-4xl leading-tight font-semibold xl:text-[2.6rem]">
                            Menjaga setiap ikhtiar ta'aruf tetap aman &amp;
                            beradab.
                        </h1>
                        <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
                            Verifikasi identitas pendaftar, tangani laporan
                            pengguna, dan pastikan seluruh interaksi berada
                            dalam koridor syariah.
                        </p>

                        <ul className="mt-10 space-y-4">
                            {highlights.map(
                                ({ icon: Icon, title, description }) => (
                                    <li
                                        key={title}
                                        className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                                    >
                                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-mint">
                                            <Icon
                                                className="size-5"
                                                strokeWidth={1.75}
                                            />
                                        </span>
                                        <div>
                                            <p className="font-semibold">
                                                {title}
                                            </p>
                                            <p className="text-sm text-white/60">
                                                {description}
                                            </p>
                                        </div>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>

                    <p className="relative text-xs text-white/50">
                        Zawjan © {new Date().getFullYear()} · Platform Ta'aruf
                        &amp; Penjodohan Syariah Terpercaya
                    </p>
                </section>

                {/* Form panel */}
                <section className="flex items-center justify-center px-10 py-12">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-bold text-brand-deep">
                            Masuk ke Panel Moderator
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Gunakan akun moderator yang telah terdaftar untuk
                            melanjutkan.
                        </p>

                        <Form
                            {...attempt.form()}
                            resetOnError={['password']}
                            disableWhileProcessing
                            noValidate
                            className="mt-6"
                        >
                            {({ processing, errors }) => {
                                const firstError =
                                    errors.email ?? errors.password;

                                return (
                                    <>
                                        {firstError && (
                                            <div
                                                role="alert"
                                                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                            >
                                                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                                                <span>{firstError}</span>
                                            </div>
                                        )}

                                        <div className="space-y-5">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                                                >
                                                    Email
                                                </label>
                                                <div className="relative">
                                                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        autoFocus
                                                        autoComplete="username"
                                                        placeholder="moderator@zawjan.id"
                                                        aria-invalid={
                                                            !!errors.email
                                                        }
                                                        className={cn(
                                                            inputBase,
                                                            'pr-4 pl-11',
                                                            errors.email
                                                                ? inputError
                                                                : inputOk,
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                                                >
                                                    Kata Sandi
                                                </label>
                                                <div className="relative">
                                                    <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type={
                                                            showPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        required
                                                        autoComplete="current-password"
                                                        placeholder="••••••••"
                                                        aria-invalid={
                                                            !!errors.password
                                                        }
                                                        className={cn(
                                                            inputBase,
                                                            'pr-12 pl-11',
                                                            errors.password
                                                                ? inputError
                                                                : inputOk,
                                                        )}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (v) => !v,
                                                            )
                                                        }
                                                        aria-pressed={
                                                            showPassword
                                                        }
                                                        aria-label={
                                                            showPassword
                                                                ? 'Sembunyikan kata sandi'
                                                                : 'Tampilkan kata sandi'
                                                        }
                                                        className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="size-[18px]" />
                                                        ) : (
                                                            <Eye className="size-[18px]" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-right text-sm text-slate-400">
                                                Lupa sandi? Hubungi admin utama
                                            </p>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm shadow-brand/30 transition hover:bg-brand-deep focus-visible:ring-4 focus-visible:ring-mint disabled:cursor-wait disabled:opacity-80"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Spinner />
                                                        Memeriksa…
                                                    </>
                                                ) : (
                                                    <>
                                                        Masuk
                                                        <ChevronRight className="size-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                );
                            }}
                        </Form>

                        {/* Dummy credentials hint: the server never sends it in production. */}
                        {demoCredentials && (
                            <div className="mt-8 rounded-xl border border-dashed border-honor/40 bg-amber-50/60 px-4 py-3 text-xs text-amber-800">
                                <p className="font-semibold">
                                    Mode demo (tanpa database)
                                </p>
                                <p className="mt-1">
                                    Email:{' '}
                                    <code className="font-mono">
                                        {demoCredentials.email}
                                    </code>{' '}
                                    · Sandi:{' '}
                                    <code className="font-mono">
                                        {demoCredentials.password}
                                    </code>
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
