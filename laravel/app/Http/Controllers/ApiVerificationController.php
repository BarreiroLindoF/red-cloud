<?php

namespace App\Http\Controllers;

use App\Participation;
use App\User;
use Illuminate\Http\Request;

class ApiVerificationController extends Controller
{
    public function checkUserExist (Request $request) {
        $emailRequest = $request->input('email');
        $pseudoRequest = $request->input('pseudo');
        $email = User::where('email', $emailRequest)->first();
        $pseudo = User::where('pseudo',$pseudoRequest)->first();
        if ($email == null) {
              if ($pseudo == null) {
                  return response()->json(new JsonResponse(false, null, 'Cet email ou utilisateur n\'existe pas !'));
              } else {
                  return response()->json(new JsonResponse(true, $pseudo, 'Ce pseudo existe déjà, merci de bien vouloir le changer.'));
              }
        }
        if ($pseudo == null){
            return response()->json(new JsonResponse(true, $email, 'Cet email existe déjà, merci de bien vouloir le changer.'));
        } else {
            return response()->json(new JsonResponse(true, $email, 'Cet email et ce pseudo existent déjà, merci de bien vouloir les changer.'));
        }
    }

    public function checkTeamExist (Request $request)
    {
        $idTournoi = $request->id;
        $participations = Participation::where('tournoi_id_tournoi', $idTournoi)->where('statut_id_statut', 1 )->get();
        foreach ($participations as $participation) {
            if ($participation->getAttribute('nom_equipe') == $request->input('nom_equipe')) {
                return response()->json(new JsonResponse(false, null, 'Cette équipe existe déjà, merci de bien vouloir la changer.'));
            }
        }
        return response()->json(new JsonResponse(true, null, 'Valide!'));

    }
}
