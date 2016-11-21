var config = {};
//
config["powerball"] =
{
	title: "PowerBall",
	texts:{
		editExtraBallHeader: "Pick 1 PowerBall",
		prizeHeader: " million"
	},
	jackpot: 322,
	drawDays: 
	{ 
		values: ["tuesday", "sunday", ["tuesday", "sunday"]],
		defaultIndex: 1

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 0
	},
	// line configuration:
	line: 
	{
		price: 2.5,
		numbers: 
		{
			size: 69,
			selectable: {min: 5, max: 20, default: 5}
		},
		extraNumbers: 
		{
			size: 26,
			selectable: {min: 1, max: 1, default: 1}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
			type: "boolean", 
			label: "PowerPlay", 
			prices: {values: [1], defaultIndex: 0}, 
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: true
		}
	],
	systems:
	{
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
	}
}
//
config["eurojackpot"] =	
{
	title: "EuroJackpot",
	texts:{
		editExtraBallHeader: "Pick 2",
		prizeHeader: " million"
	},
	jackpot: 38,
	drawDays: 
	{ 
		values: ["friday"],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 1
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 0
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 50,
			selectable: {min: 5, max: 5, default: 5}
		},
		extraNumbers: 
		{
			size: 10,
			selectable: {min: 2, max: 2, default: 2}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}	
	]
}
//
//
config["euromillions"] =
{
	title: "EuroMillions",
	texts:{
		editExtraBallHeader: "Pick 2 Lucky Stars",
		prizeHeader: " million"
	},
	jackpot: 50,
	drawDays: 
	{ 
		values: ["tuesday", "friday", ["tuesday", "friday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 1
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 0
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 50,
			selectable: {min: 5, max: 5, default: 5}
		},
		extraNumbers: 
		{
			size: 12,
			selectable: {min: 2, max: 2, default: 2}
		},
		options: [
			{
				type: "boolean", 
				label: "Maximillions", 
				prices: {values: [0.5], defaultIndex: 0}, 
				priceMultiplier: "numberOfLines", 
				application: "global",
				optional: true,
				selected: false
			}
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: true,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}	
	]
}
//
config["cash4life"] =
{
	title: "Cash4Life",
	texts:{
		editExtraBallHeader: "Pick 1 CashBall",
		prizeHeader: " a day for Life"
	},
	jackpot: 1000,
	drawDays: 
	{ 
		values: ["tuesday", "friday", ["tuesday", "friday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 6],
		defaultIndex: 1
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 3
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 60,
			selectable: {min: 5, max: 5, default: 5}
		},
		extraNumbers: 
		{
			size: 4,
			selectable: {min: 1, max: 1, default: 1}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
	]
}
//
config["frenchlotto"] =	
{
	title: "French Lotto",
	texts:{
		editExtraBallHeader: "Pick 2",
		prizeHeader: " million"
	},
	jackpot: 8,
	drawDays: 
	{ 
		values: ["monday", "wednesday", "saturday"],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 0
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 49,
			selectable: {min: 5, max: 5, default: 5}
		},
		extraNumbers: 
		{
			size: 10,
			selectable: {min: 1, max: 1, default: 1}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}	
	]
}
//
config["irishlotto"] =	
{
	title: "Irish Lotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 8.2	,
	drawDays: 
	{ 
		values: ["wednesday", "saturday", ["wednesday", "saturday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 0
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 47,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		},
		{
			type: "boolean", 
			label: "Irish Lotto+", 
			prices: {values: [0.5], defaultIndex: 0}, 
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false
		}
	]
}
config["mega-sena"] =	
{
	title: "Mega-Sena",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 3.2,
	drawDays: 
	{ 
		values: [],
		defaultIndex: 0

	},
	durations: 
	{
		type: "draws",
		values: [1, 2, 4, 6],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 1
	},
	// line configuration:
	line: 
	{
		price: 1.5,
		numbers: 
		{
			size: 60,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [1.5], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}

	]
}
config["megamillions"] =	
{
	title: "MegaMillions",
	texts:{
		editExtraBallHeader: "Pick 1 Megaball",
		prizeHeader: " million"
	},
	jackpot: 12,
	drawDays: 
	{ 
		values: ["wednesday", "saturday", ["wednesday", "saturday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 2
	},
	// line configuration:
	line: 
	{
		price: 2.5,
		numbers: 
		{
			size: 75,
			selectable: {min: 5, max: 20, default: 5}
		},
		extraNumbers: 
		{
			size: 15,
			selectable: {min: 1, max: 1, default: 1}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2.5], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		},
		{
			type: "boolean", 
			label: "Megaplier", 
			prices: {values: [1], defaultIndex: 0}, 
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false
		}
	]
}
//
config["minilotto"] =	
{
	title: "MINI Lotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: ""
	},
	jackpot: 60000,
	drawDays: 
	{ 
		values: ["monday",  "sunday", ["monday", "sunday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 12, 
			default: 1
	},
	// line configuration:
	line: 
	{
		price: 0.25,
		numbers: 
		{
			size: 42,
			selectable: {min: 5, max: 5, default: 5}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [0.25], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}
//
config["ozmonwedlotto"] =	
{
	title: "Mon & Wed Lotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 1,
	drawDays: 
	{ 
		values: ["monday",  "wednesday", ["monday", "wednesday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 12, 
			default: 1
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 45,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}
//
config["ozpowerball"] =
{
	title: "OZ PowerBall",
	texts:{
		editExtraBallHeader: "Pick 1 PowerBall",
		prizeHeader: " million"
	},
	jackpot: 2,
	drawDays: 
	{ 
		values: ["thursday"],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 12, 
			default: 12
	},
	// line configuration:
	line: 
	{
		price: 1,
		numbers: 
		{
			size: 40,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 20,
			selectable: {min: 1, max: 1, default: 1}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [1], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}
//
config["ozlotto"] =	
{
	title: "OZ Lotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 1,
	drawDays: 
	{ 
		values: ["tuesday"],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 12, 
			default: 1
	},
	// line configuration:
	line: 
	{
		price: 1.5,
		numbers: 
		{
			size: 45,
			selectable: {min: 7, max: 7, default: 7}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [1.5], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}
//
config["ozsatlotto"] =	
{
	title: "OZ Saturday Lotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 2,
	drawDays: 
	{ 
		values: ["saturday"],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 12, 
			default: 1
	},
	// line configuration:
	line: 
	{
		price: 1,
		numbers: 
		{
			size: 45,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [1], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}
//
config["polishlotto"] =	
{
	title: "Polish Lotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 2,
	drawDays: 
	{ 
		values: ["tuesday", "thursday", "saturday", ["tuesday", "thursday", "saturday"]],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 12, 
			default: 1
	},
	// line configuration:
	line: 
	{
		price: 0.6,
		numbers: 
		{
			size: 49,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [0.6], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		},
		{
			type: "boolean", 
			label: "lottoPlus", 
			prices: {values: [0.2], defaultIndex: 0}, 
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false
		}
	]
}
//
config["superenalotto"] =	
{
	title: "SuperEnalotto",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: " million"
	},
	jackpot: 44,
	drawDays: 
	{ 
		values: ["tuesday", "thursday", "saturday"],
		defaultIndex: 0

	},
	durations: 
	{
		type: "weeks",
		values: [1, 2, 4, 8],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 6
	},
	// line configuration:
	line: 
	{
		price: 2,
		numbers: 
		{
			size: 90,
			selectable: {min: 6, max: 6, default: 6}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [2], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}
//
config["quina"] =	
{
	title: "Quina",
	texts:{
		editExtraBallHeader: "",
		prizeHeader: ""
	},
	jackpot: 290000,
	drawDays: 
	{ 
		values: [],
		defaultIndex: 0

	},
	durations: 
	{
		type: "draws",
		values: [1, 2, 3, 6],
		defaultIndex: 0
	},
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			default: 3
	},
	// line configuration:
	line: 
	{
		price: 0.5,
		numbers: 
		{
			size: 80,
			selectable: {min: 5, max: 5, default: 5}
		},
		extraNumbers: 
		{
			size: 0,
			selectable: {min: 0, max: 0, default: 0}
		},
		options: [
		]
	},
	quickPicks: 
	{
		values: 
		[
			{
				numbers: 2, 
				extraNumbers: 1, 
				label: "QuickPick"
			}
		], 
		defaultIndex: 0
	},
	options: [
		{
		
			type: "multiplier", 
			label: "Double the Jackpot",
			prices: {values: [0.5], defaultIndex: 0},
			priceMultiplier: "numberOfLines", 
			application: "global",
			optional: true,
			selected: false,
			multipliers: {values:[2], defaultIndex: 0},
			format: "multiplier" // The value will be presented as a mulitplier e.g "x2"
		}
	]
}