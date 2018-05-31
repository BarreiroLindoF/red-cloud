<?php
namespace App\Http\Controllers\Entreprise;

use App\Http\Controllers\Controller;
use App\Entreprise;
use App\Http\Controllers\JsonResponse;

class EntrepriseController extends Controller
{
    public function getEntreprise() {
        return response()->json(new JsonResponse(true, Entreprise::find(1), null));
    }
}
