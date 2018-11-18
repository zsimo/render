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
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::middleware(['auth'])->group(function () {

    Route::get('/pages/yo-yo', function () {

        if (App::environment('production')) {
            header("Content-Security-Policy: script-src 'nonce-" . csrf_token() . "'");
        }

        return view('pages.yo-yo', ['page' => 'yo-yo']);
    })->name('yo-yo');


    Route::get("/api/read", 'DataController@read');
    Route::post("/api/write", 'DataController@write');

});



