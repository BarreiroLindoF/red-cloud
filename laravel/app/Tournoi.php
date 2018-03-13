<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournoi extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tournoi';
    protected $primaryKey = 'id_tournoi';

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
    protected $fillable = ['titre', 'description', 'participants_max', 'event_id_event','jeu_id_jeu','type_tournoi_id_type_tournoi'];}
