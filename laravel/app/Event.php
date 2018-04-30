<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public $pathToImages = '/images/events/';
    public $msg_partage_event_part1 = 'Vous aussi, venez consulter les tout nouveaux tournois de l\'évènement : ';
    public $msg_partage_event_part2=' Tout ceci est possible dans le Bar E-Sport RedCloud à Genève. Cliquez ici, consulter la liste et inscrivez-vous, c\'est aussi simple que cela.';
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'event';
    protected $primaryKey = 'id_event';

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
    protected $fillable = ['titre', 'description', 'imageUri', 'dateHeureDebut'];

}
