<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'date_of_birth',
        'gender',
        'blood_group',
        'medical_history',
        'emergency_contact',
        'allergies',
        'occupation',
        'insurance_provider',
        'insurance_number'
    ];

    protected $casts = [
        'date_of_birth' => 'date'
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
} 