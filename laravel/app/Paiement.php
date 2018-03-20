<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'paiement';
    protected $primaryKey = 'id_paiement';

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
        'nom_carte', 'no_carte', 'date_expiration', 'participation_id_participation', 'pays_id_pays'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

}
