<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTournoisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tournois', function (Blueprint $table) {
            $table->increments('id_tournois');
			$table->string('titre');
			$table->string('description');
			$table->integer('participants_max');
			$table->foreign('event_id_event')->references('id_event')->on('event');
			$table->foreign('jeu_id_jeu')->references('id_jeu')->on('jeu');
			$table->foreign('type_tounoi_id_type_tournoi')->references('id_type_tournoi')->on('type_tournoi');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tournois');
    }
}
