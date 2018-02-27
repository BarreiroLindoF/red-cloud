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
});

// secured routes
Route::group(['middleware' => ['jwt-auth', 'api','cors']], function () {
    Route::post('test/login', 'Auth\ApiAuthController@login');
    Route::get('events', 'Events\ApiEventsController@getEvents');
});