'use strict';

(function(){
	var app = angular.module('hex', []);

	app.controller('PlayerListController', function(){
		this.players = players;
	});

	var players = [
		{name: 'Bo'},
		{name: 'Marlon'}
	];
})();

