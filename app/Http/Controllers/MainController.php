<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use App\Pages;
use App\Setting;

use Maatwebsite\Excel\Facades\Excel;

use Illuminate\Http\Request;

use DB;

class MainController extends Controller
{
   public function index() {
//	   $categories = Category::get();
	   $categories = Category::all()->where('parent', 0);
	   // $subcategories = Category::all()->where('parent',0);
	   $subcategories = Category::all()->where('parent', '!=' ,0);
	   $products = Product::get();
      //$settings = Setting::get();
       $settings = Setting::first();
	  // return view('index',compact('categories'),compact('products'),compact('subcategories'));
	   return view('index')->with(['categories' => $categories,'products' => $products, 'subcategories' => $subcategories,'settings' => $settings]);
	   // return view('index');
   }
   
    public function category($code) {
	$category = Category::where('code',$code)->first();
	// $categories = Category::get();
	$categories = Category::all()->where('parent', 0);
	$id_category = $category->id;
	$subcategories = Category::all()->where('parent', $id_category);
	$products = Product::where('category_id', $id_category)->paginate(15);	
    $settings = Setting::first();        
	// $products = Product::paginate(3);
	
	return view('category')->with(['products' => $products,'category' => $category,'categories' => $categories,'subcategories' => $subcategories,'settings' => $settings]);
   }   
   
    public function purchase($id) {
	   $products = Product::where('id',$id)->first();
	   $url = $products->url;
	   return redirect($url);
   }

   public function page($page) {
	  // $categories = Category::get();
	  $categories = Category::all()->where('parent', 0);
	  $currentpage = Pages::where('urlpage',$page)->first();
      $settings = Setting::first();       
	  return view('page')->with(['currentpage' => $currentpage,'categories' => $categories,'settings' => $settings]);
   }
    
    
    
public function csvfileupload(Request $request)
{
    if ($request->hasFile('csvfile')) {
        $path = $request->file('csvfile')->getRealPath();
        $data = Excel::load($path)->get();

        if ($data->count()) {
            foreach ($data as $key => $value) {
                $arr[] = ['category_id' => $value->category_id, 
                          'name' => $value->name,
                          'code' => $value->code,
                          'description' => $value->description,
                          'image' => $value->picture,
                          'price' => $value->price,
                          'url' => $value->url,
                         ];
            }
            if (!empty($arr)) {
                DB::table('products')->insert($arr);

                return "Success";
            }
        }
    }
}     
    
    
    
}
