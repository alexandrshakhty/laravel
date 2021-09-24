@extends('master')
@section('title'){{$settings->title}}@endsection
@section('description'){{$settings->description}}@endsection
@section('content')
<main>
    <div class="block main">
        <div class="inner">
            
<div class="content nositebar ">
<div class="items_wrapper popular">
        <div class="items grid items_table">
		




@foreach($subcategories as $subcategory)
 <div class="item" data-discount="0.00" data-code="{{$subcategory->id}}">
    <div class="image image_size_400x600">
        <!-- <div class="item_tags">
             <div class="bestseller">ХИТ ПРОДАЖ</div></div> -->
        <div class="bg_dark"></div>
                    <!-- <img src="./css/image.jpg" alt="{{$subcategory->name}}"> -->
                    <img src="{{Storage::url($subcategory->image) }}" alt="{{$subcategory->name}}">
        
        <a href="/{{$subcategory->code}}" target="_blank"></a>
    </div>
    <div class="item_content">
        <div class="descr"><a class="" href="/{{$subcategory->code}}" target="_blank"> {{$subcategory->name}}</a></div>
        
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
        <span><p>{{ $settings->advantage2 }}</p>
</span>
    </div>
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-cart"><use xlink:href="#lnr-cart"></use></svg>
                    </div>
        <span><p>{{ $settings->advantage1 }}</p>
</span>
    </div>
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-calendar-full"><use xlink:href="#lnr-calendar-full"></use></svg>
                    </div>
        <span><p>{{ $settings->advantage3 }}</p>
</span>
    </div>
    <div class="trigger">
        <div class="icon ">
                            <svg class="lnr lnr-store"><use xlink:href="#lnr-store"></use></svg>
                    </div>
        <span><p>{{ $settings->advantage4 }}</p>
</span>
    </div>
</div>
    
    
    

<div>
{!! $settings->content !!}
</div>
            </div>
        </div>
    </div>
</main>
@endsection