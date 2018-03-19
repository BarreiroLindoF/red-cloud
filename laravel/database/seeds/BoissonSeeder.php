<?php

use Illuminate\Database\Seeder;

class BoissonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('boisson')->insert([
            'nom' => 'Coca-Cola',
            'prix' => 3,
            'categorie_boisson_id_categorie_boisson' => 2
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Coca-Cola Light',
            'prix' => 3,
            'categorie_boisson_id_categorie_boisson' => 2
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Coca-Cola Zero',
            'prix' => 3,
            'categorie_boisson_id_categorie_boisson' => 2
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Ice-Tea Pêche',
            'prix' => 3,
            'categorie_boisson_id_categorie_boisson' => 2
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Ice-Tea Citron',
            'prix' => 3,
            'categorie_boisson_id_categorie_boisson' => 2
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Cappuccino',
            'prix' => 4,
            'categorie_boisson_id_categorie_boisson' => 3
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Thé cannelle',
            'prix' => 2,
            'categorie_boisson_id_categorie_boisson' => 3
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Bière Blonde',
            'prix' => 5,
            'categorie_boisson_id_categorie_boisson' => 1
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Bière Brune',
            'prix' => 5,
            'categorie_boisson_id_categorie_boisson' => 1
        ]);
        DB::table('boisson')->insert([
            'nom' => 'Vodka Red-Bull',
            'prix' => 10,
            'categorie_boisson_id_categorie_boisson' => 1
        ]);
    }
}
