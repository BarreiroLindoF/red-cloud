<?php

use Illuminate\Database\Seeder;
use App\Common\CSVReader;

class PaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $csvFile = \App\Pays::$pathToCsvFile;
        $reader = new CSVReader();
        $file = $reader->readCSV(database_path() . $csvFile);
        foreach ($file as $line) {
            DB::table('pays')->insert([
                'nom_pays' => $line[4],
            ]);
        }
    }
}
