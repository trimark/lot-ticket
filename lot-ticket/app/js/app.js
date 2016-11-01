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


function generateTicket(quickPick){
	//console.log(">generateTicket");
	var nums = [];
	if (quickPick==null){
		quickPick = true;
	}
	for (var i = 1; i<=highestNumber; i++){
		//numbers.push(i);
		nums.push({number: i, selected:false});
	}
	var numSelected = 0;
	if(quickPick){
	while (numSelected < defNumSelected){
		var ix=getRandomInt(0, nums.length-1)
			if (!nums[ix].selected){
				nums[ix].selected = true;
				numSelected++;
			}
		}
	}
	var ret = {numbers: nums, powerBall: getRandomInt(1, highestNumber)}
	//console.log("<generateTicket: ret=" + ret)
	return ret;
}
function copyTicket (ticket){
	//console.log (">copyTicket: ticket=" + ticketToString(ticket));
	var nums = [];
	for (var i = 0; i<ticket.numbers.length; i++){
		var org = ticket.numbers[i];
		nums.push({number: org.number, selected: org.selected})
	}
	var ret = {numbers: nums, powerBall: ticket.powerBall}
	//console.log ("<copyTicket: ret=" + ticketToString(ret));
	return ret;
}
function ticketToString(ticket){
	var ret="{ numbers: [";
	for (var i = 0; i<ticket.numbers.length; i++){
		var org = ticket.numbers[i];
		ret +="{number: " + org.number + ", selected: " + org.selected+ "}"
		if (i<ticket.numbers.length-1){
			ret +=", ";
		}
	}
	ret += ", powerBall: " + ticket.powerBall;
	return ret;
}
ticketApp.controller('TicketController', function TicketController($scope, $routeParams, $location) {
	
	//console.log ("$routeParams=" + $routeParams)
	this.minSelected = 5; // lowest allowed number of selected numbers
	this.maxSelected = 9; // highest allowed number of selected numbers
	this.maxTickets = 6;
	this.defNumSelected = defNumSelected;
	this.tickets = [];
	this.unselectedNumbers = [];
	this.canAddTicket = true;
	this.powerPlay = false;
	this.subscribe = false;
	var ticketEdit = null;
	this.numbers = [];
	for (var i = 1; i<=highestNumber;i++){
		this.numbers.push(i);
	}
	this.update = function(){
		this.canAddTicket = this.tickets.length < this.maxTickets;
	}
	this.addTicket = function(quickPick){
		this.tickets.push(generateTicket(quickPick));
		this.update();
	}
	this.deleteTicket = function(index){
		
		this.tickets.splice(index, 1);
		this.update();
	}
	this.getSelectedTicket = function(){
		//console.log(">getSelectedTicket; ticketEdit=" + ticketEdit);
		if (ticketEdit == null){
			ticketEdit = copyTicket(this.tickets[$routeParams.ticketId]);
		}
		//console.log("<getSelectedTicket; ticketEdit=" + ticketEdit);
		return ticketEdit;
	}
	this.canSelect = function(ticket){
		return (this.getNumSelected(ticket) < this.maxSelected);
	}
	this.commitTicket= function (){
		//console.log(">commitTicket");
		this.tickets[$routeParams.ticketId] = ticketEdit;
		ticketEdit = null;
		$location.path('"#/tickets"');
	}
	this.cancelTicketChanges = function(){
		//console.log(">cancelTicketChanges");
		ticketEdit = null;
		$location.path('"#/tickets"');
	}
	this.getNumSelected = function(ticket){
		//console.log(">getNumSelected: ticket=" + ticketToString(ticket));
		var ret = 0;
		var t = ticket;
		for (var i = 0; i<t.numbers.length; i++){
			if (t.numbers[i].selected){
				ret++;
			}
		}
		//console.log("<getNumSelected: ret=" + ret);
		return ret;
	}
	this.getSystem = function(ticket){
		var numSelected = this.getNumSelected(ticket);
		var name = "0" + numSelected.toString();
		var numLines = 1 + Math.pow(this.defNumSelected, numSelected-this.defNumSelected);
		return {name: name, numLines: numLines};
	}
	this.getEmptySlotsArray = function(ticket){
		//console.log(">getEmptySlotsArray: ticket=" + ticket);
		var numSelected = this.getNumSelected(ticket);
		//console.log ("numSelected=" + numSelected);
		//console.log ("this.minSelected=" + this.minSelected);
		var len = Math.max(0, this.minSelected - numSelected);
		//console.log ("len=" + len);
		var ret = new Array(len);
		//console.log("<getEmptySlotsArray:ret=" + ret)
		return ret;
	}
	this.draws=["Tuesday + Thursday", "Tuesday", "Thursday"];
	this.selectedDraw= "Tuesday + Thursday";
	this.duration = "1 week";
	this.durations = ["1 week", "2 weeks", "4 weeks", "8 weeks"];

});