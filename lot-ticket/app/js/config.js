var config = {};
//
config["powerball"] =
{
	title: "PowerBall",
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
	]
}
//
config["euromillions"] =
{
	title: "EuroMillions",
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
				label: "EuroScratch", 
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