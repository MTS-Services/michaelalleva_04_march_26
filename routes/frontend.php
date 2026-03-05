<?php

use App\Http\Controllers\Frontend\AboutUsController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\DestinationController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\PackageController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::get('/destination', [DestinationController::class, 'index'])->name('destination');
    Route::get('/about-us', [AboutUsController::class, 'index'])->name('about-us');
    Route::get('/contact', [ContactController::class, 'index'])->name('contact');
    Route::get('/{destination}/packages', [PackageController::class, 'index'])->name('packages');
});
