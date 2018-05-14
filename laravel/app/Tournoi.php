<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournoi extends Model
{
    public static $pathToImages = '/images/tournaments/';
    public $pathToRules = '/documents/rules/tournaments/';
    public $msg_partage_tournoi_part1 = 'Vous aussi, venez participer au tout nouveau tournoi : ';
    public $msg_partage_tournoi_part2='. Tout ceci est possible dans le Bar E-Sport RedCloud à Genève. Cliquez ici et inscrivez-vous, c\'est aussi simple que cela.';
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
    protected $fillable = ['titre', 'description', 'reglementUri', 'prix_inscription', 'participants_max','heureDebut', 'event_id_event','jeu_id_jeu','type_tournoi_id_type_tournoi'];}
