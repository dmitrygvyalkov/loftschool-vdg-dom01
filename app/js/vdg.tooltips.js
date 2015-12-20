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
			//console.log(tooltipElement);
			/*
			$(this).data("tooltip", {
				tooltipElement : tooltipElement
			});
			*/
			var data = $(this).data("tooltip");
			data.tooltipElement = tooltipElement;
			$(this).data("tooltip", data)
			console.log($(this).data("tooltip"));
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
		console.log("Показываем тултип");
	},
	
	hide : function( ) {
		console.log("прячем тултип"); 
	}
  };

  $.fn.tooltip = function( method , options) {
  	// блок настроек по-умолчанию
  	var settings = $.extend( {
      'location'         : 'left'
    }, options);

    // блок внутренних переменных
    var data = this.data("tooltip");
    // инициализируем тултип, только один раз
    if (!data) {
    	this.data("tooltip", {
    		target: this,
    		initialized: true
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