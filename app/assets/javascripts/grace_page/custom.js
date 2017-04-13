(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Background image, slideshow
		/* ---------------------------------------------- */

		$('.heightfull').height($(window).height());

		$(window).resize(function(){
			$('.heightfull').height($(window).height());
		});

		// Slideshow background

		$('.slideshow').backstretch([
			'assets/grace_page/home-1.jpg',
			'assets/grace_page/home-2.jpg',
			'assets/grace_page/home-3.jpg'
		], {duration: 3000, fade: 600});

		/* ---------------------------------------------- /*
		 * Sliders
		/* ---------------------------------------------- */

		$('.intro-slider').owlCarousel({
			paginationSpeed: 600,
			pagination: false,
			navigation: false,
			singleItem: true,
			slideSpeed: 600,
			autoPlay: 5000
		});

		$('.single-carousel').owlCarousel({
			paginationSpeed: 400,
			pagination: true,
			navigation: false,
			singleItem: true,
			slideSpeed: 300,
			autoPlay: 5000
		});

		$('.small-carousel').owlCarousel({
			paginationSpeed: 400,
			pagination: false,
			navigation: false,
			singleItem: false,
			slideSpeed: 300,
			autoPlay: 5000
		});

		/* ---------------------------------------------- /*
		 * Navbar
		/* ---------------------------------------------- */

		var intro = $('.intro-module');
		var navbar = $('.navbar-custom');
		var navHeight = navbar.height();

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 80
		})

		navbar.on('click','.navbar-collapse.in',function(e) {
			if($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
				$(this).collapse('hide');
			}
		});

		if(intro.length > 0) {

			if($(window).scrollTop() >= navHeight) {
				navbar.removeClass('navbar-transparent');
			} else {
				navbar.addClass('navbar-transparent');
			}

			$(window).scroll(function() {
				if($(this).scrollTop() >= navHeight) {
					navbar.removeClass('navbar-transparent');
				} else {
					navbar.addClass('navbar-transparent');
				}
			});

			if($(window).width() <= 767) {
				navbar.addClass('custom-collapse');
			}

			$(window).resize(function() {
				if($(this).width() <= 767) {
					navbar.addClass('custom-collapse');
				} else {
					navbar.removeClass('custom-collapse');
				}
			});

		} else {
			navbar.removeClass('navbar-transparent');
		}

		/* ---------------------------------------------- /*
		 * Animated scrolling / Scroll Up
		/* ---------------------------------------------- */

		$('.page-scroll a').bind('click', function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		/* ---------------------------------------------- /*
		 * Initialize shuffle plugin
		/* ---------------------------------------------- */

		var $portfolioContainer = $('.grid');

		$('#filter li').on('click', function (e) {
			e.preventDefault();

			$('#filter li').removeClass('active');
			$(this).addClass('active');

			group = $(this).attr('data-group');
			var groupName = $(this).attr('data-group');

			$portfolioContainer.shuffle('shuffle', groupName);
		});

		/* ---------------------------------------------- /*
		 * Equal height columns
		/* ---------------------------------------------- */

		$(function() {
			$('.equal-height').matchHeight();
		});

		/* ---------------------------------------------- /*
		 * Popup images
		/* ---------------------------------------------- */

		$('a.gallery').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		$('.video-pop-up').magnificPopup({
			type: 'iframe'
		});

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$('body').fitVids();

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').find('input,textarea').jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault();

				var submit          = $('#contact-form submit');
				var ajaxResponse    = $('#contact-response');

				var name            = $("input#cname").val();
				var email           = $("input#cemail").val();
				var message         = $("textarea#cmessage").val();

				$.ajax({
					type: 'POST',
					url: 'assets/php/contact.php',
					dataType: 'json',
					data: {
						name: name,
						email: email,
						message: message,
					},
					cache: false,
					beforeSend: function(result) {
						submit.empty();
						submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							ajaxResponse.html(result.message);
							$form.fadeOut(500);
						} else {
							ajaxResponse.html(result.message);
						}
					}
				});
			}
		});

		/* ---------------------------------------------- /*
		 * Google Map
		/* ---------------------------------------------- */

		var location = $('#map-section').attr('data-location');

		if(location) {
			var b = location.split(",");
			var mapLocation = new google.maps.LatLng(parseFloat(b[0]), parseFloat(b[1]));
		}

		var $mapis = $('#map');

		if ($mapis.length > 0) {

			map = new GMaps({
				streetViewControl : true,
				overviewMapControl: true,
				mapTypeControl: true,
				zoomControl : true,
				panControl : true,
				scrollwheel: false,
				center: mapLocation,
				el: '#map',
				zoom: 16,
				styles: [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}]
			});

			var image = new google.maps.MarkerImage('assets/grace_page/map-icon.png',
				new google.maps.Size(59, 65),
				new google.maps.Point(0, 0),
				new google.maps.Point(24, 42)
			);

			map.addMarker({
				position: mapLocation,
				icon: image,
				title: 'Advantage',
				infoWindow: {
					content: '<p><strong>Advantage</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>'
				}
			});


		}

	});

})(jQuery);