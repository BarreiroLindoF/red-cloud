<?php

namespace App\Http\Controllers\Menu;

use App\Offre;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Common\ExpoNotifications;

class ApiOffresController extends Controller {

    public function getOffres(Request $request){
        $offres = Offre::all();
        foreach($offres as $offre){
            $offres->nourriture = $offre->nourritures;
            $offres->boisson = $offre->boissons;
        }
        return response()->json(new JsonResponse(true, $offres, 'Liste des offres a été chargées'));
    }

    public function getOffre(Request $request){
        $idOffre = $request->id;
        $offre = Offre::find($idOffre);
        $offre->nourritures;
        $offre->boissons;
        return response()->json(new JsonResponse(true, $offre, 'Offre chargée'));
    }

    public function createOffre(Request $request) {
       /* $offre = new Offre();
        $offre->description = $request->description;
        $offre->prix = $request->prix;
        $offre->date_debut = $request->date_debut;
        $offre->date_expiration = $request->date_expiration;
        $offre->save();

        $offre->boissons()->attach($request->boissons);
        $offre->nourritures()->attach($request->nourritures);
*/
        $payload = $this->sendNotifications();

        return response()->json(new JsonResponse(true, $payload, null));
    }

    private function sendNotifications() {
        $users = User::whereNotNull('notificationtoken')->get();
        $tokens = array();
        foreach($users as $user) {
            $tokens[] = $user->notificationtoken;
        }
        $notifications = new ExpoNotifications($tokens, 'Nouvelle offre limitée !',
            'Une nouvelle offre est disponible. Lancez l\'application pour la consulter !');
        return $notifications->send();
    }


}