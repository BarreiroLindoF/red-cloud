<?php

/**
    N'EST PLUS FONCTIONNEL
 */
namespace App\Http\Controllers\Equipes;

use App\Equipe;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiEquipesController extends Controller
{
    public function getEquipes(Request $request) {
        $user = \JWTAuth::parseToken()->authenticate();
        $equipes = $user->equipes->filter(function ($equipe) {
            return $equipe->getAttribute('type_equipe') == 2;
        })->values();
        return response()->json(new JsonResponse(true, $equipes , null));
    }

    public function addEquipe(Request $request) {
        if (Equipe::where('nom_equipe', $request->input('nom_equipe'))->first() !== null) {
            return response()->json(new JsonResponse(false, null , 'Ce nom d\'équipe existe déjà!'));
        }
        $user = \JWTAuth::parseToken()->authenticate();
        $equipe = new Equipe();
        $equipe->setAttribute('nom_equipe', $request->input('nom_equipe'));
        $equipe->setAttribute('type_equipe', 2);
        $equipe->save();
        $equipe->users()->attach($user->getAttribute('id'));
        return response()->json(new JsonResponse(true, $equipe , 'Équipe crée avec succès!'));
    }

}
