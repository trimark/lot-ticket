var ticketApp = angular.module('ticketApp', ['ngRoute', 'ngMaterial']);


ticketApp.config(['$routeProvider', '$mdIconProvider', '$mdThemingProvider',
		function ($routeProvider, $mdIconProvider, $mdThemingProvider) {

			$routeProvider.when('/skins/:skin', {
				templateUrl : 'partials/tickets.html'
			});
			$routeProvider.when('/', {
				templateUrl : 'partials/tickets.html'
			});
			$routeProvider.when('/edit-ticket/', {
				templateUrl : 'partials/edit-ticket.html'
			});
			$routeProvider.when('/lotteries/', {
				templateUrl : 'partials/lotteries.html'
			});
			$routeProvider.otherwise({
				redirectTo : '/'
			});
		}
	]);

function calculateSystems(minLines, maxLines){
	//Calculates number of lines for systems, kinda works.
	//console.log (">calculateSystems: minLines=" + minLines + ", maxLines=" + maxLines);
	var ret = [];
	for (var rowIx = 0; rowIx<=minLines; rowIx++){
		for (var colIx= 0; colIx<=maxLines-minLines; colIx++){
			
			if (rowIx == 0){
				ret.push(1);
			} else {
				var term1 = ret[colIx];
				var term2 = 0;
				if (colIx > 0){
					term2 = ret[colIx-1]
				}
				var sum = term1 + term2;
				ret[colIx] = sum;
				//console.log ("r:" + rowIx + ", c:" + colIx + ": " + term1 + " + " + term2 + " = " + ret[colIx]);
			}
		}
		//console.log ("iteration " + rowIx + ": ret=" + ret);
		
	}
	
	//console.log ("<calculateSystems: ret=" + ret);
}
//calculateSystems(5, 20);

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function copyTicket(ticket) {
	//console.log (">copyTicket: ticket=" + ticketToString(ticket));
	var nums = [];
	
	for (var i = 0; i < ticket.numbers.length; i++) {
		var org = ticket.numbers[i];
		nums.push({
			number : org.number,
			selected : org.selected
		})
	}
	var extraNums = [];
	for (var i = 0; i < ticket.extraNumbers.length; i++) {
	var org = ticket.extraNumbers[i];
	extraNums.push({
		number : org.number,
		selected : org.selected
	})
	}
	var ret = {
		numbers : nums,
		extraNumbers: extraNums,
		powerBall : ticket.powerBall,
		options: ticket.options
	}
	//console.log ("<copyTicket: ret=" + ticketToString(ret));
	return ret;
}
function ticketToString(ticket) {
	var ret = "null";
	if (ticket) {
		ret = "{ numbers: [";
		for (var i = 0; i < ticket.numbers.length; i++) {
			var org = ticket.numbers[i];
			ret += "{number: " + org.number + ", selected: " + org.selected + "}"
			if (i < ticket.numbers.length - 1) {
				ret += ", ";
			}
		}
		ret += ", powerBall: " + ticket.powerBall;
	}
	return ret;
}
function formatCurrency(amount, c, d, t) {
	//console.log(">formatCurrency: amount=" + amount);
	var n = amount,
	c = isNaN(c = Math.abs(c)) ? 0 : c,
	d = d == undefined ? "." : d,
	t = t == undefined ? "," : t,
	s = n < 0 ? "-" : "",
	i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
	j = (j = i.length) > 3 ? j % 3 : 0;
	var ret = "£" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	//console.log("<formatCurrency: ret=" + ret);
	return ret;
};
function createBooleanOption(cfg){
		// //console.log(">createBooleanOption: cfg=" + cfg);
		var ret = {};
		for (var id in cfg){
			ret[id] = cfg[id];
		}
		ret.price = ret.prices.values[ret.prices.defaultIndex];
		// //console.log("<createBooleanOption: ret=" + JSON.stringify(ret));
		return ret;
	}
function createMultiplierOption(cfg){
		//console.log(">createMultiplierOption: cfg=" + cfg);
		var ret = {};
		for (var id in cfg){
			ret[id] = cfg[id];
		}
		ret.price = ret.prices.values[ret.prices.defaultIndex];
		ret.multiplier = ret.multipliers.values[ret.multipliers.defaultIndex];

		//console.log("<createMultiplierOption: ret=" + JSON.stringify(ret));
		return ret;
	}

