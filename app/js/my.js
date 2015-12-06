$(document).ready(function() { 

	if (!Modernizr.placeholder) {
		var scriptPlaceholder = document.createElement('script');
		scriptPlaceholder.src = "bower/jquery.placeholder/jquery.placeholder.min.js";
		document.body.appendChild(scriptPlaceholder);
	}


});