<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use App\User;
use Psy\Util\Json;

class ApiAuthController extends Controller
{

    public function __construct()
    {
        $this->user = new User;
    }

    public function login(Request $request){

        $credentials = $request->only('pseudo', 'password');

        $jwt = '';

        try {
            if (!$jwt = JWTAuth::attempt($credentials)) {
                return response()->json(new JsonResponse(false, null, 'Login erronées !'));
            }
        } catch (JWTAuthException $e) {
            return response()->json(new JsonResponse(false, null, "Erreur lors de la création du token!"));
        }
        $user = \Auth::user();
        // Si c'est null, alors l'utilisateur n'a pas autorisé les notifications
        $user->notificationtoken = $request->input('notificationToken');
        $user->save();
        $user->token = $jwt;
        $jeux = array();
        $jeuxFavorisDB = \DB::table('favoris')->where('user_id_user', $user->id)->get();
        foreach($jeuxFavorisDB as $jeu) {
            array_push($jeux, $jeu->jeu_id_jeu);
        }
        $user->jeux = $jeux;
        return response()->json(new JsonResponse(true, $user, "Token créé avec succès"));
    }

    public function deconnexion(Request $request) {
        $user = \JWTAuth::parseToken()->authenticate();
        if ($user->notificationtoken != null) {
            $user->notificationtoken = null;
            $user->save();
        }
        return response()->json(new JsonResponse(true, null, 'Vous avez été déconnecté'));
    }

    public function getAuthUser(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }
}