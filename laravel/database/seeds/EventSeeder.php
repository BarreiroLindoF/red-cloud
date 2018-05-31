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
            'titre' => 'Evenement FPS!',
            'description' => 'Voici le retour de l\'évènement hebdomadaire qui regroupe plusieurs tournois de FPS. Notamment Counter-Strike, Halo 5 et bien d\'autres ! ',
            'imageUri' => 'fps.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(7),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement Course!',
            'description' => 'Tous a vos manettes ! Le tournoi de jeux de course ouvre ses portes. Tous sur la ligne de depart, a vos marques, prêt, partez!',
            'imageUri' => 'course.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(14),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement MMORPG!',
            'description' => 'Le plus évènement MMORPG à Genève ouvre ses portes, alors n\'attendez plus et venez vous y inscrire !',
            'imageUri' => 'mmorpg.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(17),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);

        DB::table('event')->insert([
            'titre' => 'Evenement COMBAT !',
            'description' => 'Qui n\'a jamais rêvé de pouvoir combattre ses potes dans un jeu vidéo et en plus de pouvoir remporter un prix ? C\'etait une question rhétorique, venez au plus vite vous inscrire à cet évènement et prouvez votre force !',
            'imageUri' => 'kombat.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(19),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);

        DB::table('event')->insert([
            'titre' => 'Evenement MOBA !',
            'description' => 'Toi aussi tu penses que tu es le meilleur à ton MOBA favori ? Alors n\'attends plus et viens vite t\'inscrire à un des tournois de cet évènement !',
            'imageUri' => 'moba.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(25),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement MULTI-GAME !',
            'description' => 'Si tu en as marre des évènements qui ne proposent qu\'un seul type de jeu, alors tu es au bon endroit ! Viens voir la liste des tournois que nous te proposons ci-dessous...',
            'imageUri' => 'multi_game.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(40),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);
        DB::table('event')->insert([
            'titre' => 'Evenement Foot !',
            'description' => 'Tu es fort au foot, mais l\'es encore plus dans les jeux video ? N\'hésite plus et viens t\'inscrire !',
            'imageUri' => 'foot.jpg',
            'dateHeureDebut' => \Carbon\Carbon::now()->addDays(40),
            'page_twitter_url'=>'https://twitter.com/BarriereEsport',
            'page_facebook_url'=>'https://www.facebook.com/esporteventsDACH/',
            'page_youtube_url'=>'https://www.youtube.com/user/LoLeventVoDs',
            'page_twitch_url'=>'https://www.twitch.tv/esportevents',
            'msg_partage'=>'',
            'lienEvenementExterne' => null
        ]);
    }
}
