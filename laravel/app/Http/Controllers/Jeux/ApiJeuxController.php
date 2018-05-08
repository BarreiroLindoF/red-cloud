<?php

namespace App\Http\Controllers\Jeux;

use App\Http\Controllers\JsonResponse;
use App\Jeu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiJeuxController extends Controller
{
    public function getJeux(Request $request) {
        $jeux = \DB::table('jeu')
            ->join('type_jeu', 'id_type_jeu', '=', 'type_jeu_id_type_jeu')
            ->select('id_jeu', 'nom', 'designation')
            ->get();
        return response()->json(new JsonResponse(true, $jeux , null));
    }

}
