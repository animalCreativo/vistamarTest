<?php include 'header.php';?>
 
  <div class="main-wrapper-onepage main oh">

    <!-- Process -->
    <section class="section-wrap process no-pad" style="background-image: url(img/cool-stuff-header.jpg)">
		<div class="tela head_image">
      <div class="container">

        <div class="row heading">
          <div class="col-md-6 col-md-offset-3">
            <h2 class="text-center color-white">Cool Stuff</h2>
            <img class="center-block" width="50" height="auto" src="img/line-separator.png" alt="" />
          </div>
        </div>

      </div>
		</div>
    </section> <!-- process -->
    
    <!-- menu cool stuff -->
   <section class="no-pad bgc-mcgray">
   	<div class="container">
   		<div class="menu-cool">
   			<div class="item-cool bread-color">AWARDS</div>
   			<a href="videos.php" style="color: #fff"><div class="item-cool">VIDEOS</div></a>
			<a href="news.php" style="color: #fff"><div class="item-cool">NOTICIAS</div></a>
			<a href="social.php" style="color: #fff"><div class="item-cool">SOCIAL</div></a>
   		</div>
   	</div>
   </section>
   
   
    <section class="section-wrap process pad-top-40 pad-bot-700">
    	<div class="container data-spy="scroll" data-offset="10" data-target=".navbar-fixed-top"">

			  <h3><strong>AWARDS</strong></h3>
    		<div class="row mar-bot-25">
    			<div class="col-lg-3 col-sm-12">
    				<form name="change">
						  <select id="rangeOption"></select>
					  </form>
    			</div>
    			<div class="col-lg-3 col-sm-12">
    				<form name="change">
						  <select id="varietiesOption"></select>
					  </form>
    			</div>
    			<div class="col-lg-3 col-sm-12">
    				<form name="change">
						  <select id="vintageOption"></select>
					  </form>
    			</div>	
    		</div>
      </div> 
    		<!-- END NAV AWARDS -->
      <div class="container">
    		<div class="col-lg-12">
    			<div class="row">
  				    <div class="col-sm-12">
  				      <table id="tablaVinos" border="0" cellpadding="0" cellspacing="0" class="table table-condensed table-hover">
    							<thead>
    							    <tr>
    							      <th width="120px" align="center"><strong>RANGE</strong></th>
    							      <th width="200px" align="center"><strong>VARIETIES</strong></th>
    							      <th width="80px" align="center"><strong>VINTAGE</strong></th>
    							      <th width="350px" align="center" colspan="2"><strong>AWARD</strong></th>
    							    </tr>
    							</thead>
    						  <tbody id="tablaVinosBody">
    							    <tr>
    							      <td>Gran Reserva</td>
    							      <td>Cabernet Sauvignon / Syrah</td>
    							      <td>2010</td>
    							      <td width="100">Silver</td>
    							      <td>Int'l  Wine & Spirit Competition</td>
    							    </tr>
    							    <tr>
    							      <td>Gran Reserva</td>
    							      <td>Cabernet Sauvignon / Syrah</td>
    							      <td>2010</td>
    							      <td>Great Gold</td>
    							      <td>Concours Mondial de Bruxelles</td>
    							    </tr>
    						  </tbody>
  						  </table>
  				    </div>
				  </div>
    	  </div>
    	</div>
    </section>
<!-- <section class="section-wrap promo-section vinedo" id="valleys"> -->
     


<?php include 'footer.php';?>