<?php

test('destination page loads successfully', function () {
    $response = $this->get(route('destination.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('frontend/destination'));
});

test('about-us page loads successfully', function () {
    $response = $this->get(route('about-us.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('frontend/about-us'));
});

test('contact page loads successfully', function () {
    $response = $this->get(route('contact'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('frontend/contact'));
});

test('egypt packages page loads successfully', function () {
    $response = $this->get(route('packages', ['destination' => 'egypt']));

    $response->assertOk();  
    $response->assertInertia(fn ($page) => $page->component('frontend/packages/egypt'));
});
