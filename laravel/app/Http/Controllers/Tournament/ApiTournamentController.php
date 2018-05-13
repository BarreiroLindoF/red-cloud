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

class ApiTournamentController extends Controller
{
    //
    public function getTournois(Request $request)
    {
        $idEvent = $request->id;
        $tournaments = Tournoi::select('*')->where('event_id_event', $idEvent)->get();
        $user = \JWTAuth::parseToken()->authenticate();

        foreach ($tournaments as $tournament) {
            $tournament->setAttribute('imageUri', $request->root() . $tournament->pathToImages . $tournament->getAttribute('imageUri'));
            $tournament->setAttribute('msg_partage', $tournament->msg_partage_tournoi_part1 . $tournament->getAttribute('titre') . $tournament->msg_partage_tournoi_part2);
            $idTournament = $tournament->getAttribute('id_tournoi');
            $tournament->setAttribute('reglementUri', $request->root() . $tournament->pathToRules . $tournament->getAttribute('reglementUri'));
            $tournament->participants = Participation::where('tournoi_id_tournoi', $idTournament)->count();
            $participations = Participation::where('tournoi_id_tournoi', $idTournament)->get();
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
        Mail::to($email)->send($paymentConfirmation);
    }

}

