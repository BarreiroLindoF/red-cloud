<?php

use Illuminate\Database\Seeder;

class TypeJeuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('type_jeu')->insert([
            'designation' => 'MMORPG',
        ]);
        DB::table('type_jeu')->insert([
            'designation' => 'Course',
        ]);
        DB::table('type_jeu')->insert([
            'designation' => 'FPS',
        ]);
        DB::table('type_jeu')->insert([
            'designation' => 'Foot',
        ]);
        DB::table('type_jeu')->insert([
            'designation' => 'MOBA',
        ]);
    }
}
