'use strict';

function validator(forms) {
	
	// Описываем все наши переменные используемые в модуле
	var 
		inputs = $(forms).find("[data-validation-type]");


	// Приватные методы, вся работа должна быть описана в этом блоке

	function _fnEcho() {
		console.log(text);
		alert(text);
	}

	function _validate(validateElement) {
		var validationType = $(validateElement).attr("data-validation-type");
		var validationFunctionName = "_validateFunc_" + validationType;
		switch (validationType) { // Вызываем методы валидации согласно типу поля
			case "email":
				_validateFuncEmail(validateElement);
				break;
			default: // по-умолчанию валидируем как текстовое поле
				_validateFuncText(validateElement);
		}
	}

	function _validateFuncText(validateElement) {
		if (!validateElement.value) { // Элемент пустой
			$(validateElement)
				.addClass("validator-error")
				.attr("validator-status", "no-text-content")
				.tooltip("show")
				;
		} else {
			$(validateElement)
				.removeClass("validator-error")
				.removeAttr("validator-status")
				.tooltip("hide")
				;
		}
	}

	function _validateFuncEmail(validateElement) {
		var mailText = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

		if (!validateElement.value) { // Элемент пустой
			$(validateElement)
				.addClass("validator-error")
				.attr("validator-status", "no-text-content")
				.tooltip("show")
				;
		} else if (!mailText.test(validateElement.value)) { // Текст не соответствует формату эл. почты
			$(validateElement)
				.addClass("validator-error")
				.attr("validator-status", "format-error")
				.tooltip("show")
				;
		} else {
			$(validateElement)
				.removeClass("validator-error")
				.removeAttr("validator-status")
				.tooltip("hide")
				;
		}
	}

	// Описываем публичные методы

	var fnEcho = (function() {
		_fnEcho();
	});

	var validateAllInputs = (function() {
		$.each(inputs, function(key, value) {
			_validate(value);
		});
		$(inputs).change(function(event) {
			_validate(event.target);
		});
		$(inputs).keyup(function(event) {
			_validate(event.target);
		});
	});

	var resetAllInputs = (function() {
		$(inputs)
			.removeClass("validator-error") // Очищаем статус ошибки
			.removeAttr("validator-status") // Ощищаем тип ошибки
		;
		$.each(inputs, function(key, value) {
			$(value).tooltip("hide");
		});
	});
	// Возвращаем публичные методы для работы с модулем

	return {
		echoLog				: fnEcho,
		resetAllInputs		: resetAllInputs,
	  	validateAllInputs	: validateAllInputs
	};

};