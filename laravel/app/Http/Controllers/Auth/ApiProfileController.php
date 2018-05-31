<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use App\User;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ApiProfileController extends Controller
{
    public function modifyUser(Request $request) {

        $user = \JWTAuth::parseToken()->authenticate();

        $users = User::where('pseudo', $request->input('pseudo'))->first();

        if ($users != null && $users->id != $user->id) {
            return response()->json(new JsonResponse(false, null, 'Ce pseudo existe déjà !'));
        }

        $users = User::where('email', $request->input('email'))->first();

        if ($users != null && $users->id != $user->id) {
            return response()->json(new JsonResponse(false, null, 'Cet email existe déjà !'));
        }

        $user->prenom = $request->input('prenom');
        $user->nom = $request->input('nom');
        $user->pseudo = $request->input('pseudo');
        $user->ville = $request->input('ville');
        $user->npa = $request->input('npa');
        $user->datenaissance = $request->input('datenaissance');
        $user->email = $request->input('email');
        $user->save();
        return response()->json(new JsonResponse(true, $user, null));
    }

}