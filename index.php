<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta HTTP-EQUIV="Refresh" TARGET="_new" Content="1000; URL=home.php">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Vistamar | Cool Intensity</title>
<meta name="Keywords" content="vistamar, Vista Mar, Vistamar, vinos, viña, viña vistamar"/>
<meta name="Description" content="Vistamar Cool Intensity. Confirma tu edad. Viña Vistamar."/>
<meta name="Distribution" content="global"/>
<meta name="Robots" content="all"/>
<link href="css/ingreso.css" rel="stylesheet" type="text/css">
<link href="dist/jquery.simple-popup.min.css" rel="stylesheet" type="text/css">
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,800,300,700,600' rel='stylesheet' type='text/css'>
<style>
	#popup1 { display:none; }
	a {cursor: pointer;}
</style>
</head>

<body>
	<div class="contenedor">
    	<div id="soporte">
    	<div class="importante">
        	<div id="logo-sp">
            	<img class="logo-img" src="img/vistamar4.png" alt="Vistamar Cool Stuff"/>
            </div>
            <div class="parrafos">
            	<span id="secreto">¿Tienes la edad legal <br>para beber alcohol en tu país?</span>
                
            </div>
            <div class="botones">
            	<a href="home.php" target="_self"><div class="btn-si m-right">SÍ
                </div></a>
                <a class="demo-2"><div class="btn-si">NO</div>
                </a>
                <div id="popup1">
                <img style="margin: auto; max-width: 100%; height: auto; display: block;" src="img/18-plus.png" alt="18 y más" >
                <h1 class="popup-text">Lo sentimos</h1>
                <h3 class="popup-text">Debes ser mayor de edad para entrar al sitio.</h3>
            </div>
            </div>
            <!--
            <div class="parrafos">
            	<span id="bajada">Debes ser mayor de edad para ingresar al sitio.</span>
            </div>
            -->
    	</div>
        </div>
	</div>
	
	
<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="dist/jquery.simple-popup.min.js"></script>
<script>
$(document).ready(function() {
  $("a.demo-1").simplePopup();
  $("a.demo-2").simplePopup({ type: "html", htmlSelector: "#popup1" });
});
</script>

</body>
</html>
