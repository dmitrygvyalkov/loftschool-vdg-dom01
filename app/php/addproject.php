<?php

session_start();
// Грузим конфиг
include_once("./config.php");

$uploaddir = $__config["uploaddir"];


if (isset($_GET["addimage"])) {

	if (!$_SESSION["adminAutorized"]) {
		exit();
	}
	// Процедура аплоада
	$uploadfile = $uploaddir . basename($_FILES['img']['name']);
	if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile)) {
		$_SESSION["img"] = $uploadfile;
	} else {
		$_SESSION["img"] = NULL;
	}
	
	exit();
}


// Рулит только админ

if (!$_SESSION["adminAutorized"]) {         echo json_encode( array(
'status' => 'error',                 'errorType' => 'security',
'errorData' => "Добавляет инфу только админ"             ), JSON_FORCE_OBJECT
);     exit();     }

// Переносим временный файл




if (!file_exists($_SESSION["img"])) {
	echo json_encode( array(
                'status' => 'error',
                'errorType' => 'uploadfile',
                'errorData' => "Не удалось загрузить изображение "
            ), JSON_FORCE_OBJECT );
    exit();
}

// Конвертируем изображение в нужный формат
$file_info  = getimagesize($_SESSION["img"]);

if (!($file_info["mime"] == "image/jpeg" || $file_info["mime"] == "image/png")) {
	echo json_encode( array(
                'status' => 'error',
                'errorType' => 'filetype',
                'errorData' => "Не поддерживаемый тип файла. "
                . $_SESSION["img"]
                . " Необходимо загружать только jpg или png "
            ), JSON_FORCE_OBJECT );
    exit();
}

function imageresize($outfile,$infile,$neww,$newh,$quality,$mime) {
	if ($mime == "image/jpeg") {
		$im=imagecreatefromjpeg($infile);
	} else {
		$im=imagecreatefrompng($infile);
	}
    
    $im1=imagecreatetruecolor($neww,$newh);
    imagecopyresampled($im1,$im,0,0,0,0,$neww,$newh,imagesx($im),imagesy($im));

    imagejpeg($im1,$outfile,$quality);
    imagedestroy($im);
    imagedestroy($im1);
    }



if ($file_info["width"] != 163 || $file_info["height"] != 119 || $file_info["mime"] != "image/jpeg") {
	// Конвертируем изображение
	imageresize($_SESSION["img"],$_SESSION["img"],163,119,75,$file_info["mime"]);
}


$config = $__config["mysql"];
$mysqli = new mysqli(	$config["host"], 
						$config["user"], 
						$config["password"], 
						$config["database"]
					);
if ($mysqli->connect_errno) {
	echo json_encode( array(
                'status' => 'error',
                'errorType' => 'database',
                'errorData' => "Не удается установить связь с БД"
                .$mysqli->connect_error
            ), JSON_FORCE_OBJECT );
	exit();
}

$query = "INSERT INTO `portfolio` (`id`, `name`, `url`, `description`) "
			 .	"VALUES (NULL, " 
			 .	"'". htmlspecialchars($_POST["project-name"]) ."', " 
			 .	"'". htmlspecialchars($_POST["url"]) ."', " 
			 .	"'". htmlspecialchars($_POST["description"]) ."');";

$mysqli->set_charset("utf8");
if (!$mysqli->query($query)) {
	echo json_encode( array(
                'status' => 'error',
                'errorType' => 'database',
                'errorData' => "Не удается добавить данные в БД " 
                . $query
            ), JSON_FORCE_OBJECT );
	exit();
}
	
$id = $mysqli->insert_id;

rename($_SESSION["img"], "../userfiles/portfolio-img-".$id.".jpg");


echo json_encode( array(
    'status' => 'success'
), JSON_FORCE_OBJECT );

ob_flush();

include_once("./generator.php");