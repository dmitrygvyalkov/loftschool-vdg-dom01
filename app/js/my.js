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
	var formValidator;
	forms.submit(function(event) {
		event.preventDefault(); // Отключаем сабмит
		if (!formValidator) {
			formValidator = new validator($(this));
		}
		formValidator.validateAllInputs();
	});

	// Навешиваем обработку клика по кнопке сброса
	forms.find("[type=reset]")
		.click(function() {
			if (formValidator) {
				formValidator.resetAllInputs();
			};
		});

	// модальное окно
	var overlay = $('#overlay');
    var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
    var close = $('.modal_close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    var modal = $('.modal_div'); // все скрытые мoдaльные oкнa

     open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
         event.preventDefault(); // вырубaем стaндaртнoе пoведение
         var div = $(this).attr('data-formname'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
         overlay.fadeIn(400, //пoкaзывaем oверлэй
             function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
                 $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
                     .css('display', 'block') 
                     .animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем
         });
     });

     close.click( function(){ // лoвим клик пo крестику или oверлэю
            modal // все мoдaльные oкнa
             .animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
                 function(){ // пoсле этoгo
                     $(this).css('display', 'none');
                     overlay.fadeOut(400); // прячем пoдлoжку
                 }
             );
     });

});