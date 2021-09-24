<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\Facades\Image;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categories = Category::get();
        return view('auth.categories')->with(['categories' => $categories]);        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      $categories = Category::get();
      return view('auth.addcategory')->with(['categories' => $categories]);
//      return view('auth.addcategory');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $path = $request->file('image')->store('categories');
        $params=$request->all();
        // $params['image']=$path;
        
        $filename = $params['image']->getClientOriginalName();
        $params['image']->move(Storage::path('/categories/'),$filename);        
        $params['image'] = 'categories/'.$filename;        
        
        
        Category::create($params);
        //Category::create($request->all());
        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return view('auth.show')->with(['category' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
            $categories = Category::get();
            return view('auth.addcategory')->with(['category' => $category,'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        
        Storage::delete($category->image);
//        $path = $request->file('image')->store('categories');
        $params=$request->all();

        $filename = $params['image']->getClientOriginalName();
        //$filename = 'экраны.jpg';
        $params['image']->move(Storage::path('/categories/'),$filename);
        
        // $params['image']=$path;
        $params['image'] = 'categories/'.$filename;
        $category->update($params);
        // $category->update($request->all());
        return redirect()->route('categories.index');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index');
    }
}
