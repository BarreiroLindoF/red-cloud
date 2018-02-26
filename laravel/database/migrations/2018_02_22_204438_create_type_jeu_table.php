<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeJeuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('typeJeu', function (Blueprint $table) {
            $table->increments('id_type_jeu');
            $table->string('designation_type_jeu');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('typeJeu', function (Blueprint $table) {

        });
    }
}
