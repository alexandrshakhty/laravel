<!DOCTYPE html>
<html lang="ru-ru">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>@yield('title')</title>		
        <meta name="keywords" content="...">
        <meta name="description" content="@yield('description')">
        <meta content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1" name="viewport">
		<link href="http://.../favicon.png" rel="shortcut icon" type="image/x-icon">
        <link href="./css/ebony_clay.css" rel="stylesheet" type="text/css">
		<link href="./css/normalize.css" rel="stylesheet" type="text/css">
        <link href="./css/mobile.css" rel="stylesheet" type="text/css">
        <link href="./css/swiper.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="./css/framework7-icons.css">
        <script>
            window.shop_currency = 'руб.';
            window.shop_id = '1720';
            window.customer_discount = '';
            window.template_class = 'louise';
            window.item_img_zoom = '0';
            window.promo_discount = null;
            window.promo_title = null;
            window.one_click_buy = 0;
        </script>		
		<style>

		<style>
ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
}

ul.pagination li {display: inline;}

ul.pagination li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
}


</style>

		</style>
</head>
    <body class=" louise  rate_3 shop_1720" data-template="louise" data-color-scheme="ebony_clay"> 
        <div class="wrapper">
     <header>
    <div class="top_menu">
        <div class="inner">
            <div class="top_menu_left">
                <div class="mob_menu"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></div>
                <div class="menu_popup_mob">
                    <div class="mob_top">
                    <h2>Навигация по сайту</h2>
                    <li class="li"><a href="/help/about" class="" title="О сайте">О сайте</a></li>
                    <li class="li"><a href="/help/howtobuy" class="" title="Как купить?">Как купить?</a></li>
                    <li class="li"><a href="/help/delivery" class="" title="Доставка и оплата">Доставка и возврат</a></li>
                    <li class="li"><a href="/help/contact" class="" title="Контакты">Контакты</a></li>
                                                                            
                        <h2>Категории товаров</h2>
                        <div class="categories">
                            <ul class="level_1">
							@foreach($categories as $category)
							<li><a href="/{{$category->code}}" class="" title="{{$category->name}}">{{$category->name}}</a></li>
							@endforeach
							</ul>
                        </div>
                    </div>
                    <i class="f7-icons close">✕</i>
                </div>
                <a href="/" class="link_instagram"><img src="./css/logo.jpg" alt="Наименование ресурса"></a>
                            </div>
            <div class="top_menu_center">
                <div class="center menu">
                    <ul id="menu_list">
                        <li class="li link_animation"><a href="/">Главная</a></li>
						<li class="li link_animation"><a href="/help/about" class="" title="О компании">О сайте</a></li>
						<li class="li link_animation"><a href="/help/howtobuy" class="" title="Отзывы">Как купить?</a></li>
						<li class="li link_animation"><a href="/help/delivery" class="" title="Доставка и оплата">Доставка и возврат</a></li>
						<li class="li link_animation"><a href="/help/contact" class="" title="Контакты">Контакты</a></li>
					</ul>
                </div> 
            </div>
        </div>
    </div>      
    <div class="bottom_menu">
        <div class="inner">
            
            <div class="categories">
                <ul class="level_1">
							@foreach($categories as $category)
							<li class="li link_animation"><a href="/{{$category->code}}" class="" title="{{$category->name}}">{{$category->name}}</a></li>
							@endforeach
				</ul>
            </div> 
        </div>
    </div>
</header>
@yield('content')
        </div>       

<footer class="block">
    <div class="top">
        <div class="inner">
            <div class="fmenu">
                <div class="logo_wrapper">
                    <a class="logo" href="/">
                                                    <img src="./css/logo.jpg" alt="Наименование ресурса">
                                            </a>
                </div>
                <div class="copyright">©2021 Наименование ресурса</div>
                <a class="policy" href="/help/privacy">Политика конфиденциальности</a>
                <a class="user_agreement_link" href="/help/rules">Правила сайта</a>
                <div class="footer_site_info">
            <p>Используя данный сайт, вы автоматически принимаете&nbsp;условия пользовательского соглашения&nbsp;и соглашаетесь с политикой конфиденциальности. Указанные на сайте цены не являются публичной офертой и могут быть изменены в любое время.</p>
</div>
            </div>
            <div class="fmenu">
                <div class="footer_subtitle">О сайте</div>
                <ul>
                    <li><a href="/">Главная</a></li>
					<li><a href="/help/howtobuy">Как купить?</a></li>
					<li><a href="/help/delivery">Доставка и возврат</a></li>
					<li><a href="/help/contact">Контакты</a></li>
				</ul>
            </div>
            <div class="fmenu catalog">
                <div class="footer_subtitle">Каталог</div>
                <ul>
							@foreach($categories as $category)
							<li><a href="/{{$category->code}}" class="" title="{{$category->name}}">{{$category->name}}</a></li>
							@endforeach				
				</ul>
            </div>
            <div class="fmenu contact_us">
                <div class="footer_subtitle">Свяжитесь с нами</div>
                <div class="address">109651, г.Москва, ул. Название</div>
                <div>
                    <span class="mail_span">E-mail:</span>
                    <a href="mailto:">support@mail.ru</a>
                </div>
                <a class="footer_phone" href="tel:">8-000-000-00-00</a>
			</div>
        </div>
    </div>
</footer>

       <link href="./css/css2" rel="stylesheet">
        <script src="./css/jquery.min.js"></script>
        <script src="./css/feather.min.js"></script>
        <script src="./css/swiper.js" type="text/javascript"></script>
        <script>feather.replace();</script>
        <script src="./css/svgembedder.min.js"></script>
        <script src="./css/script.js" type="text/javascript"></script>
</body></html>