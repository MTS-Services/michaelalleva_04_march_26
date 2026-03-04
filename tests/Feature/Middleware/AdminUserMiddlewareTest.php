<?php

use App\Models\User;

test('non-admin users cannot access admin routes (html)', function () {
    $user = User::factory()->create([
        'is_admin' => false,
    ]);

    $this->actingAs($user)
        ->get(route('admin.dashboard'))
        ->assertRedirect(route('home'))
        ->assertSessionHas('error');
});

test('non-admin users cannot access admin routes (json)', function () {
    $user = User::factory()->create([
        'is_admin' => false,
    ]);

    $this->actingAs($user)
        ->getJson(route('admin.dashboard'))
        ->assertForbidden()
        ->assertJson(['error' => 'Unauthorized']);
});

test('admin users cannot access user routes (html)', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->get(route('user.dashboard'))
        ->assertRedirect(route('admin.dashboard'))
        ->assertSessionHas('error');
});

test('admin users cannot access user routes (json)', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->getJson(route('user.dashboard'))
        ->assertForbidden()
        ->assertJson(['error' => 'Unauthorized']);
});

test('non-admin users can access user routes', function () {
    $user = User::factory()->create([
        'is_admin' => false,
    ]);

    $this->actingAs($user)
        ->get(route('user.dashboard'))
        ->assertOk();
});
