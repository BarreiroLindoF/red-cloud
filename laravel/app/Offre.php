<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    protected $table = 'offre';
    protected $primaryKey = 'id_offre';

    protected $fillable = ['description', 'prix', 'date_debut', 'date_expiration'];

    public function nourritures(){
        return $this->belongsToMany('App\Nourriture', 'nourritures_offres', 'offre_id_offre', 'nourriture_id_nourriture');
    }

    public function boissons(){
        return $this->belongsToMany('App\Nourriture', 'boissons_offres', 'offre_id_offre', 'boisson_id_boisson');
    }
}
