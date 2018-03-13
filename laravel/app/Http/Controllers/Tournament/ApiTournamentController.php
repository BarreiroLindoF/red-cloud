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
        $id = $request->input('tournoi');
        $tournament = Tournoi::all()->where('id_tournoi',$id);
        Error_log($tournament[1]);
        return response()->json(new JsonResponse(true, $tournament , null));
    }
}
