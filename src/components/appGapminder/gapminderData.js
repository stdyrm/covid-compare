export const gapminderData = async (data, stateInfo, chartParams) => {
    const { xParam, yParam, tParam } = chartParams;
    let newData = [];
    Object.keys(stateInfo).forEach((state, i) => {
        let eachState = {
            state: state,
            region: stateInfo[state].region,
            [tParam.selected]: [],
            [xParam.selected]: [],
            [xParam.alt1]: [],
            [yParam.selected]: [],
            [yParam.alt1]: [],
        };

        const filtered = data.filter(d => d.state === state);
        filtered.forEach((d, i) => {
            eachState[tParam.selected].push([
                d[tParam.selected],
                d[tParam.selected],
            ]);
            eachState[xParam.selected].push([
                d[tParam.selected],
                d[xParam.selected],
            ]);
            eachState[yParam.selected].push([
                d[tParam.selected],
                d[yParam.selected],
            ]);
            eachState[xParam.alt1].push([d[tParam.selected], d[xParam.alt1]]);
            eachState[yParam.alt1].push([d[tParam.selected], d[yParam.alt1]]);
        });
        newData.push(eachState);
    });

    return newData;
};
