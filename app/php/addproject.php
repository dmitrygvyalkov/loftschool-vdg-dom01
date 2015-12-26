<?php

session_start();
$uploaddir = '../tmp/';


//$fp = fopen($uploaddir."test.txt", "w");
//	fwrite($fp, print_r($_FILES, true));

if (isset($_GET["addimage"])) {
	// Процедура аплоада
	$uploadfile = $uploaddir . basename($_FILES['img']['name']);
	if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile)) {
		$_SESSION["img"] = $uploadfile;
	} else {
		$_SESSION["img"] = NULL;
	}
	
	exit();
}


// Валидация формы

// Переносим временній файл


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

echo json_encode( array(
    'status' => 'success'
), JSON_FORCE_OBJECT );