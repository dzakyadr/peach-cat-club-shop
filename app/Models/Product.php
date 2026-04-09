<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    protected $fillable = ['category_id', 'name', 'slug', 'style_code', 'color', 'price', 'weight', 'description', 'is_published'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function variants() {
        return $this->hasMany(ProductVariant::class);
    }

    public function images() {
        return $this->hasMany(ProductImage::class);
    }
}