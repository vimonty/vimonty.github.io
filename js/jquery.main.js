$(window).load(function(){

	$("#status").fadeOut();
	$("#preloader").delay(350).fadeOut("slow");
});


$(document).ready(function(){

	var $window  = $(window),
		$header = $('#header'),
		$headerHeight = $header.innerHeight(),
		$nav = $('#navigation'),
		$portfolioLink = $('.portfolio-item').find('a');

	$("html").niceScroll({
		//cursoropacitymin:1,
		cursorcolor:"#673653",
		zindex: 100,
		cursorborderradius: 0,
		cursorborder:0,
		horizrailenabled: false,
		cursorfixedheight:120,
		cursorwidth:"10px",
	});

	/* Slider
	================================================== */
	$.mbBgndGallery.buildGallery({
		containment:"#slider-wrapper",
		timer:2000,
		effTimer:6000,
		grayScale:false,
		shuffle:true,
		preserveWidth:false,
		effect:"zoom",
		//effect:{enter:{transform:"scale("+(1+ Math.random()*2)+")",opacity:0},exit:{transform:"scale("+(Math.random()*2)+")",opacity:0}},

		// If your server allow directory listing you can use:
		// (however this doesn't work locally on your computer)

		//folderPath:"testImage/",

		// else:

		 images:[
		 "images/slide/1.jpg",
		 "images/slide/2.jpg",
		 "images/slide/3.jpg",
		 "images/slide/4.jpg",
		 "images/slide/5.jpg",
		 "images/slide/6.jpg",
		 ],

		onStart:function(){},
		onPause:function(){},
		onPlay:function(opt){},
		onChange:function(opt,idx){},
		onNext:function(opt){},
		onPrev:function(opt){}
	});

	$window.on('scroll',function(){
		var $this = $(this);

		if( $this.scrollTop() >= $this.height() -$headerHeight) { $header.addClass("header-fixed"); }

		else { $header.removeClass("header-fixed"); }
	}).scroll();


	/* Scroll to Sections
	================================================== */
	$header.find('a[href*=#]').on('click', function(e) {
		e.preventDefault();
		$.scrollTo( $(this).attr('href') , 1000, { easing: 'swing' , offset: -$headerHeight , 'axis':'y' } );
	});

	$('#to-top').on('click', function(e) {
		e.preventDefault();
		$('body,html').animate({ scrollTop:0 } , 1000);
	});


	/* imageLightbox
	================================================== */
	var activityIndicatorOn = function() { $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' ); },
		activityIndicatorOff = function() { $( '#imagelightbox-loading' ).remove(); },
		overlayOn = function() { $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' ); },
		overlayOff = function() { $( '#imagelightbox-overlay' ).remove(); };


	$portfolioLink.imageLightbox({
		animationSpeed: 300,
		onStart:		function() { overlayOn(); },
		onEnd:	 		function() { overlayOff(); activityIndicatorOff(); },
		onLoadStart:	function() { activityIndicatorOn(); },
		onLoadEnd:		function() { activityIndicatorOff(); }
	});


	/* Tablet and mobile menu
	================================================== */
	var oMenuLink = $('#menu-link');

	oMenuLink.on('click', function() {
		var $this = $(this);

		$this.toggleClass('active').next().stop().slideToggle();
	});

	$nav.find('a[href*=#]').on('click', function() {

		if ( oMenuLink.hasClass('active'))
		{
			oMenuLink.removeClass('active');
			oMenuLink.next().stop().slideUp();
		};
	});


	/* reflect scrolling in navigation
	================================================== */
	$('.nav-waypoint').each(function() {
		var $this = $(this);

		$this.waypoint( function( direction ) {

			if( direction === 'down' ) {

				var containerID = $this.attr('id');

				/* update navigation */
				$nav.find('a').removeClass('current');
				$nav.find('a[href*=#'+containerID+']').addClass('current');
			}

		} , { offset: '150px' } );
		
		$this.waypoint( function( direction ) {

			if( direction === 'up' ) {
			
				var containerID = $this.attr('id');
				
				/* update navigation */
				$nav.find('a').removeClass('current');
				$nav.find('a[href*=#'+containerID+']').addClass('current');
			}

		} , { offset: function() { return -$this.height() + $headerHeight; } });
	});


	/* Scroll Animations
	================================================== */

	if( !device.tablet() && !device.mobile()) {

		if ($(".animated")[0]) {
			jQuery('.animated').css('opacity', '0');
		}

		$('.triggerAnimation').waypoint(function() {
			var animation = $(this).attr('data-animate');
			$(this).css('opacity', '');
			$(this).addClass("animated " + animation);

		},
				{
					offset: '80%',
					triggerOnce: true
				}
		);

		$('#services .animated').each(function() {

			$(this).waypoint(function() {

				var $this = $(this),
					animation = $this.attr('data-animate');

				setTimeout(function () {
					$(this).css('opacity', '');
					$this.addClass("animated " + animation);
				}, 100 * $this.index('.animated'));

			},
					{
						offset: '99%',
						triggerOnce: true
					}
			);
		});
	};


	$('.team-item').filter( ':last' ).addClass('last-item');

	/* Paralax_background
	================================================== */
	if( !device.tablet() && !device.mobile()) {

		function parallax(){
			if ( $().parallax )
			{
				$('section[data-type="background"]').each(function(){
					$(this).parallax("50%", 0.2);
				});
			}
		};
	};

	parallax();

	/* Google map
	================================================== */
	$(function() {

		var yourStartLatLng = new google.maps.LatLng(40.74843, -73.985655);
		$('#gmap').gmap({'center': yourStartLatLng, 'zoom': 13, 'disableDefaultUI': true, 'callback': function() {
			var self = this;
			self.addMarker({'position': this.get('map').getCenter()});
		}});
	});

	$window.on('resize',function(){

		var $this = $(this);

		if ($this.width() > 768) { $('#navigation').removeAttr('style'); }

		parallax();
	});
});