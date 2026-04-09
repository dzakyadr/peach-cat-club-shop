<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class VariantController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'size' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
        ]);

        ProductVariant::create($validated);
        return back();
    }

    public function update(Request $request, ProductVariant $variant) {
        $validated = $request->validate([
            'size' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
        ]);

        $variant->update($validated);
        return back();
    }

    public function destroy(ProductVariant $variant) {
        $variant->delete();
        return back();
    }
}