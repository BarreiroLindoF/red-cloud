<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use App\Http\Controllers\Controller;
use App\PasswordRecovery;
use Illuminate\Http\Request;

class ApiCodeCheckController extends Controller
{
    public function checkCode(Request $request) {
        $email = $request->input('email');
        $code = $request->input('code');
        $passwordRecovery = PasswordRecovery::where('email', $email)->first();
        if ($passwordRecovery === null) {
            return response()->json(new JsonResponse(false, null, 'Aucune demande de récuperation de mot de passe !'));
        }
        if ($passwordRecovery->delaiDepasse()) {
            return response()->json(new JsonResponse(false, null, 'Délai de récupération de mot de passe dépassé !'));
        }
        if ($passwordRecovery->getAttribute('status') > 0) {
            return response()->json(new JsonResponse(false, null, 'Ce code a déjà été utilisé !'));
        }
        if ($passwordRecovery->getAttribute('code') !== $code) {
            return response()->json(new JsonResponse(false, null, 'Le code ne correspond pas !'));
        }
        $passwordRecovery->setAttribute('status', 1);
        $passwordRecovery->save();
        return response()->json(new JsonResponse(true, $passwordRecovery->getAttribute('token'), null));
    }
}
