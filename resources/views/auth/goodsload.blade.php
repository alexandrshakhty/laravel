@extends('auth.master')
@section('title','Загрузить товары')

@section('content')
<div style="padding: 50px 50px 50px 50px;">
    <h4>Загрузить товары</h4>
<br>
<center>
    <form action="/csvfileupload" method="post" enctype="multipart/form-data">        
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <h5><label> Выберите файл для загрузки (CSV только):</label>
    <input type="file" name="csvfile"/></h5>
    <h5><input type="submit" name="upload" value="Загрузить"/></h5>
    </form>
    {{ csrf_field() }}
</center>    
</div>
@endsection