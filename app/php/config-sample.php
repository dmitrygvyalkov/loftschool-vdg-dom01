<?php

	$__config = array(
			"libsPath" => "./libs/",
			"destination" => "your@email.com",
			"destinationName" => "Вася Пупкин",
			"contactForm" => array(
					"subjectMail" => "Обратная связь с сайта"
				)
		);

	$__smtp = array(
			"host" => "smtp.yandex.ru", //smtp сервер
			"debug" => 0, //отображение информации дебаггера (0 ­ нет вообще)
			"auth" => true, //сервер требует авторизации
			"port" => 465, //порт (по­умолчанию ­ 25)
			"secure" => "ssl", // Метод шифрации, "ssl", "tls" 
			"serviceName" => "Сайт", // Название сервиса, используется в качестве имени отправителя
			"username" => "dima-mav", //имя пользователя на сервере
			"password" => "password", //пароль
			"addreply" => "your@email.com", //ваш е­mail
			"replyTo" => "your@email.com", //e­mail ответа
			"realName" => "Вася Пупкин", // Реальное имя для заголовка ответа
			"mailFrom" => "your@email.com" // Для формирования поля от кого письмо
		);