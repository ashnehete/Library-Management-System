<!DOCTYPE HTML>
<html lang='en'>
	<head>
		<meta charset='utf-8'>
		<title>Library</title>
		<meta name='viewport' content='width=device-width, initial-scale=1.0'>
		
		<!-- Loading Bootstrap -->
		<link href="css/vendor/bootstrap.min.css" rel="stylesheet">
		<!-- Loading Flat UI -->
		<link href="css/flat-ui.css" rel="stylesheet">
		<!-- Custom css -->
		<link href="css/library.css" rel="stylesheet">

		<link rel="shortcut icon" href="img/favicon.ico">

		<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
		<!--[if lt IE 9]>
		<script src="js/vendor/html5shiv.js"></script>
		<script src="js/vendor/respond.min.js"></script>
		<![endif]-->
		
	</head>
	
	<body>
		<div class='container' role='main'>
		
			<div class='jumbotron'>
			<h1>VidyaDeep Library</h1>
			<p>Date: <?= date("d-m-Y") ?></p>
			<p>Return: <?= date("d-m-Y", strtotime('+10 days'))?></p>
			</div>
			
			<ul class='nav nav-tabs' role='tablist'>
				<li role='presentation' class='active issue'><a href='#issue' aria-controls='issue' role='tab' data-toggle='tab'>Issue</a></li>
				<li role='presentation' class='return'><a href='#return' aria-controls='return' role='tab' data-toggle='tab'>Return</a></li>
				<li role='presentation' class='reissue'><a href='#reissue' aria-controls='reissue' role='tab' data-toggle='tab'>Reissue</a></li>
				<li role='presentation' class='search'><a href='#search' aria-controls='search' role='tab' data-toggle='tab'>Search</a></li>
				<li role='presentation' class='new'><a href='#new' aria-controls='new' role='tab' data-toggle='tab'>New</a></li>
			</ul>
			
			<div class='tab-content'>
				<div role='tabpanel' class='tab-pane active' id='issue'>
				<?php require("public/issue.php");?>
				</div>
				<div role='tabpanel' class='tab-pane' id='return'>
				<?php require("public/return.php");?>
				</div>
				<div role='tabpanel' class='tab-pane' id='reissue'>
				<?php require("public/reissue.php");?>
				</div>
				<div role='tabpanel' class='tab-pane' id='search'>
				<?php require("public/search.php");?>
				</div>
				<div role='tabpanel' class='tab-pane' id='new'>
				<?php require("public/new.php");?>
				</div>
			</div>
		</div>
		
	<!-- jQuery -->
    <script src="js/vendor/jquery.min.js"></script>
    <!-- Other files -->
    <script src="js/vendor/video.js"></script>
    <script src="js/flat-ui.min.js"></script>
	<!-- Custom file -->
	<script src="js/library.js"></script>
	</body>
</html>