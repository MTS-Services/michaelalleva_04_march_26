<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PaymentSuccessController extends Controller
{
    public function index(string $bookingUid): Response
    {
        return Inertia::render('frontend/payment-success', [
            'bookingUid' => $bookingUid,
        ]);
    }
}
