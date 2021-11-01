<?php

use App\Http\Controllers\Api\MatchupController;
use App\Http\Controllers\Api\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Scrabble member routes
Route::get('member/all', [MemberController::class, 'all']);
Route::apiResource('members', MemberController::class);

// Scrabble match routes
Route::get('matchups/all', [MatchupController::class, 'all']);
Route::get('matchups/{id}', [MatchupController::class, 'matches']);
Route::apiResource('matchups', MatchupController::class);
