<?php

use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event')->insert([
            'titre' => 'Enorme evenement CS!',
            'description' => 'L\'action des joueurs de Counter-Strike se deroule en plusieurs manches, ou rounds, d\'une duree par defaut de cinq minutes, sur une carte de jeu, ou map.',
            'imageUri' => 'cs.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evènement MarioKart sur Wii!',
            'description' => 'Tous a vos manettes de Wii ! Le tournoi de MarioKart ouvre ses portes. Tous sur la ligne de depart, a vos marques, pret, partez!',
            'imageUri' => 'marioKart.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement World of Warcraft !',
            'description' => 'Le plus grand tournoi de World of Warcraft ouvre ses portes, alors n\'attendez plus et venez vous y inscrire !',
            'imageUri' => 'wow.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);

        DB::table('event')->insert([
            'titre' => 'Evenement Dofus !',
            'description' => 'Qui n\'a jamais reve de pouvoir jouer a Dofus avec ses potes tout en sirotant une biere dans son bar favoris ? C\'etait une question rhetorique, venez au plus vite vous inscrire au tournoi Dofus !',
            'imageUri' => 'dofus.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);

        DB::table('event')->insert([
            'titre' => 'Evenement PUBG !',
            'description' => 'Qui n\'a jamais reve de pouvoir jouer a Pubg avec ses potes tout en sirotant une biere dans son bar favoris ? Inscrivez-vous au tournoi de Players Unknown\'s Battlegrounds !',
            'imageUri' => 'pubg.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement de Battlefield !',
            'description' => 'Qui n\'a jamais reve de pouvoir jouer a Battlefield avec ses potes tout en sirotant une biere dans son bar favoris ? C\'etait une question rhetorique, venez au plus vite vous inscrire au tournoi Battlefield !',
            'imageUri' => 'battlefield1.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement Fifa 2018 !',
            'description' => 'Venez nombreux vous inscrire au tournoi de Fifa 2018 et profitez des nouveautes du bar pour vous requinquer entre deux parties.',
            'imageUri' => 'fifa18.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement Fortnite !',
            'description' => 'Venez nombreux vous inscrire au tournoi de Fifa 2018 et profitez des nouveautes du bar pour vous requinquer entre deux parties. tournoi Dofus !',
            'imageUri' => 'fortnite.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement Halo 5',
            'description' => 'Le tournoi Halo 5 est enfin disponible dans notre bar et vous attend ! Nous vous attendons avec impatience.',
            'imageUri' => 'halo5.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement de LOL !',
            'description' => 'Le tournoi League of Legends est enfin disponible dans notre bar et vous attend ! Nous vous attendons avec impatience.',
            'imageUri' => 'leagueOfLegends.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement de Heroes of the Storm !',
            'description' => 'Le tout nouveau tournoi de Heroes of the Storm vient d\'ouvrir. Inscris ta team pour y participer et venir passer un bon moment dans notre bar ! Attention les places sont limitees.',
            'imageUri' => 'heroesOfTheStorm.jpg',
            'date' => \Carbon\Carbon::today(),
        ]);
    }
}
