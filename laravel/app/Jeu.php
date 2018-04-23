<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jeu extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'jeu';
    protected $primaryKey = 'id_jeu';

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
    protected $fillable = ['nom', 'type_jeu_id_type_jeu'];

}
