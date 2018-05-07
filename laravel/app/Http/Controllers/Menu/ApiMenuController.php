<?php

namespace App\Http\Controllers\Menu;

use App\Nourriture;
use App\Boisson;
use App\Menu;
use App\CategorieNourriture;
use App\CategorieBoisson;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ApiMenuController extends Controller{

    public function getMenu(Request $request){
        $nourritures = Nourriture::all();
        $boissons = Boisson::all();
        $catBoisson = CategorieBoisson::all();
        $catNourriture = CategorieNourriture::all();
        /*$categorie = CategorieNourriture::join('categorie_nourriture', 'categorie_nourriture_id_categorie_nourriture', 'id');
		$menu = new Menu();
        $menu->boissons = $boissons;
        $menu->nourritures = $nourritures;
        $menu->categorieBoisson = $catBoisson;
        $menu->categorieNourriture = $catNourriture;*/

        /*$menu = DB::table('boisson')
                ->join('categorie_boisson', 'id_categorie_boisson', '=', 'categorie_boisson_id_categorie_boisson')
                ->select('boisson.nom AS boisson_nom', 'categorie_boisson.nom AS categorie_nom')
                ->groupBy('categorie_nom', 'boisson_nom')
                ->get();*/
        $menu = null;
        $categories = DB::table('categorie_boisson')
                ->select('nom', 'id_categorie_boisson')
                ->orderby('id_categorie_boisson')
                ->get();

        for($index=0; $index<count($categories); $index++){
            $menu = DB::table('boisson')
                    ->select('nom', 'prix')
                    ->where('categorie_boisson_id_categorie_boisson', '=', $index+1)
                    ->get();
        }
        return response()->json(new JsonResponse(true, $menu, 'Liste de la nourritures chargées'));
    }
}