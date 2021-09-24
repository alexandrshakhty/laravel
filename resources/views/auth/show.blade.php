@extends('auth.master')
@section('title','Просмотр категории')
@section('content')
<div style="padding: 50px 50px 50px 50px;">

	<div class="col-md-12">
		<h4>Категория {{ $category->name }} </h4>
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
			<td>{{ $category->id }}<td>
		</tr>
		<tr>
			<td>Код</td>
			<td>{{ $category->code }}</td>
		</tr>
		<tr>
			<td>Название</td>
			<td>{{ $category->name }}</td>
		</tr>		
		<tr>
			<td>Описание</td>
			<td>{{ $category->description }}</td>
		</tr>				
		<tr>
			<td>Картинка</td>
			<td>{{ $category->image }}</td>
		</tr>						
		<tr>
			<td>Количество товаров</td>
			<td>{{ $category->count() }}</td>
		</tr>						
		</tbody>		
	</table>	
</div>
  
    
    
</div>
@endsection