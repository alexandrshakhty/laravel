@extends('master')
@section('title', $currentpage->title.' : '.$settings->title  )
@section('description', $currentpage->description )
@section('content')
<main>
    <div class="block main">
        <div class="inner">
            
<div class="content nositebar ">
    <div class="items_wrapper popular">

	<h1>{{ $currentpage->title }}</h1>
	<div>
	{!! $currentpage->content !!}
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

            </div>
        </div>
    </div>
</main>
@endsection