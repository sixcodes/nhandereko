var nhanderekoApp;

(function() {
	"use strict";

	nhanderekoApp = {
		init: function() {

			$('.range-slider').slider();


			var currentStep=1,
				lastStep,
				canContinue = false;

			function validForm(form) {
				var allValid = [];

				if(currentStep > 1)  {
					return true ;
				}

				$(form).find('[required]').each(function(index,element) {
					allValid.push($(element).val().length > 0)
				});

				return $.grep(allValid, function(item) { return (item == false);}).length == 0
			}


			$("#new_comment").on('click', function(ev) {
				ev.preventDefault();

				var t = $(this),
					target = $(t.data('target')),
					comment  = $(t.data('value')),
					value    = comment.val();


				if(target) {
					var comment_template = $($("#new_comment_template").html());
					comment_template.find('.comment_body').html(value);
					comment_template.hide();
					target.append(comment_template);
					comment.val('');
					comment_template.fadeIn('slow');

					setTimeout(function() { document.location = '/missions/?completed=3'; }, 1000);
				}
			})

			$("[data-spinner]").on('click', function(ev) {
				ev.preventDefault();
				var t = $(this);

				t.find('.fa').addClass('fa-spin');

				setTimeout(function() {
					document.location = t.attr('href');
				}, 1950)
			})

			function observeForm(form) {
				$(form).on('change', function() {

					var step_wrapper = $('.step-' + currentStep);
					canContinue = validForm(step_wrapper);

					var button  = $('.data-step-button[data-step="' + (currentStep + 1) + '"]'),
					    _method = canContinue ? 'removeAttr' : 'attr';

					button[_method]('disabled', '');
				})
			}

			observeForm('.signup_form');

			$('form .data-step-button').on('click', function(ev) {
				ev.preventDefault();

				var t = $(this),
					form = t.parent('form').first(),
					step = t.data('step'),
					target = $('.step-' + step),
					self_target = $('.step-' + currentStep);

				canContinue = validForm(form);

				if(!canContinue) { return false; }

				if(target.size() > 0) {
					self_target.fadeOut(function() {
						target.fadeIn();
					})
				}

				lastStep = currentStep;
				currentStep = parseInt(step);
				t.attr('data-step', currentStep + 1);

				console.log(currentStep);

				if(currentStep == 3) {
					$(".step-3 .questions-step").append($('.step-2 .user-questions')).find(".question-field").on('click', function(ev) {
						var can_select = $(".question-field.selected").size() >= 3
						$(this).toggleClass('selected');
					});
					$(".signup_form .slider").addClass('disabled');
					$("html,body").animate({scrollTop: 0});
				} else if(currentStep == 4) {
					setTimeout(function() { document.location = '/mission/water/'; }, 1200)
				}

			})

			var login_select_wrapper = $(".login-type-select");
			login_select_wrapper.on('click', '.btn-login', function(ev) {
				ev.preventDefault();

				var t = $(this),
					_class = ("." + t.attr('id')),
					target = $([_class, 'wrapper'].join('-'));

				login_select_wrapper.fadeToggle(function() {
					target.fadeToggle();
				})

			})
		},
		setup: function() {

		}
	}
	nhanderekoApp.init();


})()


function getQueryString () {
    return location.search
        ? location.search.slice(1)
        : '';
}

function showBadgeBar (message) {
    var $badgeBar = $('.missions-badge-bar');

    $badgeBar.slideDown()
    $('p', $badgeBar).html(message);

    setTimeout(function () {
        $badgeBar.slideUp();
    }, 5000);
}