'use strict';

$(document).ready(function() { 

	// Загружаем поддержку плейсхолдеров в старых браузерах
	if (!Modernizr.placeholder) {
		var scriptPlaceholder = document.createElement('script');
		scriptPlaceholder.src = "bower/jquery.placeholder/jquery.placeholder.min.js";
		document.body.appendChild(scriptPlaceholder);
	}


	// Проверяем наличие формм с валидацией, и при необходимости загружаем валидатор
	var forms = $('.form-validator');
	
	if (forms.length) { // Формы требующие валидации есть на странице
		var validatorScriptLoader=document.createElement('script');
		validatorScriptLoader.type='text/javascript';
		validatorScriptLoader.src = 'js/vdg.validator.js';
		document.body.appendChild(validatorScriptLoader);
	}

	// Пишем обработчик собтия сабмита форм, на который вешаем и валидатор
	forms.submit(function(event) {
		event.preventDefault(); // Отключаем сабмит
		var formValidator = new validator($(this));
		formValidator.validateAllInputs();
	});


});