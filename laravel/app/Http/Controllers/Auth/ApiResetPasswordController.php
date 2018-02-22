<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\JsonResponse;
use App\PasswordRecovery;
use App\User;
use Illuminate\Http\Request;

class ApiResetPasswordController extends Controller
{

    public function resetPassword(Request $request) {
        $email = $request->input('email');
        $token = $request->input('token');
        $password = $request->input('password');
        $passwordRecovery = PasswordRecovery::where('email', $email)->first();
        if ($passwordRecovery === null) {
            return response()->json(new JsonResponse(false, null, 'Aucune demande de récuperation de mot de passe !'));
        }
        if ($passwordRecovery->delaiDepasse()) {
            return response()->json(new JsonResponse(false, null, 'Délai de récupération de mot de passe dépassé !'));
        }
        if ($passwordRecovery->getAttribute('status') < 1) {
            return response()->json(new JsonResponse(false, null, 'Le code n\' pas encore été utilisé !'));
        }
        if ($passwordRecovery->getAttribute('status') > 1) {
            return response()->json(new JsonResponse(false, null, 'Ce token a déjà été utilisé !'));
        }
        if ($passwordRecovery->getAttribute('token') !== $token) {
            return response()->json(new JsonResponse(false, null, 'Le token ne correspond pas !'));
        }
        $passwordRecovery->setAttribute('status', 2);
        $passwordRecovery->save();
        // Pas besoin de vérifier le mail sinon il n'y aurait pas de demande de mot de passe
        // et donc, on se serait arrêté plus haut
        User::where('email', $email)->update(['password' => bcrypt($password)]);
        return response()->json(new JsonResponse(true, null, "Mot de passe modifié avec succès !"));
    }

}
