<?php

use Illuminate\Database\Seeder;

class ParticipationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 1,
            'user_id_user' => 1,
            'nom_equipe' => 'Equipe',
        ]);

        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 2,
            'user_id_user' => 1,
            'nom_equipe' => 'Equipe',
        ]);
    }
}
