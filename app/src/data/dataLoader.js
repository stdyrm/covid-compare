import * as d3 from 'd3';

// data
import USStates from './us-states.csv';
import stateInfo from './stateInfo.json';

export const dataLoader = async () => {
      let dataset;
      // get COVID-19 state data
      d3.csv(USStates)
        .then(data => {
          // clean data
          const dateParser = d3.timeParse('%Y-%m-%d');

          data.forEach(d => {
              d.date = dateParser(d.date);
              d.fips = parseInt(d.fips);
              d.cases = parseInt(d.cases);
              d.deaths = parseInt(d.deaths);
          });

          // Prior to 02-27-20, Washington had 1 or 2 cases from January.
          // However, these were isolated cases and this graph is trying to track Covid-19 spread 
          data = data.filter(d => d.date > new Date("02-26-2020"));

          // Normalize data:
          // 1. Add "dayOfOutbreak" to show elapsed time
          // 2. Add state population
          // 3. Add "casesPerThousand" and "deathsPerThousand"
          Object.keys(stateInfo).forEach(state => {
            const stateData = data.filter(d => d.state === state);
            stateData.forEach(d => {
                d.dayOfOutbreak = (d.date - stateData[0].date) / (24*60*60*10*10*10) + 1; // day - day one, convert ms to days
                d.casesPerThousand = d.cases / stateInfo[state].population * 1000;
                d.deathsPerThousand = d.deaths / stateInfo[state].population * 1000;
            })
          });
          dataset = data;
          console.log('imported dataset')
          console.log(dataset)
        });
  return (dataset);
};
