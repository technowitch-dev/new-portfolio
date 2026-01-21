<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'url',
        'description',
        'icon',
        'category',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Scope to order links by order field, then by title
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('title');
    }

    /**
     * Scope to get links by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
