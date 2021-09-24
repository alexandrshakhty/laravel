@extends('auth.master')

@isset($category)
    @section('title','Редактировать категорию '.$category->name)
@else
    @section('title','Создать категорию')
@endisset


@section('content')
<div style="padding: 50px 50px 50px 50px;">


<div class="col-md-12">

    
@isset($category)
    <h4>Редактировать категорию <b>{{ $category->name }}</b></h4>
@else
        <h4>Добавить категорию</h4>
@endisset

<form method="POST" enctype="multipart/form-data"
      
@isset($category)      
	action="{{ route('categories.update',$category) }}">      
     @else
	action="{{ route('categories.store') }}">      
@endisset      
	<div>
        
@isset($category)
    @method('PUT')    
@endisset        
    @csrf    
	<div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">URL категории: </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="code" id="code"
			value="@isset($category) {{ $category->code }} @endisset">
	</div>		
  </div>	
  <br>
  <div class="input-group row">
  <label for="name" class="col-sm-2 col-form-label">Название:</label>
  <div class="col-sm-6">
	<input type="text" class="form-control" name="name" id="name"
			value="@isset($category) {{ $category->name }} @endisset">
	  </div>
  </div>	
  <br>
  <div class="input-group row">
		<label for="description" class="col-sm-2 col-form-label">Описание:</label>
		<div class="col-sm-6">
			<textarea style="height:200px;" name="description" id="description" cols="72" rows="72">@isset($category) {{ $category->description }} @endisset</textarea>
		</div>
	</div>
    <br>    
      <div class="input-group row">
		<label for="description" class="col-sm-2 col-form-label">Родительская:</label>
		<div class="col-sm-6">
			         <select name="parent" id="parent" class="form-control">
                         <option value="0">Нет</option>
	                   @foreach($categories as $category)
		                  <option value="{{ $category->id }}">{{ $category->name }}</option>
	                   @endforeach
                    </select>	
		</div>
	</div>    
	<br>
	<div class="input-group row">
		<label for="image" class="col-sm-2 col-form-label">Картинка:</label>
		<div class="col-sm-10">
			<label class="btn btn-default btn-file">
			Загрузить <input type="file" style="display:none;" name="image" id="image">
			</label>
		</div>
	</div>
	<button class="btn btn-success">Сохранить</button>
</div>	
</form>
</div>    
    
    
</div>
@endsection