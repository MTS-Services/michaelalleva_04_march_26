<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContentController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/content/index');
    }

    public function edit(string $id): Response
    {
        return Inertia::render('admin/content/edit', [
            'content' => $id,
        ]);
    }
}
