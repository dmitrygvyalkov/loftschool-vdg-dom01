<?php
session_start();

// Грузим конфиг
include("./config.php");

if (isset($_GET["getstatus"])) {
	if ($_SESSION["adminAutorized"]) {
		$adminAutorized = "admin";
	} else {
		$adminAutorized = "user";
	}
	echo json_encode( array(
                'userType' => $adminAutorized
            ), JSON_FORCE_OBJECT );
    exit();
}

$email = $_POST["email"];
$password = md5($_POST["password"]);


if(($email != $__config["adminEmail"]) || ($password != $__config["adminPassword"])) {
	echo json_encode( array(
                'status' => 'error',
                'errorType' => 'login',
                'errorData' => "Логин или пароль не соответствуют"
            ), JSON_FORCE_OBJECT );
	$_SESSION["adminAutorized"] = false;
    exit();
}

$_SESSION["adminAutorized"] = true;

echo json_encode( array(
                'status' => 'success',
            ), JSON_FORCE_OBJECT );