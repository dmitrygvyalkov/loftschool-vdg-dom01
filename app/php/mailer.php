<?php

// Загружаем библиотеки
require($__config["libsPath"] . './libs/phpmailer/phpmailer/PHPMailerAutoload.php');

// Грузим конфиг
include("./config.php");

// Производим базовую валидацию

$name = htmlentities(trim($_POST["name"]), ENT_QUOTES, "UTF-8");
$email = htmlentities(trim($_POST["email"]), ENT_QUOTES, "UTF-8");
$message = htmlentities(trim($_POST["text"]), ENT_QUOTES, "UTF-8");


if (!$name) {
	echo json_encode( array(
    			'status' => 'error',
    			'errorType' => 'validation',
    			'errorData' => "Пустое имя"
    		), JSON_FORCE_OBJECT );
	exit();
}

if (!$email) {
	echo json_encode( array(
    			'status' => 'error',
    			'errorType' => 'validation',
    			'errorData' => "Пустое поле Email"
    		), JSON_FORCE_OBJECT );
	exit();
} else {
	// проверяем Email на шаблон
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		echo json_encode( array(
	    			'status' => 'error',
	    			'errorType' => 'validation',
	    			'errorData' => "Email не соответствует формату"
    			), JSON_FORCE_OBJECT );
		exit();
	}
}

if (!$message) {
	echo json_encode( array(
    			'status' => 'error',
    			'errorType' => 'validation',
    			'errorData' => "Нет текста сообщения"
    		), JSON_FORCE_OBJECT );
	exit();
}

$mail = new PHPMailer;

// Конфигурирование отправки
$mail->isSMTP();
$mail->SMTPDebug = $__smtp["debug"];
$mail->Host = $__smtp["host"];
$mail->Port = $__smtp["port"];
$mail->SMTPSecure = $__smtp["secure"];
$mail->SMTPAuth = $__smtp["auth"];
$mail->Username = $__smtp["username"];
$mail->Password = $__smtp["password"];
$mail->setFrom($__smtp["mailFrom"], $__smtp["realName"]);
$mail->addReplyTo($__smtp["replyTo"], $__smtp["realName"]);
$mail->addAddress($__config["destination"], $__config["destinationName"]);


// Формируем письмо
$mail->Subject = $__config["contactForm"]["subjectMail"];
$mail->Body = "Поступил запрос с формы обратной связи\n\n"
				. "Имя: " . $name . "\n"
				. "Email: " . $email . "\n\n"
				. "Тект сообщения:\n" . $message . "\n"
				;

// Отправка и проверка на ошибки
if (!$mail->send()) {
	echo json_encode( array(
    			'status' => 'error',
    			'errorType' => 'mail',
    			'errorData' => $mail->ErrorInfo
    		), JSON_FORCE_OBJECT );
} else {
    echo json_encode( array(
    			'status' => 'success'
    		), JSON_FORCE_OBJECT );
}