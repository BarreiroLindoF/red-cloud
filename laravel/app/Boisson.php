<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Boisson extends Model
{
    protected $table = 'boisson';
    protected $primaryKey = 'id_boisson';

    protected $fillable = ['nom', 'prix', 'categorie_nourriture_id_categorie_nourriture'];

    public function offres(){
        return $this->belongsToMany('App\Offre', 'boissons_offres', 'boisson_id_boisson', 'offre_id_offre');
    }
}
