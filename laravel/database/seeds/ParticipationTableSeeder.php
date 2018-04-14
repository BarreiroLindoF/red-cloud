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
            'nom_equipe' => 'Heg & co',
        ]);

        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 2,
            'user_id_user' => 1,
            'nom_equipe' => 'La revanche rebelle',
        ]);

        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 1,
            'nom_equipe' => 'Black & White',
        ]);
        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 2,
            'nom_equipe' => 'No weaknesses',
        ]);
        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 3,
            'nom_equipe' => 'Black Power',
        ]);
        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 4,
            'nom_equipe' => 'One shot',
        ]);
        DB::table('participation')->insert([
            'date_inscription' => \Carbon\Carbon::now(),
            'tournoi_id_tournoi' => 12,
            'user_id_user' => 5,
            'nom_equipe' => 'No scope team',
        ]);
    }
}
