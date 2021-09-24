@extends('master')
@section('title'){{$category->name}}@endsection
@section('content')
<main>
    <div class="block main">
        <div class="inner">
                
    <form method="GET" class="filter_items desktop">            
        <div class="filter_bar">
            <div class="title"><span>Фильтр по параметрам</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </div>

		@foreach($subcategories as $subcategory)
		<div class="filter_checkbox filter_checkbox_all">
		<div class="f_title"><a class="subcat" href="{{$subcategory->code}}">{{$subcategory->name}}</a></div>
		</div> 
		@endforeach
    </div>
</form>		
            <div class="content nositebar filter">
               
	<div class="breadcrumb">
            <span><a href="/">Главная</a> / </span>
                        <span>{{$category->name}}</span>
			 </div>

	<h1 class="categories_title">{{$category->name}}</h1>
		<div class="sort_show">
                  
        <form method="GET" class="filter_items mobile" id="filter_items">
        <div class="filter_bar">
        <div class="title"><span>Фильтр по параметрам</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></div>
                                                                                                            
    
		@foreach($subcategories as $subcategory)
			<div class="price_range range_all">
				<div class="f_title"><a class="subcat" href="{{$subcategory->code}}">{{$subcategory->name}}</a></div>
		    </div>
		@endforeach	
	</div>
    </form>
                  
</div>

<div class="items grid items_table">

@foreach($products as $product)
 <div class="item" data-discount="0.00" data-code="{{$product->id}}">
    <div class="image image_size_400x600">
        <div class="item_tags">
             <div class="bestseller">ХИТ ПРОДАЖ</div></div>
        <div class="bg_dark"></div>
                    <!-- <img src="./css/image.jpg" alt="{{$product->name}}"> -->
					<img src="{{$product->image}}" alt=" {{$product->name}}">
        
        <a href="/purchase/{{$product->id}}" target="_blank"></a>
    </div>
    <div class="item_content">
        <div class="descr"><a class="" href="/purchase/{{$product->id}}" target="_blank"> {{$product->name}}</a></div>
        <div class="short_descr">{{$product->description}}</div>
        <div class="item_price" data-discount="">
            <div class="price ">
                    <div class="new">{{$product->price}} руб.
                    </div>
                </div>
                    </div>
    </div>
    <div class="btn_wrapp">
        <a class="more" href="/purchase/{{$product->id}}" target="_blank">Подробнее</a>
            </div>
</div>
@endforeach
  </div>

{{ $products->links('bootstrap-4') }}  

@if ($products->currentPage()==1)
	<div class="category_text"><p>{{$category->description}}</p>
		</div>
@endif		
            </div>
        </div>
    </div>
</main>
@endsection