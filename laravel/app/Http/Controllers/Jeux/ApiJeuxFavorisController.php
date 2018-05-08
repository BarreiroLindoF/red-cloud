<?php

namespace App\Http\Controllers\Jeux;

use App\Http\Controllers\JsonResponse;
use App\Jeu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiJeuxFavorisController extends Controller
{

    public function modifierJeux(Request $request) {
        $user = \JWTAuth::parseToken()->authenticate();

        \DB::table('favoris')->where('user_id_user', $user->id)->delete();

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
        return response()->json(new JsonResponse(true, $jeux, null));
    }
}
