<?php

use Illuminate\Database\Seeder;

class NourrituresOffresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nourritures_offres')->insert([
            'offre_id_offre' => 2,
            'nourriture_id_nourriture' => 1
        ]);
        DB::table('nourritures_offres')->insert([
            'offre_id_offre' => 2,
            'nourriture_id_nourriture' => 1
        ]);
        DB::table('nourritures_offres')->insert([
            'offre_id_offre' => 3,
            'nourriture_id_nourriture' => 7
        ]);
        DB::table('nourritures_offres')->insert([
            'offre_id_offre' => 1,
            'nourriture_id_nourriture' => 8
        ]);
        DB::table('nourritures_offres')->insert([
            'offre_id_offre' => 1,
            'nourriture_id_nourriture' => 8
        ]);
    }
}
