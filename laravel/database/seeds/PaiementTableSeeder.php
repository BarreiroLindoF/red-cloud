<?php

use Illuminate\Database\Seeder;

class PaiementTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('paiement')->insert([
            'nom_carte' => 'Flavio',
            'no_carte' => 1000000000,
            'date_expiration' => \Carbon\Carbon::today(),
            'participation_id_participation' => 1,
            'pays_id_pays' => 1
        ]);
    }
}
