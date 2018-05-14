<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\JsonResponse;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

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
	    return response()->json(new JsonResponse(true, $user, null));
    }

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