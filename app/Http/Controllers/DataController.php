<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DataController extends Controller
{

    private $dataFile;

    public function __construct()
    {
        if (!Auth::check()) {
            $userID = Auth::id();
            $userID = '2';
            $usersDir = database_path('users');
            $userDir = $usersDir . '/' . $userID;
            $this->dataFile = $userDir . '/' . 'data.json';

            if(!File::exists($usersDir)) {
                File::makeDirectory($usersDir, 0777, true, true);
                if(!File::exists($userDir)) {
                    File::makeDirectory($userDir, 0777, true, true);
                    file_put_contents($this->dataFile, json_encode([], JSON_PRETTY_PRINT));
                }
            }

        } else {
            $this->dataFile = database_path('data.json');
        }

    }

    public function read () {
        return file_get_contents($this->dataFile);
    }

    public function write (Request $request) {
        file_put_contents($this->dataFile, json_encode($request->all(), JSON_PRETTY_PRINT));
    }
}
