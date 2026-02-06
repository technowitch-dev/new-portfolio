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
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)
            ->firstOrFail();

        // Allow viewing draft posts in development, or add admin check
        if (!$post->isPublished() && !auth()->check()) {
            abort(404);
        }

        // Get previous and next published posts for navigation
        $previousPost = BlogPost::published()
            ->where('published_at', '<', $post->published_at)
            ->orderBy('published_at', 'desc')
            ->first(['id', 'slug', 'title']);

        $nextPost = BlogPost::published()
            ->where('published_at', '>', $post->published_at)
            ->orderBy('published_at', 'asc')
            ->first(['id', 'slug', 'title']);

        return Inertia::render('blog/show', [
            'post' => $post,
            'previousPost' => $previousPost,
            'nextPost' => $nextPost,
        ]);
    }
}