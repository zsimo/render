<?php
/**
 * Created by PhpStorm.
 * User: Simone.Sacchi
 * Date: 11/17/2018
 * Time: 12:07 AM
 */


$webpack_dev_server_url = env('WEBPACK_DEV_SERVER_URL', "http://localhost/");
if (substr("$webpack_dev_server_url", -1) !== '/') {
    $webpack_dev_server_url .= "/";
}

return [

    /*
    |--------------------------------------------------------------------------
    | API SERVER
    |--------------------------------------------------------------------------
    |
    | Define the type of API server (http or socket)
    |
    */

    'api_server' => env('API_SERVER_TYPE', 'http'),

    'webpack_dev_server_url' => $webpack_dev_server_url

];