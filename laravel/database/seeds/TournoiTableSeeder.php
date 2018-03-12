<?php

use Illuminate\Database\Seeder;

class TournoiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tournoi')->insert([
            'titre' => 'Guerre du pouvoir',
            'description' => 'La plus grande guerre prévue en terre dn\'Azeroth',
            'participants_max' => 200,
            'event_id_event' => 4,
            'jeu_id_jeu' => 1,
            'type_tournoi_id_type_tournoi' => 2,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Coupe Etoile Arc-En-Ciel',
            'description' => 'Prépare toi pour la course la plus difficile de Mario Kart',
            'participants_max' => 12,
            'event_id_event' => 2,
            'jeu_id_jeu' => 2,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'UE vs US',
            'description' => 'Combat pour mettre fin à ln\'oppression américaine !',
            'participants_max' => 50,
            'event_id_event' => 1,
            'jeu_id_jeu' => 11,
            'type_tournoi_id_type_tournoi' => 2,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Liberation de Genève',
            'description' => 'Met fin à la monarchie française en pleine ville de Genève',
            'participants_max' => 50,
            'event_id_event' => 7,
            'jeu_id_jeu' => 6,
            'type_tournoi_id_type_tournoi' => 2,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Oeuf de Pâques',
            'description' => 'Récolte le plus dn\'oeufs de Pâques pour gagner la récompense ultime !',
            'participants_max' => 20,
            'event_id_event' => 5,
            'jeu_id_jeu' => 3,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
    }
}
