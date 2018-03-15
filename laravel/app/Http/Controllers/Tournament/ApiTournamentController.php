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
        $tournament = Tournoi::select('*')->where('event_id_event',$idEvent)->get();
        return response()->json(new JsonResponse(true, $tournament , null));
    }
}
