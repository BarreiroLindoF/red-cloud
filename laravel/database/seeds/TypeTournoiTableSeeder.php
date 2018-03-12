<?php

use Illuminate\Database\Seeder;

class TypeTournoiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('type_tournoi')->insert([
            'designation' => 'Individuel',
        ]);
        DB::table('type_tournoi')->insert([
            'designation' => 'En équipe',
        ]);
    }
}
