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
        DB::table('typeJeu')->insert([
            'designation_type_jeu' => 'MMORPG',
        ]);
        DB::table('typeJeu')->insert([
            'designation_type_jeu' => 'Course',
        ]);
        DB::table('typeJeu')->insert([
            'designation_type_jeu' => 'FPS',
        ]);
        DB::table('typeJeu')->insert([
            'designation_type_jeu' => 'Foot',
        ]);
        DB::table('typeJeu')->insert([
            'designation_type_jeu' => 'MOBA',
        ]);
    }
}
