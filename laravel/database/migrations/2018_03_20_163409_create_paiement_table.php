<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaiementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paiement', function (Blueprint $table) {
            $table->increments('id_paiement');
            $table->string('nom_carte');
            $table->integer('no_carte');
            $table->date('date_expiration');
            $table->integer('participation_id_participation')->unsigned();
            $table->integer('pays_id_pays')->unsigned();
            $table->foreign('participation_id_participation')->references('id_participation')->on('participation');
            //$table->foreign('pays_id_pays')->references('id_pays')->on('pays');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paiement');
    }
}
