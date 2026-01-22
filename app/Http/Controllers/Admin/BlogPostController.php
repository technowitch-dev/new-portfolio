<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogPostImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('images')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/blog/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blog/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug',
            'published_at' => 'nullable|date',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max per image
        ]);

        // Create blog post
        $post = BlogPost::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'slug' => $validated['slug'] ?? null,
            'published_at' => $validated['published_at'] ?? null,
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $imagePath = $image->store('blog-images', 'public');
                
                BlogPostImage::create([
                    'blog_post_id' => $post->id,
                    'image_path' => $imagePath,
                    'order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post created successfully.');
    }

    public function edit(BlogPost $blogPost)
    {
        $blogPost->load('images');

        return Inertia::render('admin/blog/edit', [
            'post' => $blogPost,
        ]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug,' . $blogPost->id,
            'published_at' => 'nullable|date',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'integer|exists:blog_post_images,id',
        ]);

        // Update blog post
        $blogPost->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'slug' => $validated['slug'] ?? null,
            'published_at' => $validated['published_at'] ?? null,
        ]);

        // Delete requested images
        if (!empty($validated['delete_images'])) {
            $imagesToDelete = BlogPostImage::whereIn('id', $validated['delete_images'])
                ->where('blog_post_id', $blogPost->id)
                ->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
        }

        // Handle new image uploads
        if ($request->hasFile('images')) {
            $maxOrder = $blogPost->images()->max('order') ?? -1;
            
            foreach ($request->file('images') as $index => $image) {
                $imagePath = $image->store('blog-images', 'public');
                
                BlogPostImage::create([
                    'blog_post_id' => $blogPost->id,
                    'image_path' => $imagePath,
                    'order' => $maxOrder + $index + 1,
                ]);
            }
        }

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $blogPost)
    {
        // Delete all associated images
        foreach ($blogPost->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $blogPost->delete();

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}