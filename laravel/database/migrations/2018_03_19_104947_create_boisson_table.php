<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBoissonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boisson', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom');
            $table->integer('prix');
            $table->integer('categorie_boisson_id_categorie_boisson')->unsigned();
            $table->foreign('categorie_boisson_id_categorie_boisson')->references('id_categorie_boisson')->on('categorie_boisson');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boisson');
    }
}
