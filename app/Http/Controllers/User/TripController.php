<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TripController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('user/my-trips');
    }
    public function show(string $bookingUid): Response
    {
        return Inertia::render('user/trip-details', [
            'trip' => $bookingUid,
        ]);
    }
}
