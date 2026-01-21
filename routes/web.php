<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

   // In routes/web.php (temporary for testing)
   Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/links', function () {
    return Inertia::render('links', [
        'links' => [], // Empty for now
    ]);
});

Route::get('/blog', function () {
    return Inertia::render('blog/index', [
        'posts' => [], // Empty for now
    ]);
});

require __DIR__.'/settings.php';
