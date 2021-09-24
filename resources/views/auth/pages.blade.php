@extends('auth.master')
@section('title','Страницы')
@section('content')
<div style="padding: 50px 50px 50px 50px;">
    <h4>Страницы</h4>
<table class="table">
<tbody>
@foreach($pages as $page)    
<tr>
    
<td>    
{{ $page->id }}
</td>    

<td>    
{{ $page->title }}
</td>    
    
<td width="50%">    
{{ $page->description }}
</td>    


<td>    
{{ $page->urlpage }}
</td>    

<td>
 <div class="btn-group" role="group">
	<form action=" {{ route('pages.destroy',$page) }} " method="POST">
	 <a class="btn btn-success" type="button"
		href="{{ route('pages.show',$page) }}">Открыть</a>
	 <a class="btn btn-warning" type="button"
		href="{{ route('pages.edit',$page) }}">Изменить</a>
        @csrf
        @method('DELETE')
		<input class="btn btn-danger" type="submit" value="Удалить"></form>
	</div>
</td>	    
    
</tr>    
    
@endforeach
    
</tbody>    
</table>
<br>
<a class="btn btn-success" type="button" href="{{ route('pages.create') }}">Добавить страницу</a>    
    
</div>
@endsection