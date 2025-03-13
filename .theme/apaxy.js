// content filtering para la galería
(function(document) {
	'use strict';

	var GalleryFilter = (function(Arr) {

		// the search bar element
		var _input;

		// find all gallery items and filter them
		function _onInputEvent(e) {
			_input = e.target;
			_filterGallery();
		}
		
		// Filtrar elementos de la galería
		function _filterGallery() {
			var galleryItems = document.querySelectorAll('.gallery-item');
			var val = _input.value.toLowerCase();
			
			Arr.forEach.call(galleryItems, function(item) {
				var nameElement = item.querySelector('.gallery-item-name');
				if (nameElement) {
					var text = nameElement.textContent.toLowerCase();
					item.style.display = text.indexOf(val) === -1 ? 'none' : 'block';
				}
			});
			
			// También filtrar el directorio padre si existe
			var parentDir = document.querySelector('.parent-directory');
			if (parentDir && val.length > 0) {
				parentDir.style.display = 'none';
			} else if (parentDir) {
				parentDir.style.display = 'flex';
			}
		}

		return {
			init: function() {
				// find the search box and bind the input event
				var filterInput = document.getElementById('filter');
				if (filterInput) {
					filterInput.oninput = _onInputEvent;
				}
			}
		};

	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			GalleryFilter.init();
			var filterInput = document.getElementById('filter');
			if (filterInput && filterInput.value.trim().length) {
				filterInput.focus();
				filterInput.dispatchEvent(new Event('input'));
			}
		}
	});

	// Use Keydown to get special keys like Backspace, Enter, Esc.
	window.addEventListener('keydown', function (e) {
		var filterInput = document.getElementById('filter');
		var isFocused = (document.activeElement === filterInput);
		if (filterInput && !isFocused && String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
			filterInput.focus();
		}
	});

})(document);

// generate a breadcrumb
var uri = window.location.pathname.substr(1);
var arr = uri.split('/');
var url = ""
var bread = '';
var cont = 1;
arr.forEach(function(value){
    url = url + '/' + value;
    if(value != ''){
        if(arr.length == cont+1)
            bread += "<li class='active'>"+decodeURI(value)+"</li>";
        else
            bread += "<li><a href='"+url+"'>"+decodeURI(value)+"</a></li>";
    }
    cont++;
});
document.getElementById("breadcrumb").innerHTML = bread;

