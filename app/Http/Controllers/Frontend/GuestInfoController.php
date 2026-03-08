<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class GuestInfoController extends Controller
{
    public function index(string $destination, string $package): Response
    {
        $currentUrl = url()->current();
        $previousUrl = url()->previous();

        $prevStep = ($previousUrl && $previousUrl !== $currentUrl)
            ? $previousUrl
            : route('select-date', [$destination, $package]);

        return Inertia::render('frontend/guest-info', [
            'destinationSlug' => $destination,
            'packageSlug' => $package,
            'prevStep' => $prevStep,
        ]);
    }
}
