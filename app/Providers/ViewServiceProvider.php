<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        View::composer(['layouts.render'], function ($view) {

            $page = null;
            if (isset($view['page'])) {
                $page = $view['page'];
            }


//            if (\Auth::check()) {

                $view->with(
                    'view_shared_data',
                    [
                        'base_url' => url('/'),
                        'page' => $page,
                        'api_server' => config('index.api_server'),
                    ]
                );

//            }

        });

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }
}
