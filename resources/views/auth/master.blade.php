<!DOCTYPE html>
<html>
<head>
  <title>Панель управления: @yield('title')</title>
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="{{ request()->root() }}/css/materialize.min.css">
  <link href="{{ request()->root() }}/favicon.ico" rel="shortcut icon" type="image/x-icon">    

  <style type="text/css">
  	header,
	main,
	footer {
	  padding-left: 240px;
	}

	body {
	  backgroud: white;
	}

	@media only screen and (max-width: 992px) {
	  header,
	  main,
	  footer {
	    padding-left: 0;
	  }
	}

	#credits li,
	#credits li a {
	  color: white;
	}

	#credits li a {
	  font-weight: bold;
	}

	.footer-copyright .container,
	.footer-copyright .container a {
	  color: #BCC2E2;
	}

	.fab-tip {
	  position: fixed;
	  right: 85px;
	  padding: 0px 0.5rem;
	  text-align: right;
	  background-color: #323232;
	  border-radius: 2px;
	  color: #FFF;
	  width: auto;
	}
  </style>
</head>

<body>

  <ul id="slide-out" class="side-nav fixed z-depth-2">
    <li class="center no-padding">
      <div class="indigo darken-2 white-text" style="height: 180px;">
        <div class="row">
          <img style="margin-top: 5%;" width="100" height="100" src="{{ request()->root() }}/img/photo.png" class="circle responsive-img" />

          <p style="margin-top: -13%;">
            Панель управления
          </p>
        </div>
      </div>
    </li>

    <li id="dash_dashboard"><a class="waves-effect" href="/settings/1"><b>Настройки</b></a></li>
    <li id="dash_dashboard"><a class="waves-effect" href="{{ route('pages.index') }}"><b>Страницы</b></a></li>
    <li id="dash_dashboard"><a class="waves-effect" href="{{ route('categories.index') }}"><b>Категории</b></a></li>      

    <ul class="collapsible" data-collapsible="accordion">

      <li id="dash_products">
        <div id="dash_products_header" class="collapsible-header waves-effect"><b>Товары</b></div>
        <div id="dash_products_body" class="collapsible-body">
          <ul>
            <li id="products_product">
              <a class="waves-effect" style="text-decoration: none;" href="#!">Products</a>
              <a class="waves-effect" style="text-decoration: none;" href="#!">Orders</a>
            </li>
          </ul>
        </div>
      </li>



      <li id="dash_brands">
        <div id="dash_brands_header" class="collapsible-header waves-effect"><b>Брэнды</b></div>
        <div id="dash_brands_body" class="collapsible-body">
          <ul>
            <li id="brands_brand">
              <a class="waves-effect" style="text-decoration: none;" href="#!">Brand</a>
            </li>

            <li id="brands_sub_brand">
              <a class="waves-effect" style="text-decoration: none;" href="#!">Sub Brand</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </ul>

  <header>
    <ul class="dropdown-content" id="user_dropdown">
      <li><a class="indigo-text" href="{{ route('home') }}">Профиль</a></li>
      <li><a class="indigo-text" href="{{ route('logout') }}">Выход</a></li>
    </ul>

    <nav class="indigo" role="navigation">
      <div class="nav-wrapper">
        <!-- <a data-activates="slide-out" class="button-collapse show-on-large" href="#!"><img style="margin-top: 17px; margin-left: 5px;" src="{{ request()->root() }}/img/logo.jpg" /></a> -->

        <ul class="right hide-on-med-and-down">
          <li>
            <a class='right dropdown-button' href='' data-activates='user_dropdown'><i class=' material-icons'>account_circle</i></a>
          </li>
        </ul>

        <a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
      </div>
    </nav>

    <nav>
      <div class="nav-wrapper indigo darken-2">
        <a style="margin-left: 20px;" class="breadcrumb" href="{{ route('home') }}">Администрирование</a>
        

        <div style="margin-right: 20px;" id="timestamp" class="right"></div>
      </div>
    </nav>
  </header>

  <main>
 @yield('content')
  </main>

  <footer class="indigo page-footer">
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h5 class="white-text"></h5>
          <ul id='credits'>
            <li>
				Панель управления
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <span></span>
      </div>
    </div>
  </footer>

  <script type="text/javascript" src="{{ request()->root() }}/img/jquery-2.2.4.min.js"></script>  
  <script type="text/javascript" src="{{ request()->root() }}/img/materialize.min.js"></script>

  <script type="text/javascript">
  	$(document).ready(function() {
  		$('.button-collapse').sideNav();
		$('.collapsible').collapsible();
		$('select').material_select();
  	});
  </script>

</body>
</html>