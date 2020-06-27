import { csv, timeParse } from "d3";

const importCSV = async (rawData, stateInfo) => {
	let data = await csv(rawData);

    // clean data
    const dateParser = timeParse("%Y-%m-%d");

    data.forEach(d => {
        d.date = dateParser(d.date);
        d.fips = parseInt(d.fips);
        d.cases = parseInt(d.cases);
        d.deaths = parseInt(d.deaths);
    });

    // Filter data
    data = data.filter(
        d =>
            d.date > new Date(2020, 1, 26) &&
            Object.keys(stateInfo).includes(d.state)
    );

    // Normalize data:
    // Add "dayOfOutbreak" to show elapsed time
    // Add state population
    // Add "casesPerThousand", "deathsPerThousand", "mortalityRate"
    Object.keys(stateInfo).forEach(state => {
        const stateData = data.filter(d => d.state === state);
        let caseCounter = 0;
        stateData.forEach(d => {
            d.dayOfOutbreak =
                (d.date - stateData[0].date) / (24 * 60 * 60 * 10 * 10 * 10) +
                1; // day - day one, convert ms to days
            d.casesPerThousand = (d.cases / stateInfo[state].population) * 1000;
            d.deathsPerThousand =
                (d.deaths / stateInfo[state].population) * 1000;
            d.mortalityRate = (d.deaths / d.cases) * 100;
            d.newCases = d.cases - caseCounter;

            caseCounter = d.cases;
        });
    });
    return data;
};

export { importCSV };
