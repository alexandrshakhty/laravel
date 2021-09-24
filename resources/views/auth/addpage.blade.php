@extends('auth.master')

@isset($page)
    @section('title','Редактировать страницу '.$page->title)
@else
    @section('title','Добавить страницу')
@endisset


@section('content')
<div style="padding: 50px 50px 50px 50px;">


<div class="col-md-12">

    
@isset($page)
    <h4>Редактировать страницу <b>{{ $page->title }}</b></h4>
@else
        <h4>Добавить страницу</h4>
@endisset

<form method="POST" enctype="multipart/form-data"
      
@isset($page)      
	action="{{ route('pages.update',$page) }}">      
     @else
	action="{{ route('pages.store') }}">      
@endisset      
	<div>
        
@isset($page)
    @method('PUT')    
@endisset        
    @csrf    
	<div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">URL страницы: </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="urlpage" id="urlpage"
			value="@isset($page) {{ $page->urlpage }} @endisset">
	</div>		
  </div>	
  <br>
  <div class="input-group row">
  <label for="name" class="col-sm-2 col-form-label">Название (title):</label>
  <div class="col-sm-6">
	<input type="text" class="form-control" name="title" id="title"
			value="@isset($page) {{ $page->title }} @endisset">
	  </div>
  </div>	
  <br>
        
    
  <div class="input-group row">
  <label for="name" class="col-sm-2 col-form-label">Описание (description):</label>
  <div class="col-sm-6">
	<input type="text" class="form-control" name="description" id="description"
			value="@isset($page) {{ $page->description }} @endisset">
	  </div>
  </div>	
  <br>
        
        
        
  <div class="input-group row">
		<label for="description" class="col-sm-2 col-form-label">Содержание:</label>
		<div class="col-sm-6">
			<textarea style="height:400px;" name="content" id="content" cols="72" rows="72">@isset($page) {{ $page->content }} @endisset</textarea>
		</div>
	</div>

      <br>
	

	<button class="btn btn-success">Сохранить</button>
</div>	
</form>
</div>    
    
    
</div>
@endsection