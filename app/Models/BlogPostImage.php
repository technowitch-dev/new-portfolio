<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPostImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_post_id',
        'image_path',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Relationship back to blog post
     */
    public function blogPost()
    {
        return $this->belongsTo(BlogPost::class);
    }
}
