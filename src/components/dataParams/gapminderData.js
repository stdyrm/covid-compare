export const gapminderData = async (data, stateInfo, chartParams) => {
	const { xParam, yParam, tParam } = chartParams;
	let newData = [];
	Object.keys(stateInfo).forEach((state,i) => {
		let eachState = {
			state: state,
			region: stateInfo[state].region,
			[xParam]: [],
			[yParam]: []
		};

		const filtered = data.filter(d => d.state === state);
		filtered.forEach((d,i) => {
			eachState[xParam].push([d[tParam], d[xParam]]);
			eachState[yParam].push([d[tParam], d[yParam]]);
		});
		newData.push(eachState);
	});

	return newData;
};