<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategorieNourriture extends Model {
    protected $table = 'categorie_nourriture';
    protected $primaryKey = 'id_categorie_nourriture';

    public function nourritures(){
        return $this->hasMany('App\Nourriture');
    }
}