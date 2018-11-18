<?php

declare(strict_types = 1);


/**
 * Returns the hashed file name
 * @example: "http://brunelleschi/~simone.sacchi/my_actide/public/css/dist/styleguide_f0aa7d8.css"
 *
 * @param string $resource
 * @return string
 */
function hashed_asset(string $resource) : string
{

    if (is_dev_server_running()) {
        // when the webpack dev-server starts, the manifest php file has been removed
        return Config::get('index.webpack_dev_server_url') . $resource;
    } else {
        return asset(hashed_file($resource));
    }

}

/**
 * Every time the dev-server starts, the config/webpack_manifest.php is deleted.
 *
 * @return bool
 */
function is_dev_server_running() : bool
{
    return !Config::has('webpack_manifest');
}

/**
 * Given the resource name, returns the hashed name.
 *
 * @param string $resource
 * @return string
 */
function hashed_file(string $resource) : string
{
    list($pageName, $fileExtension) = get_filename_and_extension($resource);
    return 'dist/' . Config::get('webpack_manifest.'. $pageName . '_' . $fileExtension);
}

function get_filename_and_extension(string $resource) : array
{
    return explode('.', $resource);
}

/**
 * Check if a hashed resource exists.
 *
 * @param string $resource
 * @return bool
 */
function hashed_asset_exists(string $resource) : bool
{
    return file_exists(public_path(hashed_file($resource)));
}

/**
 * Returns the path to a hashed resource exists (used to inline some small assets
 * e.g.: runtime.js)
 *
 * @param string $resource
 * @return string
 */
function hashed_asset_path(string $resource) : string
{
    return public_path(hashed_file($resource));
}