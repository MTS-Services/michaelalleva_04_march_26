<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class GuestInfoController extends Controller
{
    public function index(string $destination, string $package): Response
    {
        return Inertia::render('frontend/guest-info', [
            'destinationSlug' => $destination,
            'packageSlug' => $package,
            'prevStep' => url()->previous() ?? route('frontend.select-date', [$destination, $package]),
        ]);
    }
}
