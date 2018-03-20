<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use App\Participation;
use App\Tournoi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiTournamentController extends Controller
{
    //
    public function getTournois(Request $request) {
        $idEvent = $request->id;
        $tournaments = Tournoi::select('*')->where('event_id_event',$idEvent)->get();

        foreach ($tournaments as $tournament) {
            $tournament->setAttribute('imageUri', $request->root() . $tournament->pathToImages . $tournament->getAttribute('imageUri'));
        }

        return response()->json(new JsonResponse(true, $tournaments , null));
    }

    public function getTournoisRules(Request $request) {
        $idTournoi = $request->id;
        $tournoi = Tournoi::find($idTournoi);
        if ($tournoi === null) {
            return response()->json(new JsonResponse(false, null, 'Ce tournoi n\'existe pas'));
        }
        $path = public_path() . $tournoi->pathToRules . $tournoi->getAttribute('reglementUri');
        return response()->download($path, $tournoi->getAttribute('reglementUri'));
    }

    public function addParticipation(Request $request) {
        $id_tournoi = $request->id;
        $tournoi = Tournoi::find($id_tournoi);

        // Toutes les participations en lien avec ce tournoi
        $participations = Participation::where('tournoi_id_tournoi', $id_tournoi)->get();

        if ($tournoi->getAttribute('participants_max') <= $participations->count()) {
            return response()->json(new JsonResponse(false, null, 'Nous avons atteint de nombre maximale de joueurs!'));
        }
        $user = \JWTAuth::parseToken()->authenticate();
        foreach ($participations as $participation) {
            if ($participation->getAttribute('user_id_user') == $user->id) {
                return response()->json(new JsonResponse(false, null, 'Vous êtes déjà inscrit à ce tournoi!'));
            }
        }
        if (!$this->paymentOk($request)) {
            return response()->json(new JsonResponse(false, null, 'Problèmes lors du paiement. Veuillez contacter votre banque!'));
        }
        // user has paid and can subscribe
        

        $participation = new Participation();
        $participation->setAttribute('date_inscription', Carbon::now());
        $participation->setAttribute('nom_equipe', $request->input('nom_equipe'));
        $participation->setAttribute('tournoi_id_tournoi', $id_tournoi);
        $participation->setAttribute('user_id_user', 1);
        $participation->save();
        return response()->json(new JsonResponse(true, $participation, null));

        /*$tournoi = Tournoi::find($idTournoi);
        if ($tournoi === null) {
            return response()->json(new JsonResponse(false, null, 'Ce tournoi n\'existe pas'));
        }
        $path = public_path() . $tournoi->pathToRules . $tournoi->getAttribute('reglementUri');*/
        //return response()->download($path, $tournoi->getAttribute('reglementUri'));
    }

    private function paymentOk($request) {

    }
}
