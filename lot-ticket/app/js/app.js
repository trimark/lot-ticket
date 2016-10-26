var ticketApp = angular.module('ticketApp', [ 'ngRoute', 'ngMaterial']);

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

getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var highestNumber = 69;
var defNumSelected = 5;

generateTicket = function (){
	console.log(">generateTicket");
	var nums = [];
	//var numbers = [];
	
	for (var i = 1; i<=highestNumber; i++){
		//numbers.push(i);
		nums.push({number: i, selected:false});
	}
	// for (var i = 0; i< 25; i++){
	// 	var num = numbers.splice(getRandomInt(0, numbers.length-1), 1)[0];
	// 	console.log ("numbers:" + numbers);
	// 	console.log ("num:" + num)
	// 	nums.push({number: num, selected:false});
	// }
	var numSelected = 0;
	while (numSelected < defNumSelected){
		var ix=getRandomInt(0, nums.length-1)
		if (!nums[ix].selected){
			nums[ix].selected = true;
			numSelected++;
		}
	}

	/*ret.toString = function(){
		var r = "[";
		for (var i = 0; i<this.length;i++){
			r+= "{number: " + this[i]number + ", selected: " + this[i].selected +"}"
		}
		var r += "]";
		return r;
	}*/
	var ret = {numbers: nums, powerBall: getRandomInt(1, highestNumber)}
	console.log("<generateTicket: ret=" + ret)
	return ret;
}
var tickets = [generateTicket(), generateTicket()];
ticketApp.controller('TicketController', function TicketController($scope, $routeParams) {
	
	console.log ("$routeParams=" + $routeParams)
	this.minSelected = 5; // lowest allowed number of selected numbers
	this.maxSelected = 20; // highest allowed number of selected numbers
	this.numbers = [];
	for (var i = 1; i<=highestNumber;i++){
		this.numbers.push(i);
	}
	this.addTicket = function(){
		this.tickets.push(generateTicket())
	}
	this.deleteTicket = function(index){
		console.log(">deleteTicket: index=" + index);
		this.tickets.splice(index, 1);
	}
	this.getSelectedTicket = function(){
		console.log(">getSelectedTicket: $routeParams.ticketId=" + $routeParams.ticketId);
		return this.tickets[$routeParams.ticketId];
	}
	this.canSelect = function(){
		return (this.getNumSelected < this.maxSelected);
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
	this.tickets = tickets;

});