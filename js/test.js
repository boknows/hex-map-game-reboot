//Testing Module Pattern

var MODULE = (function () {
	var my = {},
		privateVariable = 1;

	function privateMethod() {
		// ...
	}

	my.moduleProperty = 1;
	my.moduleMethod = function () {
		console.log("Method 1!");
	};

	return my;
}());

var MODULE = (function (my) {
	my.anotherMethod = function () {
		console.log("Method 2!");
	};
	my.moduleMethod();
	my.anotherMethod();
	return my;
}(MODULE));