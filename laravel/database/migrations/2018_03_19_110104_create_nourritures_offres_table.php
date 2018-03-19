s<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNourrituresOffresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nourritures_offres', function (Blueprint $table) {
            $table->integer('offre_id_offre')->unsigned();
            $table->foreign('offre_id_offre')->references('id_offre')->on('offre');
            $table->integer('nourriture_id_nourriture')->unsigned();
            $table->foreign('nourriture_id_nourriture')->references('id_nourriture')->on('nourriture');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nourritures_offres');
    }
}
