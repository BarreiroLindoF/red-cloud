<?php

namespace App\Http\Controllers\Events;

use App\Tournoi;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\ExpoNotifications;

class ApiTournoisController extends Controller
{
    public function addTournoi(Request $request) {
        $tournoi = new Tournoi;
        $tournoi->titre = $request->input('titre');
        $tournoi->description = $request->input('description');
        $tournoi->participants_max = $request->input('participants_max');
        $tournoi->event_id_event = $request->input('event_id_event');
        $tournoi->jeu_id_jeu = $request->input('jeu_id_jeu');
        $tournoi->type_tournoi_id_type_tournoi = $request->input('type_tournoi_id_type_tournoi');
        $tournoi->reglementUri = $request->input('reglementUri');
        $tournoi->prix_inscription = $request->input('prix_inscription');
        $tournoi->imageUri = $request->input('imageUri');
        $tournoi->heureDebut = $request->input('heureDebut');

        $tournoi->save();

        $users = $this->sendNotifications($tournoi->jeu_id_jeu);
        return response()->json(new JsonResponse(true, $users, null));
    }

    private function sendNotifications($id_jeu) {
        $users = \DB::table('users')
            ->leftJoin('favoris', 'id', '=', 'user_id_user')
            ->where('jeu_id_jeu', $id_jeu)
            ->whereNotNull('notificationtoken')
            ->get();
        if($users == null) { return; }
        $tokens = array();
        foreach($users as $user) {
            $tokens[] = $user->notificationtoken;
        }
        $notifications = new ExpoNotifications($tokens, 'Nouveau tournoi !',
            'Un nouveau tournoi qui pourrait vous intéresser est disponible. Lancez l\'application pour le consulter !');
        $notifications->send();
        return $users;
    }

}
