<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Link;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_links' => Link::count(),
            'total_blog_posts' => BlogPost::count(),
            'published_posts' => BlogPost::published()->count(),
            'draft_posts' => BlogPost::whereNull('published_at')->count(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}