<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Tournoi;


class ApiTournamentInscriptionsController extends Controller
{
    //
    public function getInscriptions(Request $request) {
        $user = \JWTAuth::parseToken()->authenticate();
        $id = $user->id;

        $inscriptions = DB::table('participation')
            ->join('tournoi','tournoi.id_tournoi','=','participation.tournoi_id_tournoi')
            ->join('event','tournoi.event_id_event','=','event.id_event')
            ->where('user_id_user', $id)
            ->where('statut_id_statut', 1)
            ->orderBy('dateHeureDebut')
            ->get();

        $today = \Carbon\Carbon::now();
        $lstTournois = [];


        foreach ($inscriptions as $inscription) {
            $idTournoi = $inscription->tournoi_id_tournoi;

            $tournoi =
                DB::table('tournoi')
                    ->join('participation', 'tournoi.id_tournoi', '=', 'participation.tournoi_id_tournoi')
                    ->join('event','tournoi.event_id_event','=','event.id_event')
                    ->select('id_tournoi', 'tournoi.titre', 'nom_equipe','tournoi.imageUri', 'tournoi.heureDebut', 'tournoi.event_id_event', 'event.dateHeureDebut')
                    ->where('id_tournoi', $idTournoi)
                    ->get()->first();

            if( min([$today, $tournoi->dateHeureDebut]) != $tournoi->dateHeureDebut ){
                $tournoi->imageUri = $request->root() . Tournoi::$pathToImages . $tournoi->imageUri;
                $lstTournois[] = $tournoi;
            };
        }

        return response()->json(new JsonResponse(true, $lstTournois , null));
    }

}
