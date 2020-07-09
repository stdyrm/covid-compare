import { nest } from "d3";

const cleanStateInfo = async (data, stateInfo, colors) => {
  const revisedStates = {};

  Object.keys(stateInfo).forEach((s, i) => {
    revisedStates[s] = {
      ...stateInfo[s],
      color: colors[i],
    };
  });

  const nested = await nest()
    .key(d => d.state)
    .entries(data);

  await Object.keys(nested).forEach(i => {
    const s = nested[i].key;

    const lastIndex = nested[i].values.length - 1;
    const latestCaseCount = nested[i].values[lastIndex].cases;
    const latestCaseCountPerThou =
      (nested[i].values[lastIndex].cases / stateInfo[s].population) * 1000;

    revisedStates[s] = {
      ...revisedStates[s],
      latestCaseCount: latestCaseCount,
      latestCaseCountPerThou: latestCaseCountPerThou,
    };
  });
  return revisedStates;
};

export { cleanStateInfo };
