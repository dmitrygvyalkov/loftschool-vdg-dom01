'use strict';

$(document).ready(function() { 
	// Описываем тексты для тултипов
	var tooltipsText = { 
			"contacts-name"	: {
				"no-text-content"	: "введите имя"
			},

			"contacts-email"		: {
				"no-text-content"	: "введите email",
				"format-error"		: "введен некоректный адрес"
			}

		};

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
		// также загружаем модуль тултипов
		var tooltipScriptLoader=document.createElement('script');
		tooltipScriptLoader.type='text/javascript';
		tooltipScriptLoader.src = 'js/vdg.tooltips.js';
		document.body.appendChild(tooltipScriptLoader);
	}

	// Обработчик собтия сабмита форм, на который вешаем и валидатор
	forms.submit(function(event) {
		event.preventDefault(); // Отключаем сабмит
		var formValidator = new validator($(this));
		formValidator.validateAllInputs();
	});

	// Обработчик тултипов


});