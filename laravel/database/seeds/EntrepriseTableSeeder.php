<?php

use Illuminate\Database\Seeder;

class EntrepriseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('entreprise')->insert([
            'telephone' => '+41796493240',
            'telephone_format' => '+41 79 649 32 40',
            'email' => 'redcloud@redcloud.com',
            'site_web' => 'http://redcloud.com',
            'adresse' => 'Avenue de Châtelaine 95B 1219 Châtelaine',
            'adresse_latitude' => '46.210924679116914',
            'adresse_longitude' => '6.108729515582613',
        ]);
    }
}
