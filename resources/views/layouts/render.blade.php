<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

</head>
<body>

    <div id="header">
        <h2>
            Render {{$page}}
            <small style="font-weight: normal;"><i id="app-version"></i></small>
        </h2>
        <span id="log-area"></span>
    </div>

    @section('main-content')

    @show


    @include('partials.js')

</body>
</html>
