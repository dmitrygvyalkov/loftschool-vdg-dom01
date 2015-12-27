<?php

session_start();
// Грузим конфиг
include_once("./config.php");

$uploaddir = $__config["uploaddir"];

if (!$_SESSION["adminAutorized"]) {
	exit();
}

ob_start();

include("./tpl/portfolio-header.tpl.html");

$config = $__config["mysql"];
$mysqli = new mysqli(	$config["host"], 
						$config["user"], 
						$config["password"], 
						$config["database"]
					);
if ($mysqli->connect_errno) {
	exit();
}

$query = "SELECT * FROM `portfolio`";

$mysqli->set_charset("utf8");
$res = $mysqli->query($query);

$res->data_seek(0);
while ($row = $res->fetch_assoc()) {
?>
						<li class="portfolio-element">
							<div class="tmb"><img src="userfiles/portfolio-img-<?php echo $row["id"]; ?>.jpg" height="119" width="163" alt="" class="portfolio-img"></div>
							<div class="url"><a href="http://<?php echo $row["url"]; ?>/" target="_blank"><?php echo $row["url"]; ?></a></div>
							<div class="desc"><?php echo $row["description"]; ?></div>
						</li>
<?php
}

include("./tpl/portfolio-footer.tpl.html");

$fp = fopen("../portfolio.html", "w");

if (!$fp) {
	exit();
}

fwrite($fp, ob_get_contents());

ob_end_clean();