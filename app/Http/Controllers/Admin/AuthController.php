<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        if ($request->session()->get('admin_logged_in')) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('admin/login', [
            // Dummy credentials hint for the demo; never sent in production.
            'demoCredentials' => app()->isProduction() ? null : [
                'email' => config('admin.email'),
                'password' => config('admin.password'),
            ],
        ]);
    }

    /**
     * Dummy login: compares against config/admin.php. No database access.
     */
    public function login(Request $request): RedirectResponse
    {
        $request->merge(['email' => Str::lower(trim((string) $request->input('email')))]);

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ], [
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'password.required' => 'Kata sandi wajib diisi.',
        ]);

        // Rate limit per email + IP: 5 failed attempts per minute. Reported as a
        // form error so Inertia shows it on the page instead of a raw 429.
        $throttleKey = 'admin-login|'.$credentials['email'].'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            throw ValidationException::withMessages([
                'email' => 'Terlalu banyak percobaan masuk. Coba lagi dalam '
                    .RateLimiter::availableIn($throttleKey).' detik.',
            ]);
        }

        $validEmail = Str::lower((string) config('admin.email'));
        $validPassword = (string) config('admin.password');

        if (! hash_equals($validEmail, $credentials['email'])
            || ! hash_equals($validPassword, $credentials['password'])) {
            RateLimiter::hit($throttleKey, 60);

            throw ValidationException::withMessages([
                'email' => 'Email atau kata sandi tidak sesuai.',
            ]);
        }

        RateLimiter::clear($throttleKey);

        $request->session()->regenerate();
        $request->session()->put([
            'admin_logged_in' => true,
            'admin_name' => config('admin.name'),
            'admin_email' => $validEmail,
        ]);

        return redirect()->route('admin.dashboard');
    }

    public function logout(Request $request): RedirectResponse
    {
        $request->session()->forget(['admin_logged_in', 'admin_name', 'admin_email']);
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
