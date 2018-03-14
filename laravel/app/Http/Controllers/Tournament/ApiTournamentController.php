<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use App\Tournoi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiTournamentController extends Controller
{
    //
    public function getTournoi(Request $request) {
        $id = $request->input('event');
        $tournament = Tournoi::all()->where('event_id_event',$id);
        return response()->json(new JsonResponse(true, $tournament , null));
    }
}
