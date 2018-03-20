<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use App\Tournoi;
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
}
