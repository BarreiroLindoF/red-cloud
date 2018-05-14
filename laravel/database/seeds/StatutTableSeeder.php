<?php

use Illuminate\Database\Seeder;

class StatutTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statut')->insert([
            'designation' => 'Participation réservée - non payée',
        ]);
        DB::table('statut')->insert([
            'designation' => 'Participation payée et inscription validée',
        ]);
        DB::table('statut')->insert([
            'designation' => 'Paiement refusé par la banque',
        ]);
        DB::table('statut')->insert([
            'designation' => 'Participation annulée - remboursement en attente',
        ]);
        DB::table('statut')->insert([
            'designation' => 'Participation annulée - remboursement effectué',
        ]);
    }
}
