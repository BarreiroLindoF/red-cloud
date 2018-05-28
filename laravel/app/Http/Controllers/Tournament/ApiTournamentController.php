<?php

namespace App\Http\Controllers\Tournament;

use App\Http\Controllers\JsonResponse;
use App\Mail\PaymentConfirmation;
use Mail;
use App\Event;
use App\Participation;
use App\Tournoi;
use Carbon\Carbon;
use PDF;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Common\ExpoNotifications;

class ApiTournamentController extends Controller
{
    //
    public function getTournois(Request $request)
    {
        $idEvent = $request->id;
        $tournaments = Tournoi::select('*')->where('event_id_event', $idEvent)->get();
        $user = \JWTAuth::parseToken()->authenticate();

        foreach ($tournaments as $tournament) {
            $tournament->setAttribute('imageUri', $request->root() . Tournoi::$pathToImages . $tournament->getAttribute('imageUri'));
            $tournament->setAttribute('msg_partage', $tournament->msg_partage_tournoi_part1 . $tournament->getAttribute('titre') . $tournament->msg_partage_tournoi_part2 );

            $idTournament = $tournament->getAttribute('id_tournoi');
            $tournament->setAttribute('reglementUri', $request->root() . $tournament->pathToRules . $tournament->getAttribute('reglementUri'));
            $tournament->participants = Participation::where('tournoi_id_tournoi', $idTournament)->where('statut_id_statut', 1)->count();
            $participations = Participation::where('tournoi_id_tournoi', $idTournament)->where('statut_id_statut', 1)->get();
            $tournament->inscrit = false;
            foreach ($participations as $participation) {
                if ($participation->getAttribute('user_id_user') === $user->id) {
                    $tournament->inscrit = true;
                    break;
                }
            }
            $tournament->participants = $participations->count();
        }

        return response()->json(new JsonResponse(true, $tournaments, null));
    }

    public function addTournoi(Request $request) {
        $tournoi = new Tournoi();
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
        return response()->json(new JsonResponse(true, $users , null));
    }

    private function sendNotifications($idJeu) {
        $users = \DB::table('users')
            ->leftjoin('favoris', 'id', '=', 'user_id_user')
            ->where('jeu_id_jeu', $idJeu)
            ->whereNotNull('notificationtoken')
            ->get();
        if($users == null) { return; }
        $tokens = array();
        foreach($users as $user) {
            $tokens[] = $user->notificationtoken;
        }
        $notifications = new ExpoNotifications($tokens, 'Nouveau tournoi de folie !',
            'Ouvre l\'application pour le checker !');
        $notifications->send();
    }

    public function addParticipation(Request $request)
    {
        $id_tournoi = $request->id;
        $tournoi = Tournoi::find($id_tournoi);

        // Toutes les participations en lien avec ce tournoi
        $participations = Participation::where('tournoi_id_tournoi', $id_tournoi)->where('statut_id_statut', 1)->get();

        if ($tournoi->getAttribute('participants_max') <= $participations->count()) {
            return response()->json(new JsonResponse(false, null, 'Nous avons atteint de nombre maximale de joueurs!'));
        }
        $user = \JWTAuth::parseToken()->authenticate();
        foreach ($participations as $participation) {
            if ($participation->getAttribute('user_id_user') == $user->id) {
                return response()->json(new JsonResponse(false, null, 'Vous êtes déjà inscrit à ce tournoi!'));
            }
        }

        $participation = new Participation();
        $participation->setAttribute('date_inscription', Carbon::now());
        $participation->setAttribute('nom_equipe', $request->input('nom_equipe'));
        $participation->setAttribute('tournoi_id_tournoi', $id_tournoi);
        $participation->setAttribute('user_id_user', $user->id);
        $participation->setAttribute('statut_id_statut', 1);
        $participation->save();

        $this->mailConfirmation($user, $tournoi, $participation);

        return response()->json(new JsonResponse(true, $participation, null));
    }

    public function mailConfirmation($user, $tournoi, $participation)
    {

        $event = Event::where('id_event', $tournoi->event_id_event)->first();

        $dateTournoi = Carbon::parse($event->dateHeureDebut)->format('d.m.Y');
        $heureTournoi = Carbon::parse($tournoi->heureDebut)->format('H:i');
        $dateDuJour = Carbon::parse(Carbon::today())->format('d.m.Y');

        $data = ['dateDuJour' => $dateDuJour,
            'imageTournoi' => $tournoi->imageUri,
            'tournoiNom' => $tournoi->titre,
            'tournoiPrix' => $tournoi->prix_inscription,
            'dateTournoi' => $dateTournoi,
            'heureTournoi' => $heureTournoi,
            'userName' => $user->pseudo,
            'mailUser' => $user->email,
            'mailCompany' => 'redCloud@redCloud.com',
            'userTeam' => $participation->nom_equipe];

        $paymentConfirmation = new PaymentConfirmation();
        $paymentConfirmation->setPath(resource_path('/views/pdf/paymentConfirmation.pdf'));
        $pdf = PDF::loadView('pdf.paymentConfirmation', $data);
        $pdf->save(resource_path('/views/pdf/paymentConfirmation.pdf'));


        $email = $user->email;
        Mail::to($email)->queue($paymentConfirmation);
    }

}

