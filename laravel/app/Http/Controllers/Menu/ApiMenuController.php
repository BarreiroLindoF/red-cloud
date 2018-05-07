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
        $boissons = DB::table('categorie_boisson')
            ->select('categorie_boisson.nom AS categorie_nom', 'boisson.nom AS element_nom', 'boisson.prix AS prix')
            ->join('boisson', 'id_categorie_boisson', '=', 'categorie_boisson_id_categorie_boisson')
            ->orderby('id_categorie_boisson')
            ->get();

        $nourriture = DB::table('categorie_nourriture')
            ->select('categorie_nourriture.nom AS categorie_nom', 'nourriture.nom AS element_nom', 'nourriture.prix AS prix')
            ->join('nourriture', 'id_categorie_nourriture', '=', 'categorie_nourriture_id_categorie_nourriture')
            ->orderby('id_categorie_nourriture')
            ->get();
        
        $menu = new Menu();
        $menu->nourritures = $this->getSections($nourriture);
        $menu->boissons = $this->getSections($boissons);


        return response()->json(new JsonResponse(true, $menu, 'Liste de la nourritures chargées'));
    }

    private function getSections($elements) {
        $sections = array();
        $categorie_avant = null;
        foreach ($elements as $element) {
            if (strcmp($categorie_avant, $element->categorie_nom)) {
                $section = new Section();
                $section->setSectionTitle($element->categorie_nom);
                $sections[] = $section;
                $categorie_avant = $element->categorie_nom;
            }
            end($sections)->addDataElement($element->element_nom, $element->prix);
        }
        return $sections;
    }
}