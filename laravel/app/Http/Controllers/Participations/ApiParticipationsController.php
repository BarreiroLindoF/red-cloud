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

    public function removeParticipation(Request $request) {
        $id_tournoi = $request->id;

        // Toutes les participations en lien avec ce tournoi
        $participations = Participation::where('tournoi_id_tournoi', $id_tournoi)->where('statut_id_statut', 1)->get();

        $user = \JWTAuth::parseToken()->authenticate();

        $participationUser = null;
        foreach ($participations as $participation) {
            if ($participation->getAttribute('user_id_user') == $user->id) {
                $participationUser = $participation;
                break;
            }
        }
        if ($participationUser === null) {
            return response()->json(new JsonResponse(false, "Vous n'êtes pas inscrit à ce tournoi !" , null));
        }

        $participationUser->setAttribute('statut_id_statut', 4);
        $participationUser->save();
        return response()->json(new JsonResponse(true, 'Inscription supprimée !' , null));
    }
}
