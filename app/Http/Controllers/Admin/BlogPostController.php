<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::orderBy('created_at', 'desc')
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
            'is_draft' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:20000',
        ]);

        // Determine published_at based on is_draft
        $publishedAt = ($validated['is_draft'] ?? true) ? null : now();
        // Create blog post
        $post = BlogPost::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'slug' => $validated['slug'] ?? null,
            'published_at' => $publishedAt,
            'images' => [], // Initialize empty array
        ]);

        // Handle image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            $uploadPath = "blog-images/{$post->id}";
            
            foreach ($request->file('images') as $image) {
                // Generate GUID for filename
                $guid = Str::uuid()->toString();
                $extension = $image->getClientOriginalExtension();
                $filename = "{$guid}.{$extension}";
                
                // Store image: public/storage/blog-images/{post_id}/{guid}.{ext}
                $imagePath = $image->storeAs($uploadPath, $filename, 'uploads');
                
                // Add to paths array (store relative path)
                $imagePaths[] = $imagePath;
            }
            
            // Update post with image paths array
            $post->update(['images' => $imagePaths]);
        }

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post created successfully.');
    }

    public function edit(BlogPost $blog)
    {
        $post = $blog;

        $postPayload = [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'slug' => $post->slug,
            'published_at' => $post->published_at?->toIso8601String(),
            'created_at' => $post->created_at?->toIso8601String(),
            'images' => $post->images ?? [],
            'is_draft' => $post->published_at === null,
        ];

        return Inertia::render('admin/blog/edit', [
            'post' => $postPayload,
        ]);
    }

    public function update(Request $request, BlogPost $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug,' . $blog->id,
            'is_draft' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:20000',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'string', // Array of image paths
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'string', // Array of image paths to delete
        ]);
    
        // Determine published_at based on is_draft
        $publishedAt = ($validated['is_draft'] ?? true) ? null : now();
        // Start with existing images array (from hidden form field)
        $existingImages = $validated['existing_images'] ?? [];
        
        // Remove deleted images from the array
        if (!empty($validated['deleted_images'])) {
            foreach ($validated['deleted_images'] as $deletedPath) {
                // Remove from array
                $existingImages = array_values(array_filter($existingImages, function($path) use ($deletedPath) {
                    return $path !== $deletedPath;
                }));
                
                // Delete file from storage
                Storage::disk('uploads')->delete($deletedPath);
            }
        }
    
        // Handle new image uploads
        $newImagePaths = [];
        if ($request->hasFile('images')) {
            $uploadPath = "blog-images/{$blog->id}";
            
            foreach ($request->file('images') as $image) {
                // Generate GUID for filename
                $guid = Str::uuid()->toString();
                $extension = $image->getClientOriginalExtension();
                $filename = "{$guid}.{$extension}";
                
                // Store image: public/storage/blog-images/{post_id}/{guid}.{ext}
                $imagePath = $image->storeAs($uploadPath, $filename, 'uploads');
                
                // Add to new paths array
                $newImagePaths[] = $imagePath;
            }
        }
    
        // Combine existing and new images
        $allImages = array_merge($existingImages, $newImagePaths);
    
        // Update blog post
        $blog->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'slug' => $validated['slug'] ?? null,
            'published_at' => $publishedAt,
            'images' => $allImages,
        ]);
    
        // Clean up orphaned files
        $imageDirectory = "blog-images/{$blog->id}";
        if (Storage::disk('uploads')->exists($imageDirectory)) {
            $filesInDirectory = Storage::disk('uploads')->files($imageDirectory);
            
            foreach ($filesInDirectory as $file) {
                // Check if file is in the images array
                if (!in_array($file, $allImages)) {
                    // File is orphaned, delete it
                    Storage::disk('uploads')->delete($file);
                }
            }
        }
    
        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $blog)
    {
        // Delete all images from storage
        if (!empty($blog->images) && is_array($blog->images)) {
            foreach ($blog->images as $imagePath) {
                Storage::disk('uploads')->delete($imagePath);
            }
            
            // Delete the entire directory
            $imageDirectory = "blog-images/{$blog->id}";
            if (Storage::disk('uploads')->exists($imageDirectory)) {
                Storage::disk('uploads')->deleteDirectory($imageDirectory);
            }
        }

        $blog->delete();

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}