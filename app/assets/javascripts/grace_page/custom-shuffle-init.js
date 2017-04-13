var ImageDemo = (function($, imagesLoaded) {

	var $projectsContainer = $('.grid'),
		$imgs = $projectsContainer.find('img'),
		imgLoad,

	init = function() {
		imgLoad = new imagesLoaded($imgs.get());
		imgLoad.on('always', onAllImagesFinished);
	},

	onAllImagesFinished = function(instance) {
		$projectsContainer.addClass('images-loaded');
		$projectsContainer.shuffle({
			itemSelector: '.grid-item',
			delimeter: ' '
		});
	};

	return {
		init: init
	};

}(jQuery, window.imagesLoaded));

$(document).ready(function() {
	ImageDemo.init();
});