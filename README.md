# render

- composer dump autoload
- php artisan serve
- php artisan make:controller
- php artisan migrate:fresh


API_SERVER_TYPE=socket || http



- Security
    - XSSI (remote JavaScript inclusion) using 'for (;;);'
    - Content-Security-Policy: script-src with [nonce](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script)
    - CSRF token 
    
- Optimizations
    - Minify Html via laravel-page-speed
