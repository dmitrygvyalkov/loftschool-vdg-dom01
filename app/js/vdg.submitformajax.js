'use strict';

function vdgSubmitFormAjax(formObj, handlerFunctions, options) {
	// Объявляем переменные для нашей ыункции
	var	  formData // данные формы
		, ajaxQuery = {} // Запрос передаваемый функции ajax()
		, result = false// результат работы
		, queryResult
		;

	// Настройки отправщика
	var settings = {
						success: "success",
						ajax: {
							url: formObj.attr("action"),
							type: "post",
							dataType: "json",
							cache: false
						}	
					};

	$.extend(true, settings, options);
	
	formData = formObj.serializeArray();

	$.extend(ajaxQuery
		, settings.ajax
		, {data: formData}
		, handlerFunctions
		);

	$.ajax(ajaxQuery);
};