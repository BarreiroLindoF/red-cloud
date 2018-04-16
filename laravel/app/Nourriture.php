<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nourriture extends Model
{
    protected $table = 'nourriture';
    protected $primaryKey = 'id';

    protected $fillable = ['nom', 'prix', 'categorie_nourriture_id_categorie_nourriture'];

    public function offres(){
        return $this->belongsToMany('App\Offre', 'nourritures_offres', 'nourriture_id_nourriture', 'offre_id_offre');
    }

    public function categorie(){
        return $this->hasOne('App\CategorieNourriture');
    }
}
