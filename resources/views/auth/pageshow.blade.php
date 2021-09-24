@extends('auth.master')
@section('title','Просмотр страницы')
@section('content')
<div style="padding: 50px 50px 50px 50px;">

	<div class="col-md-12">
		<h4>Страница: {{ $page->title }} </h4>
		<table class="table">
		<tbody>
		<tr>
			<th>
				Поле
			</th>
			<th>
				Значение
			</th>
		</tr>	
		<tr>
			<td>ID</td>
			<td>{{ $page->id }}<td>
		</tr>
            
            
		<tr>
			<td>Заголовок (title)</td>
			<td>{{ $page->title }}</td>
		</tr>		
            

		<tr>
			<td>Описание (description)</td>
			<td>{{ $page->description }}</td>
		</tr>		
            
            
		<tr>
			<td>Содержание</td>
			<td>{{ $page->content }}</td>
		</tr>		
            
		</tbody>		
	</table>	
</div>
  
    
    
</div>
@endsection