ticketApp.controller('TicketController', function TicketController($scope, $routeParams, $rootScope, $route, $location) {

	//console.log ("$routeParams=" + JSON.stringify($routeParams));
	//console.log("$route.params=" + $route.current);
	var self = this;
	this.init = function(skinName){
		//console.log (">init: skinName=" + skinName);
		//
		this.tickets = [];
		this.jackpot = 0;
		this.unselectedNumbers = [];
		this.canAddTicket = true;
		this.subscribe = false;
		
		var ticketEdit = null;
		this.numbers = [];
		this.extraNumbers = [];
		this.editTicketId = null;
		this.newTicket = false;
		//
		this.skin = skinName
		this.gameConfig = config[this.skin];
		//this.gameConfig = config["cash4life"];
		this.options = [];
		for (var i = 0; i<this.gameConfig.options.length;i++){
			var option;
			var optionConfig = this.gameConfig.options[i];
			switch(optionConfig.type){
				case "boolean":
				option = createBooleanOption(optionConfig);
				break;
				case "multiplier":
				option = createMultiplierOption(optionConfig);
				break;
				default: throw("Unhandled option type: " + optionConfig.type)
			}
			this.options.push(option);
		}
		//
		for (var i = 1; i <= this.gameConfig.line.numbers.size; i++) {
			this.numbers.push(i);
		}
		for (var i = 1; i <= this.gameConfig.line.extraNumbers.size; i++) {
			this.extraNumbers.push(i);
		}
		//
		this.systems = this.gameConfig.systems;
		this.draws=[];
		this.selectedDrawIx = 0;
		//console.log("c=" + this.gameConfig.drawDays.values)
		for (var i = 0; i<this.gameConfig.drawDays.values.length; i++){
			//console.log("typeof (" + this.gameConfig.drawDays.values[i] + ")=" + typeof(this.gameConfig.drawDays.values[i]))
			var d = this.gameConfig.drawDays.values[i];
			if (typeof(d) == "string"){
				this.draws.push(this.getShortDayString(d));
			} else {
				//Array of days expected.
				var days = ""
				for (var j = 0; j<d.length; j++){
					days+=this.getShortDayString(d[j])
					if(j< d.length-1){
						days+=" & "
					} 
				}
				this.draws.push(days)
			}
		}
		this.selectDraw(this.gameConfig.drawDays.defaultIndex)
		//console.log("this.	draws=" + this.draws);
		for (var i = 0; i<this.gameConfig.numberOfLines.default; i++){
			this.addTicket(true);
		}
		//console.log ("<init");
	}
	self.routeChangeSuccess = $rootScope.$on("$routeChangeSuccess",
			function (event, next, current) {
			//console.log (">$routeChangeSuccess");
			//read params here
			if (!self.skin || $route.current.params.skin)
			{
				var skin = $route.current.params.skin ? $route.current.params.skin : "powerball";
				//console.log("$route.current.params.skin=" + $route.current.params.skin);
				//
				self.init(skin)
				//self.routeChangeSuccess(); //this will destroy the function
				//console.log ("<$routeChangeSuccess");
			}
		});
		
		
	//this.gameConfig = config["powerball"];
	
	this.tickets = [];
	this.jackpot = 0;
	this.unselectedNumbers = [];
	this.canAddTicket = true;
	this.subscribe = false;
	
	var ticketEdit = null;
	this.numbers = [];
	this.extraNumbers = [];
	this.editTicketId = null;
	this.newTicket = false;

	this.systems = {
		s6 : {
			name : "System 06",
			numLines : 6
		},
		s7 : {
			name : "System 07",
			numLines : 21
		},
		s8 : {
			name : "System 08",
			numLines : 56
		},
		s9 : {
			name : "System 09",
			numLines : 126
		},
		s10 : {
			name : "System 10",
			numLines : 252
		},
		s11 : {
			name : "System 11",
			numLines : 462
		},
		s12 : {
			name : "System 12",
			numLines : 792
		},
		s13 : {
			name : "System 13",
			numLines : 1287
		},
		s14 : {
			name : "System 14",
			numLines : 2002
		},
		s15 : {
			name : "System 15",
			numLines : 3003
		},
		s16 : {
			name : "System 16",
			numLines : 4368
		},
		s17 : {
			name : "System 17",
			numLines : 6188
		},
		s18 : {
			name : "System 18",
			numLines : 8568
		},
		s19 : {
			name : "System 19",
			numLines : 11628
		},
		s20 : {
			name : "System 20",
			numLines : 15504
		}
	};
	
	this.generateTicket = function(quickPick) {
		//console.log(">generateTicket");
		var nums = [];
		var extraNums = [];
		if (quickPick == null) {
			quickPick = true;
		}
		for (var i = 1; i <= this.gameConfig.line.numbers.size; i++) {
			//numbers.push(i);
			nums.push({
				number : i,
				selected : false
			});
		}
		for (var i = 1; i <= this.gameConfig.line.extraNumbers.size; i++) {
			//numbers.push(i);
			extraNums.push({
				number : i,
				selected : false
			});
		}
		var numSelected = 0;
		var pb = '';
		if (quickPick) {
			while (numSelected < this.gameConfig.line.numbers.selectable.default) {
				var ix = getRandomInt(0, nums.length - 1)
					if (!nums[ix].selected) {
						nums[ix].selected = true;
						numSelected++;
					}
			}
			numSelected = 0;
			//console.log("numSelected=" + numSelected);
			//console.log("this.gameConfig.line.extraNumbers.selectable.default=" + this.gameConfig.line.extraNumbers.selectable.default);
			while (numSelected < this.gameConfig.line.extraNumbers.selectable.default) {
				var ix = getRandomInt(0, extraNums.length - 1)
				if (!extraNums[ix].selected) {
					
					extraNums[ix].selected = true;
					//console.log("extraNums["+ix+"].selected=" + extraNums[ix].selected);
					numSelected++;
				}
			}
			pb = getRandomInt(1, this.gameConfig.line.extraNumbers.size)
		}
		var options = [];
		for (var i = 0; i<this.gameConfig.line.options.length;i++){
			var option;
			var optionConfig = this.gameConfig.line.options[i];
			switch(optionConfig.type){
				case "boolean":
				option = createBooleanOption(optionConfig);
				break;
				default: throw("Unhandled option type: " + optionConfig.type)
			}
			options.push(option);
		}
		var ret = {
			numbers : nums,
			extraNumbers : extraNums,
			powerBall : pb,
			options: options
		}
		//console.log("<generateTicket: ret=" + JSON.stringify(ret))
		return ret;
	}
	
	
	this.update = function () {
		//console.log(this.gameConfig);
		//console.log(this.gameConfig.numberOfLines)
		this.canAddTicket = this.tickets.length < this.gameConfig.numberOfLines.max;

	}
	this.addTicket = function (quickPick) {
		this.tickets.push(this.generateTicket(quickPick));
		this.update();
		if (!quickPick) {
			this.editTicket(this.tickets.length - 1)
			this.newTicket = true;
		}
	}
	this.getStake = function () {
		//console.log (">getStake")
		var p = 0;
		var optionPriceMultipliers = 0;
		for (var i = 0; i<this.options.length; i++){
			if (this.options[i].selected){
				//console.log("adding " + this.options[i].price)
				optionPriceMultipliers += this.options[i].price;
			}
		}
		//console.log("optionPriceMultipliers=" + optionPriceMultipliers)
		var lineOP = 0;
		for (var i = 0; i < this.tickets.length; i++) {
			var ticket = this.tickets[i];
			
			
			for (var j = 0; j<ticket.options.length; j++){
				//console.log("ticket.options[j]=" + JSON.stringify(ticket.options[j]))
				if (ticket.options[j].selected){
					//console.log("adding " + ticket.options[j].price)
					lineOP += ticket.options[j].price;
				}
			}

			var sys = this.getSystem(ticket);
			if (sys != null) {
				var tp = this.getSystem(ticket).numLines * (this.gameConfig.line.price + optionPriceMultipliers);
				p += tp;
			} else {
				p += this.gameConfig.line.price + optionPriceMultipliers;
			}
			//console.log("p=" + p);
		}
		p += lineOP;

		var daysPerWeek = 1;
		var selDraw= this.gameConfig.drawDays.values[this.selectedDrawIx];
		if (typeof(selDraw) == "object") {
			daysPerWeek = selDraw.length;
		}
		p = p * Number(this.duration) * daysPerWeek;
		//console.log ("<getStake: ret=" + p)
		this.getJackpot();
		return formatCurrency(p, 2);
	}
	this.getJackpot = function(){
		this.jackpot = this.gameConfig.jackpot;
		for (var i = 0; i<this.options.length; i++){
			var o = this.options[i]
			if (o.type == "multiplier" && o.selected){
				this.jackpot *= o.multiplier;
			}
		}

	}
	this.deleteTicket = function (index) {

		this.tickets.splice(index, 1);
		this.update();
	}
	this.editTicket = function (ticketId) {
		//console.log(">editTicket: ticketId=" + ticketId);
		ticketEdit = copyTicket(this.tickets[ticketId]);
		this.editTicketId = ticketId;
		$location.path('/edit-ticket');
		// //console.log("<editTicket; ticketEdit=" + JSON.stringify(ticketEdit));
	}
	this.getSelectedTicket = function () {
		return ticketEdit;
	}
	this.canSelect = function (ticket) {
		//console.log(">this.canSelect:ticket=" + this.canSelect);
		if (ticket) {
			return (this.getNumSelected(ticket) < this.gameConfig.line.numbers.selectable.max);
		} else {
			return false;
		}
	}
	this.canSelectExtraNumber = function (ticket) {
		//console.log(">this.canSelectExtraNumber:ticket=" + ticket);
		if (ticket) {
			var ret = this.getNumSelectedExtraNumbers(ticket) < this.gameConfig.line.extraNumbers.selectable.max;
			//console.log("num selected=" + this.getNumSelectedExtraNumbers(ticket));
			//console.log("this.gameConfig.line.extraNumbers.selectable.max=" + this.gameConfig.line.extraNumbers.selectable.max);
			//console.log("<this.canSelectExtraNumber:ret=" + ret);
			return (ret);
		} else {
			return false;
		}
	}
	this.commitTicket = function () {
		//console.log(">commitTicket");
		this.tickets[this.editTicketId] = ticketEdit;
		//console.log("this.tickets["+this.editTicketId+"]=" + ticketToString(this.tickets[this.editTicketId]));

		ticketEdit = null;
		this.editTicketId = null;
		this.newTicket = false;

		//console.log("<commitTicket: this.tickets=" + this.tickets);
		$location.path('"#/tickets"');
	}
	this.cancelTicketChanges = function () {
		//console.log(">cancelTicketChanges");
		//console.log(">cancelTicketChanges");
		$location.path('"#/tickets"');
		if (this.newTicket) {
			this.deleteTicket(this.editTicketId)
		}
		ticketEdit = null;
		this.editTicketId = null;
		this.newTicket = false;

		//console.log("<cancelTicketChanges: ticketEdit=" + ticketEdit);
	}
	this.getNumSelected = function (ticket) {
		//console.log(">getNumSelected: ticket=" + ticketToString(ticket));
		var ret = 0;
		if (ticket) {
			var t = ticket;
			for (var i = 0; i < t.numbers.length; i++) {
				if (t.numbers[i].selected) {
					ret++;
				}
			}
		}
		//console.log("<getNumSelected: ret=" + ret);
		return ret;
	}
	this.getNumSelectedExtraNumbers = function (ticket) {
		//console.log(">getNumSelectedExtraNumbers: ticket=" + JSON.stringify(ticket.extraNumbers));
		var ret = 0;
		if (ticket) {
			var t = ticket;
			for (var i = 0; i < t.extraNumbers.length; i++) {
				if (t.extraNumbers[i].selected) {
					
					ret++;
				}
			}
		}
		//console.log("<getNumSelectedExtraNumbers: ret=" + ret);
		return ret;
	}
	this.getSystem = function (ticket) {
		// //console.log(">this.getSystem: ticket=" + ticket);
		var ret = null;
		if (ticket) {
			if (this.systems){
				var numSelected = this.getNumSelected(ticket);
				//var name = "0" + numSelected.toString();
				//var numLines = 1 + Math.pow(this.gameConfig.line.numbers.selectable.default, numSelected-this.gameConfig.line.numbers.selectable.default);
				var sId = "s" + numSelected.toString();
				// //console.log("sId=" + sId)
				ret = this.systems[sId];
			}
		}
		// //console.log("<this.getSystem: ret=" + ret);
		return ret;
		//return {name: name, numLines: numLines};
	}
	this.getEmptySlotsArray = function (ticket) {
		//console.log(">getEmptySlotsArray: ticket=" + ticket);
		var numSelected = this.getNumSelected(ticket);
		//console.log ("numSelected=" + numSelected);
		//console.log ("this.gameConfig.line.numbers.selectable.min=" + this.gameConfig.line.numbers.selectable.min);
		var len = Math.max(0, this.gameConfig.line.numbers.selectable.min - numSelected);
		//console.log ("len=" + len);
		var ret = new Array(len);
		//console.log("<getEmptySlotsArray:ret=" + ret)
		return ret;
	}
	this.getEmptyEBSlotsArray = function (ticket) {
		// //console.log(">getEmptyEBSlotsArray: ticket=" + ticket);
		var numSelected = this.getNumSelectedExtraNumbers(ticket);
		// //console.log ("numSelected=" + numSelected);
		// //console.log ("this.gameConfig.line.extraNumbers.selectable.min=" + this.gameConfig.line.extraNumbers.selectable.min);
		var len = Math.max(0, this.gameConfig.line.extraNumbers.selectable.min - numSelected);
		//console.log ("len=" + len);
		var ret = new Array(len);
		// //console.log("<getEmptyEBSlotsArray:ret=" + ret)
		return ret;
	}
	this.getFirstDrawDate = function () {
		//console.log(">getFirstDrawDate");

		var now = new Date();
		var dow = -1;
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		var draw= this.gameConfig.drawDays.values[this.selectedDrawIx];
		//console.log("this.gameConfig.drawDays.values=" + this.gameConfig.drawDays.values)
		//console.log("draw=" + draw)
		//console.log("this.selectedDrawIx=" + this.selectedDrawIx)
		if (typeof(draw) == "string"){
			dow = this.dayToNumber(draw)
		} else {
			//The following assumes that the days are specified in correct order in the co 
			dow = this.dayToNumber(draw[0])
		}

		var d = new Date(this.getNextWeekDay(now, dow).toLocaleDateString());
		var mm = d.getMonth();
		var dd = d.getDate();
		var yy = d.getFullYear();
		//console.log("<getFirstDrawDate");
		return dd + '/' + monthNames[mm] + '/' + yy;
	}
	this.getNextWeekDay = function (d, dow) {
		//console.log(">getNextWeekDay d=" + d + ", dow=" + dow);
		//Given a date d and a dow (day of week, 0 - 6, where 0 is sunday, returns the next date (including the current one) that the given weekday occurs)
		d.setDate(d.getDate() + (dow + (7 - d.getDay())) % 7);
		//console.log("<getNextWeekDay d=" + d);
		return d;
	}
	this.dayToNumber = function(day){
		//console.log(">dayToNumber day=" + day);
		var ret = -1;
		switch (day){
			case "monday":
			ret = 1;
			break;
			case "tuesday":
			ret = 2;
			break;
			case "wednesday":
			ret = 3;
			break;
			case "thursday":
			ret = 4;
			break;
			case "friday":
			ret = 5;
			break;
			case "saturday":
			ret = 6;
			break;
			case "sunday":
			ret = 7;
			break;
		}
		//console.log("<dayToNumber ret=" + ret);
		return ret;
	}
	this.selectCell = function (cell) {
		//console.log(">selectCell: cell=" + JSON.stringify(cell.selected));
		cell.selected = !cell.selected;
		//console.log("<selectCell: cell.selected=" + cell.selected);
	}
	this.selectExtraBall = function (cell, ticket){
		cell.selected = !cell.selected;
		if (cell.selected && this.gameConfig.line.extraNumbers.selectable.max == 1 ){
			//When you can select exactly 1 extraball, we want this to behave like a radio button,
			//e.i unselect all other extraball:
			for (var i = 0; i<ticket.extraNumbers.length; i++){
				var currentCell = ticket.extraNumbers[i];
				if (currentCell != cell){
					currentCell.selected = false;
				}
			}

		}
	}
	this.selectDraw = function (ix) {
		//console.log(">this.selectDraw: ix=" +ix);
		this.selectedDrawIx = ix
		this.selectedDraw = this.draws[this.selectedDrawIx];
		//console.log("<this.selectDraw");
	}

	this.selectPowerBall = function (num) {
		//console.log("Manoling >>> ", num);

		this.getSelectedTicket().powerBall = num;
	}

	this.selectDuration = function (duration, ix) {
		//console.log(">selectDuration: duration=", duration + ", ix=" +ix);

		this.duration = duration;
		if (this.duration == 1) {
			this.durationString = "1 week"
		} else {
			this.durationString = this.duration.toString() + " weeks"
		}
	}
	this.getShortDayString = function(day){
		var ret = null;
		switch (day){
			case "monday":
			ret = "Mon";
			break;
			case "tuesday":
			ret = "Tue";
			break;
			case "wednesday":
			ret = "Wed";
			break;
			case "thursday":
			ret = "Thu";
			break;
			case "friday":
			ret = "Fri";
			break;
			case "saturday":
			ret = "Sat";
			break;
			case "sunday":
			ret = "Sun";
			break;
		}
		return ret;
	}

	this.durationString = "1 week";
	this.draws = ["Tue", "Thu", "Tue & Thu"];
	this.selectedDraw = "Tue & Thu";
	this.duration = "1";
	this.durations = ["1", "2", "4", "8"];
	this.defaultCurrencySymbol = "£";
	//
	
	
});


