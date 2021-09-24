@extends('master')
@section('title', 'Главная страница')
@section('content')
<main>
    <div class="block main">
        <div class="inner">
            
<div class="content nositebar ">
    <div class="items_wrapper popular">
        <div class="items">
		




@foreach($subcategories as $subcategory)
 <div class="item" data-discount="0.00" data-code="{{$subcategory->id}}">
    <div class="image image_size_400x600">
        <div class="item_tags">
             <div class="bestseller">ХИТ ПРОДАЖ</div></div>
        <div class="bg_dark"></div>
                    <img src="./css/image.jpg" alt="{{$subcategory->name}}">
        
        <a href="/{{$subcategory->code}}" target="_blank"></a>
    </div>
    <div class="item_content">
        <div class="descr"><a class="" href="/{{$subcategory->code}}" target="_blank"> {{$subcategory->name}}</a></div>
        
    </div>
</div>
@endforeach
 

		


		
<!-- ПРОДОЛЖЕНИЕ -->		
@foreach($products as $product)
	<div class="item" data-discount="0.00" data-code="{{$product->id}}">
    <div class="image image_size_400x600">
	        <div class="item_tags">
			    <!-- <div class="bestseller">ХИТ ПРОДАЖ</div> -->
			</div>
			<div class="bg_dark"></div>
                        <img src="./css/image.jpg" alt="{{$product->name}}" data-switch="0">
						<img src="./css/image.jpg" alt="{{$product->name}}" data-switch="1" style="display: none;">
        <a href="/purchase/{{$product->id}}" target="_blank"></a>
    </div>
    <div class="item_content">
        <div class="descr"><a class="" href="/purchase/{{$product->id}}" target="_blank">{{$product->name}}</a></div>
        <div class="short_descr">{{$product->description}}</div>
        <div data-discount="">
                                                            <div class="price ">
                    <div class="new">
                        {{$product->price}} руб.
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
    </div>

<div class="triggers">
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-car"><use xlink:href="#lnr-car"></use></svg>
                    </div>       
        <span><p>Преимущество</p>
</span>
    </div>
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-cart"><use xlink:href="#lnr-cart"></use></svg>
                    </div>
        <span><p>Преимущество</p>
</span>
    </div>
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-calendar-full"><use xlink:href="#lnr-calendar-full"></use></svg>
                    </div>
        <span><p>Преимущество</p>
</span>
    </div>
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-store"><use xlink:href="#lnr-store"></use></svg>
                    </div>
        <span><p>Преимущество</p>
</span>
    </div>
</div>

<div><h2>Заголовок</h2>

<p>Описание здесь</p>
</div>
            </div>
        </div>
    </div>
</main>
@endsection