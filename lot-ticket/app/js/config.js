// var config = 
// {
	// title: "Powerball";
	// linePrice : 2.5,
	// powerPlayLinePrice : 1,
	// minSelected : 5,
	// maxSelected : 20,
	// maxTickets : 6,
	// highestNumber: 69,
	// highestExtraNumber: 26,
	// minExtraNumbers: 1,
	// maxExtraNumbers: 1,
	// defNumSelected: 5
// }
var config = {};
//
config["powerball"] =
{
	title: "PowerBall",
	powerPlayLinePrice : 1,
	numberOfLines: 
	{
			min: 1, 
			max: 6, 
			defaultValue: 0
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
		}
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