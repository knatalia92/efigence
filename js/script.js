this.onload = function() {
	var openModal = document.querySelectorAll('.open-modal');
	var iconClose = document.querySelectorAll('.icon-close');
	var link = document.querySelectorAll('.cover-menu li a');
	var minifiedMenu = document.getElementById('menu');
	
	openModal[0].addEventListener('click', function(e) {
		e.preventDefault();
		minifiedMenu.style.visibility = "visible";
		minifiedMenu.style.opacity = 1;
	})

	iconClose[0].addEventListener('click', function(e) {
		e.preventDefault();
		minifiedMenu.style.visibility = "hidden";
		minifiedMenu.style.opacity = 0;
	});

	for(var i = 0; i < link.length; i++) {
		(function(j) {
			link[j].addEventListener('click', function(e) {
				minifiedMenu.style.visibility = "hidden";
				minifiedMenu.style.opacity = 0;
			});
		})(i);
	}
}