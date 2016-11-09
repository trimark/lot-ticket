var ticketApp = angular.module('ticketApp', [ 'ngRoute', 'ngMaterial']);
var highestNumber = 69;
var defNumSelected = 5;

ticketApp.config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider',
    function($routeProvider, $mdIconProvider, $mdThemingProvider)
    {
    	
		$routeProvider.when('/', {
			templateUrl: 'partials/tickets.html'
		});
		$routeProvider.when('/edit-ticket/', {
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
	var pb = '';
	if(quickPick){
		while (numSelected < defNumSelected){
		var ix=getRandomInt(0, nums.length-1)
			if (!nums[ix].selected){
				nums[ix].selected = true;
				numSelected++;
			}
		}
		pb = getRandomInt(1, highestNumber)
	}

	var ret = {numbers: nums, powerBall: pb}
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
	var ret = "null";
	if (ticket){
		ret="{ numbers: [";
		for (var i = 0; i<ticket.numbers.length; i++){
			var org = ticket.numbers[i];
			ret +="{number: " + org.number + ", selected: " + org.selected+ "}"
			if (i<ticket.numbers.length-1){
				ret +=", ";
			}
		}
		ret += ", powerBall: " + ticket.powerBall;
	}
	return ret;
}
ticketApp.controller('TicketController', function TicketController($scope, $routeParams, $location, $window) {
	
	//console.log ("$routeParams=" + $routeParams)
	this.minSelected = 5; // lowest allowed number of selected numbers
	this.maxSelected = 20; // highest allowed number of selected numbers
	this.maxTickets = 6;
	this.defNumSelected = defNumSelected;
	this.tickets = [];
	this.unselectedNumbers = [];
	this.canAddTicket = true;
	this.powerPlay = false;
	this.subscribe = false;
	var ticketEdit = null;
	this.numbers = [];
	this.highestPowerBall = 26;
	this.powerBalls = [];
	this.editTicketId = null;
	this.newTicket = false;
	this.systems = {
		s6: {name:"System 06", numLines: 6},
		s7: {name:"System 07", numLines: 21},
		s8: {name:"System 08", numLines: 56},
		s9: {name:"System 09", numLines: 126},
		s10: {name:"System 10", numLines: 252},
		s11: {name:"System 11", numLines: 462},
		s12: {name:"System 12", numLines: 792},
		s13: {name:"System 13", numLines: 1287},
		s14: {name:"System 14", numLines: 2002},
		s15: {name:"System 15", numLines: 3003},
		s16: {name:"System 16", numLines: 4368},
		s17: {name:"System 17", numLines: 6188},
		s18: {name:"System 18", numLines: 8568},
		s19: {name:"System 19", numLines: 11628},
		s20: {name:"System 20", numLines: 15504}
	};
	for (var i = 1; i<=highestNumber;i++){
		this.numbers.push(i);
	}
	for (var i = 1; i<=this.highestPowerBall;i++){
		this.powerBalls.push(i);
	}
	this.update = function(){
		this.canAddTicket = this.tickets.length < this.maxTickets;
	}
	this.addTicket = function(quickPick){
		this.tickets.push(generateTicket(quickPick));
		this.update();
		if (!quickPick){
			this.editTicket(this.tickets.length-1)
			this.newTicket = true;
		}
	}
	this.deleteTicket = function(index){
		
		this.tickets.splice(index, 1);
		this.update();
	}
	this.editTicket = function(ticketId){
		console.log(">editTicket: ticketId=" + ticketId);
		ticketEdit = copyTicket(this.tickets[ticketId]);
		this.editTicketId = ticketId;
		$location.path('/edit-ticket');
		console.log("<editTicket; ticketEdit=" + ticketToString(ticketEdit));
	}
	this.getSelectedTicket = function(){
		//console.log(">getSelectedTicket; ticketEdit=" + ticketEdit);
		//console.log("<getSelectedTicket; ticketEdit=" + ticketEdit);
		return ticketEdit;
	}
	this.canSelect = function(ticket){
		//console.log(">this.canSelect:ticket=" + this.canSelect);
		if (ticket){
			return (this.getNumSelected(ticket) < this.maxSelected);
		} else {
			return false;
		}
	}
	this.commitTicket= function (){
		console.log(">commitTicket");
		this.tickets[this.editTicketId] = ticketEdit;
		console.log("this.tickets["+this.editTicketId+"]=" + ticketToString(this.tickets[this.editTicketId]));
		
		ticketEdit = null;
		this.editTicketId = null;
		this.newTicket = false;
		
		console.log("<commitTicket: this.tickets=" + this.tickets);
		$location.path('"#/tickets"');
	}
	this.cancelTicketChanges = function(){
		console.log(">cancelTicketChanges");
		//console.log(">cancelTicketChanges");
		$location.path('"#/tickets"');
		if (this.newTicket){
			this.deleteTicket(this.editTicketId)
		}
		ticketEdit = null;
		this.editTicketId = null;
		this.newTicket = false;
		
		console.log("<cancelTicketChanges: ticketEdit=" + ticketEdit);
	}
	this.getNumSelected = function(ticket){
		//console.log(">getNumSelected: ticket=" + ticketToString(ticket));
		var ret = 0;
		if (ticket){
			var t = ticket;
			for (var i = 0; i<t.numbers.length; i++){
				if (t.numbers[i].selected){
					ret++;
				}
			}
		}
		//console.log("<getNumSelected: ret=" + ret);
		return ret;
	}
	this.getSystem = function(ticket){
		//console.log(">this.getSystem: ticket=" + ticket);
		var ret=null;
		if (ticket){
			var numSelected = this.getNumSelected(ticket);
			//var name = "0" + numSelected.toString();
			//var numLines = 1 + Math.pow(this.defNumSelected, numSelected-this.defNumSelected);
			ret = this.systems["s" + numSelected.toString()];
			//console.log("<this.getSystem: ret=" + ret);
		}
		return ret;
		//return {name: name, numLines: numLines};
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
	this.getFirstDrawDate = function(){
		var now = new Date();
		var dow = -1;
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		switch (this.selectedDraw){
			case "Tuesday & Thursday":
			dow = 2;
			break;
			case "Tuesday":
			dow = 2;
			break;
			case "Thursday":
			dow = 4;
			break;
		}

		var d = new Date(this.getNextWeekDay(now, dow).toLocaleDateString());
		var mm = d.getMonth();
		var dd = d.getDate();
		var yy = d.getFullYear();

		return dd + '/' + monthNames[mm] + '/' + yy;
	}
	this.getNextWeekDay = function(d, dow){
		//console.log(">getNextWeekDay d=" + d + ", dow=" + dow);
		//Given a date d and a dow (day of week, 0 - 6, where 0 is sunday, returns the next date (including the current one) that the given weekday occurs)
	    d.setDate(d.getDate() + (dow+(7-d.getDay())) % 7);
	    //console.log("<getNextWeekDay d=" + d);
	    return d;
	}

	this.selectCell = function(cell)
	{
		console.log("Kamote na to >>> ", cell);
		cell.selected = !cell.selected;
	}

	this.draws=["Tuesday & Thursday", "Tuesday", "Thursday"];
	this.selectedDraw= "Tuesday & Thursday";
	this.duration = "1 week";
	this.durations = ["1 week", "2 weeks", "4 weeks", "8 weeks"];
	this.defaultCurrencySymbol = "£";

});