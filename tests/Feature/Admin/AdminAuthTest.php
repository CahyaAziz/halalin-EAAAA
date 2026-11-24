<?php

use Inertia\Testing\AssertableInertia as Assert;

beforeEach(fn () => $this->withoutVite());

test('guests are redirected from the admin dashboard to the admin login', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('admin.login'));
});

test('bare /admin redirects to the dashboard', function () {
    $this->get('/admin')->assertRedirect(route('admin.dashboard'));
});

test('the admin login page renders the inertia login page', function () {
    $this->get(route('admin.login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/login')
            ->where('demoCredentials.email', 'moderator@zawjan.id')
            ->where('demoCredentials.password', 'password'));
});

test('demo credentials are not exposed in production', function () {
    app()->detectEnvironment(fn () => 'production');

    $this->get(route('admin.login'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/login')
            ->where('demoCredentials', null));
});

test('correct credentials log the moderator in', function () {
    $this->post(route('admin.login.attempt'), [
        'email' => 'moderator@zawjan.id',
        'password' => 'password',
    ])->assertRedirect(route('admin.dashboard'));

    expect(session('admin_logged_in'))->toBeTrue();
});

test('email matching ignores case and surrounding spaces', function () {
    $this->post(route('admin.login.attempt'), [
        'email' => '  Moderator@Zawjan.ID ',
        'password' => 'password',
    ])->assertRedirect(route('admin.dashboard'));
});

test('wrong credentials return with an error and keep the email only', function () {
    $this->from(route('admin.login'))
        ->post(route('admin.login.attempt'), [
            'email' => 'moderator@zawjan.id',
            'password' => 'salah',
        ])
        ->assertRedirect(route('admin.login'))
        ->assertSessionHasErrors('email')
        ->assertSessionHasInput('email', 'moderator@zawjan.id')
        ->assertSessionMissing('_old_input.password');

    expect(session('admin_logged_in'))->toBeNull();
});

test('a logged-in moderator visiting login is sent to the dashboard', function () {
    $this->withSession(['admin_logged_in' => true])
        ->get(route('admin.login'))
        ->assertRedirect(route('admin.dashboard'));
});

test('logout clears the admin session', function () {
    $this->withSession(['admin_logged_in' => true])
        ->post(route('admin.logout'))
        ->assertRedirect(route('admin.login'));

    expect(session('admin_logged_in'))->toBeNull();
});

test('logout via GET is not allowed', function () {
    $this->get('/admin/logout')->assertStatus(405);
});

test('empty login shows indonesian validation messages', function () {
    $this->from(route('admin.login'))
        ->post(route('admin.login.attempt'), ['email' => '', 'password' => ''])
        ->assertSessionHasErrors([
            'email' => 'Email wajib diisi.',
            'password' => 'Kata sandi wajib diisi.',
        ]);
});

test('malformed email shows an indonesian validation message', function () {
    $this->from(route('admin.login'))
        ->post(route('admin.login.attempt'), ['email' => 'bukan-email', 'password' => 'x'])
        ->assertSessionHasErrors(['email' => 'Format email tidak valid.']);
});

test('a logged-in moderator gets the inertia dashboard page', function () {
    $this->withSession(['admin_logged_in' => true, 'admin_name' => 'Moderator'])
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('adminName', 'Moderator'));
});

test('too many failed logins show a form error instead of a raw 429 page', function () {
    foreach (range(1, 5) as $i) {
        $this->from(route('admin.login'))
            ->post(route('admin.login.attempt'), ['email' => 'moderator@zawjan.id', 'password' => 'salah']);
    }

    $this->from(route('admin.login'))
        ->post(route('admin.login.attempt'), ['email' => 'moderator@zawjan.id', 'password' => 'password'])
        ->assertRedirect(route('admin.login'))
        ->assertSessionHasErrors('email');

    expect(session('errors')->first('email'))->toContain('Terlalu banyak percobaan');
    expect(session('admin_logged_in'))->toBeNull();
});
