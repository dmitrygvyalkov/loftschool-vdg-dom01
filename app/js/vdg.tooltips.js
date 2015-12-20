'use strict';

(function( $ ){

	var methods = {
		init : function( options ) {

		return this.each(function(){
			$(this).bind('resize.tooltip', methods.reposition); // биндим модификацию
			// создаем тултип в DOM
			var parentBlock = $(this).parent();
			parentBlock.append('<div class="vdg-tooltip-block">Вот такой обычный тултип</div>');
			var tooltipElement = parentBlock.find(".vdg-tooltip-block");
			var data = $(this).data("tooltip");
			var location = data.location;
			if ($(this).attr("data-tooltip-location")) {
				location = $(this).attr("data-tooltip-location");
				data.location = location;
			}
			data.tooltipElement = tooltipElement;
			data.location = location;
			$(this).data("tooltip", data)
			var inputPosition = $(this).position();
			// Устанавливаю позицию тултипа
			var top, left;
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
		});

	},

	destroy : function( ) {

		return this.each(function(){
			 $(this).unbind('.tooltip');
		})

	},

	reposition : function( ) { 
		console.log("репозиция тултипа");
	},

	show : function( ) { 
		var data = $(this).data("tooltip");
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