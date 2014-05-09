$(window).load(function(){

	var $window  = $(window),
		$container = $('#portfolio-list'),
		$optionSets = $('#option-set'),
		$optionLinks = $optionSets.find('a');

	function portfolioCol() {
		var width = $window.width(),
			column = 1;

		if (width > 1400) {
			column = 5;
		} else if (width > 1000) {
			column = 4;
		} else if (width > 768) {
			column = 3;
		} else if (width > 480) {
			column = 2;
		} else{
			column = 1;
		}

		return column;
	}

	function setCol() {
		var width = $window.width(),
			column = portfolioCol(),
			articleWidth =  Math.floor(width/column);

		$container.find('li').each(function () {
			$(this).css( {
				width : articleWidth + 'px'
			});
		});
	}

	setCol();

	$container.isotope({
		itemSelector : '.element',
		animationEngine : 'best-available',
		animationOptions: {
			duration: 800,
			queue: false
		},
		layoutMode: 'fitRows'
	});

	$window.on('resize', function () {
		setCol();

		$container.isotope('reLayout');

		$('#blog-list').isotope('reLayout');
	});


	$optionLinks.on('click' , function(e) {
		var $this = $(this),
			currentOption = $this.data('cat');

		$optionSets.find('.selected').removeClass('selected');
		$this.addClass('selected');

		if (currentOption !== '*') {
			currentOption = '.' + currentOption;
		}

		$container.isotope({filter : currentOption});
		return false;
	});

	

	$('#blog-list').isotope({
		itemSelector : '.element',
		masonry: {columnWidth: 1}
	});

	//Load More for Portfolio
	jQuery.fn.portfolio_addon = function(addon_options) {
		//Set Variables
		var addon_el = jQuery(this),
			addon_base = this,
			img_count = addon_options.items.length,
			img_per_load = addon_options.load_count,
			$newEls = '',
			loaded_object = '',
			$container = jQuery('#blog-list');
		
		jQuery('#blog-load-more').on('click' , function(){
			$newEls = '';
			loaded_object = '';									   
			loaded_images = $container.find('.added').size();
			if ((img_count - loaded_images) > img_per_load) {
				now_load = img_per_load;
			} else {
				now_load = img_count - loaded_images;
			}
			
			if ((loaded_images + now_load) == img_count) jQuery(this).fadeOut();

			if (loaded_images < 1) {
				i_start = 1;
			} else {
				i_start = loaded_images+1;
			}

			if (now_load > 0) {
				if (addon_options.type == 0) {
					/*//1 Column Service Type
					for (i = i_start-1; i < i_start+now_load-1; i++) {
						loaded_object = loaded_object + '<div data-category="'+ addon_options.items[i].category +'" class="'+ addon_options.items[i].category +' element row-fluid added"><div class="filter_img span6"><div class="wrapped_img"><a href="'+ addon_options.items[i].post_zoom +'" class="prettyPhoto" rel="prettyPhoto[portfolio1]"><img src="'+ addon_options.items[i].src +'" alt="" width="570" height="340"></a></div></div><div class="portfolio_dscr span6"><div class="bg_title"><h4><a href="'+ addon_options.items[i].url +'">'+ addon_options.items[i].title +'</a></h4></div>'+ addon_options.items[i].description +'</div></div>';
					}*/
				} else {
					//2-4 Columns Portfolio Type
					for (i = i_start-1; i < i_start+now_load-1; i++) {
						loaded_object = loaded_object + '<li class="blog-item element added" data-sizex="'+ addon_options.items[i].data_sizex +'">'+
						'<img src="'+ addon_options.items[i].src +'" alt="" />'+
						'<div class="description" data-position="'+ addon_options.items[i].data_position +'"><p class="title f20"><a href="#">'+ addon_options.items[i].title +'</a></p>'+
							'<p class="text">'+ addon_options.items[i].content +'</p>'+
							'<div class="meta">'+
								'<span><i class="icon-clock"></i> '+ addon_options.items[i].date_post +'</span>'+
								'<span><i class="icon-chat"></i> '+ addon_options.items[i].comments +'</span>'+
							'</div>'+
						'</div>'+
						'</li>';
					}
				}
				
				$newEls = jQuery(loaded_object);
				$container.isotope('insert', $newEls, function() {
					$container.isotope('reLayout');
					
					//jQuery("a[rel^='prettyPhoto']").prettyPhoto();
				});
			}
		});
	}
});



