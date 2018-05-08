<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event', function (Blueprint $table) {
            $table->increments('id_event');
            $table->string('titre');
            $table->longText('description');
            $table->string('imageUri');
            $table->dateTime('dateHeureDebut');
            $table->string('page_twitter_url');
            $table->string('page_facebook_url');
            $table->string('page_youtube_url');
            $table->string('page_twitch_url');
            $table->string('msg_partage');
            $table->string('lienEvenementExterne')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event');
    }
}
