<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller {
    public function index() {
        $categories = Category::latest()->get();
        return Inertia::render('Admin/Categories/Index', compact('categories'));
    }

    public function create() {
        return Inertia::render('Admin/Categories/Form');
    }

    public function store(Request $request) {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        $validated['slug'] = Str::slug($validated['name']);
        Category::create($validated);
        return redirect()->route('admin.categories.index');
    }

    public function edit(Category $category) {
        return Inertia::render('Admin/Categories/Form', compact('category'));
    }

    public function update(Request $request, Category $category) {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        $validated['slug'] = Str::slug($validated['name']);
        $category->update($validated);
        return redirect()->route('admin.categories.index');
    }

    public function destroy(Category $category) {
        $category->delete();
        return redirect()->route('admin.categories.index');
    }
}