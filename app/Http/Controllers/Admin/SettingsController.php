<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $colorScheme = SiteSetting::getColorScheme();
        $registrationEnabled = SiteSetting::getRegistrationEnabled();

        return Inertia::render('admin/settings', [
            'colorScheme' => $colorScheme,
            'registrationEnabled' => $registrationEnabled,
        ]);
    }

    public function updateColors(Request $request)
    {
        $validated = $request->validate([
            'background' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'color1' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'color2' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'text' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
        ]);

        SiteSetting::setColorScheme($validated);

        return redirect()->back()
            ->with('success', 'Color scheme updated successfully.');
    }

    public function updateRegistration(Request $request)
    {
    $validated = $request->validate([
        'registration_enabled' => 'required|boolean',
    ]);

    SiteSetting::setRegistrationEnabled($validated['registration_enabled']);

    return redirect()->back()
        ->with('success', 'Registration setting updated.');
    }
}