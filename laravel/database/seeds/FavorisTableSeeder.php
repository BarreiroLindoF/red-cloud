<?php

use Illuminate\Database\Seeder;

class FavorisTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('favoris')->insert([
            'user_id_user' => 1,
            'jeu_id_jeu' => 1
        ]);
        DB::table('favoris')->insert([
            'user_id_user' => 1,
            'jeu_id_jeu' => 4
        ]);
        DB::table('favoris')->insert([
            'user_id_user' => 1,
            'jeu_id_jeu' => 7
        ]);
    }
}
