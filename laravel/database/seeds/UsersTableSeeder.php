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
            'nom' => 'Utilisateur',
            'prenom' => 'Utilisateur',
            'pseudo' => 'User1',
            'ville' => 'Geneve',
            'npa' => '1234',
            'datenaissance' => '12.12.1994',
            'email' => 'test1@user.com',
            'password' => bcrypt('password1'),
            'notificationtoken' => null,
            'notification_offre' => 1,
        ]);
        DB::table('users')->insert([
            'nom' => 'Utilisateur',
            'prenom' => 'Utilisateur',
            'pseudo' => 'User2',
            'ville' => 'Geneve',
            'npa' => '1234',
            'datenaissance' => '12.12.1994',
            'email' => 'test2@user.com',
            'password' => bcrypt('password2'),
            'notificationtoken' => null,
            'notification_offre' => 1,
        ]);
    }
}
