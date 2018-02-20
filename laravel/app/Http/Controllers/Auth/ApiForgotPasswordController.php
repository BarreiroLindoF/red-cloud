<?php

namespace App\Http\Controllers\Auth;

use App\PasswordRecovery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\ForgotPassword;
use Illuminate\Support\Str;
use Mail;

class ApiForgotPasswordController extends Controller
{

    public function sendEmailForgotPassword(Request $request) {
        // Recuperer l'email de la personne
        $email = $request->input('email');
        $code = Str::random(6);
        $token = Str::random(44);

        $this->insertDatabase($email, $code, $token);

        $this->sendEmail($email, $code);
    }

    private function insertDatabase(string $email, string $code, string $token) {
        $passwordRecovery = new PasswordRecovery($email, $code, $token);
        $passwordRecovery->save();
    }

    private function sendEmail($email, $code) {
        $forgotPassword = new ForgotPassword();
        $forgotPassword->code = $code;
        Mail::to($email)->send($forgotPassword);
    }

}
