<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participation', function (Blueprint $table) {
            $table->increments('id_participation');
            $table->dateTime('date_inscription');
            $table->string('nom_equipe');
            $table->integer('tournoi_id_tournoi')->unsigned();
            $table->integer('user_id_user')->unsigned();
            $table->foreign('tournoi_id_tournoi')->references('id_tournoi')->on('tournoi');
            $table->foreign('user_id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('participation');
    }
}
