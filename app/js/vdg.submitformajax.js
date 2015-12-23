'use strict';

function vdgSubmitFormAjax(formObj, options) {
	// Объявляем переменные для нашей ыункции
	var	  formData // данные формы
		, ajaxQuery = {} // Запрос передаваемый функции ajax()
		, handlerFunctions = {} // Обработчики событий 
		, result = false// результат работы
		;


	// Настройки отправщика
	var settings = {
						success: "success",
						ajax: {
							url: "send.php",
							type: "post",
							cache: false
						}	
					};

	$.extend(true, settings, options);
	console.log(settings);
	
	formData = formObj.serializeArray();

	handlerFunctions = {
		success: function(data) {
			console.log("Запрос по почте отправлен");
			console.log(data);
		},
		error: function() {

		}
	}

	$.extend(ajaxQuery, settings.ajax, handlerFunctions ,{data: formData});

	console.log(ajaxQuery);
	
	if ($.ajax(ajaxQuery).responseText === settings.success) {
		result = true;
	}
	return result;
};