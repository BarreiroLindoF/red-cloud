<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTournoiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tournoi', function (Blueprint $table) {
            $table->increments('id_tournoi');
            $table->string('titre');
            $table->string('imageUri');
            $table->string('description', 2000);
            $table->string('reglementUri');
            $table->float('prix_inscription');
            $table->integer('participants_max');
            $table->time('heureDebut');
            $table->integer('event_id_event')->unsigned();
            $table->foreign('event_id_event')->references('id_event')->on('event');
            $table->integer('jeu_id_jeu')->unsigned();
            $table->foreign('jeu_id_jeu')->references('id_jeu')->on('jeu');
            $table->integer('type_tournoi_id_type_tournoi')->unsigned();
            $table->foreign('type_tournoi_id_type_tournoi')->references('id_type_tournoi')->on('type_tournoi');
            $table->string('page_twitter_url');
            $table->string('page_facebook_url');
            $table->string('page_youtube_url');
            $table->string('page_twitch_url');
            $table->string('msg_partage');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tournoi');
    }
}
