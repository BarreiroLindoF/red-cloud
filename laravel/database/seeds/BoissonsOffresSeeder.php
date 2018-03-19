<?php

use Illuminate\Database\Seeder;

class BoissonsOffresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('boissons_offres')->insert([
            'offre_id_offre' => 3,
            'boisson_id_boisson' => 9
        ]);
        DB::table('boissons_offres')->insert([
            'offre_id_offre' => 3,
            'boisson_id_boisson' => 10
        ]);
        DB::table('boissons_offres')->insert([
            'offre_id_offre' => 1,
            'boisson_id_boisson' => 8
        ]);
        DB::table('boissons_offres')->insert([
            'offre_id_offre' => 1,
            'boisson_id_boisson' => 8
        ]);
        DB::table('boissons_offres')->insert([
            'offre_id_offre' => 2,
            'boisson_id_boisson' => 8
        ]);
        DB::table('boissons_offres')->insert([
            'offre_id_offre' => 2,
            'boisson_id_boisson' => 8
        ]);
    }
}
