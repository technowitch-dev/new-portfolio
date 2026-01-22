<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Inertia\Inertia;

class LinksController extends Controller
{
    public function index()
    {
        $links = Link::ordered()->get();

        return Inertia::render('links', [
            'links' => $links,
        ]);
    }
}