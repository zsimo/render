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
        <h2>Render {{$page}}</h2>
        <span id="log-area"></span>
    </div>

    <div id="first-column"></div>
    <div id="second-column"></div>
    <div id="third-column"></div>


    <script>
        window.Render = {!! json_encode($view_shared_data) !!};
    </script>

    {{--<script type="text/javascript" src="{{ asset('compiled/'. $page .'/bundle.js') }}"></script>--}}
    <script type="text/javascript" src="http://localhost:8001/bundle.js"></script>

</body>
</html>
