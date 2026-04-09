<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class StorefrontController extends Controller {
    public function index() {
        $products = Product::with(['images', 'category'])
            ->where('is_published', true)
            ->latest()
            ->get();
            
        return Inertia::render('Storefront/Home', compact('products'));
    }
    
    public function show($slug) {
        $product = Product::with(['images', 'variants', 'category'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();
            
        // Get other colors of the same design (same style_code)
        $colors = Product::with('images')
            ->where('style_code', $product->style_code)
            ->where('is_published', true)
            ->get();
            
        return Inertia::render('Storefront/ProductDetail', compact('product', 'colors'));
    }
}