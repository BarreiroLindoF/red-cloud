<?php

namespace App\Common;

class CSVReader
{

    public function readCSV($csvFile){
        $file_handle = fopen($csvFile, 'r');
        while (!feof($file_handle) ) {
            $line_of_text[] = fgetcsv($file_handle);
        }
        fclose($file_handle);
        return $line_of_text;
    }

}