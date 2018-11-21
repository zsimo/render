<?php
declare(strict_types = 1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;

class PreventXSSIOnJsonResponse
{

    public function handle($request, Closure $next)
    {

        $response = $next($request);

        // In order to prevent XSSI (remote JavaScript inclusion) attack (which means that a web page in other domain
        // can include a tag script referring a URL that responds with JSON), we add some characters
        // that break the execution of JavaScript when parsing the inclusion.
        //if ($response instanceof JsonResponse) {
        if ($request->isJson()) {
            $content = $response->getContent();

            $response->setContent('for (;;);' . $content);
        }


        return $response;

    }

}