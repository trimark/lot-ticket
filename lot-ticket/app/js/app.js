var ticketApp = angular.module('ticketApp', [ 'ngRoute', 'ngMaterial']);
var highestNumber = 69;
var defNumSelected = 5;

ticketApp.config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider',
    function($routeProvider, $mdIconProvider, $mdThemingProvider)
    {
    	
		$routeProvider.when('/', {
			templateUrl: 'partials/tickets.html'
		});
		$routeProvider.when('/edit-ticket/:ticketId', {
			templateUrl: 'partials/edit-ticket.html'
		});
		$routeProvider.otherwise({redirectTo: '/'});
    }
]);

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateTicket(){
	console.log(">generateTicket");
	var nums = [];

	for (var i = 1; i<=highestNumber; i++){
		//numbers.push(i);
		nums.push({number: i, selected:false});
	}
	var numSelected = 0;
	while (numSelected < defNumSelected){
		var ix=getRandomInt(0, nums.length-1)
		if (!nums[ix].selected){
			nums[ix].selected = true;
			numSelected++;
		}
	}
	var ret = {numbers: nums, powerBall: getRandomInt(1, highestNumber)}
	console.log("<generateTicket: ret=" + ret)
	return ret;
}
function copyTicket (ticket){
	var nums = [];
	for (var i = 0; i<ticket.numbers.length; i++){
		var org = ticket.numbers[i];
		nums.push({number: org.number, selected: org.selected})
	}
	var ret = {numbers: nums, powerBall: ticket.powerBall}
	return ret;
} 
ticketApp.controller('TicketController', function TicketController($scope, $routeParams, $location) {
	
	console.log ("$routeParams=" + $routeParams)
	this.minSelected = 5; // lowest allowed number of selected numbers
	this.maxSelected = 20; // highest allowed number of selected numbers
	this.maxTickets = 6;
	this.tickets = [];
	this.canAddTicket = true;
	var ticketEdit = null;
	this.numbers = [];
	for (var i = 1; i<=highestNumber;i++){
		this.numbers.push(i);
	}
	this.update = function(){
		this.canAddTicket = this.tickets.length < this.maxTickets;
	}
	this.addTicket = function(){
		this.tickets.push(generateTicket());
		this.update();
	}
	this.deleteTicket = function(index){
		
		this.tickets.splice(index, 1);
		this.update();
	}
	this.getSelectedTicket = function(){
		if (ticketEdit == null){
			ticketEdit = copyTicket(this.tickets[$routeParams.ticketId]);
		}
		return ticketEdit;
		//return this.tickets[$routeParams.ticketId];
	}
	this.canSelect = function(){
		return (this.getNumSelected < this.maxSelected);
	}
	this.commitTicket= function (){
		console.log(">commitTicket");
		this.tickets[$routeParams.ticketId] = ticketEdit;
		ticketEdit = null;
		$location.path('"#/tickets"');
	}
	this.cancelTicketChanges = function(){
		console.log(">cancelTicketChanges");
		ticketEdit = null;
		$location.path('"#/tickets"');
	}

	this.getNumSelected = function(){
		var ret = 0;
		var t = getSelectedTicket();
		for (var i = 0; i<t.length; i++){
			if (t[i].selected){
				ret++;
			}
		}
		return ret;
	}
	this.addTicket();
	this.addTicket();

});