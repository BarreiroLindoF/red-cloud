<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use App\User;

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
                return response()->json(new JsonResponse(false, null, 'Login erronées !'),401);
            }
        } catch (JWTAuthException $e) {
            return response()->json(new JsonResponse(false, null, "Erreur lors de la création du token!"), 500);
        }
        return response()->json(new JsonResponse(true, $jwt, "Token créé avec succès"));
    }

    public function getAuthUser(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }
}