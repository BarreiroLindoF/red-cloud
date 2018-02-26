<?php

use Illuminate\Database\Seeder;

class JeuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jeu')->insert([
            'nom_jeu' => 'World of Warcraft',
            'type_jeu' => 1,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Mario Kart',
            'type_jeu' => 2,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Dofus',
            'type_jeu' => 1,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'PlayerUnknown\'s battlegrounds',
            'type_jeu' => 3,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Fifa 18',
            'type_jeu' => 4,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Battlefield 1',
            'type_jeu' => 3,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Halo 5',
            'type_jeu' => 3,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Fortnite',
            'type_jeu' => 1,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Heroes of the Storm',
            'type_jeu' => 5,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'League of Legends',
            'type_jeu' => 5,
        ]);
        DB::table('jeu')->insert([
            'nom_jeu' => 'Counter Strike',
            'type_jeu' => 3,
        ]);
    }
}

