<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(string $destination): Response
    {
        return Inertia::render('frontend/packages', [
            'destination' => $destination,
        ]);
    }
}
