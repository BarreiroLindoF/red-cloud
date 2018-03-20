<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'participation';
    protected $primaryKey = 'id_participation';

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
    protected $fillable = [
        'date_inscription', 'tournoi_id_tournoi', 'user_id_user', 'nom_equipe'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

}
