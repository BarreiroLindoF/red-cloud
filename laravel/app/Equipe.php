<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'equipe';
    protected $primaryKey = 'id_equipe';

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
    protected $fillable = ['id_titre', 'nom_equipe', 'type_equipe'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'pivot', 'type_equipe'
    ];

    public function users() {
        return $this->belongsToMany('App\User', 'user_equipe',
            'equipe_id_equipe', 'user_id_user');
    }
}
