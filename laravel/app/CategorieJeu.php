<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategorieJeu extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'type_jeu';
    protected $primaryKey = 'id_type_jeu';

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
    protected $fillable = ['designation'];

}
