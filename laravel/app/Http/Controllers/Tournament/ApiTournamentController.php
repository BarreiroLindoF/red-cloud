<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use App\Paiement;
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
        $user = \JWTAuth::parseToken()->authenticate();

        foreach ($tournaments as $tournament) {
            $tournament->setAttribute('imageUri', $request->root() . $tournament->pathToImages . $tournament->getAttribute('imageUri'));
            $idTournament = $tournament->getAttribute('id_tournoi');
            $tournament->setAttribute('reglementUri',$request->root() . $tournament->pathToRules . $tournament->getAttribute('reglementUri'));
            $tournament->participants = Participation::where('tournoi_id_tournoi', $idTournament)->count();
            $participations = Participation::where('tournoi_id_tournoi', $idTournament)->get();
            $tournament->inscrit = false;
            foreach ($participations as $participation) {
                if ($participation->getAttribute('user_id_user') === $user->id) {
                    $tournament->inscrit = true;
                    break;
                }
            }
            $tournament->participants = $participations->count();
        }

        return response()->json(new JsonResponse(true, $tournaments , null));
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
        $participation->setAttribute('user_id_user', $user->id);
        $participation->save();

        $paiement = new Paiement();
        $paiement->setAttribute('nom_carte', $request->input('nom_carte'));
        $paiement->setAttribute('no_carte', $request->input('no_carte'));
        $date = new Carbon();
        $date->month($request->input('mois_carte'));
        $date->year($request->input('annee_carte'));
        $paiement->setAttribute('date_expiration', $date);
        $paiement->setAttribute('participation_id_participation', $participation->getAttribute('id_participation'));
        $paiement->setAttribute('pays_id_pays', 1);
        $paiement->save();
        return response()->json(new JsonResponse(true, $paiement, null));

        /*$tournoi = Tournoi::find($idTournoi);
        if ($tournoi === null) {
            return response()->json(new JsonResponse(false, null, 'Ce tournoi n\'existe pas'));
        }
        $path = public_path() . $tournoi->pathToRules . $tournoi->getAttribute('reglementUri');*/
        //return response()->download($path, $tournoi->getAttribute('reglementUri'));
    }

    private function paymentOk($request) {
        // nom_carte
        // no_carte
        // mois_carte
        // annee_carte
        return true;
    }
}
