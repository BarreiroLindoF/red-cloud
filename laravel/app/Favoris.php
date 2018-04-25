<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favoris extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'favoris';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['jeu_id_jeu', 'user_id_user'];
}
