<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::setColorScheme([
            'background' => '#574964',
            'color1' => '#9F8383',
            'color2' => '#C8AAAA',
            'text' => '#FFDAB3',
        ]);
        SiteSetting::setRegistrationEnabled(true);
    }
}