ticketApp.controller('LotteryController', function LotteryController($scope, $location, $window) {
	this.lotteries = [{title:"Austrian Lotto", skin:"austrianlotto"}, {title:"Cash4Life", skin: "cash4life", link:"/#/?skin=cash4life"}, {title:"EuroJackpot", skin:"eurojackpot"}, {title:"EuroMillions", link:"http://demo.trimarkgaming.com/games/lottostore/euromillions/#/"}, {title:"French Lotto", skinName:"frenchlotto"}, {title:"Irish Lotto", skin:"irishlotto"}, {title:"Mega-Sena", skin:"mega-sena"}, {title:"MegaMillions", skin:"megamillions"}, {title:"MINI Lotto", skin:"minilotto"}, {title:"Oz Mon & Wed Lotto", skin:"ozmonwedlotto"}, {title:"OZ Lotto", skin:"ozlotto"}, {title:"OZ Powerball", skin:"ozpowerball"}, {title:"OZ Sat Lotto", skin:"ozsatlotto"}, {title:"Polish Lotto", skin:"polishlotto"}, {title:"Powerball", skin:"powerball"}, {title:"SuperEnalotto", skin:"superenalotto"}, {title:"Swedish Lotto", skin:"swedishlotto"}];
	$scope.loadSkin = function(skin){
		// //http://localhost:8002/#/?skin=powerball&langcode=en
		// var p =$window.location.href;
		// p = p.substring(0, p.lastIndexOf("/"));
		// //console.log("p: " + p)
		// var url = p + '/?skin=' + skin
		// 
		//var url = "/#/?skin=" + skin;
		//var url = "http://demo.trimarkgaming.com/games/lottostore/#/?skin=" + skin;
		//console.log("loadSkin: " + url);
		//$window.location.href = url;
		//$window.location.reload();
		$location.path("/skins/" + skin);

	}
});

