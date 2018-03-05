<?php

use Illuminate\Database\Seeder;

class TypeEquipeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('typeEquipe')->insert([
            'designation_type_equipe' => 'Simple',
        ]);

        DB::table('typeEquipe')->insert([
            'designation_type_equipe' => 'Multiple',
        ]);
    }
}
