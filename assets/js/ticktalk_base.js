//Page Load Fade Animations
$(document).ready(function () {
	$('h3.tt-brand').fadeIn(2000).removeClass('hidden');
	$('span.tt-brand2').delay(2000).fadeIn(2000).removeClass('hidden');
	$('h3.subbrand').delay(4000).fadeIn(2000).removeClass('hidden');
	$('p.page_text_invisible').delay(4000).fadeIn(2000).removeClass('hidden');
});


//Mobile Menu Javascript
$(document).ready(function () {
	$('.slideout-menu-toggle').on('click', function(event){
		event.preventDefault();
		// create menu variables
		var slideoutMenu = $('.slideout-menu');
		var slideoutMenuWidth = $('.slideout-menu').width();
		// toggle open class
		slideoutMenu.toggleClass("open");
		// slide menu
		if (slideoutMenu.hasClass("open")) {
			slideoutMenu.animate({
			left: "0px"
			});	
			} else {
				slideoutMenu.animate({
				left: -slideoutMenuWidth
				}, 250);	
			}
		});
	});