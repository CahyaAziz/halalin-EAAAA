<?php

use Inertia\Testing\AssertableInertia as Assert;

beforeEach(fn () => $this->withoutVite());

function dashboardPage()
{
    return test()->withSession(['admin_logged_in' => true, 'admin_name' => 'Moderator'])
        ->get(route('admin.dashboard'));
}

test('dashboard sends the four stat cards in order', function () {
    dashboardPage()->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->has('stats', 4)
        ->where('stats.0.label', 'Antrean KYC')
        ->where('stats.1.label', 'Laporan Terbuka')
        ->where('stats.2.label', 'Pengguna Aktif')
        ->where('stats.3.label', "Ta'aruf Berjalan"));
});

test('dashboard sends the KYC queue', function () {
    dashboardPage()->assertInertia(fn (Assert $page) => $page
        ->has('kycQueue', 5)
        ->has('kycQueue.0', fn (Assert $row) => $row
            ->hasAll(['name', 'initial', 'age', 'city', 'document', 'submitted', 'flag'])));
});

test('urgent reports are ordered from most to least urgent', function () {
    dashboardPage()->assertInertia(fn (Assert $page) => $page
        ->has('reports', 4)
        ->where('reports.0.urgency', 'kritis')
        ->where('reports.1.urgency', 'tinggi')
        ->where('reports.2.urgency', 'sedang')
        ->where('reports.3.urgency', 'sedang'));
});

test('dashboard sends moderator capacity and the activity log', function () {
    dashboardPage()->assertInertia(fn (Assert $page) => $page
        ->where('capacity.reviewed', 38)
        ->where('capacity.limit', 60)
        ->has('activities', 4));
});
