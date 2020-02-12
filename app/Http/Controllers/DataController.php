<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DataController extends Controller
{

    private $dataFile;


    private function getDataFile($page)
    {
        if (Auth::check()) {
            $userID = Auth::id();
            $usersDir = database_path('users');
            $userDir = $usersDir . '/' . $userID;
            return $userDir . '/' . $page . '/data.json';

        } else {
            return database_path('data.json');
        }
    }

    public function read ($page) {

//        if (Auth::check()) {
            $userID = Auth::id();
            $usersDir = database_path('users');
            $userDir = $usersDir . '/' . $userID . "/" . $page;
            $this->dataFile = $this->getDataFile($page);

            if(!File::exists($usersDir)) {
                File::makeDirectory($usersDir, 0777, true, true);
            }
            if(!File::exists($userDir)) {
                File::makeDirectory($userDir, 0777, true, true);
                file_put_contents($this->dataFile, json_encode([], JSON_PRETTY_PRINT));
            }

            return file_get_contents($this->dataFile);

//        }
//        else {
//            $this->dataFile = database_path('data.json');
//        }



    }

    public function write (Request $request, $page) {


            if ($page == 'money') {

                try {
                    $this->dataFile = $this->getDataFile($page);
                    $data = json_decode(file_get_contents($this->dataFile), true);

                    $payload = $request->all();

                    $year = $payload['year'];
                    $month = $payload['month'];
                    $day = $payload['day'];


                    if (!array_key_exists ($year, $data)) {
                        $data[$year] = [];
                    }


                    if (!array_key_exists($month, $data[$year])) {
                        $data[$year][$month] = [];
                    }

                    if (!array_key_exists($day, $data[$year][$month])) {
                        $data[$year][$month][$day] = [];
                    }


                    $item = [
                        'type' => $payload['type'],
                        'amount' => $payload['amount'],
                        'time' => $payload['time']
                    ];
                    array_push($data[$year][$month][$day], $item);
                    file_put_contents($this->dataFile,
                        json_encode($data, JSON_PRETTY_PRINT));

                    return $data;

                } catch (\Exception $e) {
                    return ["msg"=>$e->getMessage()];
                }


            } else {
                $this->dataFile = $this->getDataFile($page);
                file_put_contents($this->dataFile,
                    json_encode($request->all(), JSON_PRETTY_PRINT));
            }



    }
}
