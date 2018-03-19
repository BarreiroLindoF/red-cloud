<?php

namespace App\Http\Controllers\Menu;

use App\Nourriture;
use App\Boisson;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiMenuController extends Controller{

    public function getMenu(Request $request){
        $nourritures = Nourriture::all();
        $boissons = Boisson::all();
        $menu = array(
            'Boissons' => $boissons,
            'Nourritures' => $nourritures,
        );
        return response()->json(new JsonResponse(true, $menu, 'Liste de la nourritures chargées'));
    }
}