<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{

    public static $pathToCsvFile = '\csv-files\sql-pays.csv';
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pays';
    protected $primaryKey = 'id_pays';

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
        'nom_pays'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

}
