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
            'description' => 'La plus grande guerre prévue en terre d\'Azeroth',
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
            'titre' => 'Oeuf de Pâques',
            'description' => 'Récolte le plus dn\'oeufs de Pâques pour gagner la récompense ultime !',
            'participants_max' => 20,
            'event_id_event' => 5,
            'jeu_id_jeu' => 3,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Libère ton talent dans PUBG !',
            'description' => 'Descripion Description blablabla !',
            'participants_max' => 50,
            'event_id_event' => 6,
            'jeu_id_jeu' => 4,
            'type_tournoi_id_type_tournoi' => 2,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'FiFa',
            'description' => 'Récolte le plus dn\'oeufs de Pâques pour gagner la récompense ultime !',
            'participants_max' => 20,
            'event_id_event' => 8,
            'jeu_id_jeu' => 5,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi BattleField 1',
            'description' => 'Descripion Description blablabla !',
            'participants_max' => 20,
            'event_id_event' => 7,
            'jeu_id_jeu' => 6,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi Halo 5',
            'description' => 'Descripion Description blablabla !',
            'participants_max' => 20,
            'event_id_event' => 10,
            'jeu_id_jeu' => 7,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi Fortnite',
            'description' => 'Descripion Description blablabla !',
            'participants_max' => 20,
            'event_id_event' => 9,
            'jeu_id_jeu' => 8,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Heroes of the Storm',
            'description' => 'Descripion Description blablabla !',
            'participants_max' => 20,
            'event_id_event' => 12,
            'jeu_id_jeu' => 9,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi de LOL',
            'description' => 'Récolte le plus dn\'oeufs de Pâques pour gagner la récompense ultime !',
            'participants_max' => 20,
            'event_id_event' => 11,
            'jeu_id_jeu' => 10,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
        DB::table('tournoi')->insert([
            'titre' => 'Tournoi CS',
            'description' => 'Récolte le plus dn\'oeufs de Pâques pour gagner la récompense ultime !',
            'participants_max' => 20,
            'event_id_event' => 1,
            'jeu_id_jeu' => 11,
            'type_tournoi_id_type_tournoi' => 1,
        ]);
    }
}
