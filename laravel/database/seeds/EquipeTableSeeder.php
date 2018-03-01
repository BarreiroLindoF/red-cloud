<?php

use Illuminate\Database\Seeder;

class EquipeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('equipe')->insert([
            'nom_equipe'    =>  'IG Gaming',
            'type_equipe'   =>  2
        ]);

        DB::table('equipe')->insert([
            'nom_equipe'    =>  'ID Gaming',
            'type_equipe'   =>  2
        ]);

        DB::table('equipe')->insert([
            'nom_equipe'    =>  'EE Gaming',
            'type_equipe'   =>  2
        ]);

        DB::table('equipe')->insert([
            'nom_equipe'    =>  'Mina',
            'type_equipe'   =>  1
        ]);

        DB::table('equipe')->insert([
            'nom_equipe'    =>  'Marada',
            'type_equipe'   =>  1
        ]);

        DB::table('equipe')->insert([
            'nom_equipe'    =>  'Fateloch',
            'type_equipe'   =>  1
        ]);
    }
}
