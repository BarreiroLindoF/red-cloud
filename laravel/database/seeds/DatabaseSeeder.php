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
        $this->call(TypeTournoiTableSeeder::class);
        $this->call(TournoiTableSeeder::class);
        $this->call(CategorieBoissonSeeder::class);
        $this->call(CategorieNourritureSeeder::class);
        $this->call(BoissonSeeder::class);
        $this->call(NourritureSeeder::class);
        $this->call(OffreSeeder::class);
        $this->call(BoissonsOffresSeeder::class);
        $this->call(NourrituresOffresSeeder::class);
        $this->call(StatutTableSeeder::class);
        $this->call(ParticipationTableSeeder::class);
        $this->call(FavorisTableSeeder::class);
        $this->call(EntrepriseTableSeeder::class);
    }
}
