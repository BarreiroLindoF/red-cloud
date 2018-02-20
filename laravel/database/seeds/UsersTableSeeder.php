<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'nom' => 'Barreiro',
            'prenom' => 'Lindo',
            'pseudo' => 'Flavio',
            'ville' => 'Geneve',
            'npa' => '1234',
            'datenaissance' => '12.12.12',
            'email' => 'flavio_slb4@hotmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
