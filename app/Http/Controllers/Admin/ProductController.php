<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller {
    public function index() {
        $products = Product::with('category')->latest()->get();
        return Inertia::render('Admin/Products/Index', compact('products'));
    }

    public function create() {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Form', compact('categories'));
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'style_code' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'weight' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'is_published' => 'boolean',
            'image' => 'required|image|max:2048|dimensions:ratio=4/5', // Enforce 4:5 ratio
        ]);

        $validated['slug'] = Str::slug($validated['name'] . '-' . $validated['color']);
        $product = Product::create($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->images()->create(['path' => $path, 'is_primary' => true]);
        }

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product) {
        $product->load('images');
        $categories = Category::all();
        return Inertia::render('Admin/Products/Form', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product) {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'style_code' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'weight' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'is_published' => 'boolean',
            'image' => 'nullable|image|max:2048|dimensions:ratio=4/5',
        ]);

        $validated['slug'] = Str::slug($validated['name'] . '-' . $validated['color']);
        $product->update($validated);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->images()->updateOrCreate(
                ['is_primary' => true],
                ['path' => $path]
            );
        }

        return redirect()->route('admin.products.index');
    }

    public function show(Product $product) {
        $product->load('variants', 'images', 'category');
        return Inertia::render('Admin/Products/Show', compact('product'));
    }

    public function destroy(Product $product) {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
}