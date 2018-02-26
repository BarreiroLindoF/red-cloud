<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class ApiVerificationController extends Controller
{
    public function checkUserExist (Request $request) {
        $emailOrUsername = $request->input('user');
        $user = User::where('email', $emailOrUsername)->orWhere('pseudo', $emailOrUsername)->first();
          if ($user === null) {
              return response()->json(new JsonResponse(false, null, 'Cet email ou utilisateur n\'existe pas !'));
          }else {
              return response()->json(new JsonResponse(true, $user, 'Cet email ou utilisateur existe !'));
          }
    }
}
