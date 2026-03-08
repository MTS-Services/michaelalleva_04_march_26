<?php

use App\Http\Controllers\Frontend\AboutUsController;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\DestinationController;
use App\Http\Controllers\Frontend\GuestInfoController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\PackageController;
use App\Http\Controllers\Frontend\PaymentController;
use App\Http\Controllers\Frontend\SelectDateController;
use App\Http\Controllers\Frontend\TravelersCountController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::get('/destination', [DestinationController::class, 'index'])->name('destination');
    Route::get('/about-us', [AboutUsController::class, 'index'])->name('about-us');
    Route::get('/contact', [ContactController::class, 'index'])->name('contact');
    Route::get('/{destination}/packages', [PackageController::class, 'index'])->name('packages');
    Route::get('/{destination}/{package}/travelers-count', [TravelersCountController::class, 'index'])->name('travelers-count');
    Route::get('/{destination}/{package}/select-date', [SelectDateController::class, 'index'])->name('select-date');
    Route::get('/{destination}/{package}/guest-info', [GuestInfoController::class, 'index'])->name('guest-info');
    Route::get('/{bookingUid}/checkout', [CheckoutController::class, 'index'])->name('checkout');
    Route::get('/{bookingUid}/success', [PaymentController::class, 'success'])->name('payment-success');
    Route::get('/{bookingUid}/failure', [PaymentController::class, 'failure'])->name('payment-failure');
});
