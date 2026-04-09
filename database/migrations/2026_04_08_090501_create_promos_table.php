<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('type', ['percent', 'fixed_amount']);
            $table->decimal('value', 12, 2);
            $table->decimal('min_spend', 12, 2)->default(0);
            $table->integer('quota')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('promos');
    }
};