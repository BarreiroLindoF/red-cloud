<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use App\PasswordRecovery;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ForgotPassword;
use App\User;
use Illuminate\Support\Str;
use Mail;

class ApiForgotPasswordController extends Controller
{

    public function sendEmailForgotPassword(Request $request) {
        $emailOrUsername = $request->input('user');

        $user = User::where('email', $emailOrUsername)->orWhere('pseudo', $emailOrUsername)->first();
        if ($user === null) {
            return response()->json(new JsonResponse(false, null, 'Cet email ou utilisateur n\'existe pas !'));
        }
        $code = Str::random(6);
        $token = Str::random(44);

        $this->insertDatabase($user->email, $code, $token);
        $this->sendEmail($user->email, $code);

        return response()->json(new JsonResponse(true, $user->email, 'Email envoyé !'));
    }

    private function insertDatabase(string $email, string $code, string $token) {
        PasswordRecovery::updateOrCreate([
            'email' => $email ],
            [
            'code'  => $code,
            'token' => $token,
            'status'=> 0,
            'created_at' => Carbon::now()
        ]);
    }

    private function sendEmail($email, $code) {
        $forgotPassword = new ForgotPassword();
        $forgotPassword->code = $code;
        Mail::to($email)->send($forgotPassword);
    }

}
