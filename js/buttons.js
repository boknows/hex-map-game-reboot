/*
*	buttons.js
*	listeners for HTML buttons
*
*/

'use strict';

var MODULE = (function(hex) {
	$('#newGameBtn').on('click', function () {
		hex.init();
	});

	return hex;
}(MODULE));