ticketApp.directive('ticketAnimate', function ($timeout) {
	return {
		restrict : 'A',
		link : function (scope, element) {
			$timeout(function () {
				$(element).addClass('slide');
			}, 10);
		}
	};
});

ticketApp.directive('tapClick', function () {
	return {
		restrict : 'EA',
		link : function (scope, element) {
			$(element).on("TapClickTouchStart",
				function (event) {
				var method = element.attr("ng-click");
				scope.$event = event;
				scope.$apply(method);
			});
		}
	};
});


ticketApp.directive('menuNav', function ($location, $window) {
	return {
		restrict : 'EA',
		link : function (scope, element) {
			scope.toggle = function() {
				$(element).toggleClass('active');

				if ($('body').hasClass('no-drag'))
					$('body').removeClass('no-drag');
				else
					$('body').addClass('no-drag');

			}
			scope.loadSkin = function(skin){
				//http://localhost:8002/#/?skin=powerball&langcode=en
				// var p =$window.location.href;
				// p = p.substring(0, p.lastIndexOf("/"));
				// //console.log("p: " + p)
				// var url = p + '/?skin=' + skin
				// var url = "/#/?skin=" + skin;

				//var url = "http://demo.trimarkgaming.com/games/lottostore/#/?skin=" + skin;
				//var url = "/?skin=" + skin;
				//console.log("loadSkin: " + url)
				// //console.log("--------------");
				// for (var prop in $window.location){
				// 	//console.log(prop +": " + $window.location[prop])
				// }
				//$window.location.href = url;
				// $(element).removeClass('active');
				// $('body').removeClass('no-drag');
				//$window.location.reload();
				$location.path("/skins/" + skin);
				$(element).removeClass('active');
				$('body').removeClass('no-drag');
			}
			scope.linkTo = function(link) {
				$location.path(link);

				$(element).removeClass('active');
				$('body').removeClass('no-drag');
			}
		}
	};
});
