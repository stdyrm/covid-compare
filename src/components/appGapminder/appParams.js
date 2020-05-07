export const wrapper = {
	wrapperWidth: window.innerWidth * .8,
	wrapperHeight: window.innerHeight * .8,
	marginTop: 30,
	marginRight: 30,
	marginBottom: 40,
	marginLeft: 60
  };
  
export const bounded = {
	width: wrapper.wrapperWidth - wrapper.marginLeft - wrapper.marginRight,
	height: wrapper.wrapperHeight - wrapper.marginTop - wrapper.marginBottom,
};

// Chart params: define params for drawing axes and chart
export const chartParams = {
	chartType: "bubble",
	toTimestamp: null,
	multiple: true,
	normalize: true,
	xParam: { // x-axis
		output: 'x-axis',
		type: 'linear',
		format: 'none',
		selected: 'casesPerThousand',
		alt1: 'cases',
		options: [
			"casesPerThousand",
			"cases",
			"deathsPerThousand",
			"deaths"
		]
	},
	yParam: { // y-axis
		output: 'y-axis',
		type: 'linear',
		format: 'none',
		selected: 'deathsPerThousand',
		alt1: 'deaths',
		options: [ 
			"casesPerThousand",
			"cases",
			"deathsPerThousand",
			"deaths"
		], 
	},
	zParam: {// z-axis (3rd dimension) (eg. size)
		output: 'z-axis',
		type: "linear",
		format: "none",
		selected: "population",
		options: [ 
			"population",
			"populationDensity",
			"none"
		]
	},
	cParam: { // color axis (categorical/ordinal data) (eg. gender, birthplace, etc.)
		output: 'color grouping',
		type: "categorical",
		selected: "region",
		options: [ 
			"region",
			"division",
			"governor"
		],
	},
	tParam: { // time axis (4th dimension) (ie. for animated charts)
		output: 'time',
		type: 'time',
		selected: "dayOfOutbreak",
		options: [
			"dayOfOutbreak",
			"date"
		]
	},
};

// Label params:
export const labelParams = {
	chartTitle: "COVID-19 State Comparison",
	xLabel: "Cases per Thousand",
	yLabel: "Deaths per Thousand"
};