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
            'datenaissance' => '12.12.1994',
            'email' => 'flavio_slb4@hotmail.com',
            'password' => bcrypt('password'),
        ]);
        DB::table('users')->insert([
            'nom' => 'Magnin',
            'prenom' => 'Michel',
            'pseudo' => 'Michou',
            'ville' => 'Genève',
            'npa' => '1234',
            'datenaissance' => '12.12.1992',
            'email' => 'michou@hotmail.com',
            'password' => bcrypt('password'),
        ]);
        DB::table('users')->insert([
            'nom' => 'Blaricaud',
            'prenom' => 'Pharell',
            'pseudo' => 'BoaBobby',
            'ville' => 'Geneve',
            'npa' => '1234',
            'datenaissance' => '12.12.1991',
            'email' => 'BBBoby@hotmail.com',
            'password' => bcrypt('password'),
        ]);
        DB::table('users')->insert([
            'nom' => 'Feirreira',
            'prenom' => 'Cunégonde',
            'pseudo' => 'FeiNezGonde',
            'ville' => 'Geneve',
            'npa' => '1234',
            'datenaissance' => '12.12.1994',
            'email' => 'Fait-Nez@hotmail.com',
            'password' => bcrypt('password'),
        ]);
        DB::table('users')->insert([
            'nom' => 'Marouane',
            'prenom' => 'Jean-philipe',
            'pseudo' => 'JOBOY',
            'ville' => 'Geneve',
            'npa' => '1234',
            'datenaissance' => '12.12.1994',
            'email' => 'Philou_1212@hotmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
