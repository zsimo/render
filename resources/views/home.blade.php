@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                        <h3><a href="{{ route('yo-yo') }}">yo-yo.js</a></h3>
                        <h3><a href="{{ route('riot') }}">riot.js</a></h3>
                        <h3><a href="{{ route('money') }}">money.js</a></h3>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
