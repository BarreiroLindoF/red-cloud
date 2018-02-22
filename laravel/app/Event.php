<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public $pathToImages = '/images/events/';
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
    protected $fillable = ['titre', 'description', 'imageUri', 'date'];

}
