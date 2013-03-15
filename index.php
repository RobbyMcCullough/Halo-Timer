<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Halo 4 Timer</title>

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script type="text/javascript" src="js/libs/jquery.timer.js"></script>
    <script type="text/javascript" src="js/haloTimer.js"></script>
	

	<link href='http://fonts.googleapis.com/css?family=Roboto:400,900' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/style.css"></style>
</head>
<body>
<div id="bg-image"></div>
<div id="wrap">

	<a href="/" id="logo"></a>
	
	<div id="instructions">
		<p>
			Use this timer to track weapon respawn times<br />
			Buttons 1-6 start &amp; start the corresponding timer<br />
			Click the timestamp to change the time
		</p>
	</div>

	<div id="settings">
		<div><button id="sound" class="checkbox checked"></button> Enable Sound</div>
		<div><button id="looping" class="checkbox"></button>  Loop Timers</div>
	</div>

	<div class="clear"></div>

	<div class="section">
		<div class="button" id="bOne"><input type="text" value="2:00" /></div>
		<div class="button" id="bTwo"><input type="text" value="2:20" /></div>
		<div class="button" id="bThree"><input type="text" value="2:00" /></div>
	</div>
	
	<div class="section">
		<div class="button" id="bFour"><input type="text" value="1:00" /></div>
		<div class="button" id="bFive"><input type="text" value="0:08" /></div>
		<div class="button" id="bSix"><input type="text" value="0:04" /></div>
	</div>


	<a href="http://technobred.com" title="TechnoBRED - Gaming Tutorials and Community" id="footer-credit"></a>
	<audio id="soundHandle"></audio>
</div> <!-- END wrap -->

</body>
</html>