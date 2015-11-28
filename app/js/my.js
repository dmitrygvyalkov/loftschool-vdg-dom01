$(document).ready(function() { 

console.log('Загрузился базовый скрипт');

/*
	Проверка на загрузку спрайтов, и задание спрайтовых стилей, после его загрузки	
*/

var spritesheet	= $('#spritesheet'), // получаем спрайт
	icons		= $('.spritesheet-preload'); // получаем список элементов, которым требуется задать стили иконокээ

	console.log(spritesheet);

	spritesheet.attr('src', spritesheet.attr('data-src') );

	
	spritesheet.load(function() {
		/* у нас загрузился элемент. Можно менять стили */
		console.log('Спрайты прогрузились');
		console.log(icons);
		/* Применяем стиль иконок для всех элементов иконок*/
		icons.addClass('ico').addClass('hide-text'); 
	});

});