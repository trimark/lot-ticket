var ticketApp = angular.module('ticketApp', [ 'ngRoute', 'ngMaterial']);

ticketApp.config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider',
    function($routeProvider, $mdIconProvider, $mdThemingProvider)
    {
    	
		$routeProvider.when('/', {
			templateUrl: 'partials/tickets.html'
		});
		$routeProvider.when('/edit-ticket', {
			templateUrl: 'partials/edit-ticket.html'
		});
		$routeProvider.otherwise({redirectTo: '/'});
    }
]);

getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

generateTicket = function (){
	console.log(">generateTicket");
	var ret = [];
	//var numbers = [];
	var ticketLength = 25;
	var highestNumber = 69;
	var defNumSelected = 6;
	for (var i = 1; i<=highestNumber; i++){
		//numbers.push(i);
		ret.push({number: i, selected:false});
	}
	// for (var i = 0; i< 25; i++){
	// 	var num = numbers.splice(getRandomInt(0, numbers.length-1), 1)[0];
	// 	console.log ("numbers:" + numbers);
	// 	console.log ("num:" + num)
	// 	ret.push({number: num, selected:false});
	// }
	var numSelected = 0;
	while (numSelected < defNumSelected){
		var ix=getRandomInt(0, ret.length-1)
		if (!ret[ix].selected){
			ret[ix].selected = true;
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
	console.log("<generateTicket: ret=" + ret)
	return ret;
}
var tickets = [generateTicket(), generateTicket()];
ticketApp.controller('TicketController', function TicketController($scope) {
	
	
	this.addTicket = function(){
		this.tickets.push(generateTicket())
	}
	this.deleteTicket = function(index){
		console.log(">deleteTicket: index=" + index);
		this.tickets.splice(index, 1);
	} 
	this.tickets = tickets;

});