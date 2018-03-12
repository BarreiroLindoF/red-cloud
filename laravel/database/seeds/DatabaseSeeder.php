<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(EventSeeder::class);
        $this->call(TypeJeuTableSeeder::class);
        $this->call(JeuTableSeeder::class);
        $this->call(TypeEquipeTableSeeder::class);
        $this->call(EquipeTableSeeder::class);
        $this->call(TypeTournoiTableSeeder::class);
        $this->call(TournoiTableSeeder::class);
        $this->call(UserEquipeSeeder::class);

    }
}
