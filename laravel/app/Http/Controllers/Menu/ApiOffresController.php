<?php

namespace App\Http\Controllers\Menu;

use App\Offre;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiOffresController extends Controller{

    public function getOffres(Request $request){
        $offres = Offre::all();
        foreach($offres as $offre){
            $offres->nourriture = $offre->nourritures;
            $offres->boisson = $offre->boissons;
        }
        return response()->json(new JsonResponse(true, $offres, 'Liste des offres a été chargées'));
    }

    public function getOffre(Request $request){
        $idOffre = $request->input('idOffre');
        $offre = Offre::find($idOffre);
        $offre->nourritures;
        $offre->boissons;
        return response()->json(new JsonResponse(true, $offre, 'Offre chargée'));
    }
}