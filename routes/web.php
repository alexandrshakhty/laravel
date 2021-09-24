<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
}); */

Auth::routes([
	'reset'=>false,
	'confirm'=>false,
	'register'=>false
]);


Route::group(['middleware'=>'auth',
              'namespace'=>'Admin',
              /* 'prefix'=>'dashboard', */
             ],function() {
    Route::get('/dashboard', 'DashboardController@index')->name('home');
    Route::get('/goodsload', 'DashboardController@goodsload');
    //Route::post('/csvfileupload','Controller@csvfileupload');    
    Route::resource('categories','CategoryController');
    Route::resource('pages','PagesController');
    Route::resource('settings','SettingController');
});

// Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');

Route::post('/csvfileupload','MainController@csvfileupload');    

Route::get('/logout','Auth\LoginController@logout')->name('get:Logout');

Route::get('/', 'MainController@index');
Route::get('/{category}', 'MainController@category');
Route::get('/purchase/{purchaseid}', 'MainController@purchase');
Route::get('/help/{page}', 'MainController@page');
/* Auth::routes(); */