<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJeuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jeu', function (Blueprint $table) {
            $table->increments('id_jeu');
            $table->string('nom_jeu');
            $table->integer('type_jeu')->unsigned();
            $table->foreign('type_jeu')->references('id_type_jeu')->on('typeJeu');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jeu', function (Blueprint $table) {
            Schema::dropIfExists('jeu');
        });
    }
}
