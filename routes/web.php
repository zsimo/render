<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->middleware('verified');

Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home');


Route::middleware(['auth'])->group(function () {

    Route::get('/pages/yo-yo', function () {

        if (App::environment('production')) {
            header("Content-Security-Policy: script-src 'nonce-" . csrf_token() . "'");
        }

        return view('pages.yo-yo', ['page' => 'yo-yo']);
    })->name('yo-yo');

    Route::get('/pages/riot', function () {

        if (App::environment('production')) {
            header("Content-Security-Policy: script-src 'nonce-" . csrf_token() . "'");
        }

        return view('pages.riot', ['page' => 'riot']);
    })->name('riot');


    Route::get('/pages/money', function () {

        if (App::environment('production')) {
            header("Content-Security-Policy: script-src 'nonce-" . csrf_token() . "'");
        }

        return view('pages.money', ['page' => 'money']);
    })->name('money');


    Route::get("/api/read/{page}", 'DataController@read');
    Route::post("/api/write/{page}", 'DataController@write');

});



