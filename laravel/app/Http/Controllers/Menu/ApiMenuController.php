<?php

namespace App\Http\Controllers\Menu;

use App\Common\Section;
use App\Nourriture;
use App\Boisson;
use App\Menu;
use App\CategorieNourriture;
use App\CategorieBoisson;
use App\Http\Controllers\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use PhpParser\Node\Expr\Cast\Object_;

class ApiMenuController extends Controller
{

    public function getMenu(Request $request)
    {
        $nourritures = Nourriture::all();
        $boissons = Boisson::all();
        $catBoisson = CategorieBoisson::all();
        $catNourriture = CategorieNourriture::all();
        /*$categorie = CategorieNourriture::join('categorie_nourriture', 'categorie_nourriture_id_categorie_nourriture', 'id');
		$menu = new Menu();
        $menu->boissons = $boissons;
        $menu->nourritures = $nourritures;
        $menu->categorieBoisson = $catBoisson;
        $menu->categorieNourriture = $catNourriture;*/

        /*$menu = DB::table('boisson')
                ->join('categorie_boisson', 'id_categorie_boisson', '=', 'categorie_boisson_id_categorie_boisson')
                ->select('boisson.nom AS boisson_nom', 'categorie_boisson.nom AS categorie_nom')
                ->groupBy('categorie_nom', 'boisson_nom')
                ->get();*/
        $boissons = DB::table('categorie_boisson')
            ->select('categorie_boisson.nom AS categorie_nom', 'boisson.nom AS boisson_nom')
            ->join('boisson', 'id_categorie_boisson', '=', 'categorie_boisson_id_categorie_boisson')
            ->orderby('id_categorie_boisson')
            ->get()->groupBy('categorie_nom');

        $nourriture = DB::table('categorie_nourriture')
            ->select('categorie_nourriture.nom AS categorie_nom', 'nourriture.nom AS nourriture_nom')
            ->join('nourriture', 'id_categorie_nourriture', '=', 'categorie_nourriture_id_categorie_nourriture')
            ->orderby('id_categorie_nourriture')
            ->get()->groupBy('categorie_nom');



        /*$categories = array();
        foreach ($nourriture as $n) {
            if (!in_array($n->categorie_nom, $categories)) {
                $categories[] = $n->categorie_nom;
            }
        }
*/
        $sections = array();

        //$categories = var_export($boissons);
        foreach($boissons as $categorie)  {
            var_dump($boissons[$categorie[0]->categorie_nom]);
            foreach($boissons[$categorie[0]->categorie_nom] as $boisson) {
                //var_dump($boisson);
            }
        }
        /*foreach ($boissons as $boisson) {
            $section = new Section();
            $section->setSectionTitle($boisson)
        }*/

        return response()->json(new JsonResponse(true, $boissons, 'Liste de la nourritures chargées'));
    }
}