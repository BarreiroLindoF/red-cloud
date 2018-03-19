<?php

use Illuminate\Database\Seeder;

class NourritureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nourriture')->insert([
            'nom' => 'Margherita',
            'prix' => 10,
            'categorie_nourriture_id_categorie_nourriture' => 2
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Piquante',
            'prix' => 13,
            'categorie_nourriture_id_categorie_nourriture' => 2
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Calzone',
            'prix' => 13,
            'categorie_nourriture_id_categorie_nourriture' => 2
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Hawai',
            'prix' => 17,
            'categorie_nourriture_id_categorie_nourriture' => 2
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Cheese Burger',
            'prix' => 4,
            'categorie_nourriture_id_categorie_nourriture' => 1
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Raclette Royal Burger',
            'prix' => 7,
            'categorie_nourriture_id_categorie_nourriture' => 1
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Big USA Fucking Burger',
            'prix' => 1,
            'categorie_nourriture_id_categorie_nourriture' => 1
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Nutella',
            'prix' => 3,
            'categorie_nourriture_id_categorie_nourriture' => 3
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Sucre',
            'prix' => 2,
            'categorie_nourriture_id_categorie_nourriture' => 3
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Caramel',
            'prix' => 3,
            'categorie_nourriture_id_categorie_nourriture' => 3
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Sucre + Nutella + Caramel + Chantilly',
            'prix' => 5,
            'categorie_nourriture_id_categorie_nourriture' => 3
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Mars',
            'prix' => 1,
            'categorie_nourriture_id_categorie_nourriture' => 4
        ]);
        DB::table('nourriture')->insert([
            'nom' => 'Bounty',
            'prix' => 1,
            'categorie_nourriture_id_categorie_nourriture' => 4
        ]);
    }
}
