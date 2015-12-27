<?php

	$__config = array(
			"libsPath" => "./libs/", // путь к директории сторонних php скриптов
			"uploaddir" => '../tmp/', // папка временной загрузки изображений
			"destination" => "your@email.com", // Email адресата сообщений
			"adminEmail" => "your@email.com", // Административный адрес для админки
			"adminPassword" => md5("adminPassword"), // пароль в админку
			"destinationName" => "Вася Пупкин", // Имя адресата
			"contactForm" => array( // Тема сообщений с сайта
					"subjectMail" => "Обратная связь с сайта"
				),
			"mysql"	=> array( // конфигурация БД
					"host" => "localhost",
					"user" => "dbuser",
					"password" => "db-password",
					"database" => "db-name"
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