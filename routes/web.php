<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LinksController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LinkController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\SettingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/links', [LinksController::class, 'index'])->name('links');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Admin Routes (require authentication)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Link Management
    Route::resource('links', LinkController::class);
    
    // Blog Post Management
    Route::resource('blog', BlogPostController::class)->except(['show']);
    
    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::put('/settings/colors', [SettingsController::class, 'updateColors'])->name('settings.colors');
    Route::put('/settings/user_settings', [SettingsController::class, 'updateUserSettings'])->name('settings.user_settings');
    Route::put('/settings/registration', [SettingsController::class, 'updateRegistration'])->name('settings.registration');
});

Route::middleware(['auth', 'verified'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

require __DIR__.'/settings.php';