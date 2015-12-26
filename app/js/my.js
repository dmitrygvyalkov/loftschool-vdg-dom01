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
		// также загружаем модуль тултипов
		var tooltipScriptLoader=document.createElement('script');
		tooltipScriptLoader.type='text/javascript';
		tooltipScriptLoader.src = 'js/vdg.tooltips.js';
		document.body.appendChild(tooltipScriptLoader);
		// также загружаем модуль тултипов
		var submitFormScriptLoader=document.createElement('script');
		submitFormScriptLoader.type='text/javascript';
		submitFormScriptLoader.src = 'js/vdg.submitformajax.js';
		document.body.appendChild(submitFormScriptLoader);
	}

	// Скрываем кнопку добавления проектов неавторизированным пользователям
	// Для этого устанавливаем статусный класс html элементу
	
	var ajaxQuery = {
			type: "get",
			url: "/php/login.php?getstatus",
			dataType: "json",
			async: true,
			cache: false,
			success: function(data) {
				$("html").addClass("user-type-" + data.userType);
			}
		};
	$.ajax(ajaxQuery);

	// Обработчик собтия сабмита форм, на который вешаем и валидатор
	var formValidator;
	var contactForm 	= $("#contact-form"),
		loginForm		= $("#loginForm"),
		portfolioForm	= $("#portfolioForm")
		;



	$('#portfolio-img').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	console.log("Закончилась загрузка файла");
        	console.log(data);
        },

        add: function(e, data) {
        	console.log("Добавлен файл в загрузку");
        	console.log(data);
        	$(e.target).siblings(".placeholder")
        					.html(data.files[0].name)
        					.removeClass("no-file");
        	$("html").data("upload-filename", data.files[0].name);
        	$(e.target).keyup();
        	data.submit();
        },

        progressall: function (e, data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        console.log(data);
	        console.log("Загрузка файла " + progress);
	        
	        $('#progress .bar').css(
	            'width',
	            progress + '%'
	        );
	    }
    });



	portfolioForm.submit(function(event) {
		event.preventDefault(); // Отключаем сабмит
		if (!formValidator) {
			formValidator = new validator($(this));
		}
		formValidator.validateAllInputs();

		// Проверка на наличие ошибок валидации
		
		console.log($(this).find(".validator-error").length);
		if (!$(this).find(".validator-error").length) {
			console.log("Посылаем запрос с добавлением проекта на сервер");
			vdgSubmitFormAjax($(this),
				{
					success: function(data) {
							console.log(data);
							if (data.status === "success") {
								
							// Все отлично, форма отправлена и успешно обработана
							buildInfoWindow("submit-ok", '<div class="title">Поздравляем!</div>'
													+ 'Проект успешно добавлен в портфолио'
													);
							// Очищаем поля формы
							var inputs = $(".text-input, .textarea");
							$.each(inputs, function(key, value) {
								console.log(value);
								value.value = "";
							});
						} else {
							// Что-то пошло не так, выводим сообщение об ошибке
							buildInfoWindow("submit-error", '<div class="title">Ошибка!</div>'
								+ data.errorData);
						}
					},
					error: function() {
						buildInfoWindow("submit-error", '<div class="title">Ошибка!</div>Невозможно отправить сообщение. '
								+ "Попробуйте позже");
					}
				},
				{
					ajax : {
						// url: "php/mailer.php"
					}
				}
			);
		}
	});

	loginForm.submit(function(event) {
		event.preventDefault(); // Отключаем сабмит
		if (!formValidator) {
			formValidator = new validator($(this));
		}
		formValidator.validateAllInputs();
		// Проверка на наличие ошибок валидации
		if (!$(this).find(".validator-error").length) {
			vdgSubmitFormAjax($(this),
				{
					success: function(data) {
							if (data.status === "success") {
							// Все отлично, форма отправлена и успешно обработана
							buildInfoWindow("submit-ok", '<div class="title">Поздравляем!</div>'
													+ 'Вы вошли как администратор'
													+ 'Если вас не перенаправит на сайт '
													+ '<a href="/">Перейдите по ссылке</a>');
							// Очищаем поля формы
							var inputs = $(".text-input, .textarea");
							$.each(inputs, function(key, value) {
								console.log(value);
								value.value = "";
							});

							// Перебрасываем на главную
							window.setTimeout(function() {
								$(location).attr('href',"/");
							}, 2000);
						} else {
							// Что-то пошло не так, выводим сообщение об ошибке
							buildInfoWindow("submit-error", '<div class="title">Ошибка!</div>'
								+ data.errorData);
						}
					},
					error: function() {
						buildInfoWindow("submit-error", '<div class="title">Ошибка!</div>Невозможно отправить сообщение. '
								+ "Попробуйте позже");
					}
				},
				{
					ajax : {
						// url: "php/mailer.php"
					}
				}
			);
		}
	});


	contactForm.submit(function(event) {
		event.preventDefault(); // Отключаем сабмит
		if (!formValidator) {
			formValidator = new validator($(this));
		}
		formValidator.validateAllInputs();
		// Проверка на наличие ошибок валидации
		if (!$(this).find(".validator-error").length) {
			vdgSubmitFormAjax($(this),
				{
					success: function(data) {
							if (data.status === "success") {
							// Все отлично, форма отправлена и успешно обработана
							buildInfoWindow("submit-ok", '<div class="title">Спасибо!</div>Мы обязательно свяжемся с вами');
							// Очищаем поля формы
							var inputs = $(".text-input, .textarea");
							$.each(inputs, function(key, value) {
								console.log(value);
								value.value = "";
							})
						} else {
							// Что-то пошло не так, выводим сообщение об ошибке
							buildInfoWindow("submit-error", '<div class="title">Ошибка!</div>'
								+ data.errorData);
						}
					},
					error: function() {
						buildInfoWindow("submit-error", '<div class="title">Ошибка!</div>Невозможно отправить сообщение. '
								+ "Попробуйте позже");
					}
				},
				{
					ajax : {
						// url: "php/mailer.php"
					}
				}
			);
		}
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

	// Создание модального окна
	function buildInfoWindow(windowClasses, htmlText, windowContainer) {
		
		var windowHtml = '<div class="window-info-box '+ windowClasses +'">';

		if (windowClasses === "submit-error") {
			windowHtml += '<div class="window-close ico ico-close-error">X</div>';
		} else {
			windowHtml += '<div class="window-close ico ico-close-form">X</div>';
		}

		windowHtml += '<div class="content">' + htmlText + '</div></div>';

		if (windowContainer) {
			windowContainer.append(windowHtml);
		} else {
			$("body").append(windowHtml);
		};

		$(".window-info-box .window-close").click(function(event) {
			$(this).parent().remove();
		});
	};
});