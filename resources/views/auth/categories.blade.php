@extends('auth.master')
@section('title','Категории')
@section('content')
<div style="padding: 50px 50px 50px 50px;">
    <h4>Категории товаров</h4>
<table class="table">
<tbody>
@foreach($categories as $category)    
<tr>
    
<td>    
{{ $category->id }}
</td>    

<td>    
{{ $category->name }}
</td>    
    
<td>    
{{ $category->code }}
</td>    


<td>    
{{ $category->parent }}
</td>    

<td>
 <div class="btn-group" role="group">
	<form action=" {{ route('categories.destroy',$category) }} " method="POST">
	 <a class="btn btn-success" type="button"
		href="{{ route('categories.show',$category) }}">Открыть</a>
	 <a class="btn btn-warning" type="button"
		href="{{ route('categories.edit',$category) }}">Изменить</a>
        @csrf
        @method('DELETE')
		<input class="btn btn-danger" type="submit" value="Удалить"></form>
	</div>
</td>	    
    
</tr>    
    
@endforeach
    
</tbody>    
</table>    
<a class="btn btn-success" type="button" href="{{ route('categories.create') }}">Добавить категорию</a>
</div>
@endsection