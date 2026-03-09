<?php

use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.', 'prefix' => 'admin', 'middleware' => ['auth', 'verified', 'admin']], function () {
    Route::get('dashboard', AdminDashboardController::class)->name('dashboard');

    Route::controller(BookingController::class)->prefix('bookings')->name('bookings.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{booking}', 'show')->name('show');
    });
    Route::controller(InventoryController::class)->prefix('inventory')->name('inventory.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{inventory}', 'show')->name('show');
        Route::get('/{inventory}/edit', 'edit')->name('edit');
        Route::put('/{inventory}', 'update')->name('update');
        Route::delete('/{inventory}', 'destroy')->name('destroy');
    });
    Route::controller(ContentController::class)->prefix('content')->name('content.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{content}/edit', 'edit')->name('edit');
        Route::put('/{content}', 'update')->name('update');
    });

    Route::controller(ProfileController::class)->prefix('profile')->name('profile.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/edit', 'edit')->name('edit');
        Route::put('/', 'update')->name('update');
    });

    Route::resource('users', UserController::class)->names('users');
});
