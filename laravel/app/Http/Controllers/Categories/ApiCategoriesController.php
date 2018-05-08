<?php

namespace App\Http\Controllers\Categories;

use App\Http\Controllers\JsonResponse;
use App\Jeu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiCategoriesController extends Controller
{
    public function getCategories(Request $request) {
        $categoriesJeux = \DB::table('type_jeu')
            ->select('id_type_jeu', 'designation')
            ->get();
        return response()->json(new JsonResponse(true, $categoriesJeux , null));
    }

}
