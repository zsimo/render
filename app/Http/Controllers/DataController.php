<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DataController extends Controller
{

    private $dataFile;


    private function getDataFile()
    {
        if (Auth::check()) {
            $userID = Auth::id();
            $usersDir = database_path('users');
            $userDir = $usersDir . '/' . $userID;
            return $userDir . '/' . 'data.json';

        } else {
            return database_path('data.json');
        }
    }

    public function read () {

        if (Auth::check()) {
            $userID = Auth::id();
            $usersDir = database_path('users');
            $userDir = $usersDir . '/' . $userID;
            $this->dataFile = $this->getDataFile();

            if(!File::exists($usersDir)) {
                File::makeDirectory($usersDir, 0777, true, true);
            }
            if(!File::exists($userDir)) {
                File::makeDirectory($userDir, 0777, true, true);
                file_put_contents($this->dataFile, json_encode([], JSON_PRETTY_PRINT));
            }

        } else {
            $this->dataFile = database_path('data.json');
        }


        return file_get_contents($this->dataFile);
    }

    public function write (Request $request) {
        $this->dataFile = $this->getDataFile();
        file_put_contents($this->dataFile, json_encode($request->all(), JSON_PRETTY_PRINT));
    }
}
