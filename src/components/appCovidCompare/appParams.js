// Chart params: define params for drawing axes and chart
export const chartParams = {
	chartType: "line",
	toTimestamp: null,
	multiple: true,
	normalize: true,
	xParam: { // x-axis
		type: 'linear',
		format: 'number',
		selected: 'dayOfOutbreak',
		alt1: null,
		options: [
			"dayOfOutbreak",
		]
	},
	yParam: { // y-axis
		type: 'linear',
		format: 'number',
		selected: 'casesPerThousand',
		alt1: 'deathsPerThousand',
		options: [ 
			"casesPerThousand",
			"cases",
			"deathsPerThousand",
			"deaths"
		],
	},
	zParam: {// z-axis (3rd dimension) (eg. size)
		type: null,
		format: null,
		selected: null,
		options: [ 
			null
		]
	},
	cParam: { // color axis (categorical/ordinal data) (eg. gender, birthplace, etc.)
		type: "categorical",
		selected: "region",
		options: [ 
			"region",
			"division",
			"governor"
		],
	},
	tParam: { // time axis (4th dimension) (ie. for animated charts)
		type: null,
		selected: null,
		options: [
			null
		]
	},
};

// Label params:
export const labelParams = {
	chartTitle: "COVID-19 State Comparison",
	xLabel: "Cases per Thousand",
	yLabel: "Deaths per Thousand"
};