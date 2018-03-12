<?php

namespace App\Http\Controllers\Equipes;

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

}
