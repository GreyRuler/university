<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TablesController;
use App\Http\Middleware\ConfigConnectionDB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/upload', [FileController::class, 'upload']);
Route::get('/download', [FileController::class, 'download']);

Route::middleware([ConfigConnectionDB::class])->group(function () {
    Route::apiResource('tables', TableController::class);
    Route::get('getTables', [TablesController::class, 'tables']);
    Route::get('countColumns', [TablesController::class, 'countColumns']);
});
