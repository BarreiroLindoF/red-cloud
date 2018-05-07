<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Je ne sais pas ce que ça fait
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->get('/hello_world', function () {
    return json_encode(['message' => 'hello world']);
});

Route::group(['middleware' => ['api','cors']], function () {
    Route::post('auth/register', 'Auth\ApiRegisterController@create');
	Route::post('auth/login', 'Auth\ApiAuthController@login');
    Route::post('auth/forgot', 'Auth\ApiForgotPasswordController@sendEmailForgotPassword');
    Route::post('auth/code', 'Auth\ApiCodeCheckController@checkCode');
    Route::post('auth/reset', 'Auth\ApiResetPasswordController@resetPassword');
    Route::post('check', 'ApiVerificationController@checkUserExist');

    // New routes
    Route::post('me/participation/tournoi/{id}', 'Tournament\ApiTournamentController@addParticipation');
    Route::post('tournaments/{id}/team', 'ApiVerificationController@checkTeamExist');

    Route::get('me/equipes', 'Equipes\ApiEquipesController@getEquipes');
    Route::post('equipes', 'Equipes\ApiEquipesController@addEquipe');

    Route::get('tournois/{id}/participants', 'Participations\ApiParticipationsController@getParticipants');

    Route::get('menu', 'Menu\ApiMenuController@getMenu');
    Route::get('categorie/{idCat}', 'Menu\ApiMenuController@getCategorie');
    Route::get('offres', 'Menu\ApiOffresController@getOffres');
    Route::get('offre/{id}', 'Menu\ApiOffresController@getOffre');
    
    Route::get('events', 'Events\ApiEventsController@getEvents');
    Route::get('events/{id}/tournaments', 'Tournament\ApiTournamentController@getTournois');

    // Jeu
    Route::get('jeux', 'Jeux\ApiJeuxController@getJeux');
    Route::put('me/jeux', 'Jeux\ApiJeuxFavorisController@modifierJeux');

    // Auth
    Route::get('me/deconnexion', 'Auth\ApiAuthController@deconnexion');

    // Partie administration
    Route::post('offres', 'Menu\ApiOffresController@createOffre');
    Route::post('tournois', 'Tournament\ApiTournamentController@addTournoi');
});

// secured routes
Route::group(['middleware' => ['jwt-auth', 'api','cors']], function () {
    Route::post('test/login', 'Auth\ApiAuthController@login');
});

// Ajouter un groupe pour la partie administrative
