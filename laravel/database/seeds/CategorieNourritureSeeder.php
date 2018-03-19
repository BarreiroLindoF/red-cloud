<?php

use Illuminate\Database\Seeder;

class CategorieNourritureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categorie_nourriture')->insert([
            'nom'   =>  'Burgers'
        ]);
        DB::table('categorie_nourriture')->insert([
            'nom'   =>  'Pizzas'
        ]);
        DB::table('categorie_nourriture')->insert([
            'nom'   =>  'Crêpes'
        ]);
        DB::table('categorie_nourriture')->insert([
            'nom'   =>  'Snacks'
        ]);
    }
}
