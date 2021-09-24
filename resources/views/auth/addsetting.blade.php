@extends('auth.master')

@isset($setting)
    @section('title','Изменить параметры сайта')
@else
    @section('title','Новые параметры сайта')
@endisset


@section('content')
<div style="padding: 50px 50px 50px 50px;">


<div class="col-md-12">

    
@isset($setting)
    <h4>Изменить параметры сайта</b></h4>
@else
        <h4>Новые параметры сайта</h4>
@endisset

<form method="POST" enctype="multipart/form-data"
      
@isset($setting)      
	action="{{ route('settings.update',$setting) }}">      
     @else
	action="{{ route('settings.store') }}">      
@endisset      
	<div>
        
@isset($setting)
    @method('PUT')    
@endisset        
    @csrf    
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Title: </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="title" id="title"
			value="@isset($setting) {{ $setting->title }} @endisset">
	</div>		
  </div>	
  <br>
       
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Description: </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="description" id="description"
			value="@isset($setting) {{ $setting->description }} @endisset">
	</div>		
  </div>	
 <br>       
        
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Домен: </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="domain" id="domain"
			value="@isset($setting) {{ $setting->domain }} @endisset">
	</div>		
  </div>	
 <br>       
        
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Название сайта: </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="resourcename" id="resourcename"
			value="@isset($setting) {{ $setting->resourcename }} @endisset">
	</div>		
  </div>	
 <br>       
        
	<div class="input-group row">
		<label for="logo" class="col-sm-2 col-form-label">Логотип:</label>
		<div class="col-sm-10">
			<label class="btn btn-default btn-file">
			Загрузить <input type="file" style="display:none;" name="logo" id="logo">
			</label>
		</div>
	</div>
 <br>           
        
  <div class="input-group row">
		<label for="description" class="col-sm-2 col-form-label">Главная страница (описание):</label>
		<div class="col-sm-6">
			<textarea style="height:200px;" name="content" id="content" cols="72" rows="72">@isset($setting) {{ $setting->content }} @endisset</textarea>
		</div>
	</div>
    <br>    
        
 
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Контакты (главная страница): </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="contacts" id="contacts"
			value="@isset($setting) {{ $setting->contacts }} @endisset">
	</div>		
  </div>	
 <br>           

        
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Подвал (главная страница): </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="footer" id="footer"
			value="@isset($setting) {{ $setting->footer }} @endisset">
	</div>		
  </div>	
 <br>           
        


        
  <div class="input-group row">
	<label for="code" class="col-sm-2 col-form-label">Преимущества (главная страница): </label>
	<div class="col-sm-6">
		<input type="text" class="form-control" name="advantage1" id="advantage1"
			value="@isset($setting) {{ $setting->advantage1 }} @endisset">
	</div>	
      
	<div class="col-sm-6">
		<input type="text" class="form-control" name="advantage2" id="advantage2"
			value="@isset($setting) {{ $setting->advantage2 }} @endisset">
	</div>	
      
	<div class="col-sm-6">
		<input type="text" class="form-control" name="advantage3" id="advantage3"
			value="@isset($setting) {{ $setting->advantage3 }} @endisset">
	</div>	      

	<div class="col-sm-6">
		<input type="text" class="form-control" name="advantage4" id="advantage4"
			value="@isset($setting) {{ $setting->advantage4 }} @endisset">
	</div>	      
      
  </div>	
 <br>          
        
        
        
<br>

	<button class="btn btn-success">Сохранить</button>
</div>	
</form>
</div>    
    
    
</div>
@endsection