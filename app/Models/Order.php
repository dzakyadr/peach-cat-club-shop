<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model {
    protected $fillable = ['user_id', 'promo_id', 'total_amount', 'discount_amount', 'shipping_cost', 'status', 'shipping_address'];

    protected function casts(): array {
        return [
            'shipping_address' => 'array',
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function promo() {
        return $this->belongsTo(Promo::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }
}