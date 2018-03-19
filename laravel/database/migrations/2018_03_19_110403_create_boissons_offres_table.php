<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBoissonsOffresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boissons_offres', function (Blueprint $table) {
            $table->integer('offre_id_offre')->unsigned();
            $table->foreign('offre_id_offre')->references('id_offre')->on('offre');
            $table->integer('boisson_id_boisson')->unsigned();
            $table->foreign('boisson_id_boisson')->references('id_boisson')->on('boisson');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boissons_offres');
    }
}
