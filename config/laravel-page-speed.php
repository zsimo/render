<?php


return [

    /*
    |--------------------------------------------------------------------------
    | Laravel-page-speed
    |--------------------------------------------------------------------------
    | Enable html minification only in production
    |
    */
    'enable' => env('APP_ENV') === 'production' ? true : false


];