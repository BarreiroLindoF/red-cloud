<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'entreprise';
    protected $primaryKey = 'id';

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
    protected $fillable = ['telephone', 'telephone_format', 'email', 'site_web', 'adresse','adresse_latitude', 'adresse_longitude'];}
