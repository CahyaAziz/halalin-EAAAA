<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Front-end only: every value below is dummy data. Replace with real
 * queries (KycVerification, UserReport, ...) once the backend is wired up.
 */
class DashboardController extends Controller
{
    /** Higher number = more urgent (FR-18: reports sorted by danger level). */
    private const URGENCY_RANK = ['kritis' => 3, 'tinggi' => 2, 'sedang' => 1];

    public function __invoke(Request $request): Response
    {
        $reports = collect([
            ['reporter' => 'Aisyah R.', 'reported' => 'Fikri M.', 'reason' => 'Meminta transfer uang', 'urgency' => 'tinggi', 'time' => '25 menit lalu', 'chat_closed' => false],
            ['reporter' => 'Nadia P.', 'reported' => 'Rizal H.', 'reason' => 'Bahasa tidak sopan', 'urgency' => 'sedang', 'time' => '2 jam lalu', 'chat_closed' => true],
            ['reporter' => 'Salma K.', 'reported' => 'Dimas A.', 'reason' => 'Pelecehan verbal & ancaman', 'urgency' => 'kritis', 'time' => '8 menit lalu', 'chat_closed' => false],
            ['reporter' => 'Hana Z.', 'reported' => 'Yusuf B.', 'reason' => 'Meminta nomor WhatsApp pribadi', 'urgency' => 'sedang', 'time' => '3 jam lalu', 'chat_closed' => false],
        ])->sortByDesc(fn (array $r) => self::URGENCY_RANK[$r['urgency']])->values();

        return Inertia::render('admin/dashboard', [
            'adminName' => $request->session()->get('admin_name', 'Moderator'),
            'stats' => [
                ['label' => 'Antrean KYC', 'value' => '24', 'note' => '+6 sejak kemarin', 'icon' => 'badge-check', 'tone' => 'brand'],
                ['label' => 'Laporan Terbuka', 'value' => '7', 'note' => '1 berstatus kritis', 'icon' => 'flag', 'tone' => 'red'],
                ['label' => 'Pengguna Aktif', 'value' => '1.284', 'note' => '+3,2% minggu ini', 'icon' => 'users', 'tone' => 'brand'],
                ['label' => "Ta'aruf Berjalan", 'value' => '96', 'note' => '41 didampingi wali', 'icon' => 'heart', 'tone' => 'honor'],
            ],
            'kycQueue' => [
                ['name' => 'Devita Anggraini', 'initial' => 'D', 'age' => 22, 'city' => 'Bekasi', 'document' => 'KTP + Swafoto', 'submitted' => '12 menit lalu', 'flag' => null],
                ['name' => 'Muhammad Faris', 'initial' => 'M', 'age' => 27, 'city' => 'Bandung', 'document' => 'KTP + Swafoto', 'submitted' => '35 menit lalu', 'flag' => null],
                ['name' => 'Rahma Lestari', 'initial' => 'R', 'age' => 19, 'city' => 'Depok', 'document' => 'KTP + Swafoto', 'submitted' => '1 jam lalu', 'flag' => 'Usia mendekati batas minimum'],
                ['name' => 'Ahmad Zaki', 'initial' => 'A', 'age' => 31, 'city' => 'Surabaya', 'document' => 'Paspor + Swafoto', 'submitted' => '2 jam lalu', 'flag' => 'Foto dokumen buram'],
                ['name' => 'Siti Nurhaliza', 'initial' => 'S', 'age' => 24, 'city' => 'Yogyakarta', 'document' => 'KTP + Swafoto', 'submitted' => '3 jam lalu', 'flag' => null],
            ],
            'reports' => $reports->all(),
            'capacity' => ['reviewed' => 38, 'limit' => 60],
            'activities' => [
                ['actor' => 'Moderator Hasan', 'action' => 'menyetujui verifikasi', 'target' => 'Nur Aini', 'time' => '09:42', 'icon' => 'check', 'tone' => 'brand'],
                ['actor' => 'Moderator Lina', 'action' => 'menonaktifkan akun', 'target' => 'Bagas T.', 'time' => '09:15', 'icon' => 'x', 'tone' => 'red'],
                ['actor' => 'Sistem', 'action' => 'mengunci ruang obrolan', 'target' => 'Fajar & Annisa', 'time' => '08:57', 'icon' => 'lock', 'tone' => 'slate'],
                ['actor' => 'Moderator Hasan', 'action' => 'menolak verifikasi', 'target' => 'Akun tanpa nama', 'time' => '08:30', 'icon' => 'x', 'tone' => 'red'],
            ],
        ]);
    }
}
