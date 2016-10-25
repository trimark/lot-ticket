/*angular.module('trimark-lot-ticket', [ 'ngRoute', 'ngMaterial']).config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider',
    function($routeProvider, $mdIconProvider, $mdThemingProvider)
    {
    	
		$routeProvider.when('/', {
			templateUrl: 'partials/home.html'
		});

		$routeProvider.when('/myaccount', {
			templateUrl: 'partials/my-account.html'
		});

		$routeProvider.when('/organizations', {
			templateUrl: 'partials/organizations.html'
		});

		$routeProvider.when('/new-organization', {
			templateUrl: 'partials/new-organization.html'
		});

		$routeProvider.when('/roles', {
			templateUrl: 'partials/roles.html'
		});

		$routeProvider.when('/new-role', {
			templateUrl: 'partials/new-role.html'
		});

        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);

        $mdThemingProvider.theme('default').primaryPalette('grey')
        .accentPalette('red');
        
    }
]);*/


var ticketApp = angular.module('ticketApp', [ 'ngRoute', 'ngMaterial']);

ticketApp.controller('TicketController', function TicketController($scope) {
	
	getRandomInt = function (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	generateTicket = function (){
		console.log(">generateTicket");
		var ret = [];
		var numbers = [];
		var ticketLength = 25;
		var highestNumber = 99;
		for (var i = 1; i<=highestNumber; i++){
			numbers.push(i);
		}
		for (var i = 0; i< 25; i++){
			var num = numbers.splice(getRandomInt(0, numbers.length-1), 1)[0];
			console.log ("numbers:" + numbers);
			console.log ("num:" + num)
			ret.push({number: num, selected:false});
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
	
	  this.ticket = generateTicket();

});