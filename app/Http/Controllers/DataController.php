<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataController extends Controller
{

    private $dataFile;

    public function __construct()
    {
        $this->dataFile = database_path('data.json');
    }

    public function read () {
        return file_get_contents($this->dataFile);
    }

    public function write (Request $request) {
        file_put_contents($this->dataFile, json_encode($request->all(), JSON_PRETTY_PRINT));
    }
}
