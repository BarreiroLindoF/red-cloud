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
    Route::post('auth/register', 'Auth\ApiRegisterController@create'); // Documenté
	Route::post('auth/login', 'Auth\ApiAuthController@login'); // Documenté
    Route::post('auth/forgot', 'Auth\ApiForgotPasswordController@sendEmailForgotPassword'); // Documenté
    Route::post('auth/code', 'Auth\ApiCodeCheckController@checkCode'); // Documenté
    Route::post('auth/reset', 'Auth\ApiResetPasswordController@resetPassword'); // Documenté
    Route::post('check', 'ApiVerificationController@checkUserExist'); // Documenté

    Route::patch('me/update', 'Auth\ApiRegisterController@modifyUser'); // NON DOCUMENTÉ

    // New routes
    Route::post('me/participation/tournoi/{id}', 'Tournament\ApiTournamentController@addParticipation'); // Documenté
    Route::post('tournaments/{id}/team', 'ApiVerificationController@checkTeamExist'); // Documenté

    //Tournois
    Route::get('tournois/{id}/participants', 'Participations\ApiParticipationsController@getParticipants'); // Documenté
    Route::get('me/inscriptions', 'Tournament\ApiTournamentInscriptionsController@getInscriptions'); // NON DOCUMENTÉEEEEE

    Route::get('menu', 'Menu\ApiMenuController@getMenu'); // Documenté
    Route::get('offres', 'Menu\ApiOffresController@getOffres'); // Doit être documenté après avoir été corrigé
    Route::get('offres/{id}', 'Menu\ApiOffresController@getOffre'); // Doit être documenté après avoir été corrigé
    
    Route::get('events', 'Events\ApiEventsController@getEvents'); // Documenté
    Route::get('events/{id}/tournaments', 'Tournament\ApiTournamentController@getTournois'); // Documenté


    // Jeu
    Route::get('jeux', 'Jeux\ApiJeuxController@getJeux'); //Documenté
    Route::get('jeux/categories', 'Categories\ApiCategoriesController@getCategories'); // Documenté
    Route::put('me/jeux', 'Jeux\ApiJeuxFavorisController@modifierJeux'); // Documenté
});

// secured routes
Route::group(['middleware' => ['jwt-auth', 'api','cors']], function () {
    Route::post('test/login', 'Auth\ApiAuthController@login');
});