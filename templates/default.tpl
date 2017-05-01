<!DOCTYPE html>
<html>
   <head>
      <title>%title%</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="../styles/bootstrap.min.css" rel="stylesheet">
      <link href="../styles/vimwiki.css" rel="stylesheet">
 
      <!--[if lt IE 9]>
         <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
         <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
      <![endif]-->
      <!-- jQuery should be imported before boostrap.min.js -->
      <script src="../js/jquery-1.12.4.min.js"></script>
      <script src="../js/bootstrap.min.js"></script>
      <!-- the vimwiki customized scripts -->
      <script src="../js/vimwiki_db.js" charset="utf-8"></script>
      <script src="../js/vimwiki.js" charset="utf-8"></script>
   </head>
   <body>
      <div class="container">
	<div class="row clearfix">
	  <div class="col-md-12 column">
	    <ul class="nav nav-pills">
	      <li class="active">
		<a href="#">HOME</a>
	      </li>
	      <!-- more items are injected by the JS -->
	    </ul>

	    <div id="main-content">
	    %content%
	    </div>

	    <div id="footer">
	      <span class="notes">
		Thanks <a href="http://pages.github.com">githubPages</a> to
		provide the web hosting environment
	      </span>
	    </div>
	  </div>
	</div>
      </div> 
   </body>
</html>