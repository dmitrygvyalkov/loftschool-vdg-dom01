'use strict';

(function( $ ){

	var tooltipTexts = {
		"no-text-content": {
			"default": "заполните поле",
			"contacts-name"		: "введите&nbsp;имя",
			"contacts-email"	: "введите&nbsp;email",
			"contacts-captcha"	: "код&nbsp;капчи",
			"contacts-text"		: "ваш&nbsp;вопрос",
			"login-email"		: "введите&nbsp;email",
			"login-password"	: "введите&nbsp;пароль"
		},
		"format-error": {
			"default": "неверный формат",
			"contacts-email"	: "это не email" 
		}
	}

	var methods = {
		init : function( options ) {

		return this.each(function(){
			$(this).bind('resize.tooltip', methods.reposition); // биндим модификацию
			// создаем тултип в DOM
			var parentBlock = $(this).parent();
			parentBlock.append('<div class="vdg-tooltip-block"></div>');
			var tooltipElement = parentBlock.find(".vdg-tooltip-block");
			var data = $(this).data("tooltip");
			var location = data.location;
			if ($(this).attr("data-tooltip-location")) {
				location = $(this).attr("data-tooltip-location");
				data.location = location;
			}
			tooltipElement.addClass(location);
			data.tooltipElement = tooltipElement;
			$(this).data("tooltip" , data);
			
		});

	},

	destroy : function( ) {

		return this.each(function(){
			 $(this).unbind('.tooltip');
		})

	},

	reposition : function( ) { 
		var top, left;
			var data = $(this).data("tooltip");
			var tooltipElement = data.tooltipElement;

			$(this).data("tooltip", data)
			var inputPosition = $(this).position();
		if(data.location === "right") {
			top = inputPosition.top + ($(this).outerHeight() / 2)
					- (tooltipElement.outerHeight() / 2);
			left = inputPosition.left + $(this).outerWidth();
		} else {
			top = inputPosition.top + ($(this).outerHeight() / 2)
					- (tooltipElement.outerHeight() / 2);
			left = inputPosition.left - tooltipElement.outerWidth();
		}	

		tooltipElement
				.css("top", top + "px")
				.css("left", left + "px")
			;
	},

	show : function( ) { 
		var data = $(this).data("tooltip");
		// Устанавливае текст сообщения для тултипа
		var errorFormat = $(this).attr("validator-status");
		var tooltipTextObj = tooltipTexts[errorFormat];
		var tooltipText;
		if ($(this).attr("id") in tooltipTextObj) {
			tooltipText = tooltipTextObj[$(this).attr("id")];
		} else {
			tooltipText = tooltipTextObj["default"];
		}
		data.tooltipElement.html(tooltipText);
		methods.reposition.apply( this, arguments );
		data.tooltipElement.show();
	},
	
	hide : function( ) {
		var data = $(this).data("tooltip");
		data.tooltipElement.hide();
	}
  };

  $.fn.tooltip = function( method , options) {
    // блок внутренних переменных
    var data = this.data("tooltip");
    // инициализируем тултип, только один раз
    if (!data) {
    	this.data("tooltip", {
    		target: this,
    		initialized: true,
    		location: "left"
    	});
    	methods.init.apply( this, arguments );
    }

    // Создаем именованные методы
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    }    
  
  };

})( jQuery );