/*
 * Joseph Hawes
 * Joseph Hawes Web Development
 * http://www.josephhawes.co.uk
 * 10/01/12
 */
 
function cms_resize_container() {
	var page_height = $(window).height() - 30;
	$('body#home #container').css('min-height', page_height);
}

function cms_projevt_nav_setup() {
	var columns = $('body#projects ul#secondary li.column');
	//Do we have more than 3 columns?
	if(columns.length > 3) {
		//Show both next and prev to begin with
		$('li#projects-prev a').show();
		$('li#projects-next a').show();	
		
		//Are we at the start? - hide prev
		if(columns.first().hasClass('active-first')) {
			$('li#projects-prev a').hide();
		}
		
		//Are we at the end? - hide next
		if(columns.last().hasClass('active-third')) {
			$('li#projects-next a').hide();		
		}
	}
}

function cms_project_nav_next() {
	$('body#projects ul#secondary li.active-third')
		.removeClass('active-third')
		.next()
		.addClass('active-third');
	$('body#projects ul#secondary li.active-second')
		.removeClass('active-second')
		.next()
		.addClass('active-second');
	$('body#projects ul#secondary li.active-first')
		.removeClass('active-first')
		.next()
		.addClass('active-first');	
	
	//Setup nav again
	cms_projevt_nav_setup();
}

function cms_project_nav_prev() {
	$('body#projects ul#secondary li.active-first')
		.removeClass('active-first')
		.prev()
		.addClass('active-first');	
	$('body#projects ul#secondary li.active-second')
		.removeClass('active-second')
		.prev()
		.addClass('active-second');
	$('body#projects ul#secondary li.active-third')
		.removeClass('active-third')
		.prev()
		.addClass('active-third');

	//Setup nav again
	cms_projevt_nav_setup();
}

$(document).ready(function() {
	//Make home fit browser
	$(window).resize(function() {
		cms_resize_container();
	});
	cms_resize_container();
	
	//We set this to 1 because if user goes directly to category from dropdown
	//then projects will be faded out (using inactive class) but this number will
	//still be set to zero
	var inactive_projects = 1;
				
	//Project fancy nav
	$('body#projects li.projects a').click(function() {
		//Get selected cat (if any)
		var cat = ($(this).data('cat')) ? $(this).data('cat') : '';

		//Do not do anything if showing all and user clicks all
		if(inactive_projects > 0 || cat != '') {
			//Change intro
			var intro = ($(this).data('intro')) ? $(this).data('intro') : '';
			$('#secondary .intro').animate(
				{'opacity' : '0.2'},
				{
					queue: false,
					complete: function() {
						$(this).text(intro);
						$(this).animate(
							{'opacity' : '1'},
							{queue: false}
						);
					}
				}
			);		
	
			//Adjust primary nav active
			$('#primary .projects li').removeClass('active');
			if($('#primary li.projects').hasClass('active') && cat != '') {
				$('#primary li.projects').removeClass('active').addClass('child-active');
			}
			$(this).parent('li').addClass('active');
			
			//Fade all in
			$('article.project').animate({
				'opacity' : '1'
			});
			inactive_projects = 0;
			
			//Find cats to fade out
			$('article.project').each(function() {
				if(! $(this).data('cats').match(cat)) {
					$(this).animate({
						'opacity' : '0.2'
					});
					inactive_projects++;
				}
			});
		}
		return false;
	});
	
	//Project main slideshow
	$('a.gallery-main').colorbox({
		rel: 'lightbox-main',
		opacity: 0.8,
		scalePhotos: false,
		close: '',
		next: '',
		previous: '',
		slideshowStart: '',
		slideshowStop: '',		
		slideshow: false,
		slideshowAuto: false,
		title: function() {
	    return '<p>' + $(this).attr('title') + '</p>';
		}
	});

	//Project process/research slideshow
	$('a.gallery-process').colorbox({
		rel: 'lightbox-process',
		opacity: 0.8,
		scalePhotos: false,
		close: '',
		next: '',
		previous: '',
		slideshowStart: '',
		slideshowStop: '',		
		slideshow: false,
		slideshowAuto: false
	});	
	
	//Clear form text inputs
	$('form input.text, form textarea.text').focus(function() {
		if(! $(this).hasClass('user')) {
			$(this).val('');		
			$(this).addClass('user');
		}
	});
	
	//Process/Research rollover
	$('#process-research a img').hover(
		function() {
			$(this).css({
				'opacity' : '0.2'
			});
		},
		function() {
			$(this).css({
				'opacity' : '1'
			});
		}		
	);
	
	//Projects secondary nav
	cms_projevt_nav_setup();
	$('body#projects ul#secondary li#projects-prev a').click(function() {
		cms_project_nav_prev();
		return false;
	});
	$('body#projects ul#secondary li#projects-next a').click(function() {
		cms_project_nav_next();
		return false;
	});
	
	//Comments form
	$('form#form-comment').submit(function() {
		var error_count = 0;
		$('.text', $(this)).each(function() {
			$(this).removeClass('error');				
			var error = false;
			var user_input = $(this).val();
			//Error checking
			switch($(this).attr('id')) {
				case 'email' :
					var regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if(! regexp.test(user_input) || user_input == 'Email') {
						error = true;					
					}
					break;
				case 'author' :
					error = (user_input.length < 1 || user_input == 'Name');
					break;
				case 'comment' :
					error = (user_input.length < 1 || user_input == 'Enter your comment here...');
					break;										
			}
			//Do we have an error?
			if(error) {
				$(this).addClass('error');
				error_count++;				
			}
		});
		return error_count == 0;
	});
	
	//First p bold
	$('#middle.blog-home article#hero p:first, #middle.project div#project-content p:first, #middle.post div#main div > p:first, , #middle.blog-archive article p:first').first('p').css('font-weight', 'bold');

	//AddThis on lightbox
	$(document).bind('cbox_open', function(){
		$('#cboxTitle').wrapInner('<p />');
		$('#middle.project #addthis').clone().appendTo('#cboxContent');
	});
	
	//Contact map links
	$('#middle.contact section').each(function() {
		var link = $('a:contains(\'View on Google Maps\')', $(this));
		var img = $('figure img', $(this));
		img.wrap(function() {
			return '<a href="' + link.attr('href') + '" target="_blank">' + $(this).html() + '</a>';
		});
	});
});