<?php

namespace App\Http\Controllers\Menu;

use App\Nourriture;
use App\Boisson;
use App\Menu;
use App\CategorieNourriture;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiMenuController extends Controller{

    public function getMenu(Request $request){
        $nourritures = Nourriture::all();
        $boissons = Boisson::all();
		$menu = new Menu();
        $menu->boissons = $boissons;
        $menu->nourritures = $nourritures;
        return response()->json(new JsonResponse(true, $menu, 'Liste de la nourritures chargées'));
    }

    public function getCategorie(Request $request){
        $idCat = $request->input('idCat');
        $categorie = CategorieNourriture::find($idCat);
        return response()->json(new JsonResponse(true, $categorie, null));
    }
}