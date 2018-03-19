<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserEquipe extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_equipe', function (Blueprint $table) {
            $table->integer('equipe_id_equipe')->unsigned();
            $table->foreign('equipe_id_equipe')->references('id_user')->on('user');
            $table->integer('user_id_user')->unsigned();
            $table->foreign('user_id_user')->references('id_equipe')->on('equipe');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_equipe');
    }
}
