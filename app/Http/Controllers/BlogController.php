<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::published()
            ->with('images')
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)
            ->with('images')
            ->firstOrFail();

        // Allow viewing draft posts in development, or add admin check
        if (!$post->isPublished() && !auth()->check()) {
            abort(404);
        }

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}