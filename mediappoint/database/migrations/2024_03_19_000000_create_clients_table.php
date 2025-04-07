<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->text('address');
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->string('blood_group')->nullable();
            $table->text('medical_history')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->text('allergies')->nullable();
            $table->string('occupation')->nullable();
            $table->string('insurance_provider')->nullable();
            $table->string('insurance_number')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clients');
    }
}; 