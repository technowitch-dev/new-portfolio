<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LinkController extends Controller
{
    public function index()
    {
        $links = Link::ordered()->get();

        return Inertia::render('admin/links/index', [
            'links' => $links,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/links/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'description' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle icon upload
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('link-icons', 'uploads');
            $validated['icon'] = $iconPath;
        }

        Link::create($validated);

        return redirect()->route('admin.links.index')
            ->with('success', 'Link created successfully.');
    }

    public function edit(Link $link)
    {
        return Inertia::render('admin/links/edit', [
            'link' => $link,
        ]);
    }

    public function update(Request $request, Link $link)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'description' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle icon upload
        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($link->icon) {
                Storage::disk('uploads')->delete($link->icon);
            }
            $iconPath = $request->file('icon')->store('link-icons', 'uploads');
            $validated['icon'] = $iconPath;
        }

        $link->update($validated);

        return redirect()->route('admin.links.index')
            ->with('success', 'Link updated successfully.');
    }

    public function destroy(Link $link)
    {
        // Delete icon if exists
        if ($link->icon) {
            Storage::disk('uploads')->delete($link->icon);
        }

        $link->delete();

        return redirect()->route('admin.links.index')
            ->with('success', 'Link deleted successfully.');
    }
}