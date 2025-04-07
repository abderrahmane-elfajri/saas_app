<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Client routes
    Route::apiResource('clients', ClientController::class);

    // Appointment routes
    Route::apiResource('appointments', AppointmentController::class);
});