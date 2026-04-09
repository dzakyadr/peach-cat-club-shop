<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model {
    protected $fillable = ['code', 'type', 'value', 'min_spend', 'quota', 'expired_at'];

    protected function casts(): array {
        return [
            'expired_at' => 'datetime',
        ];
    }
}