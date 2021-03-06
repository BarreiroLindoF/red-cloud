<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use App\Mail\CreationCompteMail;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Mail;


use Illuminate\Http\Request;

class ApiRegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    protected function create(Request $request)
    {
        $user = User::create([
            'nom' => $request->input('nom'),
            'prenom' => $request->input('prenom'),
            'pseudo' => $request->input('pseudo'),
            'ville' => $request->input('ville'),
            'npa' => $request->input('npa'),
            'datenaissance' => $request->input('datenaissance'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'notification_offre' => 1,
        ]);
        $jeux = $request->input('jeux');
        // Créer un tableau pour tout ajouter en une seule requête à la BDD
        $data = array();
        foreach($jeux as $jeu) {
            $data[] = [
                'user_id_user' => $user->id,
                'jeu_id_jeu' => $jeu
            ];
        }
        \DB::table('favoris')->insert($data);
        $user->jeux = $jeux;

        $this->sendEmail($user);

	    return response()->json(new JsonResponse(true, $user, null));
    }


    public function sendEmail($user) {
        $creationCompteMail = new CreationCompteMail();
        $creationCompteMail->pseudo = $user->pseudo;
        Mail::to($user->email)->queue($creationCompteMail);
    }

}