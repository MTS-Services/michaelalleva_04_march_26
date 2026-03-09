<?php

use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\TripController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'user'])->prefix('user')->name('user.')->group(function () {
    Route::get('dashboard', UserDashboardController::class)->name('dashboard');

    Route::controller(ProfileController::class)->prefix('profile')->name('profile.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/edit', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
    });

    Route::controller(TripController::class)->prefix('trips')->name('trips.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{trip}', 'show')->name('show');
    });
});
