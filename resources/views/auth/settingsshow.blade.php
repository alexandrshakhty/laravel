@extends('auth.master')
@section('title','Информация о сайте')
@section('content')
<div style="padding: 50px 50px 50px 50px;">

	<div class="col-md-12">
		<h4>Информация о сайте</h4>
		<table class="table">
		<tbody>
		<tr>
			<th>
			</th>
			<th>
			</th>
		</tr>	
		<tr>
			<td>Title</td>
			<td>{{ $setting->title }}<td>
		</tr>
		<tr>
			<td>Description</td>
			<td>{{ $setting->description }}</td>
		</tr>
		<tr>
			<td>Домен</td>
			<td>{{ $setting->domain }}</td>
		</tr>		
		<tr>
			<td>Название сайта</td>
			<td>{{ $setting->resourcename }}</td>
		</tr>				
		<tr>
			<td>Логотип сайта</td>
			<td>{{ $setting->logo }}</td>
		</tr>						
		<tr>
			<td>Главная страница (описание) </td>
			<td>{{ $setting->content }}</td>
		</tr>	            
		<tr>
			<td>Контакты (главная страница)</td>
			<td>{{ $setting->contacts }}</td>
		</tr>
		<tr>
			<td>Подвал (главная страница)</td>
			<td>{{ $setting->footer }}</td>
		</tr>             

		<tr>
            <td><br><b>Преимущества:</b></td>
			<td></td>
		</tr>              
		<tr>
			<td>{{ $setting->advantage1 }}</td>
			<td></td>
		</tr>             
		<tr>
			<td>{{ $setting->advantage2 }}</td>
			<td></td>
		</tr>             
		<tr>
			<td>{{ $setting->advantage3 }}</td>
			<td></td>
		</tr>             
		<tr>
			<td>{{ $setting->advantage4 }}</td>
			<td></td>
		</tr>             
		</tbody>		
	</table>	
</div>
<br>
<a class="btn btn-success" type="button" href="/settings/1/edit">Редактировать</a>    
</div>
@endsection