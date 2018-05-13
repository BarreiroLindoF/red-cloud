<?php

namespace App\Http\Controllers\Participations;

use App\Participation;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiParticipationsController extends Controller
{
    public function getParticipants(Request $request) {
        $idTournoi = $request->id;
        $participants = Participation::select('user_id_user','nom_equipe')->where('tournoi_id_tournoi',$idTournoi)->where('statut_id_statut', 1)->get();
        return response()->json(new JsonResponse(true, $participants , null));
    }
}
