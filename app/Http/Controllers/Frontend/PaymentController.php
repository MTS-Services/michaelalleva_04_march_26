<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function success(string $bookingUid): Response
    {
        return Inertia::render('frontend/payment-success', [
            'bookingUid' => $bookingUid,
        ]);
    }

    public function failure(string $bookingUid): Response
    {
        return Inertia::render('frontend/payment-failure', [
            'bookingUid' => $bookingUid,
        ]);
    }
}
