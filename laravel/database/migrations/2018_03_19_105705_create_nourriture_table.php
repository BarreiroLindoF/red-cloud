<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNourritureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nourriture', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom');
            $table->integer('prix');
            $table->integer('categorie_nourriture_id_categorie_nourriture')->unsigned();
            $table->foreign('categorie_nourriture_id_categorie_nourriture')->references('id_categorie_nourriture')->on('categorie_nourriture');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nourriture');
    }
}
