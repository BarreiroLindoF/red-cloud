<?php

use Illuminate\Database\Seeder;

class CategorieBoissonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categorie_boisson')->insert([
            'nom'   =>  'Alcoolisées'
        ]);
        DB::table('categorie_boisson')->insert([
            'nom'   =>  'Non alcoolisées'
        ]);
        DB::table('categorie_boisson')->insert([
            'nom'   =>  'Boissons chaudes'
        ]);
    }
}
