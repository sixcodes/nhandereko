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

				$(form).find('[required]').each(function(index,element) {
					allValid.push($(element).val().length > 0)
				});

				return $.grep(allValid, function(item) { return (item == false);}).length == 0
			}

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

				if(!canContinue || lastStep === currentStep) {
					return false;
				}

				// sorry :/
				if((currentStep + 1) == 3) {
					$(".signup_form .slider").addClass('disabled');
					$("html,body").animate({scrollTop: 0});
					
					$(".question-field").on('click', function(ev) {
						var can_select = $(".question-field.selected").size() >= 3
						$(this).toggleClass('selected');
					})
				}

				if(target.size() > 0) {
					self_target.fadeOut(function() {
						lastStep = currentStep;
						currentStep = parseInt(step);
						t.attr('data-step', currentStep + 1);
						target.fadeIn();
					})
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