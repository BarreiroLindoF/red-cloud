<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class ApiTournamentInscriptionsController extends Controller
{
    //
    public function getInscriptions(Request $request) {
        $user = \JWTAuth::parseToken()->authenticate();
        $id = $user->id;

        $inscriptions = DB::table('participation')->select()->where('user_id_user', $id)->get();

        $today = \Carbon\Carbon::now();
        foreach ($inscriptions as $inscription) {
            $idTournoi = $inscription->tournoi_id_tournoi;
            $tournoi = DB::table('tournoi')->select()->where('id_tournoi', $idTournoi)->get()->first();
            $event = DB::table('event')->select()->where('id_event', $tournoi->event_id_event )->get()->first();
            Error_log($today . '   ' . $event->dateHeureDebut);
            Error_log( $today->diffInDays($event->dateHeureDebut));
            if( min([$today, $event->dateHeureDebut]) != $event->dateHeureDebut ){
                $lstTournois[] = $tournoi;
            };
        }

        return response()->json(new JsonResponse(true, $lstTournois , null));
    }

}
