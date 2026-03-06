<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TravelersCountController extends Controller
{
    public function index(string $destination, string $package): Response
    {


        return Inertia::render('frontend/travelers-count', [
            'destinationSlug' => $destination,
            'packageSlug' => $package,            
        ]);
    }
}
