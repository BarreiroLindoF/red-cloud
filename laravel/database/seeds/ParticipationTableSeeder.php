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
            'tournoi_id_tournoi' => 11,
            'user_id_user' => 1,
            'nom_equipe' => 'Heg & co, c\'est la victoire à gogo !',
            'statut_id_statut' => 1,
        ]);

        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 2,
            'user_id_user' => 1,
            'nom_equipe' => 'La revanche rebelle',
            'statut_id_statut' => 1,
        ]);

        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 1,
            'nom_equipe' => 'Black & White',
            'statut_id_statut' => 1
        ]);
        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 2,
            'nom_equipe' => 'No weaknesses',
            'statut_id_statut' => 1,
        ]);
    }
}
