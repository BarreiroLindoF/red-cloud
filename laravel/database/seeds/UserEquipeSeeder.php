<?php

use Illuminate\Database\Seeder;

class UserEquipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_equipe')->insert([
            'equipe_id_equipe' => 3,
            'user_id_user' => 1,
        ]);
        DB::table('user_equipe')->insert([
            'equipe_id_equipe' => 4,
            'user_id_user' => 1,
        ]);
        DB::table('user_equipe')->insert([
            'equipe_id_equipe' => 1,
            'user_id_user' => 1,
        ]);
    }
}
