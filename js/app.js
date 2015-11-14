'use strict';

var MODULE = (function(hex){
	var app = angular.module('hexGame', []);

	app.controller('PlayerListController', function(){
		this.players = players;
		this.rows = hex.rows;
	});

	console.log(hex.rows);
	setInterval(function(){ hex.rows = hex.rows+1;}, 3000);
	var players = [
		{name: 'Bo'},
		{name: 'Marlon'}
	];

	return hex;
}(MODULE));

