<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategorieBoisson extends Model {
    protected $table = 'categorie_boisson';
    protected $primaryKey = 'id_categorie_boisson';

    public function boissons(){
        return $this->hasMany('App\Boisson');
    }
}