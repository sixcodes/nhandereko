$(document).ready(function() {
	$(".user-questions .slider").addClass('disabled');


	function getCurrentHeight() {
		var current = $('.question-' + currentQuestion),
			height  = current.height() + 20;

	    return height;
	}
	var currentQuestion = 1;

	$("#next-question").on('click', function(ev) {
		ev.preventDefault();

		var current = $('.question-' + currentQuestion),
			next    = $(".question-" + (++currentQuestion));

		if(next.size() > 0) {
			current.fadeOut(function() {
				next.fadeIn();
			})
		} else {
			setTimeout(function() { document.location = '/missions/?completed=2' }, 1000);
		}

	})
})