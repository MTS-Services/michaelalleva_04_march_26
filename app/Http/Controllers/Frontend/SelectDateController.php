<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SelectDateController extends Controller
{
    public function index(string $destination, string $package): Response
    {
        return Inertia::render('frontend/select-date', [
            'destinationSlug' => $destination,
            'packageSlug' => $package,
            'prevStep' => url()->previous() ?? route('frontend.travelers-count', [$destination, $package]),
        ]);
    }
}
