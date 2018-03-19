<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OffreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('offre')->insert([
            'prix' => 13,
            'description' => 'Lors de l\'achat de 2 bières et de 2 crêpes au Nutella, la 2e crêpe est offerte !',
            'date_debut' => Carbon::now(),
            'date_expiration' => Carbon::now()->addDays(5)
        ]);
        DB::table('offre')->insert([
            'prix' => 20,
            'description' => 'Ta copine est Geekette ? Tu ne sais pas où aller manger ce soir ? 2 Margherita + 2 Bière blonde pour CHF 20 au lieu de CHF 30 !',
            'date_debut' => Carbon::now(),
            'date_expiration' => Carbon::now()->addDays(2)
        ]);
        DB::table('offre')->insert([
            'prix' => 10,
            'description' => 'Idéal pour ce mettre une petite mine, tout en ayant un bon plat américan dans le ventre !',
            'date_debut' => Carbon::now(),
            'date_expiration' => Carbon::now()->addDays(7)
        ]);

    }
}
