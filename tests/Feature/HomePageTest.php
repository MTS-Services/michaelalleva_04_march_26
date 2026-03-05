<?php

test('home page loads successfully', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('home page uses frontend home component with banner', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('frontend/home'));
});
