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
            'nom' => 'World of Warcraft',
            'type_jeu_id_type_jeu' => 1,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Mario Kart',
            'type_jeu_id_type_jeu' => 2,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Dofus',
            'type_jeu_id_type_jeu' => 1,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'PlayerUnknown\'s battlegrounds',
            'type_jeu_id_type_jeu' => 3,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Fifa 18',
            'type_jeu_id_type_jeu' => 4,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Battlefield 1',
            'type_jeu_id_type_jeu' => 3,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Halo 5',
            'type_jeu_id_type_jeu' => 3,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Fortnite',
            'type_jeu_id_type_jeu' => 1,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Heroes of the Storm',
            'type_jeu_id_type_jeu' => 5,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'League of Legends',
            'type_jeu_id_type_jeu' => 5,
        ]);
        DB::table('jeu')->insert([
            'nom' => 'Counter Strike',
            'type_jeu_id_type_jeu' => 3,
        ]);
    }
}

