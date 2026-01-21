<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
    ];

    /**
     * Get a setting value by key
     */
    public static function getValue(string $key, $default = null)
    {
        return Cache::remember("site_setting_{$key}", 3600, function () use ($key, $default) {
            $setting = self::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }

    /**
     * Set a setting value by key
     */
    public static function setValue(string $key, $value): void
    {
        self::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
        
        Cache::forget("site_setting_{$key}");
    }

    /**
     * Get color scheme as array
     */
    public static function getColorScheme(): array
    {
        $value = self::getValue('color_scheme');
        if ($value) {
            return json_decode($value, true) ?? [];
        }
        
        // Default color scheme
        return [
            'background' => '#574964',
            'color1' => '#9F8383',
            'color2' => '#C8AAAA',
            'text' => '#FFDAB3',
        ];
    }

    /**
     * Set color scheme
     */
    public static function setColorScheme(array $colors): void
    {
        self::setValue('color_scheme', json_encode($colors));
    }
}
