<?php

namespace App\Http\Controllers\Menu;

use App\Offre;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiOffresController extends Controller{

    public function getOffres(Request $request){
        $offre = new Offre();
        $nourritures = $offre->nourritures()->filter(function($nourriture){
            return $nourriture->getAttribute('nom');
        })->values();
        return response()->json(new JsonResponse(true, $nourritures, 'Liste de la nourritures chargées'));
    }
}