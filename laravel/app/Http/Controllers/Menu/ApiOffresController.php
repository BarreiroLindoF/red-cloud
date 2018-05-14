<?php

namespace App\Http\Controllers\Menu;

use App\Offre;
use App\ListeOffres;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Common\ExpoNotifications;
use Carbon\Carbon;

class ApiOffresController extends Controller {

    public function getOffres(Request $request){
        $date = new Carbon();
        $today = $date::now();
        $offres = Offre::whereMonth('date_debut', '=', Carbon::today()->month)->where('date_expiration', '>=', Carbon::today())->get();
        foreach($offres as $offre){
            $offres->nourriture = $offre->nourritures;
            $offres->boisson = $offre->boissons; 
            $offre->date_expiration = Carbon::parse($offre->date_expiration)->format('d.m.y');   
            $offre->date_debut = Carbon::parse($offre->date_debut)->format('d.m.y');
        }
        $listeOffres = new ListeOffres();
        $listeOffres->offres = $offres;
        return response()->json(new JsonResponse(true, $listeOffres, 'Liste des offres a été chargées'));
    }

    public function getOffre(Request $request){
        $idOffre = $request->id;
        $offre = Offre::find($idOffre);
        $offre->nourritures;
        $offre->boissons;
        return response()->json(new JsonResponse(true, $offre, 'Offre chargée'));
    }

    public function createOffre(Request $request) {
        $offre = new Offre();
        $offre->description = $request->description;
        $offre->prix = $request->prix;
        $offre->date_debut = $request->date_debut;
        $offre->date_expiration = $request->date_expiration;
        $offre->save();

        $offre->boissons()->attach($request->boissons);
        $offre->nourritures()->attach($request->nourritures);

        $this->sendNotifications();

        return response()->json(new JsonResponse(true, null, null));
    }

    public function changeNotificationsOffre(Request $request) {
        $user = \JWTAuth::parseToken()->authenticate();
        $user->notification_offre = $request->input('notification_offre');
        $user->save();
        return response()->json(new JsonResponse(true, $user, null));
    }

    private function sendNotifications() {
        $users = User::whereNotNull('notificationtoken')->where('notification_offre', 1)->get();
        if($users == null) { return; }
        $tokens = array();
        foreach($users as $user) {
            $tokens[] = $user->notificationtoken;
        }
        $notifications = new ExpoNotifications($tokens, 'Nouvelle offre limitée !',
            'Une nouvelle offre est disponible. Lancez l\'application pour la consulter !');
        $notifications->send();
    }


}